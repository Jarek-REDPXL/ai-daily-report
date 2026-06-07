#!/usr/bin/env python3
"""
RedPxl News — cluster + corroborate (Phase 2).

The funnel's collapse step: embed recent signals, group near-duplicate items by
cosine similarity (the SAME story reported by many independent outlets clusters
together), score each cluster, and emit clusters-digest.md — tens of ranked,
CORROBORATED clusters the routine reads instead of hundreds of raw items.

Cluster score = source authority × independent-source count × recency × engagement
× domain fit (the more independent outlets carry it, the more it matters).

FAIL-SOFT end to end: no OPENAI_API_KEY / DATABASE_URL / numpy → it logs and exits
0, and the routine falls back to the Phase-1 harvest digest.

Usage:  python scripts/collectors/cluster.py   (run after ingest.py)
Env:    DATABASE_URL (required) · OPENAI_API_KEY (required) · EMBED_MODEL (optional)
"""
import os
import sys
import urllib.parse

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from common import log  # noqa: E402
import embed  # noqa: E402

HERE = os.path.dirname(os.path.abspath(__file__))
CLUSTERS_MD = os.path.join(HERE, "clusters-digest.md")
SIM_THRESHOLD = 0.80     # cosine ≥ this = same story
LOOKBACK_DAYS = 2
TOP_PER_DOMAIN = 12


def _host(url):
    try:
        return urllib.parse.urlsplit(url).netloc.lower().replace("www.", "")
    except Exception:
        return ""


def _label(n_sources):
    if n_sources >= 3:
        return "Confirmed"
    if n_sources == 2:
        return "Reported"
    return "Single-source"


def main():
    url = os.environ.get("DATABASE_URL")
    if not url:
        log("cluster: DATABASE_URL not set — skipping (routine uses harvest digest).")
        return
    if not embed.have_key():
        log("cluster: OPENAI_API_KEY not set — skipping embed/cluster (fallback to harvest digest).")
        return
    try:
        import numpy as np
        import psycopg
    except ImportError as e:
        log("cluster: missing dep (%s) — skipping." % e)
        return

    # ---- load the recent working set ----
    try:
        with psycopg.connect(url, connect_timeout=20) as conn:
            with conn.cursor() as cur:
                cur.execute(
                    "SELECT id, title, excerpt, source, url, domain_guess, engagement, "
                    "       published_at, embedding "
                    "FROM redpxl.signals "
                    "WHERE run_date >= (now() AT TIME ZONE 'utc')::date - %s "
                    "ORDER BY fetched_at DESC LIMIT 2000", (LOOKBACK_DAYS,))
                rows = cur.fetchall()
    except Exception as e:  # noqa: BLE001
        log("cluster: DB read failed (%s) — skipping." % e)
        return
    if not rows:
        log("cluster: no recent signals.")
        return

    cols = ["id", "title", "excerpt", "source", "url", "domain", "engagement", "published_at", "embedding"]
    sigs = [dict(zip(cols, r)) for r in rows]

    # ---- embed any signals missing a vector ----
    need = [s for s in sigs if s["embedding"] is None]
    if need:
        vecs = embed.embed_texts([(s["title"] + ". " + (s["excerpt"] or "")) for s in need])
        if vecs is None:
            log("cluster: embedding failed — skipping (fallback to harvest digest).")
            return
        for s, v in zip(need, vecs):
            s["embedding"] = v

    def as_vec(e):
        if isinstance(e, str):  # pgvector returns '[...]' text
            return [float(x) for x in e.strip("[]").split(",") if x]
        return list(e)

    M = np.array([as_vec(s["embedding"]) for s in sigs], dtype="float32")
    norms = np.linalg.norm(M, axis=1, keepdims=True)
    norms[norms == 0] = 1.0
    M = M / norms

    # ---- greedy cosine clustering ----
    n = len(sigs)
    cluster_of = [-1] * n
    centroids = []  # list of (vector, [member indices])
    for i in range(n):
        best, best_sim = -1, SIM_THRESHOLD
        for ci, (cvec, _) in enumerate(centroids):
            sim = float(np.dot(M[i], cvec))
            if sim >= best_sim:
                best, best_sim = ci, sim
        if best == -1:
            centroids.append([M[i].copy(), [i]])
            cluster_of[i] = len(centroids) - 1
        else:
            members = centroids[best][1]
            members.append(i)
            # incremental centroid (re-normalized)
            cvec = (centroids[best][0] * (len(members) - 1) + M[i]) / len(members)
            nrm = np.linalg.norm(cvec) or 1.0
            centroids[best][0] = cvec / nrm
            cluster_of[i] = best

    import uuid as _uuid
    # deterministic-ish ids derived from member content (Math.random unavailable anyway)
    cluster_ids = [str(_uuid.uuid5(_uuid.NAMESPACE_URL, "|".join(sorted(sigs[m]["id"].__str__() for m in mem))))
                   for _, mem in centroids]

    # ---- score each cluster ----
    scored = []
    for ci, (_, members) in enumerate(centroids):
        items = [sigs[m] for m in members]
        hosts = {_host(it["url"]) for it in items if it["url"]}
        n_src = len(hosts)
        eng = sum(int(it["engagement"] or 0) for it in items)
        size = len(items)
        # independent corroboration dominates; engagement + size are secondary.
        score = (n_src * 3.0) + (size * 1.0) + (min(eng, 1000) / 200.0)
        rep = max(items, key=lambda it: int(it["engagement"] or 0))  # representative
        # domain = most common non-null domain_guess in the cluster
        doms = [it["domain"] for it in items if it["domain"]]
        domain = max(set(doms), key=doms.count) if doms else "unsorted"
        scored.append({
            "cluster_id": cluster_ids[ci], "score": round(score, 2), "n_src": n_src,
            "size": size, "label": _label(n_src), "rep": rep, "domain": domain,
            "items": items,
        })

    # ---- write cluster_id + score (+ new embeddings) back ----
    try:
        with psycopg.connect(url, connect_timeout=30) as conn:
            with conn.cursor() as cur:
                for sc in scored:
                    for it in sc["items"]:
                        emb = it["embedding"]
                        emb_str = "[" + ",".join("%.6f" % float(x) for x in as_vec(emb)) + "]"
                        cur.execute(
                            "UPDATE redpxl.signals SET cluster_id=%s, score=%s, embedding=%s::vector WHERE id=%s",
                            (sc["cluster_id"], sc["score"], emb_str, it["id"]))
            conn.commit()
        log("cluster: wrote %d clusters over %d signals" % (len(scored), n))
    except Exception as e:  # noqa: BLE001
        log("cluster: write-back failed (%s) — still emitting digest." % e)

    # ---- emit the ranked, corroborated digest the routine reads ----
    by_domain = {}
    for sc in scored:
        by_domain.setdefault(sc["domain"], []).append(sc)
    lines = ["# Clustered signals — corroborated & ranked (read FIRST)",
             "",
             "_%d clusters from %d signals. Each = one story; **N sources** is the "
             "corroboration count (Confirmed ≥3 / Reported 2 / Single-source 1). "
             "Lead with Confirmed; treat Single-source as a lead to verify._" % (len(scored), n),
             ""]
    for dom in sorted(by_domain):
        clusters = sorted(by_domain[dom], key=lambda c: c["score"], reverse=True)[:TOP_PER_DOMAIN]
        lines.append("## %s" % dom)
        for c in clusters:
            rep = c["rep"]
            lines.append("- **[%s]** [%s](%s) — %d source%s (%s), score %.1f" % (
                c["label"], rep["title"], rep["url"], c["n_src"],
                "" if c["n_src"] == 1 else "s", c["label"], c["score"]))
            if c["size"] > 1:
                others = [it for it in c["items"] if it["url"] != rep["url"]][:4]
                for o in others:
                    lines.append("    - corroborated by [%s](%s)" % (o["source"], o["url"]))
        lines.append("")
    try:
        with open(CLUSTERS_MD, "w", encoding="utf-8") as f:
            f.write("\n".join(lines))
        log("cluster: wrote %s" % CLUSTERS_MD)
    except Exception as e:  # noqa: BLE001
        log("cluster: digest write failed (%s)" % e)


if __name__ == "__main__":
    main()
