const stats = [
  { value: 'a lot',  label: 'Of Packages Available',   gradient: 'gradient-text'      },
  { value: 'it works',  label: 'Uptime & Stability',   gradient: 'gradient-text-warm' },
  { value: '<10min',  label: 'Install Time',          gradient: 'gradient-text'      },
  { value: '100%',   label: 'Open Source',           gradient: 'gradient-text-warm' },
]

export default function Stats() {
  return (
    <section className="stats">
      <div className="container">
        <div className="stats-grid">
          {stats.map((s, i) => (
            <div className="stat-item" key={i}>
              <div className={`stat-value ${s.gradient}`}>{s.value}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
