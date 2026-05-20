import { Download, Github } from 'lucide-react'

export default function Hero() {
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section className="hero" id="home">
      {/* Animated blobs */}
      <div className="hero-blobs" aria-hidden="true">
        <div className="blob blob-purple" />
        <div className="blob blob-cyan"   />
        <div className="blob blob-blue"   />
        <div className="blob blob-pink"   />
      </div>

      {/* Grain texture overlay */}
      <div className="hero-noise" aria-hidden="true" />

      <div className="container">
        <div className="hero-content">

          <h1 className="hero-title">
            <span className="gradient-text">Vertex</span>
            <br />
            <span style={{ color: '#f1f5f9' }}>Linux</span>
          </h1>

          <p className="hero-desc">
            An arch linux baised operating system with lots of features, its own package manager, and nice UI!
          </p>

          <div className="hero-actions">
            <button
              className="btn btn-primary btn-large"
              onClick={() => scrollTo('download')}
            >
              <Download size={20} />
              Download Now
            </button>
            <button
              className="btn btn-secondary btn-large"
              onClick={() => scrollTo('features')}
            >
              <Github size={20} />
              View on GitHub
            </button>
          </div>
        </div>
      </div>

      <div className="hero-scroll-hint" aria-hidden="true">
        <div className="scroll-mouse">
          <div className="scroll-dot" />
        </div>
        <span>Scroll</span>
      </div>
    </section>
  )
}
