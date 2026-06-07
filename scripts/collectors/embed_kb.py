#!/usr/bin/env python3
"""
RedPxl News — knowledge-base embedder (Phase 4).

Embeds every published card + report into redpxl.kb_embeddings so /api/ask can
retrieve over the team's OWN curated base (not the open web). Reads the committed
reports/data/sync.json (built by build-data.js) — the same source the Neon mirror
uses — and is IDEMPOTENT: it only re-embeds an item whose content_hash changed,
so a daily run embeds just the new/edited cards & reports (pennies).

FAIL-SOFT: no OPENAI_API_KEY / DATABASE_URL → logs and exits 0.

Usage:  python scripts/collectors/embed_kb.py
Env:    DATABASE_URL (required) · OPENAI_API_KEY (required) · EMBED_MODEL (optional)
"""
import hashlib
import json
import os
import re
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from common import log  # noqa: E402
import embed  # noqa: E402

REPO = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
SYNC = os.path.join(REPO, "reports", "data", "sync.json")


def _strip(s):
    return re.sub(r"\s+", " ", re.sub(r"<[^>]+>", " ", str(s or ""))).strip()


def card_text(c):
    parts = [c.get("title"), c.get("summary"), c.get("action"), c.get("why"),
             " ".join(c.get("how") or []), " ".join(c.get("tags") or []),
             " ".join(c.get("domains") or [])]
    return _strip(" \n".join(p for p in parts if p))


def report_text(r):
    secs = r.get("sections") or []
    sec_text = " ".join(_strip(json.dumps(s, ensure_ascii=False)) for s in secs)
    parts = [r.get("title"), " ".join(r.get("tldr") or []), sec_text,
             " ".join(r.get("domains") or [])]
    return _strip(" \n".join(p for p in parts if p))[:8000]


def main():
    url = os.environ.get("DATABASE_URL")
    if not url:
        log("embed_kb: DATABASE_URL not set — skipping (Ask retrieval not populated).")
        return
    if not embed.have_key():
        log("embed_kb: OPENAI_API_KEY not set — skipping.")
        return
    try:
        import psycopg
    except ImportError:
        log("embed_kb: psycopg not installed — skipping.")
        return
    if not os.path.exists(SYNC):
        log("embed_kb: sync.json missing — run build-data.js first.")
        return

    data = json.load(open(SYNC, encoding="utf-8"))
    items = []  # (kind, ref_id, content)
    for c in data.get("cards", []):
        if c.get("id"):
            items.append(("card", c["id"], card_text(c)))
    for r in data.get("reports", []):
        if r.get("id"):
            items.append(("report", r["id"], report_text(r)))
    if not items:
        log("embed_kb: nothing to embed.")
        return

    # what already exists at the current hash?
    try:
        with psycopg.connect(url, connect_timeout=20) as conn:
            with conn.cursor() as cur:
                cur.execute("SELECT kind, ref_id, content_hash FROM redpxl.kb_embeddings")
                existing = {(k, r): h for k, r, h in cur.fetchall()}
    except Exception as e:  # noqa: BLE001
        log("embed_kb: DB read failed (%s) — skipping." % e)
        return

    todo = []
    for kind, ref_id, content in items:
        h = hashlib.sha256(content.encode("utf-8", "replace")).hexdigest()
        if existing.get((kind, ref_id)) != h:
            todo.append((kind, ref_id, content, h))
    if not todo:
        log("embed_kb: all %d items already current — nothing to embed." % len(items))
        return

    vecs = embed.embed_texts([t[2] for t in todo])
    if vecs is None:
        log("embed_kb: embedding failed — skipping.")
        return

    rows = []
    for (kind, ref_id, content, h), v in zip(todo, vecs):
        emb = "[" + ",".join("%.6f" % float(x) for x in v) + "]"
        rows.append((kind, ref_id, content, h, emb))
    try:
        with psycopg.connect(url, connect_timeout=30) as conn:
            with conn.cursor() as cur:
                cur.executemany(
                    "INSERT INTO redpxl.kb_embeddings (kind, ref_id, content, content_hash, embedding, updated_at) "
                    "VALUES (%s, %s, %s, %s, %s::vector, now()) "
                    "ON CONFLICT (kind, ref_id) DO UPDATE SET "
                    "content=EXCLUDED.content, content_hash=EXCLUDED.content_hash, "
                    "embedding=EXCLUDED.embedding, updated_at=now()", rows)
            conn.commit()
        # prune embeddings whose source card/report no longer exists
        ids = {(k, r) for k, r, _ in items}
        with psycopg.connect(url, connect_timeout=20) as conn:
            with conn.cursor() as cur:
                cur.execute("SELECT kind, ref_id FROM redpxl.kb_embeddings")
                orphans = [(k, r) for k, r in cur.fetchall() if (k, r) not in ids]
                for k, r in orphans:
                    cur.execute("DELETE FROM redpxl.kb_embeddings WHERE kind=%s AND ref_id=%s", (k, r))
            conn.commit()
        log("embed_kb: embedded %d changed item(s), pruned %d orphan(s)." % (len(rows), len(orphans)))
    except Exception as e:  # noqa: BLE001
        log("embed_kb: write failed (%s)." % e)


if __name__ == "__main__":
    main()
