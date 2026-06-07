"""RSS/Atom collector — the backbone. Polls the curated registry (feeds.json),
parses each feed fail-soft, returns uniform signals. Also exposes validate() to
drop dead feeds (AI sites quietly remove RSS — a wrong URL is the #1 silent
failure)."""
import json
import os
import time

try:
    import feedparser
except ImportError:  # surfaced clearly by ingest.py
    feedparser = None

from common import http_get, make_signal, clean_text, log

HERE = os.path.dirname(os.path.abspath(__file__))
REGISTRY = os.path.join(HERE, "feeds.json")
PER_FEED_LIMIT = 20            # newest N items per feed (breadth without firehose)


def load_registry():
    with open(REGISTRY, "r", encoding="utf-8") as f:
        return json.load(f).get("feeds", [])


def _entry_published(e):
    """Best-effort ISO timestamp from a feedparser entry."""
    for key in ("published_parsed", "updated_parsed"):
        t = getattr(e, key, None) or (e.get(key) if hasattr(e, "get") else None)
        if t:
            try:
                return time.strftime("%Y-%m-%dT%H:%M:%SZ", t)
            except Exception:
                pass
    return None


def _parse_feed_bytes(raw):
    """Parse fetched bytes into feedparser entries (returns [] on failure)."""
    if not raw or feedparser is None:
        return []
    try:
        return feedparser.parse(raw).entries or []
    except Exception as e:
        log("parse error (%s)" % e)
        return []


def collect():
    signals, ok_feeds, dead = [], 0, 0
    for feed in load_registry():
        url, source, domain = feed.get("url"), feed.get("source"), feed.get("domain")
        if not url:
            continue
        raw = http_get(url, accept="application/rss+xml, application/atom+xml, application/xml, text/xml")
        entries = _parse_feed_bytes(raw)
        if not entries:
            dead += 1
            continue
        ok_feeds += 1
        for e in entries[:PER_FEED_LIMIT]:
            link = e.get("link") if hasattr(e, "get") else getattr(e, "link", None)
            title = e.get("title") if hasattr(e, "get") else getattr(e, "title", None)
            summary = (e.get("summary") if hasattr(e, "get") else getattr(e, "summary", "")) or ""
            sig = make_signal(
                source=source, url=link, title=title,
                published_at=_entry_published(e),
                domain_guess=domain, excerpt=clean_text(summary),
                raw={"feed": source},
            )
            if sig:
                signals.append(sig)
    log("rss: %d signals from %d live feeds (%d dead/empty)" % (len(signals), ok_feeds, dead))
    return signals


def validate():
    """Print which registry feeds resolve + return live/dead lists (for CI audit)."""
    live, dead = [], []
    for feed in load_registry():
        url = feed.get("url")
        raw = http_get(url)
        (live if _parse_feed_bytes(raw) else dead).append(url)
    log("validate: %d live, %d dead" % (len(live), len(dead)))
    for u in dead:
        log("  DEAD: " + u)
    return live, dead


if __name__ == "__main__":
    import sys
    if "--validate" in sys.argv:
        validate()
    else:
        for s in collect():
            print(s["domain_guess"], "|", s["source"], "|", s["title"][:80])
