import { Link, useLocation, useNavigate } from 'react-router-dom'

const Logo = () => (
  <svg className="navbar-logo-icon" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="nav-grad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#8b5cf6" />
        <stop offset="100%" stopColor="#22d3ee" />
      </linearGradient>
    </defs>
    <polygon points="16,3 29,27 3,27" fill="url(#nav-grad)" />
    <polygon points="16,10 23,24 9,24" fill="rgba(0,0,0,0.35)" />
  </svg>
)

const sectionLinks = [
  { label: 'Features', hash: '#features' },
  { label: 'Packages', hash: '#terminal' },
  { label: 'Download', hash: '#download' },
]

export default function Navbar() {
  const location = useLocation()
  const navigate  = useNavigate()
  const isHome    = location.pathname === '/'

  const handleSection = (e: React.MouseEvent, hash: string) => {
    e.preventDefault()
    if (isHome) {
      document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' })
    } else {
      navigate('/' + hash)
    }
  }

  return (
    <nav className="navbar" aria-label="Main navigation">
      <Link to="/" className="navbar-logo" style={{ textDecoration: 'none' }}>
        <Logo />
        <span className="navbar-logo-text">Vertex</span>
      </Link>

      <ul className="navbar-links">
        {sectionLinks.map(({ label, hash }) => (
          <li key={hash}>
            <a
              href={isHome ? hash : '/' + hash}
              onClick={(e) => handleSection(e, hash)}
            >
              {label}
            </a>
          </li>
        ))}
        <li>
          <Link
            to="/roadmap"
            className={location.pathname === '/roadmap' ? 'nav-link-active' : ''}
          >
            Roadmap
          </Link>
        </li>
      </ul>

      <a
        href={isHome ? '#download' : '/#download'}
        className="navbar-cta"
        onClick={(e) => handleSection(e, '#download')}
      >
        Download
      </a>
    </nav>
  )
}
