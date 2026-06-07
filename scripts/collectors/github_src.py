"""GitHub collector — 'what's being built.' Uses the Search API for popular repos
in our areas, most-starred first (fast-rising = signal). A token (GITHUB_TOKEN,
already in CI) lifts the rate limit but is optional. Fail-soft."""
import json
import os
import urllib.parse
import urllib.request

from common import UA, make_signal, clean_text, guess_domain, log

QUERIES = [
    ("ai agent llm", "ai-tooling"),
    ("web framework", "web-dev"),
    ("css design", "web-design"),
]
PER_QUERY = 15


def _search(query):
    url = ("https://api.github.com/search/repositories?q="
           + urllib.parse.quote(query + " stars:>50")
           + "&sort=stars&order=desc&per_page=%d" % PER_QUERY)
    headers = {"User-Agent": UA, "Accept": "application/vnd.github+json"}
    tok = os.environ.get("GITHUB_TOKEN")
    if tok:
        headers["Authorization"] = "Bearer " + tok
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, timeout=20) as r:
            return json.loads(r.read().decode("utf-8", "replace")).get("items", [])
    except Exception as e:  # noqa: BLE001 — fail-soft
        log("github query failed '%s' (%s)" % (query, e))
        return []


def collect():
    signals = []
    for query, domain in QUERIES:
        for repo in _search(query):
            name = repo.get("full_name")
            desc = repo.get("description") or ""
            stars = repo.get("stargazers_count", 0)
            sig = make_signal(
                source="GitHub", url=repo.get("html_url"), title=name,
                published_at=repo.get("created_at"),
                domain_guess=guess_domain(name + " " + desc, default=domain),
                excerpt=clean_text(desc), engagement=stars,
                raw={"query": query, "stars": stars},
            )
            if sig:
                signals.append(sig)
    log("github: %d signals" % len(signals))
    return signals


if __name__ == "__main__":
    for s in collect():
        print(s["engagement"], "|", s["title"])
