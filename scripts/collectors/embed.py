"""Embedding helper — OpenAI text-embedding-3-small by default (cheap, 1536-dim).
Pure urllib so there's no SDK dependency. FAIL-SOFT: returns None if no key, so
the clustering step degrades gracefully and the routine falls back to the
unclustered harvest digest."""
import json
import os
import urllib.request

API = "https://api.openai.com/v1/embeddings"
MODEL = os.environ.get("EMBED_MODEL", "text-embedding-3-small")
BATCH = 96


def have_key():
    return bool(os.environ.get("OPENAI_API_KEY"))


def embed_texts(texts):
    """Return a list of embedding vectors (one per input), or None if unavailable."""
    key = os.environ.get("OPENAI_API_KEY")
    if not key or not texts:
        return None
    out = []
    for i in range(0, len(texts), BATCH):
        chunk = [t[:8000] if t else " " for t in texts[i:i + BATCH]]
        payload = json.dumps({"model": MODEL, "input": chunk}).encode("utf-8")
        req = urllib.request.Request(
            API, data=payload,
            headers={"Authorization": "Bearer " + key,
                     "Content-Type": "application/json"},
        )
        try:
            with urllib.request.urlopen(req, timeout=60) as r:
                data = json.loads(r.read().decode("utf-8", "replace"))
            out.extend(item["embedding"] for item in data.get("data", []))
        except Exception as e:  # noqa: BLE001 — fail-soft
            import sys
            sys.stderr.write("[embed] batch %d failed (%s)\n" % (i // BATCH, e))
            return None
    return out if len(out) == len(texts) else None
