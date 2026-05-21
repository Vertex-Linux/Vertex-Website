const express = require('express')
const cors    = require('cors')
const fs      = require('fs')
const path    = require('path')

const app  = express()
const PORT = process.env.PORT || 3004
const HOST = process.env.HOST || 'https://vertexdl.arc360hub.com'

const RELEASES_DIR = path.join(__dirname, 'releases')

// Matches: vertex-linux-YYYY.MM.DD-x86_64  (any extension)
const RELEASE_RE = /^vertex-linux-(\d{4})\.(\d{2})\.(\d{2})-x86_64/

// ── CORS ──────────────────────────────────────────────────
app.use(cors({
  origin: process.env.ALLOWED_ORIGIN || '*',
  methods: ['GET', 'HEAD'],
}))

// ── Release cache ─────────────────────────────────────────

let cachedLatest = null
const POLL_INTERVAL_MS = 60 * 1000 // 1 minute

function scanReleases() {
  if (!fs.existsSync(RELEASES_DIR)) return null

  const files = fs.readdirSync(RELEASES_DIR)
    .filter(f => RELEASE_RE.test(f) && f !== '.gitkeep')
    .sort()   // lexicographic sort works because YYYY.MM.DD is zero-padded
    .reverse()

  return files[0] ?? null
}

function parseVersion(filename) {
  const m = RELEASE_RE.exec(filename)
  return m ? `${m[1]}.${m[2]}.${m[3]}` : null
}

function refreshCache() {
  const found = scanReleases()
  if (found !== cachedLatest) {
    cachedLatest = found
    if (found) {
      console.log(`[${new Date().toISOString()}] New release detected: ${found}`)
    } else {

    }
  }
}

// Scan immediately on startup, then every minute
refreshCache()
setInterval(refreshCache, POLL_INTERVAL_MS)

// ── Routes ────────────────────────────────────────────────

// GET /health
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', host: HOST, latestRelease: cachedLatest ?? null })
})

// GET /latest  →  returns release metadata JSON
app.get('/latest', (req, res) => {
  const file = cachedLatest

  if (!file) {
    return res.status(404).json({ available: false })
  }

  const filePath = path.join(RELEASES_DIR, file)
  const { size }  = fs.statSync(filePath)
  const version   = parseVersion(file)

  res.json({
    available:   true,
    version,
    fileName:    file,
    downloadUrl: `${HOST}/download/${encodeURIComponent(file)}`,
    size,
  })
})

// GET /download/:filename  →  streams the file with range-request support
app.get('/download/:filename', (req, res) => {
  const { filename } = req.params

  // Reject anything that doesn't match the release pattern (path traversal guard)
  if (!RELEASE_RE.test(filename) || filename.includes('/') || filename.includes('\\')) {
    return res.status(400).json({ error: 'Invalid filename' })
  }

  const filePath = path.join(RELEASES_DIR, filename)

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: 'File not found' })
  }

  const { size } = fs.statSync(filePath)
  const range     = req.headers.range

  res.setHeader('Content-Disposition', `attachment; filename="${filename}"`)
  res.setHeader('Content-Type', 'application/octet-stream')
  res.setHeader('Accept-Ranges', 'bytes')

  if (range) {
    // Partial content — allows resumable downloads
    const [rawStart, rawEnd] = range.replace(/bytes=/, '').split('-')
    const start    = parseInt(rawStart, 10)
    const end      = rawEnd ? parseInt(rawEnd, 10) : size - 1
    const chunkLen = end - start + 1

    if (start >= size || end >= size || start > end) {
      res.setHeader('Content-Range', `bytes */${size}`)
      return res.status(416).end()
    }

    res.status(206)
    res.setHeader('Content-Range',  `bytes ${start}-${end}/${size}`)
    res.setHeader('Content-Length', chunkLen)

    fs.createReadStream(filePath, { start, end }).pipe(res)
  } else {
    res.setHeader('Content-Length', size)
    fs.createReadStream(filePath).pipe(res)
  }
})

// ── Start ─────────────────────────────────────────────────

app.listen(PORT, () => {
  console.log(`Vertex Linux download server`)
  console.log(`  Listening on port : ${PORT}`)
  console.log(`  Public host       : ${HOST}`)
  console.log(`  Releases folder   : ${RELEASES_DIR}`)
  console.log()

  if (cachedLatest) {
    console.log(`  Latest release    : ${cachedLatest}`)
  } else {
    console.log(`  Latest release    : (none — drop a file into releases/)`)
  }
  console.log(`  Polling interval  : every 60s`)
})
