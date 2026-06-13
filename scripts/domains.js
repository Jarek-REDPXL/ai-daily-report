/*
 * RedPxl News — SINGLE SOURCE OF TRUTH for valid domain slugs.
 *
 * Every report object carries a `domains: [...slugs]` array (>=1 entry). These
 * are the only valid slugs. Consumed by:
 *   - scripts/build-data.js  (require — drives index.json metadata + facet)
 *   - scripts/check_reports.py (parsed via `node -e`, so there is ONE list)
 * Human-readable taxonomy + scope lines live in docs/DOMAINS.md.
 *
 * Paid-platform granularity (google-ads / meta-ads / snap-ads) is a BLOCK-level
 * tag, NOT a domain — see PAID_PLATFORM_TAGS below and docs/DOMAINS.md.
 */
const DOMAINS = ["web-design", "web-dev", "graphic", "email", "social", "paid", "growth", "ai-tooling", "news"];

const DOMAIN_LABELS = {
  "web-design": "Web design (UI/UX & frontend craft)",
  "web-dev": "Web development (build, code, performance)",
  "graphic": "Graphic design & brand",
  "email": "Email & retention",
  "social": "Social media (organic)",
  "paid": "Paid ads",
  "growth": "Marketing & growth strategy",
  "ai-tooling": "AI tools, skills & techniques",
  "news": "News (markets & the AI landscape)",
};

// Short labels for compact UI (e.g. sidebar filter chips). Source of truth for
// chip text — the facet (index.meta.json) carries these so the browser never
// mirrors them.
const DOMAIN_LABELS_SHORT = {
  "web-design": "Web Design",
  "web-dev": "Web Dev",
  "graphic": "Graphic",
  "email": "Email",
  "social": "Social",
  "paid": "Paid",
  "growth": "Growth",
  "ai-tooling": "AI Tooling",
  "news": "News",
};

// Platform granularity for the `paid` domain — lives in block-level tags.
const PAID_PLATFORM_TAGS = ["google-ads", "meta-ads", "snap-ads"];

// HUBS — the 5 navigable hubs the 9 domains roll up into. SINGLE SOURCE
// OF TRUTH: build-data.js emits this for the site (reports/data/hubs.json) and the
// gate validates each hub's domains against DOMAINS, so the mapping never drifts.
// Human-readable version + rationale: docs/DOMAINS.md "Hubs".
const HUBS = {
  design:      { label: "Design",      scope: "UI/UX, frontend craft, brand & visual systems.",  domains: ["web-design", "graphic"] },
  development: { label: "Development", scope: "Build, code, performance, architecture & tooling.", domains: ["web-dev"] },
  marketing:   { label: "Marketing",   scope: "Email, social, paid and growth strategy.",          domains: ["email", "social", "paid", "growth"] },
  ai:          { label: "AI",          scope: "AI tools, skills & techniques for every craft.",    domains: ["ai-tooling"] },
  news:        { label: "News",        scope: "Markets, what companies are building, what to expect & the AI landscape.", domains: ["news"] },
};
const HUB_ORDER = ["design", "development", "marketing", "ai", "news"];

module.exports = { DOMAINS, DOMAIN_LABELS, DOMAIN_LABELS_SHORT, PAID_PLATFORM_TAGS, HUBS, HUB_ORDER };
