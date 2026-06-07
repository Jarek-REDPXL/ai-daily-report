# RedPxl News — MCP server (optional)

Query the team's curated knowledge base from inside Claude Desktop / Cowork —
"what's the latest on X?" answered from **our** base, not the open web.

Tools: `get_latest` (recent reports) · `search` (semantic search over cards +
reports) · `ask` (grounded RAG answer with citations).

It reads the same Neon tables the site populates (`redpxl.kb_embeddings`,
`redpxl.reports`), so it requires Phase 4 to be live (migrations applied + the
KB-embedding step run at least once).

## Setup
```bash
cd mcp
npm install
```

Add to your Claude Desktop `claude_desktop_config.json`:
```json
{
  "mcpServers": {
    "redpxl-news": {
      "command": "node",
      "args": ["ABSOLUTE/PATH/TO/ai-daily-report/mcp/server.js"],
      "env": {
        "DATABASE_URL": "postgres://…neon…",
        "OPENAI_API_KEY": "sk-…",
        "ANTHROPIC_API_KEY": "sk-ant-…"
      }
    }
  }
}
```
`OPENAI_API_KEY` powers `search`/`ask` (question embedding); `ANTHROPIC_API_KEY`
powers the grounded answer in `ask` (omit it and `ask` returns the raw retrieved
context instead). Restart Claude Desktop; the three tools appear under
`redpxl-news`.

> This server is independent of the website and the GitHub Actions routine — it
> never writes, only reads. Skippable if you only want the in-site Ask box.
