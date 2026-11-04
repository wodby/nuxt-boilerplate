// Lightweight health endpoint for deployment checks. It touches no external
// services, so it reports whether the server itself answers requests.
export default defineEventHandler((event) => {
  setResponseHeaders(event, {
    'Content-Type': 'text/plain',
    'Cache-Control': 'no-store',
  })
  return 'ok'
})
