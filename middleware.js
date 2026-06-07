// RedPxl News — team-only access via Vercel Edge Middleware (FREE).
// Real server-side gate: the site HTML/data never reach the browser without a
// valid auth cookie. We serve an on-brand login PAGE (not the native browser
// popup, which Vercel strips the WWW-Authenticate header for). The team password
// lives in env var SITE_PASS (Vercel → Settings → Environment Variables) — never
// in client code. The cookie stores a SHA-256 of the password (not the password
// itself), so it can't be reverse-engineered from the cookie.
// The matcher excludes /api/db-health so the DB health check is reachable without
// the team password (it returns only row counts, never secrets). The middleware
// never even runs for that path.
export const config = {
  matcher: '/((?!_vercel/|api/db-health).*)',
};

async function sha256hex(s) {
  const data = new TextEncoder().encode(s);
  const buf = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
}

function loginPage(error) {
  const msg = error ? `<p class="err">Incorrect password.</p>` : '';
  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>RedPxl News — Team Access</title>
<style>
  :root{color-scheme:dark}
  *{box-sizing:border-box}
  body{margin:0;min-height:100vh;display:grid;place-items:center;background:#0A0D12;
    color:#fff;font-family:Inter,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;
    position:relative;overflow:hidden}
  body::after{content:"";position:fixed;inset:0;pointer-events:none;
    background:radial-gradient(60vw 60vw at 88% -10%,rgba(255,47,43,.12),transparent 60%),
      radial-gradient(55vw 55vw at -10% 110%,rgba(158,201,228,.07),transparent 60%)}
  .card{position:relative;z-index:1;width:min(92vw,380px);padding:40px 32px;
    background:#12161F;border:1px solid rgba(255,255,255,.08);border-left:7px solid #FF2F2B;
    border-radius:0 8px 8px 0}
  .brand{display:flex;align-items:center;gap:10px;margin-bottom:28px}
  .brand .dot{width:13px;height:13px;background:#FF2F2B;flex:0 0 auto}
  .brand b{font-size:18px;font-weight:800;letter-spacing:-.02em}
  .brand b span{font-weight:400;color:rgba(255,255,255,.4)}
  label{display:block;font-family:'JetBrains Mono',monospace;font-size:11px;
    text-transform:uppercase;letter-spacing:.12em;color:rgba(255,255,255,.55);margin-bottom:9px}
  input{width:100%;padding:12px 14px;background:#0A0D12;border:1px solid rgba(255,255,255,.12);
    border-radius:8px;color:#fff;font-size:15px;font-family:inherit;outline:none;transition:border-color .15s}
  input:focus{border-color:#FF2F2B;box-shadow:0 0 0 3px rgba(255,47,43,.12)}
  button{width:100%;margin-top:18px;padding:12px;background:#FF2F2B;color:#fff;border:0;
    border-radius:8px;font-size:14px;font-weight:600;font-family:inherit;cursor:pointer;transition:background .15s}
  button:hover{background:#CC2522}
  .err{color:#FF2F2B;font-size:13px;margin:0 0 16px}
  .foot{margin-top:22px;font-size:12px;color:rgba(255,255,255,.25);text-align:center}
</style></head>
<body>
  <form class="card" method="POST" action="/__auth">
    <div class="brand"><span class="dot"></span><b>RedPxl<span> News</span></b></div>
    ${msg}
    <label for="p">Team password</label>
    <input id="p" name="password" type="password" autofocus autocomplete="current-password" required>
    <button type="submit">Enter</button>
    <div class="foot">Authorized team members only.</div>
  </form>
</body></html>`;
}

export default async function middleware(request) {
  const PASS = process.env.SITE_PASS;
  const url = new URL(request.url);

  // Fail safe: if no password configured, stay locked.
  if (!PASS) {
    return new Response(loginPage(false), { status: 401, headers: { 'Content-Type': 'text/html; charset=utf-8' } });
  }
  const expected = await sha256hex(PASS);

  // Handle login submissions.
  if (request.method === 'POST' && url.pathname === '/__auth') {
    const form = await request.formData();
    const pass = (form.get('password') || '').toString();
    if (pass === PASS) {
      return new Response(null, {
        status: 303,
        headers: {
          'Location': '/',
          'Set-Cookie': `redpxl_auth=${expected}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=2592000`,
        },
      });
    }
    return new Response(loginPage(true), { status: 401, headers: { 'Content-Type': 'text/html; charset=utf-8' } });
  }

  // Already authenticated? (cookie holds the hash, never the raw password)
  const cookie = request.headers.get('cookie') || '';
  const m = cookie.match(/(?:^|;\s*)redpxl_auth=([a-f0-9]{64})/);
  if (m && m[1] === expected) return; // continue to the static site

  // Not authenticated → show the login page.
  return new Response(loginPage(false), { status: 401, headers: { 'Content-Type': 'text/html; charset=utf-8' } });
}
