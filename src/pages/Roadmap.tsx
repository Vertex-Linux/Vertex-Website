import { CheckCircle2, Circle, Clock, Sparkles } from 'lucide-react'

type Status = 'shipped' | 'in-progress' | 'planned' | 'future'

interface RoadmapItem {
  text: string
}

interface Milestone {
  version: string
  date: string
  title: string
  status: Status
  items: RoadmapItem[]
}

const milestones: Milestone[] = [
  {
    version: 'v2026.05',
    date: 'May 2026',
    title: 'Initial Release',
    status: 'shipped',
    items: [
      { text: 'KDE Plasma 6 desktop with custom Vertex theming' },
      { text: 'vpkg — unified package manager (AUR + Flatpak + Pacman)' },
      { text: 'Guided graphical installer' },
      { text: 'Arch-based rolling release foundation' },
      { text: 'Custom Vertex wallpapers and start menu icon' },
    ],
  },
  {
    version: 'v2026.06',
    date: 'June 2026',
    title: 'Hardware & Driver Improvements & Software Store',
    status: 'in-progress',
    items: [
      { text: 'Lenovo Legion Wi-Fi driver bundled out of the box' },
      { text: 'Improved touchpad and stylus support' },
      { text: 'Full GUI front-end for vpkg' },
      { text: 'Better power management defaults' },
    ],
  },
  {
    version: 'v2026.07',
    date: 'July 2026',
    title: 'Extra update stuff',
    status: 'future',
    items: [
      { text: 'Implement our own custom web browser baised on firefox' },
      { text: 'Make the OS run on a more wide range of hardware' },
    ],
  },
  {
    version: 'v2026.08',
    date: 'Augest 2026',
    title: 'ARM & Portability',
    status: 'future',
    items: [
      { text: 'ARM64 image — Raspberry Pi 5 support' },
      { text: 'ARM laptop optimizations (Apple Silicon/Snapdragon)' },
      { text: 'Live USB persistence mode' },
    ],
  },
]

const statusConfig: Record<Status, { label: string; icon: typeof CheckCircle2; className: string }> = {
  shipped:     { label: 'Released',     icon: CheckCircle2, className: 'status-shipped'     },
  'in-progress': { label: 'In Progress', icon: Clock,       className: 'status-in-progress' },
  planned:     { label: 'Planned',      icon: Circle,       className: 'status-planned'     },
  future:      { label: 'Future',       icon: Sparkles,     className: 'status-future'      },
}

export default function Roadmap() {
  return (
    <div className="roadmap-page">
      {/* Background blobs — reuse same style as hero */}
      <div className="hero-blobs" aria-hidden="true" style={{ position: 'fixed', zIndex: 0 }}>
        <div className="blob blob-purple" style={{ opacity: 0.25 }} />
        <div className="blob blob-cyan"   style={{ opacity: 0.2  }} />
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div className="roadmap-hero">
          <span className="section-label">What's coming</span>
          <h1 className="roadmap-title">
            Vertex{' '}
            <span className="gradient-text">Roadmap</span>
          </h1>
          <p className="roadmap-subtitle">
            A transparent look at what we've shipped, what we're building now,
            and where Vertex Linux is heading.
          </p>

          {/* Legend */}
          <div className="roadmap-legend">
            {(Object.entries(statusConfig) as [Status, typeof statusConfig[Status]][]).map(([, cfg]) => {
              const Icon = cfg.icon
              return (
                <div className={`legend-item ${cfg.className}`} key={cfg.label}>
                  <Icon size={14} />
                  {cfg.label}
                </div>
              )
            })}
          </div>
        </div>

        {/* Timeline */}
        <div className="roadmap-timeline">
          <div className="timeline-track" aria-hidden="true" />

          {milestones.map((m) => {
            const cfg = statusConfig[m.status]
            const Icon = cfg.icon
            return (
              <div className={`timeline-item ${m.status === 'shipped' ? 'item-shipped' : ''}`} key={m.version}>
                {/* Node on the track */}
                <div className={`timeline-node ${cfg.className}`}>
                  <Icon size={16} />
                </div>

                {/* Card */}
                <div className={`roadmap-card ${cfg.className}-card`}>
                  <div className="roadmap-card-header">
                    <div>
                      <div className="roadmap-version">{m.version}</div>
                      <h2 className="roadmap-milestone-title">{m.title}</h2>
                    </div>
                    <div className="roadmap-right">
                      <div className={`status-badge ${cfg.className}`}>
                        <Icon size={12} />
                        {cfg.label}
                      </div>
                      <div className="roadmap-date">{m.date}</div>
                    </div>
                  </div>

                  <ul className="roadmap-items">
                    {m.items.map((item, i) => (
                      <li key={i} className="roadmap-item">
                        <span className="roadmap-item-dot" />
                        {item.text}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )
          })}
        </div>

        <p className="roadmap-note">
          Dates are estimates and may shift. Follow{' '}
          <a href="https://github.com/Vertex-Linux/vertex-linux" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>{' '}
          for the most up-to-date progress.
        </p>
      </div>
    </div>
  )
}
