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
const DOMAINS = ["web", "graphic", "email", "social", "paid", "growth", "ai-tooling"];

const DOMAIN_LABELS = {
  "web": "Web design & development",
  "graphic": "Graphic design & brand",
  "email": "Email & retention",
  "social": "Social media (organic)",
  "paid": "Paid ads",
  "growth": "Marketing & growth strategy",
  "ai-tooling": "AI tools, skills & techniques",
};

// Short labels for compact UI (e.g. sidebar filter chips). Source of truth for
// chip text — the facet (index.meta.json) carries these so the browser never
// mirrors them.
const DOMAIN_LABELS_SHORT = {
  "web": "Web",
  "graphic": "Graphic",
  "email": "Email",
  "social": "Social",
  "paid": "Paid",
  "growth": "Growth",
  "ai-tooling": "AI Tooling",
};

// Platform granularity for the `paid` domain — lives in block-level tags.
const PAID_PLATFORM_TAGS = ["google-ads", "meta-ads", "snap-ads"];

module.exports = { DOMAINS, DOMAIN_LABELS, DOMAIN_LABELS_SHORT, PAID_PLATFORM_TAGS };
