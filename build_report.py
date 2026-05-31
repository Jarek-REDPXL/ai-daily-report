#!/usr/bin/env python3
"""Weekly AI briefing PDF generator (reportlab)."""
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import cm
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_CENTER
from reportlab.platypus import (BaseDocTemplate, PageTemplate, Frame, Paragraph,
                                Spacer, Table, TableStyle, HRFlowable)

OUT = "/home/user/ai-daily-report/reports/pdf/weekly-ai-report-2026-05-31.pdf"

NAVY = colors.HexColor("#0b1f3a")
BLUE = colors.HexColor("#2b6cb0")
LIGHTBLUE = colors.HexColor("#eef4fb")
GREY = colors.HexColor("#8a8a8a")
LINEGREY = colors.HexColor("#d6dee8")
ROWALT = colors.HexColor("#f6f9fc")

styles = getSampleStyleSheet()

def S(name, **kw):
    return ParagraphStyle(name, parent=styles["Normal"], **kw)

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

story = []

def para(t, st=body): story.append(Paragraph(t, st))
def blt(t): story.append(Paragraph("&bull;&nbsp;&nbsp;" + t, bullet))
def gap(h=4): story.append(Spacer(1, h))
def section(t): para(t, h2)
def why(t): para('<font color="#0b5a2e"><b>Why it matters:</b></font> ' + t)
def do(t): para('<font color="#8a4b00"><b>Do this:</b></font> ' + t)

def mk_table(header, rows, widths):
    data = [[Paragraph(h, cellh) for h in header]]
    for r in rows:
        data.append([Paragraph(c, cell) for c in r])
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
para("The AI Edge &mdash; Weekly Briefing", h1)
para("Everything that mattered in AI this week, and what you should do about it.", sub)
para("Week of May 25 &ndash; May 31, 2026 &nbsp;|&nbsp; Prepared for Jaroslaw &nbsp;|&nbsp; Issue #2", meta)
story.append(HRFlowable(width="100%", thickness=2.5, color=BLUE, spaceBefore=2, spaceAfter=12))

# ---------- TLDR ----------
tldr_items = [
 "<b>The week in one idea: the agent grew up.</b> Autonomy's two missing pieces landed at once &mdash; <b>money</b> (agents can now transact) and the dawning <b>reliability/governance</b> reckoning. The race moved from <i>can the model do it</i> to <i>can we operationalize and monetize it</i>.",
 "<b>Agents got wallets.</b> AWS <b>Bedrock AgentCore Payments</b> (with Coinbase + Stripe) + OpenAI's <b>Agentic Commerce Protocol</b> turned \"agentic commerce\" from slideware into rails: stablecoin micropayments with spending guardrails.",
 "<b>&hellip;and a reliability problem.</b> Surveys put <b>&lt;2%</b> of enterprises running agents at full production scale; the blocker is integration + durable execution, not model IQ.",
 "<b>The map consolidated.</b> Four labs made four acqui-hires/licenses in five days; <b>Andrej Karpathy joined Anthropic</b>; Anthropic's run-rate reportedly went ~$14B&rarr;~$30B in ~12 weeks.",
 "<b>Learn this week:</b> agentic-payment guardrails (x402), <b>durable/idempotent execution</b>, planner&rarr;worker&rarr;verifier orchestration, and element-level citations. See Section 3.",
]
tl = [[Paragraph("<b>The 60-second version</b>", tldr)]]
for it in tldr_items:
    tl.append([Paragraph("&bull;&nbsp; " + it, tldr)])
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

# ===== Section 1 =====
section("1.&nbsp; The Week in One Idea")
para("From \"can it think\" to \"can it transact and be trusted\"", h3)
para("Issue #1's thesis was that the industry pivoted to <i>the agent</i> &mdash; from chat turns to fleets of subagents. This week the agent got <b>operationalized and monetized</b>. The two things that had been missing both arrived: agents can now <b>pay</b> (AWS AgentCore Payments, OpenAI's Agentic Commerce Protocol), and the field openly admitted they mostly can't yet <b>run reliably in production</b> (&lt;2% at full scale). The frontier is no longer just intelligence &mdash; it's <b>commerce + control</b>.")
para("Did last week's calls hold?", h3)
blt("<b>Held:</b> we called Gemini Spark the sharpest consumer-agent challenge to ChatGPT &mdash; it <b>went live May 29</b> for US AI Ultra users.")
blt("<b>Held:</b> \"compute is THE bottleneck\" &mdash; reaffirmed by ByteDance's reported ~$70B infra plan and Anthropic's ~$200B cloud/chip commitments.")
blt("<b>Escalated:</b> the May 30 jobs-narrative reversal hardened into open labor conflict across four jurisdictions this week (see Section 6).")

# ===== Section 2 =====
section("2.&nbsp; Model &amp; Capability Landscape &mdash; what to use for what")
para("Late-May release cadence slowed; the labs shifted from shipping models to <b>productizing agents</b>. The practical map:", body)
story.append(mk_table(
    ["When you need&hellip;", "Reach for", "Why"],
    [["Hard reasoning, codebase-scale refactor, self-checking", "Claude Opus 4.8", "Dynamic Workflows + effort control; reported ~4&times; less likely than 4.7 to pass its own buggy code"],
     ["High-volume / latency-sensitive / cheap", "Gemini 3.5 Flash", "Flagship-ish quality at Flash price/speed; now powers Spark"],
     ["Consumer \"just do it for me\"", "Gemini Spark / ChatGPT agent mode", "Ambient, background, cross-app &mdash; Spark just shipped"],
     ["Selling / shopping / ads inside chat", "ChatGPT (ACP) + Ads Manager", "Agentic Commerce Protocol makes ChatGPT a storefront and ad surface"],
     ["Cheapest tokens / self-host leaning", "DeepSeek V4 &middot; Qwen 3.7-Max (API)", "Open-weight price pressure continues; Qwen 3.7-Max is API-only, not open"]],
    [5.3*cm, 4.4*cm, 7.3*cm]))
para("Benchmarks vary by source &mdash; directional. The week's story isn't a new #1; it's that capability is now table stakes and <b>integration + reliability</b> decide winners.", small)

# ===== Section 3 =====
section("3.&nbsp; Techniques &amp; Skills to Learn (your leverage)")
para("Study this section &mdash; it's where the compounding edge is.", body)

para("Agentic payments &amp; spend guardrails (learn \"x402\")", h3)
para("<b>x402</b> revives HTTP's dormant \"402 Payment Required\" for machine-to-machine commerce: an agent hits a paid endpoint, gets a price, settles (often in stablecoin), and proceeds &mdash; no human in the billing loop. Powerful and dangerous.")
blt("Give every spending agent a <b>corporate card, not a blank check</b>: hard total budget, per-transaction cap, and an <b>allowlist</b> of payable endpoints.")
blt("Require <b>human approval above a threshold</b> (e.g., any single charge &gt; $X).")
blt("Attach <b>idempotency keys</b> to every payment so a crash-and-retry can't double-charge.")
blt("Log every transaction with the triggering reasoning step for audit.")

para("Durable, resumable agents (why demos die in prod)", h3)
para("The top reason production agents survive and demos don't is <b>durable execution</b> &mdash; treat agents like workflow engines, not scripts.")
blt("<b>Persist each step's result</b> to durable storage before starting the next.")
blt("Make every external action <b>idempotent</b> (safe to retry).")
blt("On restart, <b>replay from the last checkpoint</b>, never from scratch.")

para("Planner &rarr; Worker &rarr; Verifier orchestration", h3)
para("The reliable multi-agent shape: a <b>planner</b> decomposes, specialized <b>workers</b> (single, well-defined jobs) execute, an explicit <b>verifier</b> checks against a hard bar (a test suite, a rubric), then results <b>merge</b>. Opus 4.8's self-verification and new research (MAS-Orchestra / MASBENCH) are formalizing exactly this loop. Don't let one session do everything &mdash; that causes context pollution and worse output.")

para("Kill attribution hallucination with element-level citations", h3)
para("New benchmarks (e.g., CiteVQA) push models to return <b>fine-grained, element-level</b> citations &mdash; page+line or bounding box &mdash; not just a source name. Copy this into any RAG/research agent:")
para("For every claim, cite the exact source span (document + page + line / element). If you cannot locate a span, label the claim \"unverified\" instead of asserting it.", code)

# ===== Section 4 =====
section("4.&nbsp; Tools Worth Your Time")
blt("<b>Adopt/learn now:</b> AWS <b>Bedrock AgentCore Payments</b> (preview) &mdash; wire one paid API behind a budgeted, allowlisted wallet in a <i>sandbox</i> first.")
blt("<b>Adopt if you sell online:</b> OpenAI's <b>Agentic Commerce Protocol</b> &mdash; turns ChatGPT into a storefront; start treating discovery as \"agent optimization,\" not just SEO.")
blt("<b>Skip the infra pain:</b> <b>Managed Agents in the Gemini API</b> deliver the Antigravity harness without you standing up infrastructure.")
blt("<b>Watch:</b> <b>ChatGPT Ads Manager</b> (new monetization + a new attention game) and the <b>AWS/Visa</b> agent-commerce blueprints.")
blt("<b>Don't over-rotate</b> on frameworks that merely promise \"reliability\" &mdash; verify durable execution + observability yourself. &lt;2% reach production for a reason.")
do("Put one paid API your agents already call behind a budgeted, allowlisted wallet in a sandbox &mdash; you'll meet the new failure modes before they hit your real card.")

# ===== Section 5 =====
section("5.&nbsp; Market, Money &amp; The Strategic Read")
story.append(mk_table(
    ["Move", "Detail", "Signal"],
    [["Consolidation wave", "4 labs, 4 deals in ~5 days &mdash; Anthropic&rarr;Stainless, DeepMind&rarr;Contextual AI (Douwe Kiela +20), Meta&rarr;Dreamer, Mistral&rarr;Emmi AI &mdash; mostly licenses / acqui-hires to dodge antitrust", "Buying a capability now beats building it; M&amp;A disguised as licensing"],
     ["Talent magnet", "Andrej Karpathy joined Anthropic's pre-training team &mdash; to use Claude to accelerate pretraining research", "Elite talent pooling at the perceived leader"],
     ["Revenue velocity", "Anthropic run-rate reportedly ~$14B (Feb) &rarr; ~$30B (Apr); OpenAI launched a reported ~$4B enterprise consulting arm", "Labs monetizing services, not just tokens"],
     ["Compute land-grab", "ByteDance reportedly plans up to ~$70B AI infra; Anthropic ~$200B cloud/chips", "Compute + power remain the gating moat"]],
    [3.6*cm, 7.4*cm, 6.0*cm]))
para("Funding / valuation / infra figures are fast-moving &mdash; directional. The pattern is durable: capability, capital, and talent are concentrating.", small)
para("What it signals for the next 6&ndash;12 months", h3)
para("Winners will be decided less by the next benchmark and more by who can <b>secure compute</b>, <b>buy missing capabilities cheaply</b> (license/acqui-hire instead of multi-year builds), and <b>operationalize agents</b> &mdash; payments + reliability &mdash; for paying enterprises. The \"license, don't merge\" pattern also signals labs expect antitrust scrutiny and are routing around it.")

# ===== Section 6 =====
section("6.&nbsp; Policy &amp; Risk (only what affects what you build)")
para("EU AI Act omnibus &mdash; still the binding clock", h3)
blt("High-risk (Annex III) obligations <b>delayed</b> to <b>Dec 2027</b>; product-regulated high-risk to Aug 2028.")
blt("Two <b>new prohibitions</b>: AI-generated non-consensual intimate imagery and CSAM.")
blt("Synthetic-content / transparency labeling still arrives <b>Aug 2026</b> &mdash; that's the near deadline.")
para("The new front: labor &amp; legitimacy", h3)
para("Worker pushback went structural this week &mdash; strikes, gamed AI rankings, courts barring AI-justified layoffs, calls for worker say. Governance of <i>how</i> AI is rolled out is now a compliance + reputational risk, not just an HR question.")
para("Agentic payments = a new liability surface", h3)
para("Once agents spend money, ask: who's liable when one overspends, gets defrauded, or pays a sanctioned party? KYC/AML checks, hard spend caps, and immutable audit logs move from nice-to-have to build requirement.")

# ===== Section 7 =====
section("7.&nbsp; This Week's Action List")
for t in [
    "Put one paid API behind a <b>budgeted, allowlisted agent wallet</b> in a sandbox; learn <b>x402</b>.",
    "Add <b>durable execution</b> to your top agent: checkpoint state + idempotency keys (also blocks double-payments).",
    "Insert an explicit <b>verifier sub-agent</b> (planner &rarr; workers &rarr; verifier &rarr; merge; tests as the bar).",
    "If you sell online, evaluate OpenAI's <b>Agentic Commerce Protocol</b>; think <b>agent optimization</b>, not just SEO.",
    "Re-test consumer workflows on <b>Gemini Spark</b> vs ChatGPT agent mode.",
    "Demand <b>element-level citations</b> in every RAG/research prompt.",
    "EU-facing: map AI-generated outputs for the <b>Aug 2026</b> transparency labeling deadline.",
    "Co-design internal AI rollouts with affected teams; report <b>augmentation</b>, not headcount.",
]:
    story.append(Paragraph("&#9744;&nbsp;&nbsp; " + t, bullet))

# ===== Sources =====
section("Sources")
para("AWS ML Blog (Bedrock AgentCore Payments, with Coinbase + Stripe) &middot; OpenAI (Agentic Commerce Protocol; AWS partnership) &middot; Axios (ChatGPT Ads; Karpathy) &middot; TechCrunch / CNBC (Karpathy &rarr; Anthropic) &middot; VentureBeat (agent reliability rebuild; AWS/Visa blueprints) &middot; StartupHub.ai (four-lab consolidation) &middot; Crunchbase News (funding / run-rate) &middot; unrot.co &amp; crescendo.ai (May 30&ndash;31 roundups: Gemini Spark live, ByteDance infra, OpenAI consulting, labor conflicts) &middot; Global Policy Watch / Inside Privacy (EU AI Act omnibus) &middot; arXiv (MAS-Orchestra / MASBENCH; CiteVQA). Fast-moving funding/infra figures are directional.", srcst)

story.append(Spacer(1, 14))
story.append(HRFlowable(width="100%", thickness=0.5, color=LINEGREY, spaceAfter=5))
para("The AI Edge &middot; Issue #2 &middot; Week of May 25&ndash;31, 2026 &middot; Compiled from multiple cross-checked sources. Figures for fast-moving deals are directional, not guaranteed.", foot)

# ---------- Build with page numbers ----------
def on_page(canvas, doc):
    canvas.saveState()
    canvas.setFont("Helvetica", 7.5)
    canvas.setFillColor(GREY)
    canvas.drawRightString(A4[0]-1.7*cm, 1.0*cm, "The AI Edge - Weekly Briefing  |  Page %d" % doc.page)
    canvas.restoreState()

doc = BaseDocTemplate(OUT, pagesize=A4,
                      leftMargin=1.7*cm, rightMargin=1.7*cm,
                      topMargin=1.5*cm, bottomMargin=1.5*cm,
                      title="The AI Edge - Weekly Briefing (May 25-31, 2026)",
                      author="The AI Edge")
frame = Frame(doc.leftMargin, doc.bottomMargin, doc.width, doc.height, id="main")
doc.addPageTemplates([PageTemplate(id="main", frames=[frame], onPage=on_page)])
doc.build(story)
print("PDF written to", OUT)
