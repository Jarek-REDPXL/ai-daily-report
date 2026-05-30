#!/usr/bin/env python3
"""Weekly AI briefing PDF generator (reportlab)."""
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import cm
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_CENTER
from reportlab.platypus import (BaseDocTemplate, PageTemplate, Frame, Paragraph,
                                Spacer, Table, TableStyle, HRFlowable)

OUT = "/home/user/ai-reports/weekly-ai-report-2026-05-30.pdf"

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
para("Week of May 24 &ndash; May 30, 2026 &nbsp;|&nbsp; Prepared for Jaroslaw &nbsp;|&nbsp; Issue #1", meta)
story.append(HRFlowable(width="100%", thickness=2.5, color=BLUE, spaceBefore=2, spaceAfter=12))

# ---------- TLDR ----------
tldr_items = [
 "<b>Anthropic released Claude Opus 4.8</b> (May 28) with <b>Dynamic Workflows</b> &mdash; one agent can plan and run up to <b>1,000 parallel subagents</b>, do codebase-scale migrations, then self-verify. Fast mode is 3&times; cheaper.",
 "<b>Anthropic became the world's most valuable AI startup</b> &mdash; a <b>$65B Series H</b> at ~<b>$965B</b>, passing OpenAI and nearing $1T.",
 "<b>Google I/O 2026</b> (May 19) went all-in on agents: <b>Gemini 3.5 Flash</b>, plus <b>Spark</b> (a 24/7 personal agent) and <b>Antigravity</b>, an agent-first dev platform.",
 "<b>The industry pivoted to \"the agent.\"</b> Three major labs changed their default model within a month. The battleground is autonomous, long-running, multi-agent work &mdash; not chat.",
 "<b>Learn this week:</b> context engineering, sub-agent orchestration, and writing <b>Skills</b> (markdown runbooks for agents). See Section 2.",
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
section("1.&nbsp; Model Releases &amp; Updates")

para("Claude Opus 4.8 + Dynamic Workflows", h3)
para("Anthropic shipped Opus 4.8 on <b>May 28</b>, just 41 days after 4.7. Headline features:")
blt("<b>Dynamic Workflows (research preview):</b> Claude plans a large task, spins up <b>hundreds of parallel subagents</b> (capped at 1,000) in one session, runs them longer, then <b>verifies its own outputs</b>. Demoed codebase-scale migrations across 100,000s of lines &mdash; kickoff to merge &mdash; using the test suite as the bar.")
blt("<b>Effort controls:</b> a new control next to the model selector dials how much reasoning effort Claude spends.")
blt("<b>Cheaper fast mode:</b> ~2.5&times; speed, now <b>3&times; cheaper</b> than on prior models. Pricing unchanged (~$5 / $25 per 1M tokens).")
blt("GA in GitHub Copilot day one; positioned with better honesty / less deception.")
why("This is the clearest sign yet that the unit of work is shifting from \"a chat turn\" to \"a supervised fleet of agents.\" Your job becomes <i>orchestration + verification</i>, not line-by-line prompting.")
do("In Claude Code, try a real migration/refactor with planning enabled and watch the decomposition into subagents. Use <b>low effort</b> for routine edits, <b>high</b> for architecture.")

para("GPT-5.5 Instant becomes ChatGPT's default", h3)
para("On May 5, OpenAI made <b>GPT-5.5 Instant</b> the default across every ChatGPT tier, replacing GPT-5.3. Reported to cut hallucinated claims by 50%+ in some high-stakes scenarios.")
do("Re-test saved prompts/automations against the new default &mdash; behavior and refusal boundaries shift on model swaps.")

para("Google's Gemini: 3.5 Flash + Spark", h3)
para("At I/O (May 19) Google launched <b>Gemini 3.5 Flash</b> (beats 3.1 Pro on coding/agentic/multimodal, ~4&times; faster output), and <b>Spark</b> &mdash; a 24/7 personal agent that acts across your digital life (Gemini app, soon email/chat). 3.5 Pro arrives next month.")
why("Google is using its distribution (billions of devices) to make agents ambient. Spark is the most direct consumer-agent challenge to ChatGPT yet.")

para("Where the models stand (selected benchmarks)", h3)
story.append(mk_table(
    ["Benchmark / area", "Leader", "Note"],
    [["Scientific reasoning (GPQA Diamond)", "Gemini 3.1 Pro &mdash; 94.3%", "Top scientific reasoner"],
     ["SWE-bench Pro (coding)", "GLM-5.1 (Z.AI) &mdash; 58.4%", "First <b>open-weight</b> model to hit #1 (Apr 7), since contested"],
     ["Reasoning leaderboards", "Claude Opus 4.8 (93), Qwen3.7 Max (92)", "Best open-weight: DeepSeek V4 Pro (87)"],
     ["Research / grounded synthesis", "GPT-5.5 Pro", "Retrieval + attribution + multi-doc synthesis"]],
    [5.3*cm, 5.6*cm, 6.1*cm]))
para("Leaderboard scores vary by source and methodology &mdash; treat as directional. \"Claude Mythos Preview\" tops some boards but is an unreleased preview.", small)

# ===== Section 2 =====
section("2.&nbsp; New Techniques, Skills &amp; Best Practices")
para("This is the section to actually study &mdash; it's where your day-to-day leverage comes from.", body)

para("\"Skills\" &mdash; the highest-leverage thing to learn now", h3)
para("A <b>Skill</b> is a markdown file an agent loads for a specific task &mdash; an <b>onboarding doc / runbook for an AI</b>. Encode the procedure once; the agent follows it instead of you re-prompting. (Google also shipped <b>Science Skills</b> at I/O &mdash; the pattern is going mainstream.)")
para("<b>How to write a good Skill:</b>", body)
blt("<b>Write a runbook, not a question.</b> Anticipate failure modes, define which tool to use when, and specify <b>when to stop</b>.")
blt("<b>Structure with sections + tags:</b> XML/Markdown headers like <font face='Courier'>&lt;background&gt;</font>, <font face='Courier'>## instructions</font>, <font face='Courier'>## tool_guidance</font>, <font face='Courier'>## output</font>. Models follow delineated structure far more reliably.")
blt("<b>Include 2&ndash;5 canonical few-shot examples</b> of the exact behavior wanted. Few-shot is still top-tier even with frontier models.")
blt("<b>Be explicit about memory:</b> state what to remember across steps and what to discard.")

para("Context engineering &gt; prompt engineering", h3)
para("The 2026 consensus (Anthropic engineering): treat <b>context as a finite, precious resource</b>. Smarter models need <i>less</i> prescriptive prompting but <i>better</i> context curation. Don't dump everything in &mdash; give the agent exactly what it needs, when it needs it.")

para("Sub-agents, planning &amp; \"dreaming\"", h3)
blt("<b>Force a planning phase before generation.</b> Practitioners report success on complex coding tasks jumping from ~1/3 to ~2/3 just by planning first.")
blt("<b>Use specialized sub-agents</b> with single, well-defined jobs. One session doing everything causes \"context pollution\" and worse output.")
blt("<b>Anthropic's \"dreaming\" (May 6):</b> a scheduled, asynchronous memory-curation process &mdash; agents review past sessions, merge duplicate memories, drop stale ones, and surface recurring mistakes/preferences. Legal AI platform Harvey reported a <b>6&times;</b> improvement in task completion after enabling it. Points toward agents that genuinely learn your workflow.")

para("The core prompting toolkit (keep these sharp)", h3)
blt("<b>Chain-of-Thought</b> &mdash; reason step-by-step before answering.")
blt("<b>Self-Consistency</b> &mdash; sample multiple reasoning paths, take the majority; ~2&ndash;3&times; accuracy over plain CoT on hard problems.")
blt("<b>ReAct</b> &mdash; interleave reasoning + tool actions; the backbone of most agents.")
blt("<b>Few-shot + role prompting</b> &mdash; still reliable accuracy boosters.")

# ===== Section 3 =====
section("3.&nbsp; Tools &amp; Agentic Platforms")
blt("<b>Google Antigravity</b> &mdash; agent-first dev platform (desktop app, <font face='Courier'>agy</font> CLI, SDK, Managed Agents). <b>Multi-agent orchestration</b> from day one: multiple agents on different parts of a codebase at once.")
blt("<b>Anthropic Managed Agents</b> &mdash; added public-beta self-hosted sandboxes and a research-preview \"MCP tunnels\" feature (May 19).")
blt("<b>MCP (Model Context Protocol)</b> is the standard way to connect agents to GitHub, Slack, Drive, Asana, etc. Wire up 1&ndash;2 MCP servers to your coding agent this week.")
blt("<b>Claude Code vs Cursor:</b> Claude Code = terminal-native, autonomous multi-step + full-codebase work; Cursor = inline editing + autocomplete. Most shipping teams use <b>both</b>.")
do("Pick one repetitive weekly workflow and turn it into a Skill + sub-agent. Best ROI move right now.")

# ===== Section 4 =====
section("4.&nbsp; Market, Money &amp; Business")
story.append(mk_table(
    ["Event", "Details", "Why it matters"],
    [["Anthropic Series H", "$65B raised; ~$965B valuation; passed OpenAI, nears $1T (tripled from $380B in Feb)", "Capital consolidating around frontier-lab leaders"],
     ["Anthropic &times; xAI compute", "$1.25B/month through May 2029; potentially $40B+ to xAI", "Compute is the real bottleneck &mdash; even rivals buy from each other"],
     ["Cognition", "Raised $1B at $26B valuation", "Agentic dev tooling is a top funding magnet"],
     ["Shield AI", "$1.5B Series G, $12.7B valuation (+140% YoY)", "Defense AI is surging"],
     ["JPMorgan", "~$19.8B tech budget; AI reclassified R&amp;D &rarr; <b>core infrastructure</b>", "Enterprise AI: experiment &rarr; infrastructure"],
     ["Novo Nordisk &times; OpenAI", "AI across drug discovery, trials, manufacturing, supply chain", "Vertical full-stack AI adoption in pharma"],
     ["Apple (reported)", "May let users pick 3rd-party providers (Google, Anthropic) for Apple Intelligence in OS 27", "Apple conceding the model layer; distribution play"]],
    [3.6*cm, 7.2*cm, 6.2*cm]))
para("Big picture: Q1 2026 venture funding hit record highs (~$300B+ globally), heavily AI-driven &mdash; flowing to frontier research, agent infrastructure, defense, and vertical tools for regulated industries. Some mega-deal figures (SpaceX/xAI structuring, a reported SpaceX IPO) are fast-moving and forward-looking &mdash; treat as developing.", small)

# ===== Section 5 =====
section("5.&nbsp; Policy &amp; Regulation")
para("EU AI Act \"omnibus\" political agreement (May 7) &mdash; first major amendments since adoption:", body)
blt("High-risk (Annex III) obligations <b>delayed</b> from Aug 2026 &rarr; <b>Dec 2027</b>.")
blt("Two <b>new prohibitions</b>: AI generating non-consensual intimate imagery and CSAM.")
blt("Synthetic-content marking delayed to Dec 2026; transparency rules still arrive <b>Aug 2026</b>.")
para("US: the Dec 11, 2025 Executive Order aims to consolidate AI oversight federally and push back on state-law patchwork. State laws still landing: California's frontier-AI transparency act (Jan 1, 2026) and Colorado AI Act (Jun 30, 2026). A reported White House EO would create a <b>voluntary</b> framework for pre-release government model access.", body)
do("EU-facing teams: the <b>Aug 2026</b> transparency rules (label AI-generated content) are the near-term deadline. US teams: track state-level laws, not just federal.")

# ===== Section 6 =====
section("6.&nbsp; This Week's Action List")
for t in [
    "Try Claude Opus 4.8 on a real multi-step task; learn the <b>effort control</b>.",
    "Convert one recurring workflow into a <b>Skill</b> (markdown runbook + few-shot examples).",
    "Add a <b>planning phase</b> to agent prompts; split big jobs into <b>sub-agents</b>.",
    "Wire up <b>1&ndash;2 MCP servers</b> to your coding agent.",
    "Re-test critical prompts against GPT-5.5 / Gemini Spark defaults.",
    "If EU-facing: plan for <b>Aug 2026</b> synthetic-content transparency labeling.",
]:
    story.append(Paragraph("&#9744;&nbsp;&nbsp; " + t, bullet))

# ===== Sources =====
section("Sources")
para("Anthropic (Opus 4.8; context-engineering; dreaming) &middot; TechCrunch &middot; VentureBeat &middot; The New Stack &middot; MarkTechPost &middot; GitHub Changelog &middot; blog.google (I/O 2026: 100 announcements, Spark, Antigravity, Science Skills) &middot; 9to5Google / Tom's Guide &middot; Tech Startups (Anthropic $965B) &middot; Crunchbase News (funding rounds) &middot; SD Times &middot; MarketingProfs (GPT-5.5, JPMorgan, Novo Nordisk, Apple) &middot; YourStory / MindStudio (dreaming; Harvey 6&times;) &middot; llm-stats.com / Vellum / BenchLM (benchmarks) &middot; Global Policy Watch &amp; White &amp; Case (EU AI Act + US EO) &middot; f22labs / Totalum (Claude Code productivity).", srcst)

story.append(Spacer(1, 14))
story.append(HRFlowable(width="100%", thickness=0.5, color=LINEGREY, spaceAfter=5))
para("The AI Edge &middot; Issue #1 &middot; Week of May 24&ndash;30, 2026 &middot; Compiled from multiple cross-checked sources. Figures for fast-moving deals are directional, not guaranteed.", foot)

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
                      title="The AI Edge - Weekly Briefing (May 24-30, 2026)",
                      author="The AI Edge")
frame = Frame(doc.leftMargin, doc.bottomMargin, doc.width, doc.height, id="main")
doc.addPageTemplates([PageTemplate(id="main", frames=[frame], onPage=on_page)])
doc.build(story)
print("PDF written to", OUT)
