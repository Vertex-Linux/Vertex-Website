import { Download as DownloadIcon, HardDrive, Cpu, MemoryStick, Clock, Zap } from 'lucide-react'
import { useLatestRelease } from '../hooks/useLatestRelease'

const meta = [
  { icon: HardDrive,    text: '4 GB minimum disk' },
  { icon: Cpu,         text: 'x86_64 · 2GHz+' },
  { icon: MemoryStick, text: '2 GB RAM minimum' },
  { icon: Zap, text: 'Power Optional' },
]

const options = [
  { label: 'Torrent',    icon: '⚡' },
  { label: 'Checksum',   icon: '🔒' },
  { label: 'GPG Verify', icon: '✓'  },
]

export default function Download() {
  const release = useLatestRelease()

  const isLoading     = release.status === 'loading'
  const isUnavailable = release.status === 'unavailable'
  const isReady       = release.status === 'ready'

  const versionLabel = isReady
    ? `Vertex ${release.release.version}`
    : isLoading
      ? 'Loading…'
      : 'Coming Soon'

  return (
    <section className="section download" id="download">
      <div className="download-glow" aria-hidden="true" />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="download-inner">
          <span className="section-label" style={{ justifyContent: 'center' }}>
            Get Started
          </span>

          <h2 className="download-title">
            Ready to make the{' '}
            <span className="gradient-text">switch?</span>
          </h2>

          <p className="download-desc">
            {isReady
              ? `Vertex Linux ${release.release.version} is available now. Free, open source, and always will be. Burn to USB, boot, and explore.`
              : 'Vertex Linux is coming soon. Free, open source, and always will be. Burn to USB, boot, and explore.'}
          </p>

          <div className="download-btn-wrap">
            {isReady ? (
              <a
                href={release.release.downloadUrl}
                className="btn btn-primary btn-large"
                download={release.release.fileName}
              >
                <DownloadIcon size={22} />
                Download {versionLabel}
              </a>
            ) : (
              <button
                className="btn btn-primary btn-large"
                disabled={isLoading}
                style={{ opacity: isLoading ? 0.6 : 0.85, cursor: isUnavailable ? 'not-allowed' : 'default' }}
              >
                {isLoading
                  ? <><span className="download-spinner" /> Checking for releases…</>
                  : <><Clock size={22} /> Coming Soon</>
                }
              </button>
            )}
          </div>

          <div className="download-meta">
            {meta.map(({ icon: Icon, text }) => (
              <div className="meta-item" key={text}>
                <Icon size={15} />
                {text}
              </div>
            ))}
          </div>

          {isReady && (
            <div className="download-options">
              {options.map(({ label, icon }) => (
                <button key={label} className="download-option">
                  <span>{icon}</span>
                  {label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
