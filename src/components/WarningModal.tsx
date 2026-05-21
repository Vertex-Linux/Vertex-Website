import { useEffect, useState } from 'react'
import { Download, X, AlertTriangle } from 'lucide-react'

interface Props {
  isOpen:      boolean
  onClose:     () => void
  downloadUrl: string
  fileName:    string
}

const DELAY = 8

export default function WarningModal({ isOpen, onClose, downloadUrl, fileName }: Props) {
  const [secondsLeft, setSecondsLeft] = useState(DELAY)
  const [ready, setReady] = useState(false)

  // Reset and start countdown each time the modal opens
  useEffect(() => {
    if (!isOpen) return
    setSecondsLeft(DELAY)
    setReady(false)

    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval)
          setReady(true)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [isOpen])

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Close button */}
        <button className="modal-close" onClick={onClose} aria-label="Close">
          <X size={18} />
        </button>

        {/* Icon */}
        <div className="modal-icon-wrap" aria-hidden="true">
          <AlertTriangle size={36} />
        </div>

        {/* Heading */}
        <h2 className="modal-title">Before you download</h2>

        {/* Warning content */}
        <div className="modal-body">
          <p>
            <strong>Vertex Linux is currently in heavy active development.</strong> You may
            encounter bugs, missing features, hardware incompatibilities, or unexpected
            crashes.
          </p>
          <ul className="modal-warning-list">
            <li>Do <strong>not</strong> use as your primary OS yet</li>
            <li>Back up your data before installing</li>
            <li>Report issues on our GitHub so we can fix them</li>
            <li>Features shown on this site may not all be available yet</li>
          </ul>
          <p>By downloading you acknowledge this is pre-release software and you use it entirely <strong>at your own risk</strong>.</p>
        </div>

        {/* Download button with fill */}
        <a
          href={ready ? downloadUrl : undefined}
          download={ready ? fileName : undefined}
          className={`modal-download-btn ${ready ? 'modal-download-ready' : 'modal-download-filling'}`}
          onClick={ready ? onClose : (e) => e.preventDefault()}
          aria-disabled={!ready}
        >
          {/* Animated fill layer */}
          {!ready && (
            <span className="modal-btn-fill" style={{ animationDuration: `${DELAY}s` }} />
          )}

          <span className="modal-btn-content">
            {ready ? (
              <><Download size={18} /> Download Now</>
            ) : (
              <>Please read the above — available in {secondsLeft}s</>
            )}
          </span>
        </a>
      </div>
    </div>
  )
}
