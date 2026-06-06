#!/usr/bin/env python3
"""
Weekly AI briefing PDF generator (reportlab) — DATA-DRIVEN.

It reads a type:"weekly" object straight from reports/data/reports.js and renders
it to reports/pdf/weekly-ai-report-<sortDate>.pdf. You never hand-edit this file
per week — write the weekly into reports.js, then just run:

    python3 build_report.py                # newest weekly
    python3 build_report.py 2026-05-24     # a specific weekly by sortDate

Prints the output path on success. Requires: reportlab, and `node` on PATH
(used to safely evaluate reports.js, which is JS, not JSON).
"""
import json
import os
import subprocess
import sys

from reportlab.lib.pagesizes import A4
from reportlab.lib.units import cm
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_CENTER
from reportlab.platypus import (BaseDocTemplate, PageTemplate, Frame, Paragraph,
                                Spacer, Table, TableStyle, HRFlowable)

# ---------- locate repo + load newest weekly from reports.js ----------
REPO = os.path.dirname(os.path.abspath(__file__))
REPORTS_JS = os.path.join(REPO, "reports", "data", "reports.js")

def load_newest_weekly(want_sort_date=None):
    """Use node to evaluate reports.js and emit a weekly as JSON.
    Default = newest weekly. Pass a sortDate (YYYY-MM-DD) to pick a specific one."""
    pick = ("const want=%r;" % want_sort_date) if want_sort_date else "const want=null;"
    node_script = (
        "const fs=require('fs');global.window={};"
        "eval(fs.readFileSync(process.argv[1],'utf8'));" + pick +
        "const ws=(window.AI_EDGE_REPORTS||[]).filter(r=>r.type==='weekly')"
        ".sort((a,b)=>a.sortDate<b.sortDate?1:-1);"
        "const w=want?ws.find(r=>r.sortDate===want):ws[0];"
        "if(!w){console.error('no matching weekly found');process.exit(2);} "
        "process.stdout.write(JSON.stringify(w));"
    )
    try:
        out = subprocess.run(["node", "-e", node_script, REPORTS_JS],
                             capture_output=True, check=True)
    except FileNotFoundError:
        sys.exit("ERROR: `node` not found on PATH — needed to read reports.js.")
    except subprocess.CalledProcessError as e:
        msg = (e.stderr or b"").decode("utf-8", "replace") or str(e)
        sys.exit("ERROR reading reports.js: " + msg)
    return json.loads(out.stdout.decode("utf-8", "replace"))

_arg = sys.argv[1] if len(sys.argv) > 1 else None
W = load_newest_weekly(_arg)
SORT_DATE = W.get("sortDate", "unknown")
OUT = os.path.join(REPO, "reports", "pdf", "weekly-ai-report-%s.pdf" % SORT_DATE)
os.makedirs(os.path.dirname(OUT), exist_ok=True)

# ---------- palette + styles ----------
NAVY = colors.HexColor("#0b1f3a")
BLUE = colors.HexColor("#2b6cb0")
LIGHTBLUE = colors.HexColor("#eef4fb")
GREY = colors.HexColor("#8a8a8a")
LINEGREY = colors.HexColor("#d6dee8")
ROWALT = colors.HexColor("#f6f9fc")

styles = getSampleStyleSheet()
def S(name, **kw): return ParagraphStyle(name, parent=styles["Normal"], **kw)

body = S("body", fontName="Helvetica", fontSize=9.5, leading=13.5, spaceAfter=5)
h1 = S("h1", fontName="Helvetica-Bold", fontSize=24, leading=26, textColor=NAVY, spaceAfter=2)
sub = S("sub", fontName="Helvetica", fontSize=11, textColor=colors.HexColor("#6b6b6b"), spaceAfter=2)
meta = S("meta", fontName="Helvetica", fontSize=8.5, textColor=GREY, spaceAfter=4)
h2 = S("h2", fontName="Helvetica-Bold", fontSize=13, leading=16, textColor=colors.white,
       backColor=NAVY, borderPadding=(5,7,5,7), spaceBefore=16, spaceAfter=9)
h3 = S("h3", fontName="Helvetica-Bold", fontSize=11, leading=14, textColor=NAVY,
       spaceBefore=9, spaceAfter=2)
bullet = S("bullet", fontName="Helvetica", fontSize=9.5, leading=13, leftIndent=12,
           bulletIndent=2, spaceAfter=3)
small = S("small", fontName="Helvetica", fontSize=8, leading=11, textColor=GREY, spaceAfter=3)
tldr = S("tldr", fontName="Helvetica", fontSize=9.5, leading=13.5, leftIndent=4, spaceAfter=3)
cell = S("cell", fontName="Helvetica", fontSize=8.3, leading=10.5)
cellh = S("cellh", fontName="Helvetica-Bold", fontSize=8.3, leading=10.5, textColor=colors.white)
foot = S("foot", fontName="Helvetica", fontSize=7.5, leading=10, textColor=GREY, alignment=TA_CENTER)
srcst = S("srcst", fontName="Helvetica", fontSize=8, leading=11.5, textColor=colors.HexColor("#444"))
code = S("code", fontName="Courier", fontSize=8.5, leading=12, leftIndent=12,
         textColor=colors.HexColor("#333"), backColor=colors.HexColor("#f2f4f7"),
         borderPadding=(4,4,4,4), spaceAfter=4)

# ---------- inline HTML → reportlab-safe markup ----------
import re
def rl(s):
    """reports.js uses <b>/<i>/<code> + literal unicode. reportlab Paragraph
    understands <b>/<i>/<font> and needs raw '&' escaped. Convert <code>."""
    if s is None:
        return ""
    s = str(s)
    # escape ampersands that aren't already entities
    s = re.sub(r"&(?!#?\w+;)", "&amp;", s)
    s = s.replace("<code>", '<font face="Courier" size="8.5">').replace("</code>", "</font>")
    return s

story = []
def para(t, st=body): story.append(Paragraph(rl(t), st))
def gap(h=4): story.append(Spacer(1, h))

def mk_table(header, rows):
    n = max(1, len(header))
    total = 17.0
    widths = [total / n * cm] * n
    data = [[Paragraph(rl(h), cellh) for h in header]]
    for r in rows:
        data.append([Paragraph(rl(c), cell) for c in r])
    t = Table(data, colWidths=widths, repeatRows=1)
    sc = [("BACKGROUND",(0,0),(-1,0), NAVY),
          ("TOPPADDING",(0,0),(-1,-1),4),("BOTTOMPADDING",(0,0),(-1,-1),4),
          ("LEFTPADDING",(0,0),(-1,-1),6),("RIGHTPADDING",(0,0),(-1,-1),6),
          ("LINEBELOW",(0,1),(-1,-1),0.5, LINEGREY),
          ("VALIGN",(0,0),(-1,-1),"TOP")]
    for i in range(2, len(data), 2):
        sc.append(("BACKGROUND",(0,i),(-1,i), ROWALT))
    t.setStyle(TableStyle(sc))
    return t

# ---------- Header ----------
para(W.get("title", "The AI Edge — Weekly Briefing"), h1)
para("Everything that mattered in AI this week, and what you should do about it.", sub)
para(rl(W.get("dateLabel", "")) + " &nbsp;|&nbsp; Prepared for Jaroslaw", meta)
story.append(HRFlowable(width="100%", thickness=2.5, color=BLUE, spaceBefore=2, spaceAfter=12))

# ---------- TL;DR ----------
tldr_items = W.get("tldr", []) or []
if tldr_items:
    tl = [[Paragraph("<b>The 60-second version</b>", tldr)]]
    for it in tldr_items:
        tl.append([Paragraph("&bull;&nbsp; " + rl(it), tldr)])
    tt = Table(tl, colWidths=[17.0*cm])
    tt.setStyle(TableStyle([
        ("BACKGROUND",(0,0),(-1,-1), LIGHTBLUE),
        ("LINEBEFORE",(0,0),(0,-1), 3, BLUE),
        ("TOPPADDING",(0,0),(-1,-1),3),("BOTTOMPADDING",(0,0),(-1,-1),3),
        ("LEFTPADDING",(0,0),(-1,-1),10),("RIGHTPADDING",(0,0),(-1,-1),10),
        ("TOPPADDING",(0,0),(0,0),8),("BOTTOMPADDING",(0,-1),(-1,-1),8),
    ]))
    story.append(tt)
    gap(8)

# ---------- Sections (render any section/block shape) ----------
def render_block(b):
    if b.get("sub"):
        para(b["sub"], h3)
    if b.get("tags"):
        para("<font color='#2b6cb0' size='7.5'>[" + " · ".join(b["tags"]) + "]</font>", small)
    if b.get("p"):
        para(b["p"])
    for li in (b.get("list") or []):
        story.append(Paragraph("&bull;&nbsp;&nbsp;" + rl(li), bullet))
    if b.get("table"):
        tb = b["table"]
        story.append(mk_table(tb.get("head", []), tb.get("rows", [])))
    if b.get("why"):
        para('<font color="#0b5a2e"><b>Why it matters:</b></font> ' + b["why"])
    if b.get("doIt"):
        para('<font color="#8a4b00"><b>Do this:</b></font> ' + b["doIt"])
    if b.get("note"):
        para(b["note"], small)

for sec in (W.get("sections") or []):
    para(sec.get("h", ""), h2)
    if sec.get("intro"):
        para(sec["intro"])
    for b in (sec.get("blocks") or []):
        render_block(b)
    checklist = sec.get("checklist") or []
    if checklist:
        for item in checklist:
            story.append(Paragraph("&#9744;&nbsp;&nbsp; " + rl(item), bullet))

# ---------- Sources ----------
if W.get("sources"):
    para("Sources", h2)
    para(W["sources"], srcst)

story.append(Spacer(1, 14))
story.append(HRFlowable(width="100%", thickness=0.5, color=LINEGREY, spaceAfter=5))
para(rl(W.get("title", "The AI Edge")) + " &middot; " + rl(W.get("dateLabel", "")) +
     " &middot; Compiled from multiple cross-checked sources. Figures for fast-moving deals are directional.", foot)

# ---------- Build with page numbers ----------
def on_page(canvas, doc):
    canvas.saveState()
    canvas.setFont("Helvetica", 7.5)
    canvas.setFillColor(GREY)
    canvas.drawRightString(A4[0]-1.7*cm, 1.0*cm, "The AI Edge - Weekly Briefing  |  Page %d" % doc.page)
    canvas.restoreState()

doc = BaseDocTemplate(OUT, pagesize=A4,
                      leftMargin=1.7*cm, rightMargin=1.7*cm,
                      topMargin=1.5*cm, bottomMargin=1.5*cm)
frame = Frame(doc.leftMargin, doc.bottomMargin, doc.width, doc.height, id="main")
doc.addPageTemplates([PageTemplate(id="main", frames=[frame], onPage=on_page)])
doc.build(story)
print("Wrote " + os.path.relpath(OUT, REPO))
