// RedPxl News — team-only access via Vercel Edge Middleware (FREE).
// Gates the entire site server-side: the HTML/data never reach the browser
// without the correct credentials. The password lives in env vars
// (SITE_USER / SITE_PASS), set in Vercel → Settings → Environment Variables —
// never in client code. This is real protection, unlike a JS password box.
export const config = {
  // Protect every path except Vercel's internal endpoints.
  matcher: '/((?!_vercel/).*)',
};

export default function middleware(request) {
  const USER = process.env.SITE_USER;
  const PASS = process.env.SITE_PASS;

  // If no credentials are configured, fail safe = stay locked.
  const auth = request.headers.get('authorization') || '';
  const [scheme, encoded] = auth.split(' ');

  if (scheme === 'Basic' && encoded && USER && PASS) {
    let decoded = '';
    try { decoded = atob(encoded); } catch (_) {}
    const i = decoded.indexOf(':');
    const user = decoded.slice(0, i);
    const pass = decoded.slice(i + 1);
    if (user === USER && pass === PASS) {
      return; // authenticated → continue to the static site
    }
  }

  return new Response('RedPxl News — team access required.', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="RedPxl News — team access", charset="UTF-8"',
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}
