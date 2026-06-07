"""Markets / News collector — powers the `news` domain. Two free sources:
  - Finnhub general market news + AI-ticker company news (needs FINNHUB_API_KEY,
    free tier 60/min). Skipped fail-soft if the key is absent.
  - SEC EDGAR 'latest filings' (no key) — 8-K / S-1 reveal what companies are
    actually doing/building/spending. EDGAR requires a descriptive User-Agent.
All figures here are directional until the routine cross-checks them; the news
digest enforces corroboration before anything publishes."""
import json
import os
import urllib.request

from common import UA, http_get, make_signal, clean_text, log

try:
    import feedparser
except ImportError:
    feedparser = None

# AI-relevant tickers (labs' parents, chipmakers, key infra/SaaS).
TICKERS = ["NVDA", "MSFT", "GOOGL", "META", "AMZN", "AMD", "AVGO", "PLTR", "CRM", "ORCL"]
EDGAR_FORMS = ["8-K", "S-1"]
NEWS_LIMIT = 30


def _finnhub(path):
    key = os.environ.get("FINNHUB_API_KEY")
    if not key:
        return None
    sep = "&" if "?" in path else "?"
    url = "https://finnhub.io/api/v1" + path + sep + "token=" + key
    try:
        req = urllib.request.Request(url, headers={"User-Agent": UA})
        with urllib.request.urlopen(req, timeout=20) as r:
            return json.loads(r.read().decode("utf-8", "replace"))
    except Exception as e:  # noqa: BLE001
        log("finnhub failed %s (%s)" % (path, e))
        return None


def _collect_finnhub():
    if not os.environ.get("FINNHUB_API_KEY"):
        log("finnhub: FINNHUB_API_KEY not set — skipping markets news")
        return []
    signals = []
    general = _finnhub("/news?category=general") or []
    for n in general[:NEWS_LIMIT]:
        sig = make_signal(
            source="Finnhub: " + (n.get("source") or "market"),
            url=n.get("url"), title=n.get("headline"),
            domain_guess="news", excerpt=clean_text(n.get("summary")),
            raw={"category": n.get("category"), "kind": "market-news"},
        )
        if sig:
            signals.append(sig)
    for t in TICKERS:
        # last few days of company news for each watched ticker
        cn = _finnhub("/company-news?symbol=%s&from=2020-01-01&to=2099-01-01" % t) or []
        for n in cn[:5]:
            sig = make_signal(
                source="Finnhub: " + t, url=n.get("url"), title=n.get("headline"),
                domain_guess="news", excerpt=clean_text(n.get("summary")),
                raw={"ticker": t, "kind": "company-news"},
            )
            if sig:
                signals.append(sig)
    log("finnhub: %d signals" % len(signals))
    return signals


def _collect_edgar():
    if feedparser is None:
        return []
    signals = []
    for form in EDGAR_FORMS:
        url = ("https://www.sec.gov/cgi-bin/browse-edgar?action=getcurrent&type="
               + form + "&company=&dateb=&owner=include&count=40&output=atom")
        raw = http_get(url)
        if not raw:
            continue
        try:
            entries = feedparser.parse(raw).entries or []
        except Exception as e:
            log("edgar parse error (%s)" % e)
            continue
        for e in entries[:25]:
            link = e.get("link") if hasattr(e, "get") else getattr(e, "link", None)
            title = e.get("title") if hasattr(e, "get") else getattr(e, "title", None)
            sig = make_signal(
                source="SEC EDGAR " + form, url=link, title=title,
                domain_guess="news", excerpt="Filing: " + form,
                raw={"form": form, "kind": "filing"},
            )
            if sig:
                signals.append(sig)
    log("edgar: %d signals" % len(signals))
    return signals


def collect():
    return _collect_finnhub() + _collect_edgar()


if __name__ == "__main__":
    for s in collect():
        print(s["source"], "|", s["title"][:80])
