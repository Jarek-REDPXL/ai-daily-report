"""
RedPxl News — shared collector utilities.

Every collector is FAIL-SOFT and BOUNDED TO ONE RETRY: a dead feed/endpoint logs
one line and is skipped, never blocking the run (matches the project operating
rules). Collectors produce a uniform `signal` dict; ingest.py dedupes + writes
them to redpxl.signals.
"""
import hashlib
import re
import sys
import time
import urllib.parse
import urllib.request

UA = "RedPxlNewsBot/1.0 (+https://redpxlnews.com; research aggregator; contact jaroslaw.konarski0709@gmail.com)"
TIMEOUT = 20

# Valid RedPxl domain slugs (kept in sync with scripts/domains.js). Used only for
# best-effort `domain_guess`; the routine makes the final call.
VALID_DOMAINS = {
    "web-design", "web-dev", "graphic", "email", "social",
    "paid", "growth", "ai-tooling", "news",
}

# Lightweight keyword → domain hints for collectors that aren't domain-pinned
# (HN, markets, etc.). First match wins; order matters (specific before generic).
_DOMAIN_HINTS = [
    ("paid",        ["google ads", "meta ads", "ppc", "ad campaign", "advertising", "adwords"]),
    ("email",       ["email marketing", "deliverability", "klaviyo", "mailchimp", "newsletter platform", "esp "]),
    ("social",      ["instagram", "tiktok", "linkedin algorithm", "social media", "reels", "creator economy"]),
    ("graphic",     ["logo", "branding", "typography", "illustrat", "photoshop", "illustrator", "figma design"]),
    ("web-design",  ["css", "ui/ux", "ux design", "web design", "design system", "accessibility", "front-end design"]),
    ("web-dev",     ["javascript", "typescript", "react", "next.js", "framework", "webassembly", "node.js", "performance budget"]),
    ("growth",      ["growth", "conversion rate", "cro", "funnel", "retention", "pricing strategy", "positioning"]),
    ("ai-tooling",  ["llm", "gpt", "claude", "gemini", "model", "agent", "prompt", "open-weight", "fine-tun", "rag", "ai tool"]),
    ("news",        ["funding", "acquisition", "ipo", "earnings", "sec filing", "regulation", "stock", "market", "valuation", "raises $"]),
]


def log(msg):
    """One-line progress to stderr (stdout stays machine-parseable if needed)."""
    sys.stderr.write("[collect] " + msg + "\n")
    sys.stderr.flush()


def http_get(url, accept=None, max_retries=1):
    """GET a URL fail-soft with ONE retry. Returns bytes or None."""
    headers = {"User-Agent": UA}
    if accept:
        headers["Accept"] = accept
    attempt = 0
    while attempt <= max_retries:
        try:
            req = urllib.request.Request(url, headers=headers)
            with urllib.request.urlopen(req, timeout=TIMEOUT) as r:
                return r.read()
        except Exception as e:  # noqa: BLE001 — fail-soft by design
            if attempt == max_retries:
                log("GET failed %s (%s)" % (url, e))
                return None
            time.sleep(1.5)
            attempt += 1
    return None


def normalize_url(url):
    """Strip query/fragment + trailing slash, lowercase host — for stable hashing."""
    try:
        p = urllib.parse.urlsplit(url.strip())
        netloc = p.netloc.lower()
        path = p.path.rstrip("/")
        return urllib.parse.urlunsplit((p.scheme.lower(), netloc, path, "", ""))
    except Exception:
        return (url or "").strip().lower()


def content_hash(url, title):
    """Dedupe key: normalized url + normalized title."""
    base = normalize_url(url) + "|" + re.sub(r"\s+", " ", (title or "").strip().lower())
    return hashlib.sha256(base.encode("utf-8", "replace")).hexdigest()


def clean_text(s, maxlen=600):
    """Strip HTML tags + whitespace; bound length."""
    if not s:
        return ""
    s = re.sub(r"<[^>]+>", " ", str(s))
    s = re.sub(r"\s+", " ", s).strip()
    return s[:maxlen]


def guess_domain(title, excerpt="", default=None):
    """Best-effort domain slug from text. Returns `default` if nothing matches."""
    blob = ((title or "") + " " + (excerpt or "")).lower()
    for slug, kws in _DOMAIN_HINTS:
        if any(k in blob for k in kws):
            return slug
    return default


def make_signal(source, url, title, published_at=None, domain_guess=None,
                excerpt="", engagement=0, raw=None):
    """Build a uniform signal record. Returns None if url/title missing."""
    url = (url or "").strip()
    title = clean_text(title, 400)
    if not url or not title:
        return None
    return {
        "source": source,
        "url": url,
        "title": title,
        "published_at": published_at,           # ISO8601 string or None
        "domain_guess": domain_guess if domain_guess in VALID_DOMAINS else None,
        "excerpt": clean_text(excerpt, 600),
        "engagement": int(engagement or 0),
        "raw": raw or {},
        "content_hash": content_hash(url, title),
    }
