interface Line {
  type: 'cmd' | 'output' | 'success' | 'info' | 'blank'
  prompt?: string
  text: string
}

const lines: Line[] = [
  { type: 'cmd',     prompt: 'vertex@arch ~',  text: 'vpkg pm install prismlauncher' },
  { type: 'info',    text: '→  Vertex Pkg 2026.1' },
  { type: 'output',  text: '   Install logs will appear here when used on an actual system' },
  { type: 'success', text: '✓  Prismlauncher was installed sucsessfuly!' },
  { type: 'cmd',     prompt: 'vertex@arch ~',  text: 'vpkg fp install com.obsproject.Studio' },
  { type: 'info',    text: '→  Vertex Pkg 2026.1' },
  { type: 'output',  text: '   Install logs will appear here when used on an actual system' },
  { type: 'success', text: '✓  com.obsproject.Studio was installed sucsessfuly!' },
  { type: 'cmd',     prompt: 'vertex@arch ~',  text: 'echo "Works with AUR, Flatpak, and Pacman!"' },
  { type: 'output',  text: '   Works with AUR, Flatpak, and Pacman!' },
]

export default function Terminal() {
  return (
    <section className="terminal-section" id="terminal">
      <div className="container">
        <div className="terminal-header">
          <span className="section-label">Package Managment</span>
          <h2 className="terminal-title">
            Install packages in{' '}
            <span className="gradient-text">secconds</span>
          </h2>
          <p className="terminal-sub">
            Our custom package manager (vpkg) built on the AUR and pacman and flatpak allows you to manage all 3 with 1 command.
          </p>
        </div>

        <div className="terminal-window">
          <div className="terminal-titlebar">
            <div className="dot dot-red"    />
            <div className="dot dot-yellow" />
            <div className="dot dot-green"  />
            <div className="terminal-name">vertex@arch — bash</div>
          </div>

          <div className="terminal-body">
            {lines.map((line, i) => {
              if (line.type === 'blank') return <br key={i} />

              if (line.type === 'cmd') {
                return (
                  <div className="term-line" key={i}>
                    <span className="term-prompt">{line.prompt} $&nbsp;</span>
                    <span className="term-cmd">{line.text}</span>
                  </div>
                )
              }

              const cls =
                line.type === 'success' ? 'term-success' :
                line.type === 'info'    ? 'term-info'    :
                                          'term-output'

              return (
                <div className={cls} key={i}>{line.text}</div>
              )
            })}
            <div className="term-line" style={{ marginTop: 4 }}>
              <span className="term-prompt">vertex@arch ~&nbsp;$&nbsp;</span>
              <span className="term-cursor" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
