"""Hacker News collector — high-signal only. hnrss.org pre-filters HN to posts
above a points threshold, so we ingest the front page that the community already
upvoted, not the raw firehose."""
import re

from common import http_get, make_signal, clean_text, guess_domain, log

try:
    import feedparser
except ImportError:
    feedparser = None

FEEDS = [
    ("https://hnrss.org/frontpage?points=100", "Hacker News (100+)"),
    ("https://hnrss.org/show?points=50", "HN Show (50+)"),
]
LIMIT = 40


def _points(entry):
    """hnrss puts 'Points: N' in the description; pull it as the engagement signal."""
    desc = (entry.get("summary") if hasattr(entry, "get") else getattr(entry, "summary", "")) or ""
    m = re.search(r"Points:\s*(\d+)", desc)
    return int(m.group(1)) if m else 0


def collect():
    if feedparser is None:
        return []
    signals = []
    for url, source in FEEDS:
        raw = http_get(url)
        if not raw:
            continue
        try:
            entries = feedparser.parse(raw).entries or []
        except Exception as e:
            log("hn parse error (%s)" % e)
            continue
        for e in entries[:LIMIT]:
            link = e.get("link") if hasattr(e, "get") else getattr(e, "link", None)
            title = e.get("title") if hasattr(e, "get") else getattr(e, "title", None)
            sig = make_signal(
                source=source, url=link, title=title,
                domain_guess=guess_domain(title, default="ai-tooling"),
                engagement=_points(e), raw={"via": "hnrss"},
            )
            if sig:
                signals.append(sig)
    log("hn: %d signals" % len(signals))
    return signals


if __name__ == "__main__":
    for s in collect():
        print(s["engagement"], "|", s["title"][:80])
