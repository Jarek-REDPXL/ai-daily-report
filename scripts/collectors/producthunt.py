"""Product Hunt collector — new tools the moment they ship. Uses the public RSS
feed (no OAuth token required); fail-soft if PH changes the endpoint."""
from common import http_get, make_signal, clean_text, guess_domain, log

try:
    import feedparser
except ImportError:
    feedparser = None

FEED = "https://www.producthunt.com/feed"
LIMIT = 30


def collect():
    if feedparser is None:
        return []
    raw = http_get(FEED)
    if not raw:
        log("producthunt: feed unavailable")
        return []
    try:
        entries = feedparser.parse(raw).entries or []
    except Exception as e:
        log("producthunt parse error (%s)" % e)
        return []
    signals = []
    for e in entries[:LIMIT]:
        link = e.get("link") if hasattr(e, "get") else getattr(e, "link", None)
        title = e.get("title") if hasattr(e, "get") else getattr(e, "title", None)
        summary = (e.get("summary") if hasattr(e, "get") else "") or ""
        sig = make_signal(
            source="Product Hunt", url=link, title=title,
            domain_guess=guess_domain(title, summary, default="ai-tooling"),
            excerpt=clean_text(summary), raw={"via": "ph-rss"},
        )
        if sig:
            signals.append(sig)
    log("producthunt: %d signals" % len(signals))
    return signals


if __name__ == "__main__":
    for s in collect():
        print(s["title"][:80])
