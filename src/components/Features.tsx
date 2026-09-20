import {
  RefreshCw,
  Package,
  Shield,
  Monitor,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

interface Feature {
  icon: LucideIcon
  iconClass: string
  name: string
  desc: string
}

const features: Feature[] = [
  {
    icon: RefreshCw,
    iconClass: 'feature-icon-purple',
    name: 'Rock-Solid Stable Base',
    desc:
      'Built on Debian stable, kept fresh with our Update Manager, so you get dependable releases without sacrificing up-to-date software.',
  },
  {
    icon: Package,
    iconClass: 'feature-icon-cyan',
    name: 'Custom Package Manager',
    desc:
      'Manage APT and Flatpak packages with 1 single command, without having to juggle both separately.',
  },
  {
    icon: Shield,
    iconClass: 'feature-icon-green',
    name: 'Privacy First',
    desc:
      'Zero telemetry. Zero tracking. Zero data collection. Vertex respects your privacy unconditionally, by design.',
  },
  {
    icon: Monitor,
    iconClass: 'feature-icon-blue',
    name: 'Gnome Desktop',
    desc:
      'Ships with the nice and clean Gnome Desktop with Blur My Shell pre-installed!',
  },
  {
    icon: Monitor,
    iconClass: 'feature-icon-blue',
    name: 'Better Driver Support',
    desc:
      'Vertex will include extra driver support for Lenovo Legion Wifi drivers and other things like easy graphics driver managment too.',
  },
  {
    icon: Monitor,
    iconClass: 'feature-icon-blue',
    name: 'Ultra fast custom apps',
    desc:
      'Vertex Linux includes a super fast set of apps that are written in ethier LUA, Rust, or C++, making all of the apps included in Vertex Linux extremely fast.',
  }
]

export default function Features() {
  return (
    <section className="section" id="features">
      <div className="container">
        <div className="features-header">
          <span className="section-label">Why Vertex</span>
          <h2 className="features-title">
            Everything you need,{' '}
            <span className="gradient-text">nothing you don't</span>
          </h2>
          <p className="features-subtitle">
            Built for Gaming, Developing, General use, and more!
          </p>
        </div>

        <div className="features-grid">
          {features.map((f) => {
            const Icon = f.icon
            return (
              <div className="feature-card" key={f.name}>
                <div className={`feature-icon ${f.iconClass}`}>
                  <Icon size={22} />
                </div>
                <h3 className="feature-name">{f.name}</h3>
                <p className="feature-desc">{f.desc}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
