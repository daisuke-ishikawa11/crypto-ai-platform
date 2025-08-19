// Minimal Next.js test
const { createServer } = require('http')
const { parse } = require('url')

// Try to require Next.js
try {
  const next = require('next')
  console.log('✅ Next.js module found')
  
  const dev = process.env.NODE_ENV !== 'production'
  const hostname = 'localhost'
  const port = 3001

  const app = next({ dev, hostname, port })
  const handle = app.getRequestHandler()

  app.prepare().then(() => {
    createServer(async (req, res) => {
      try {
        const parsedUrl = parse(req.url, true)
        await handle(req, res, parsedUrl)
      } catch (err) {
        console.error('Error occurred handling', req.url, err)
        res.statusCode = 500
        res.end('internal server error')
      }
    }).listen(port, (err) => {
      if (err) throw err
      console.log(`✅ Ready on http://${hostname}:${port}`)
    })
  })

} catch (error) {
  console.error('❌ Next.js not available:', error.message)
  
  // Fallback simple server
  createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' })
    res.end(`
      <html>
        <head><title>Crypto AI Platform - Development</title></head>
        <body style="font-family: Arial; padding: 2rem; background: #1a1a1a; color: white;">
          <h1>🚧 Development Environment</h1>
          <p>Next.js is not available, but the basic server is running.</p>
          <p>Port: 3001</p>
          <p>Status: Fallback mode</p>
        </body>
      </html>
    `)
  }).listen(3001, () => {
    console.log('🟡 Fallback server running on http://localhost:3001')
  })
}