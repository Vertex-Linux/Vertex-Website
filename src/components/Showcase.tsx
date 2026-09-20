import { useEffect, useState } from 'react'
import { X } from 'lucide-react'

interface Shot {
  src: string
  name: string
}

const shots: Shot[] = [
  { src: '/i1.png', name: 'Desktop' },
  { src: '/i2.png', name: 'Settings' },
  { src: '/i3.png', name: 'File Explorer' },
  { src: '/i4.png', name: 'Terminal (fastfetch)' },
]

export default function Showcase() {
  const [active, setActive] = useState<Shot | null>(null)

  useEffect(() => {
    if (!active) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActive(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [active])

  return (
    <section className="section" id="showcase">
      <div className="container">
        <div className="showcase-header">
          <span className="section-label">Gnome Desktop</span>
          <h2 className="showcase-title">
            A desktop that{' '}
            <span className="gradient-text">gets out of your way</span>
          </h2>
          <p className="showcase-subtitle">
            A look at Calla, the desktop environment built into Vertex Linux.
          </p>
        </div>

        <div className="showcase-grid">
          {shots.map((shot) => (
            <div className="showcase-item" key={shot.src}>
              <div className="showcase-titlebar">
                <div className="dot dot-red" />
                <div className="dot dot-yellow" />
                <div className="dot dot-green" />
                <div className="terminal-name">{shot.name}</div>
              </div>
              <div
                className="showcase-image-wrap"
                onClick={() => setActive(shot)}
              >
                <img
                  className="showcase-image"
                  src={shot.src}
                  alt={`Gnome Desktop — ${shot.name}`}
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {active && (
        <div className="lightbox-overlay" onClick={() => setActive(null)}>
          <div
            className="lightbox-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="lightbox-close"
              aria-label="Close"
              onClick={() => setActive(null)}
            >
              <X size={18} />
            </button>
            <img
              className="lightbox-image"
              src={active.src}
              alt={`Gnome Desktop — ${active.name}`}
            />
            <p className="lightbox-caption">{active.name}</p>
          </div>
        </div>
      )}
    </section>
  )
}
