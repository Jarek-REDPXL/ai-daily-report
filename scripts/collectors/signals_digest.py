#!/usr/bin/env python3
"""
RedPxl News — deep signals digest (CI-only; powers the card-expansion pipeline).

Mines the FULL accumulated redpxl.signals store (not just the daily lookback that
cluster.py uses), groups near-duplicate items by cosine similarity (the SAME greedy
approach as cluster.py), buckets each cluster into one of the 8 CRAFT domains
(web-design, web-dev, graphic, email, social, paid, growth, ai-tooling — NOT news;
news lives in the feed and produces 0 cards), and writes signals-digest-full.md:
one section per craft domain, a deduped + corroborated list of the strongest signal
threads with their real source URLs, sized for a generation pass (not raw).

The expand-cards workflow then runs Claude over this digest (per docs/prompts/expand.md)
to mine NEW golden cards into reports/data/cards.js.

FAIL-SOFT end to end: no DATABASE_URL / OPENAI_API_KEY / numpy / psycopg -> log and
exit 0 (the expansion run simply has no fresh digest and makes fewer/no cards).

READ-ONLY on the store: unlike cluster.py it does NOT write cluster_id/score back
(the daily cluster.py owns that); embeddings for any un-embedded signals are computed
in-memory and not persisted, so a digest run never mutates the shared store.

Usage:  python scripts/collectors/signals_digest.py   (CI; DATABASE_URL present)
Env:    DATABASE_URL (required) · OPENAI_API_KEY (required) · EMBED_MODEL (optional)
"""
import os
import sys
import urllib.parse

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from common import log, guess_domain  # noqa: E402
import embed  # noqa: E402

HERE = os.path.dirname(os.path.abspath(__file__))
DIGEST_MD = os.path.join(HERE, "signals-digest-full.md")     # generation input, gitignored

# The 8 CRAFT domains only — news is excluded on purpose (it lives in the feed).
CRAFT_DOMAINS = ["web-design", "web-dev", "graphic", "email", "social", "paid", "growth", "ai-tooling"]
SIM_THRESHOLD = 0.80      # cosine >= this = same story (mirrors cluster.py)
MAX_SIGNALS = 20000       # bound the working set (full store, newest-first)
TOP_PER_DOMAIN = 30       # strongest threads per domain in the digest (generation-sized)
CORROBORATE = 5           # max corroborating sources listed per thread


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
        log("signals_digest: DATABASE_URL not set — skipping (no deep digest).")
        return
    if not embed.have_key():
        log("signals_digest: OPENAI_API_KEY not set — clustering needs embeddings, skipping.")
        return
    try:
        import numpy as np
        import psycopg
    except ImportError as e:
        log("signals_digest: missing dep (%s) — skipping." % e)
        return

    # ---- load the FULL accumulated store (bounded, newest-first) ----
    try:
        with psycopg.connect(url, connect_timeout=20) as conn:
            with conn.cursor() as cur:
                cur.execute(
                    "SELECT id, title, excerpt, source, url, domain_guess, engagement, "
                    "       published_at, embedding "
                    "FROM redpxl.signals "
                    "ORDER BY fetched_at DESC LIMIT %s", (MAX_SIGNALS,))
                rows = cur.fetchall()
    except Exception as e:  # noqa: BLE001 — fail-soft
        log("signals_digest: DB read failed (%s) — skipping." % e)
        return
    if not rows:
        log("signals_digest: store is empty — nothing to mine.")
        return

    cols = ["id", "title", "excerpt", "source", "url", "domain", "engagement", "published_at", "embedding"]
    sigs = [dict(zip(cols, r)) for r in rows]
    # Enrich a missing/non-craft domain via keyword guess so the full store buckets well.
    for s in sigs:
        if s["domain"] not in CRAFT_DOMAINS:
            s["domain"] = guess_domain(s["title"], s["excerpt"] or "", default=s["domain"])

    # ---- embed any signals missing a vector (in-memory only; not persisted) ----
    need = [s for s in sigs if s["embedding"] is None]
    if need:
        log("signals_digest: embedding %d un-embedded signals in-memory…" % len(need))
        vecs = embed.embed_texts([(s["title"] + ". " + (s["excerpt"] or "")) for s in need])
        if vecs is None:
            log("signals_digest: embedding failed — skipping.")
            return
        for s, v in zip(need, vecs):
            s["embedding"] = v

    def as_vec(e):
        if isinstance(e, str):      # pgvector returns '[...]' text
            return [float(x) for x in e.strip("[]").split(",") if x]
        return list(e)

    M = np.array([as_vec(s["embedding"]) for s in sigs], dtype="float32")
    norms = np.linalg.norm(M, axis=1, keepdims=True)
    norms[norms == 0] = 1.0
    M = M / norms

    # ---- greedy cosine clustering (mirrors cluster.py) ----
    centroids = []  # [centroid_vector, [member indices]]
    for i in range(len(sigs)):
        best, best_sim = -1, SIM_THRESHOLD
        for ci, (cvec, _) in enumerate(centroids):
            sim = float(np.dot(M[i], cvec))
            if sim >= best_sim:
                best, best_sim = ci, sim
        if best == -1:
            centroids.append([M[i].copy(), [i]])
        else:
            mem = centroids[best][1]
            mem.append(i)
            cvec = (centroids[best][0] * (len(mem) - 1) + M[i]) / len(mem)
            centroids[best][0] = cvec / (np.linalg.norm(cvec) or 1.0)

    # ---- score each cluster + bucket by dominant craft domain ----
    by_domain = {d: [] for d in CRAFT_DOMAINS}
    for _, members in centroids:
        items = [sigs[m] for m in members]
        doms = [it["domain"] for it in items if it["domain"] in CRAFT_DOMAINS]
        if not doms:
            continue  # news / unsorted clusters are dropped (no cards)
        domain = max(set(doms), key=doms.count)
        hosts = {_host(it["url"]) for it in items if it["url"]}
        n_src = len(hosts)
        eng = sum(int(it["engagement"] or 0) for it in items)
        size = len(items)
        # independent corroboration dominates; size + engagement are secondary.
        score = (n_src * 3.0) + (size * 1.0) + (min(eng, 1000) / 200.0)
        rep = max(items, key=lambda it: int(it["engagement"] or 0))  # representative
        by_domain[domain].append({
            "score": round(score, 2), "n_src": n_src, "size": size,
            "label": _label(n_src), "rep": rep, "items": items,
        })

    # ---- write the deep, generation-sized digest ----
    total = sum(len(v) for v in by_domain.values())
    active = sum(1 for d in CRAFT_DOMAINS if by_domain[d])
    lines = [
        "# Deep signals digest — full store, clustered & corroborated by craft domain",
        "",
        "_%d threads across %d craft domains, mined from up to %d accumulated signals. "
        "Each thread = one story; **N src** = independent-source corroboration "
        "(Confirmed >=3 / Reported 2 / Single-source 1). Mine these into NEW run-it-today "
        "cards: lead with corroborated threads, verify single-source before publishing, and "
        "NEVER duplicate a card that already exists in cards.js._" % (total, active, len(sigs)),
        "",
    ]
    for dom in CRAFT_DOMAINS:
        clusters = sorted(by_domain[dom], key=lambda c: c["score"], reverse=True)[:TOP_PER_DOMAIN]
        lines.append("## %s (%d threads)" % (dom, len(by_domain[dom])))
        if not clusters:
            lines.append("_No signal threads in the store for this domain yet._")
            lines.append("")
            continue
        for c in clusters:
            rep = c["rep"]
            lines.append("- **[%s · %d src · score %.1f]** [%s](%s)" % (
                c["label"], c["n_src"], c["score"], rep["title"], rep["url"]))
            if rep["excerpt"]:
                lines.append("    - %s" % rep["excerpt"])
            others = [it for it in c["items"] if it["url"] != rep["url"]][:CORROBORATE]
            for o in others:
                lines.append("    - corroborated by [%s](%s)" % (o["source"], o["url"]))
        lines.append("")

    try:
        with open(DIGEST_MD, "w", encoding="utf-8") as f:
            f.write("\n".join(lines))
        log("signals_digest: wrote %s (%d threads, %d signals)" % (DIGEST_MD, total, len(sigs)))
    except Exception as e:  # noqa: BLE001
        log("signals_digest: digest write failed (%s)" % e)


if __name__ == "__main__":
    main()
