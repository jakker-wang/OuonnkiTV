export async function onRequest(context) {
  const url = new URL(context.request.url)
  const target = decodeURIComponent(url.searchParams.get('url') || '')
  if (!target) return new Response('Missing url', { status: 400 })

  const resp = await fetch(target, {
    headers: { 'User-Agent': 'Mozilla/5.0', 'Accept': '*/*' }
  })

  const body = await resp.text()
  return new Response(body, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': resp.headers.get('content-type') || 'text/plain'
    }
  })
}
