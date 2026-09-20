import { Cpu, Lock, Code2 } from 'lucide-react'

const pillars = [
  {
    icon: Cpu,
    name: 'Performance Without Compromise',
    desc: 'Every default is chosen for speed. No background daemons you never asked for.',
  },
  {
    icon: Lock,
    name: 'Security by Default',
    desc: 'Hardened kernel params, AppArmor profiles, and automatic security updates.',
  },
  {
    icon: Code2,
    name: 'Hackable to the Core',
    desc: 'Debian at its heart means total control. Change anything — that\'s the point.',
  },
]

const Logo = () => (
  <svg width="72" height="72" viewBox="0 0 32 32" fill="none">
    <defs>
      <linearGradient id="about-grad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#8b5cf6" />
        <stop offset="100%" stopColor="#22d3ee" />
      </linearGradient>
    </defs>
    <polygon points="16,3 29,27 3,27" fill="url(#about-grad)" />
    <polygon points="16,10 23,24 9,24" fill="rgba(7,7,15,0.6)" />
  </svg>
)

export default function About() {
  return (
    <section className="section about" id="about">
      <div className="container">
        <div className="about-grid">
          {/* Text */}
          <div>
            <span className="section-label">Philosophy</span>
            <h2 className="about-title">
              Built different,{' '}
              <span className="gradient-text">by design</span>
            </h2>
            <p className="about-body">
              Vertex Linux started as a frustration. Every "beginner-friendly" Linux
              distro either buried the power users needed or buried beginners in
              complexity. We wanted neither.
            </p>
            <p className="about-body">
              So we built Vertex: a distro that respects your intelligence, ships with
              sensible defaults, and gets completely out of your way once you're up and
              running. Built on Debian's rock-solid stability with GNOME's polish, full
              APT and Flatpak access, none of the headaches.
            </p>

            <div className="about-pillars">
              {pillars.map((p) => {
                const Icon = p.icon
                return (
                  <div className="pillar" key={p.name}>
                    <div className="pillar-icon">
                      <Icon size={18} />
                    </div>
                    <div>
                      <div className="pillar-name">{p.name}</div>
                      <div className="pillar-desc">{p.desc}</div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Visual */}
          <div className="about-visual" aria-hidden="true">
            <div className="about-card-stack">
              <div className="about-card about-card-main">
                <div className="card-tag">
                  <span>●</span> Debian-based · Stable
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <Logo />
                  <div>
                    <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: '-0.03em' }}>
                      Vertex Linux
                    </div>
                    <div style={{ fontSize: 14, color: 'var(--text-3)', marginTop: 4 }}>
                      v2026.01 · x86_64
                    </div>
                  </div>
                </div>
              </div>

              <div className="about-card about-card-accent">
                <div style={{ fontSize: 26, fontWeight: 900 }} className="gradient-text">
                  APT
                </div>
                <div style={{ fontSize: 12, color: 'var(--text-3)', textAlign: 'center' }}>
                  Full Debian package<br />archive access
                </div>
              </div>

              {/* Small floating card top-right */}
              <div
                className="about-card"
                style={{
                  top: 0,
                  right: -20,
                  width: 160,
                  height: 80,
                  background: 'rgba(34, 211, 238, 0.08)',
                  borderColor: 'rgba(34,211,238,0.2)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 4,
                  padding: 16,
                }}
              >
                <div style={{ fontSize: 22, fontWeight: 800 }} className="gradient-text">
                  0ms
                </div>
                <div style={{ fontSize: 12, color: 'var(--text-3)' }}>Cold boot overhead</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
