export async function onRequest(context) {
  const url = new URL(context.request.url)
  const target = url.searchParams.get('url')
  if (!target) return new Response('Missing url', { status: 400 })

  const resp = await fetch(decodeURIComponent(target), {
    headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)', 'Accept': '*/*' }
  })

  const body = await resp.text()
  return new Response(body, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': resp.headers.get('content-type') || 'text/plain; charset=utf-8'
    }
  })
}
