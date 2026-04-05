import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, '../dist');

// 修改 _routes.json
const routesPath = path.join(distDir, '_routes.json');
if (fs.existsSync(routesPath)) {
  const routes = JSON.parse(fs.readFileSync(routesPath, 'utf-8'));
  if (!routes.include.includes('/proxy')) {
    routes.include.push('/proxy');
    fs.writeFileSync(routesPath, JSON.stringify(routes, null, 2));
    console.log('Updated _routes.json to include /proxy');
  }
}

// 修改 _worker.js/index.js
const workerIndexPath = path.join(distDir, '_worker.js/index.js');
if (fs.existsSync(workerIndexPath)) {
  let workerContent = fs.readFileSync(workerIndexPath, 'utf-8');

  const proxyCode = `

// 代理请求处理
async function handleProxyRequest(request) {
  const url = new URL(request.url);
  const targetUrl = url.searchParams.get('url');

  if (!targetUrl) {
    return new Response(JSON.stringify({ error: 'Missing url parameter' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  if (!targetUrl.startsWith('http://') && !targetUrl.startsWith('https://')) {
    return new Response(JSON.stringify({ error: 'Invalid URL' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    // 直接使用 targetUrl，不修改协议
    const response = await fetch(targetUrl, {
      method: request.method,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': '*/*',
        'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
        // 移除可能导致问题的 headers
        'Connection': 'close'
      },
      redirect: 'follow',
      // 禁用缓存以确保获取最新内容
      cache: 'no-cache'
    });

    // 复制响应头，但排除可能导致问题的头
    const headers = new Headers();
    for (const [key, value] of response.headers.entries()) {
      // 排除可能导致问题的头
      if (!['content-security-policy', 'x-frame-options', 'strict-transport-security'].includes(key.toLowerCase())) {
        headers.set(key, value);
      }
    }

    // 添加 CORS 头
    headers.set('Access-Control-Allow-Origin', '*');
    headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    headers.set('Access-Control-Allow-Headers', '*');

    return new Response(response.body, {
      status: response.status,
      headers,
    });
  } catch (error) {
    console.error('Proxy error:', error);
    return new Response(JSON.stringify({
      error: error.message,
      stack: error.stack,
      targetUrl: targetUrl
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

// 导出默认处理函数
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // 处理代理请求
    if (url.pathname === '/proxy') {
      return handleProxyRequest(request);
    }

    // 其他请求交给 Astro 处理
    return __astrojsSsrVirtualEntry(request, env, ctx);
  }
};

export { pageMap };`;

  // 替换最后的导出语句
  workerContent = workerContent.replace(
    /export \{ __astrojsSsrVirtualEntry as default, pageMap \};/,
    proxyCode
  );

  fs.writeFileSync(workerIndexPath, workerContent);
  console.log('Updated _worker.js/index.js with proxy handler');
}

console.log('Post-build script completed successfully!');
