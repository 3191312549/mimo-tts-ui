/**
 * MiMo TTS CORS Proxy - Cloudflare Worker
 * 部署: npx wrangler deploy
 * 免费: 10万次/天
 */
const MIMO = 'https://api.xiaomimimo.com/v1';

function cors(resp) {
  const h = new Headers(resp.headers);
  h.set('Access-Control-Allow-Origin', '*');
  h.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  h.set('Access-Control-Allow-Headers', 'Content-Type, x-api-key');
  return new Response(resp.body, { status: resp.status, headers: h });
}

export default {
  async fetch(request) {
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, x-api-key',
        }
      });
    }

    const url = new URL(request.url);
    const key = request.headers.get('x-api-key') || '';

    if (url.pathname === '/api/check') {
      try {
        const r = await fetch(`${MIMO}/models`, { headers: { 'api-key': key } });
        return cors(new Response(JSON.stringify(r.ok ? { status: 'ok' } : { status: 'error' }), {
          headers: { 'Content-Type': 'application/json' }
        }));
      } catch (e) {
        return cors(new Response(JSON.stringify({ status: 'error', message: e.message }), {
          status: 502, headers: { 'Content-Type': 'application/json' }
        }));
      }
    }

    if (url.pathname === '/api/chat/completions') {
      try {
        const r = await fetch(`${MIMO}/chat/completions`, {
          method: 'POST',
          headers: { 'api-key': key, 'Content-Type': 'application/json' },
          body: await request.text(),
        });
        return cors(r);
      } catch (e) {
        return cors(new Response(JSON.stringify({ error: e.message }), {
          status: 502, headers: { 'Content-Type': 'application/json' }
        }));
      }
    }

    return cors(new Response('Not found', { status: 404 }));
  }
};
