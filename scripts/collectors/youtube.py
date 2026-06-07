"""YouTube collector (Phase 5) — top-expert talks/demos/tutorials over a CURATED
channel allowlist (channels.json). Polls each channel's free uploads RSS (no API
key) for new videos, then — if youtube-transcript-api is installed — pulls the
transcript so the routine can mine what was actually said. FAIL-SOFT per channel
and per video (transcripts are often disabled or rate-limited)."""
import json
import os
import re

from common import http_get, make_signal, clean_text, log

try:
    import feedparser
except ImportError:
    feedparser = None

try:
    from youtube_transcript_api import YouTubeTranscriptApi
except Exception:  # not installed / import error → degrade to feed summary
    YouTubeTranscriptApi = None

HERE = os.path.dirname(os.path.abspath(__file__))
ALLOWLIST = os.path.join(HERE, "channels.json")
FEED = "https://www.youtube.com/feeds/videos.xml?channel_id=%s"
PER_CHANNEL = 4              # newest videos per channel
TRANSCRIPTS_PER_CHANNEL = 2  # cap transcript fetches (rate-limit friendly)


def load_channels():
    with open(ALLOWLIST, "r", encoding="utf-8") as f:
        return json.load(f).get("channels", [])


def _video_id(entry):
    vid = entry.get("yt_videoid") if hasattr(entry, "get") else None
    if vid:
        return vid
    link = entry.get("link") if hasattr(entry, "get") else getattr(entry, "link", "")
    m = re.search(r"[?&]v=([\w-]+)", link or "")
    return m.group(1) if m else None


def _transcript(video_id):
    if YouTubeTranscriptApi is None or not video_id:
        return ""
    try:
        parts = YouTubeTranscriptApi.get_transcript(video_id, languages=["en", "en-US"])
        return " ".join(p.get("text", "") for p in parts)
    except Exception:  # noqa: BLE001 — disabled/rate-limited → fail-soft
        return ""


def collect():
    if feedparser is None:
        return []
    signals = []
    for ch in load_channels():
        cid, source, domain = ch.get("channel_id"), ch.get("source"), ch.get("domain")
        if not cid:
            continue
        raw = http_get(FEED % cid)
        if not raw:
            continue
        try:
            entries = (feedparser.parse(raw).entries or [])[:PER_CHANNEL]
        except Exception as e:
            log("youtube parse error %s (%s)" % (source, e))
            continue
        for i, e in enumerate(entries):
            link = e.get("link") if hasattr(e, "get") else getattr(e, "link", None)
            title = e.get("title") if hasattr(e, "get") else getattr(e, "title", None)
            summary = (e.get("summary") if hasattr(e, "get") else "") or ""
            tx = _transcript(_video_id(e)) if i < TRANSCRIPTS_PER_CHANNEL else ""
            excerpt = clean_text(tx, 600) if tx else clean_text(summary, 400)
            sig = make_signal(
                source="YouTube: " + source, url=link, title=title,
                domain_guess=domain, excerpt=excerpt,
                raw={"channel": source, "has_transcript": bool(tx)},
            )
            if sig:
                signals.append(sig)
    log("youtube: %d signals" % len(signals))
    return signals


def validate():
    live, dead = [], []
    for ch in load_channels():
        raw = http_get(FEED % ch.get("channel_id", ""))
        ok = False
        if raw and feedparser is not None:
            try:
                ok = bool(feedparser.parse(raw).entries)
            except Exception:
                ok = False
        (live if ok else dead).append("%s (%s)" % (ch.get("source"), ch.get("channel_id")))
    log("youtube validate: %d live, %d dead" % (len(live), len(dead)))
    for d in dead:
        log("  DEAD: " + d)
    return live, dead


if __name__ == "__main__":
    import sys
    if "--validate" in sys.argv:
        validate()
    else:
        for s in collect():
            print(s["source"], "|", s["title"][:70])
