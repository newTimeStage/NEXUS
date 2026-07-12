// 允许外部代理访问的目标域名白名单
const ALLOWED_TARGET_HOSTS = [
  'baike.baidu.com',
  'zh.wikipedia.org',
  'www.marxists.org',
  'www.gutenberg.org',
  'ctext.org',
  'www.shijitang.com',
  'raw.githubusercontent.com',
];

function getAllowedOrigin(request) {
  const origin = request.headers.get('Origin');
  if (!origin) return 'https://nexus-6gs.pages.dev';
  try {
    const u = new URL(origin);
    if (u.hostname === 'nexus-6gs.pages.dev' || u.hostname === 'localhost' || u.hostname.endsWith('.localhost')) {
      return origin;
    }
  } catch {}
  return 'https://nexus-6gs.pages.dev';
}

function isTargetAllowed(targetUrl) {
  try {
    const u = new URL(targetUrl);
    return ALLOWED_TARGET_HOSTS.some(host => u.hostname === host || u.hostname.endsWith('.' + host));
  } catch {
    return false;
  }
}

export async function onRequest(context) {
  const { request } = context;
  const url = new URL(request.url);
  const targetUrl = url.searchParams.get('url');
  const allowedOrigin = getAllowedOrigin(request);

  const corsHeaders = {
    'Access-Control-Allow-Origin': allowedOrigin,
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': '*',
    'Access-Control-Max-Age': '86400',
    'Vary': 'Origin',
  };

  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  if (request.method !== 'GET') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  if (!targetUrl) {
    return new Response(JSON.stringify({ error: 'Missing url parameter' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  if (!targetUrl.startsWith('http://') && !targetUrl.startsWith('https://')) {
    return new Response(JSON.stringify({ error: 'Invalid URL' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  if (!isTargetAllowed(targetUrl)) {
    return new Response(JSON.stringify({ error: 'Target domain not allowed' }), {
      status: 403,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  try {
    const response = await fetch(targetUrl, {
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': '*/*',
        'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
      },
      redirect: 'follow',
    });

    const headers = new Headers();
    for (const [key, value] of response.headers.entries()) {
      if (!['content-encoding', 'content-length', 'transfer-encoding'].includes(key.toLowerCase())) {
        headers.set(key, value);
      }
    }

    for (const [key, value] of Object.entries(corsHeaders)) {
      headers.set(key, value);
    }

    return new Response(response.body, {
      status: response.status,
      headers,
    });
  } catch (error) {
    return new Response(JSON.stringify({
      error: error.message,
      targetUrl: targetUrl
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
}
