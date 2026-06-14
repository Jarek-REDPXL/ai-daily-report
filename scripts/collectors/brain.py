"""
RedPxl News — the Brain: a small read/write interface to the Neon memory tables
(run_log, metrics, themes, gaps, tool_state, ideas — see db/migrations/006_brain.sql).

Every desk / CI pipeline imports this. Connection = psycopg + DATABASE_URL, the SAME
credentials the collectors use. Each function does ONE job.

FAIL-SOFT by design: with no DATABASE_URL / psycopg / DB error, reads return [] (or
None for single-row reads) and writes return None/False — a desk degrades, it never
crashes. Parameterized SQL only (all inputs are bound, never interpolated).
"""
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from common import log  # noqa: E402


def _connect():
    url = os.environ.get("DATABASE_URL")
    if not url:
        log("brain: DATABASE_URL not set — memory unavailable (degrading).")
        return None
    try:
        import psycopg  # noqa: F401
    except ImportError:
        log("brain: psycopg not installed — memory unavailable.")
        return None
    try:
        import psycopg
        return psycopg.connect(url, connect_timeout=20)
    except Exception as e:  # noqa: BLE001 — fail-soft
        log("brain: connect failed (%s)" % e)
        return None


def _jsonb(v):
    """Wrap a Python value for a jsonb column (None stays NULL)."""
    if v is None:
        return None
    from psycopg.types.json import Jsonb
    return Jsonb(v)


def _read(sql, params=(), one=False):
    conn = _connect()
    if conn is None:
        return None if one else []
    try:
        from psycopg.rows import dict_row
        with conn.cursor(row_factory=dict_row) as cur:
            cur.execute(sql, params)
            return cur.fetchone() if one else cur.fetchall()
    except Exception as e:  # noqa: BLE001
        log("brain: read failed (%s)" % e)
        return None if one else []
    finally:
        try:
            conn.close()
        except Exception:
            pass


def _write(sql, params=(), returning=False):
    conn = _connect()
    if conn is None:
        return None
    try:
        with conn.cursor() as cur:
            cur.execute(sql, params)
            rid = cur.fetchone()[0] if returning else None
        conn.commit()
        return rid if returning else True
    except Exception as e:  # noqa: BLE001
        log("brain: write failed (%s)" % e)
        return None
    finally:
        try:
            conn.close()
        except Exception:
            pass


# ===========================================================================
#  READS
# ===========================================================================
def getOpenGaps(limit=50):
    """Open gaps (what's missing), highest-weight first."""
    return _read(
        "SELECT id, source, topic, detail, weight, status, created "
        "FROM redpxl.gaps WHERE status = 'open' "
        "ORDER BY weight DESC NULLS LAST, created DESC LIMIT %s", (limit,))


def getTopThemes(n=10):
    """The n strongest recurring themes."""
    return _read(
        "SELECT id, slug, label, domains, signal_count, last_seen, notes "
        "FROM redpxl.themes "
        "ORDER BY signal_count DESC NULLS LAST, last_seen DESC NULLS LAST LIMIT %s", (n,))


def getLatestMetrics():
    """The most recent daily baseline row, or None."""
    return _read("SELECT * FROM redpxl.metrics ORDER BY captured DESC LIMIT 1", (), one=True)


def getToolState(tool_id):
    """The latest recorded state for one tool, or None."""
    return _read(
        "SELECT id, tool_id, captured, version, price, status, source_url "
        "FROM redpxl.tool_state WHERE tool_id = %s "
        "ORDER BY captured DESC LIMIT 1", (tool_id,), one=True)


def getLatestToolStates(limit=500):
    """The latest snapshot row PER tool (for week-over-week deltas in the Tools Desk)."""
    return _read(
        "SELECT DISTINCT ON (tool_id) tool_id, captured, version, price, status, source_url "
        "FROM redpxl.tool_state "
        "ORDER BY tool_id, captured DESC LIMIT %s", (limit,))


# ===========================================================================
#  WRITES
# ===========================================================================
def logRun(desk, status="ok", summary=None, artifacts=None, audit_verdict=None, finished=None):
    """Record one pipeline/desk run. Returns the new row id (or None)."""
    return _write(
        "INSERT INTO redpxl.run_log (desk, status, summary, artifacts, audit_verdict, finished) "
        "VALUES (%s, %s, %s, %s, %s, %s) RETURNING id",
        (desk, status, summary, _jsonb(artifacts), audit_verdict, finished), returning=True)


def captureMetrics(signals_total=None, cards_total=None, reports_total=None,
                   feedback_total=None, ratings_total=None, extra=None, captured=None):
    """Snapshot today's baseline (one row per day; a re-capture upserts)."""
    return _write(
        "INSERT INTO redpxl.metrics "
        "(captured, signals_total, cards_total, reports_total, feedback_total, ratings_total, extra) "
        "VALUES (COALESCE(%s::date, (now() AT TIME ZONE 'utc')::date), %s, %s, %s, %s, %s, %s) "
        "ON CONFLICT (captured) DO UPDATE SET "
        "signals_total=EXCLUDED.signals_total, cards_total=EXCLUDED.cards_total, "
        "reports_total=EXCLUDED.reports_total, feedback_total=EXCLUDED.feedback_total, "
        "ratings_total=EXCLUDED.ratings_total, extra=EXCLUDED.extra",
        (captured, signals_total, cards_total, reports_total, feedback_total, ratings_total, _jsonb(extra)))


def upsertTheme(slug, label=None, domains=None, signal_count=None, last_seen=None, notes=None):
    """Create or update a theme by slug (text[] domains, never NULL)."""
    domains = list(domains) if domains else []
    sc = int(signal_count) if signal_count is not None else 0
    return _write(
        "INSERT INTO redpxl.themes (slug, label, domains, signal_count, last_seen, notes) "
        "VALUES (%s, %s, %s, %s, %s, %s) "
        "ON CONFLICT (slug) DO UPDATE SET "
        "label=COALESCE(EXCLUDED.label, redpxl.themes.label), "
        "domains=EXCLUDED.domains, signal_count=EXCLUDED.signal_count, "
        "last_seen=COALESCE(EXCLUDED.last_seen, redpxl.themes.last_seen), "
        "notes=COALESCE(EXCLUDED.notes, redpxl.themes.notes)",
        (slug, label, domains, sc, last_seen, notes))


def addGap(source, topic, detail=None, weight=None):
    """Record a gap (source ∈ ask_no_match|low_rating|manual). Returns the new id."""
    return _write(
        "INSERT INTO redpxl.gaps (source, topic, detail, weight) "
        "VALUES (%s, %s, %s, %s) RETURNING id",
        (source, topic, detail, weight), returning=True)


def recordToolState(tool_id, version=None, price=None, status=None, source_url=None, captured=None):
    """Snapshot a tool's state (one row per tool per day; a re-capture upserts)."""
    return _write(
        "INSERT INTO redpxl.tool_state (tool_id, captured, version, price, status, source_url) "
        "VALUES (%s, COALESCE(%s::date, (now() AT TIME ZONE 'utc')::date), %s, %s, %s, %s) "
        "ON CONFLICT (tool_id, captured) DO UPDATE SET "
        "version=EXCLUDED.version, price=EXCLUDED.price, status=EXCLUDED.status, source_url=EXCLUDED.source_url",
        (tool_id, captured, version, price, status, source_url))


def proposeIdea(kind, title, rationale=None, evidence=None):
    """Propose a candidate artifact (kind ∈ guide|page|tool_category). Returns the new id."""
    return _write(
        "INSERT INTO redpxl.ideas (kind, title, rationale, evidence) "
        "VALUES (%s, %s, %s, %s) RETURNING id",
        (kind, title, rationale, _jsonb(evidence)), returning=True)
