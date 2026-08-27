import { useState, useEffect } from 'react'
import { api } from '../api'
import StatusBadge from '../components/StatusBadge'

const TYPES = ['All', 'Road Work', 'Infrastructure', 'Concrete', 'Asphalt', 'Paver', 'Hardscape', 'External Civil']

const CLIENT_LOGOS = [
  'Puravankara',
  'Sattva',
  'Lodha',
  'DENSGATE',
  'Phoenix',
]

export default function Projects() {
  const [projects, setProjects] = useState([])
  const [clients, setClients] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [type, setType] = useState('All')
  const [status, setStatus] = useState('All')

  useEffect(() => {
    Promise.all([api.getProjects(), api.getClients()])
      .then(([p, c]) => {
        setProjects(p)
        setClients(c)
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  const filtered = projects.filter(
    (p) =>
      (type === 'All' || p.projectType === type) &&
      (status === 'All' || p.status === status),
  )

  const initials = (name) =>
    name
      .split(' ')
      .map((w) => w[0])
      .join('')
      .slice(0, 2)
      .toUpperCase()

  return (
    <div>
      <section className="page-hero">
        <div className="container">
          <h1>Projects & Clients</h1>
          <p>
            A live showcase of our completed and ongoing projects, powered
            directly by our project database.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container text-center">
          <div className="section-label">Our Clients</div>
          <h2 className="section-title">Trusted By Leading Developers</h2>
          <p className="section-subtitle">
            We partner with India's most reputed real estate and infrastructure
            brands.
          </p>
        </div>
        <div className="container">
          <div className="clients-grid">
            {clients
              .filter((c) => CLIENT_LOGOS.includes(c.name))
              .map((c) => (
                <div className="client-card" key={c.id}>
                  <div className="client-logo">{initials(c.name)}</div>
                  <h4>{c.name}</h4>
                  <p>{c.sector}</p>
                  <p>
                    {c.projectCount} project{c.projectCount !== 1 ? 's' : ''}
                  </p>
                </div>
              ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--white)' }}>
        <div className="container text-center">
          <div className="section-label">Project Portfolio</div>
          <h2 className="section-title">Our Projects</h2>
          <p className="section-subtitle">
            Filter by type or status. Data is fetched live from the database.
          </p>
        </div>

        <div className="container">
          <div className="filters">
            {TYPES.map((t) => (
              <button
                key={t}
                className={`filter-btn ${type === t ? 'active' : ''}`}
                onClick={() => setType(t)}
              >
                {t}
              </button>
            ))}
            <button
              className={`filter-btn ${status === 'Completed' ? 'active' : ''}`}
              onClick={() => setStatus(status === 'Completed' ? 'All' : 'Completed')}
            >
              Completed
            </button>
            <button
              className={`filter-btn ${
                status === 'Under Progress' ? 'active' : ''
              }`}
              onClick={() =>
                setStatus(status === 'Under Progress' ? 'All' : 'Under Progress')
              }
            >
              Under Progress
            </button>
          </div>

          {loading && <div className="loader">Loading projects...</div>}
          {error && <div className="alert alert-error">{error}</div>}

          {!loading && !error && (
            <div className="projects-grid">
              {filtered.map((p) => (
                <div className="card project-card" key={p.id}>
                  <div className="project-image">
                    <img src={p.imageUrl} alt={p.title} loading="lazy" />
                    <StatusBadge status={p.status} />
                  </div>
                  <div className="project-body">
                    <div className="project-client">{p.client.name}</div>
                    <h3>{p.title}</h3>
                    <p>{p.description}</p>
                    <span className="type-tag">{p.projectType}</span>
                    <div className="project-meta">
                      <span>{p.location}</span>
                      <span>
                        {p.startDate
                          ? `Started ${p.startDate.split('-')[0]}`
                          : ''}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
              {!filtered.length && (
                <div className="empty" style={{ gridColumn: '1 / -1' }}>
                  No projects match the selected filters.
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
