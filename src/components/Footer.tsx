const Logo = () => (
  <svg width="26" height="26" viewBox="0 0 32 32" fill="none">
    <defs>
      <linearGradient id="foot-grad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#8b5cf6" />
        <stop offset="100%" stopColor="#22d3ee" />
      </linearGradient>
    </defs>
    <polygon points="16,3 29,27 3,27" fill="url(#foot-grad)" />
    <polygon points="16,10 23,24 9,24" fill="rgba(7,7,15,0.6)" />
  </svg>
)

const GitHubIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.49.5.09.68-.22.68-.48 0-.24-.01-.87-.01-1.7-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0 1 12 6.8c.85.004 1.71.115 2.51.337 1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85 0 1.34-.01 2.42-.01 2.75 0 .27.18.58.69.48C19.14 20.16 22 16.42 22 12c0-5.52-4.48-10-10-10z" />
  </svg>
)


// ── Edit footer links here ────────────────────────────────
const cols = [
  {
    heading: 'Project',
    links: [
      { label: 'Features',      href: '#features' },
      { label: 'Packages', href: '#terminal' },
      { label: 'Roadmap',   href: '/roadmap' },
    ],
  },
  {
    heading: 'Community',
    links: [
      { label: 'Discord', href: 'https://discord.gg/5aps88CkGx' },
      { label: 'GitHub',  href: 'https://github.com/Vertex-Linux/Vertex-Debian' },
    ],
  },
]
// ─────────────────────────────────────────────────────────

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand */}
          <div className="footer-brand">
            <div className="footer-logo">
              <Logo />
              <span className="footer-logo-text">Vertex Linux</span>
            </div>
            <p>
              A Debian-based operating system with lots of features, its own package manager, and nice UI!
            </p>
            <div className="footer-socials">
              <a className="social-btn" href="https://github.com/Vertex-Linux" aria-label="GitHub">
                <GitHubIcon />
              </a>
            </div>
          </div>

          {/* Link columns */}
          {cols.map((col) => (
            <div className="footer-col" key={col.heading}>
              <h4>{col.heading}</h4>
              <ul>
                {col.links.map(({ label, href }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target={href.startsWith('http') ? '_blank' : undefined}
                      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="footer-bottom">
          <p>© 2026 Vertex Linux Project. GPL-2.0 Licensed.</p>
          <div className="footer-bottom-links">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">License</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
