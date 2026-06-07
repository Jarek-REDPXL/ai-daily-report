"""arXiv collector — primary research, not commentary. Pulls the most recent
submissions in the AI-relevant categories via the arXiv Atom API."""
import time

from common import http_get, make_signal, clean_text, log

try:
    import feedparser
except ImportError:
    feedparser = None

CATEGORIES = ["cs.AI", "cs.CL", "cs.LG", "cs.HC", "cs.CV"]
PER_CAT = 12
API = ("http://export.arxiv.org/api/query?search_query=cat:%s"
       "&sortBy=submittedDate&sortOrder=descending&max_results=%d")


def collect():
    if feedparser is None:
        return []
    signals = []
    for cat in CATEGORIES:
        raw = http_get(API % (cat, PER_CAT))
        if not raw:
            continue
        try:
            entries = feedparser.parse(raw).entries or []
        except Exception as e:
            log("arxiv parse error (%s)" % e)
            continue
        for e in entries:
            link = e.get("link") if hasattr(e, "get") else getattr(e, "link", None)
            title = e.get("title") if hasattr(e, "get") else getattr(e, "title", None)
            summary = (e.get("summary") if hasattr(e, "get") else "") or ""
            pub = None
            t = e.get("published_parsed") if hasattr(e, "get") else None
            if t:
                try:
                    pub = time.strftime("%Y-%m-%dT%H:%M:%SZ", t)
                except Exception:
                    pub = None
            sig = make_signal(
                source="arXiv " + cat, url=link, title=title, published_at=pub,
                domain_guess="ai-tooling", excerpt=clean_text(summary),
                raw={"category": cat},
            )
            if sig:
                signals.append(sig)
        time.sleep(1)  # arXiv asks for ~1 req/sec — be polite
    log("arxiv: %d signals" % len(signals))
    return signals


if __name__ == "__main__":
    for s in collect():
        print(s["source"], "|", s["title"][:80])
