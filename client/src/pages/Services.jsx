import { Link } from 'react-router-dom'
import { SERVICES } from '../data'

const PROCESS = [
  {
    step: '01',
    title: 'Site Assessment',
    description:
      'Detailed site survey, soil testing and engineering evaluation before any work begins.',
  },
  {
    step: '02',
    title: 'Planning & Estimation',
    description:
      'Costing, scheduling and method statements prepared by our engineering team.',
  },
  {
    step: '03',
    title: 'Execution',
    description:
      'Machinery, material and labour mobilised from our in-house fleet and plants.',
  },
  {
    step: '04',
    title: 'Quality & Handover',
    description:
      'Stringent quality checks at every layer before final handover and documentation.',
  },
]

export default function Services() {
  return (
    <div>
      <section className="page-hero">
        <div className="container">
          <h1>Our Services</h1>
          <p>
            Complete road and external infrastructure construction - asphalt
            and concrete roads, paver works, retaining walls, RCC drains,
            hardscape and external civil works.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container text-center">
          <div className="section-label">Services</div>
          <h2 className="section-title">What We Deliver</h2>
          <p className="section-subtitle">
            Specialists in asphalt and concrete road work, paver works,
            hardscape works, retaining walls, RCC drains and all external civil
            infrastructure development.
          </p>
        </div>
        <div className="container">
          <div className="services-grid">
            {SERVICES.map((s) => (
              <div className="service-card" key={s.id}>
                <div className="service-image">
                  <img src={s.image} alt={s.title} loading="lazy" />
                </div>
                <div className="service-body">
                  <h3>{s.title}</h3>
                  <p>{s.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--white)' }}>
        <div className="container text-center">
          <div className="section-label">How We Work</div>
          <h2 className="section-title">Our Process</h2>
          <p className="section-subtitle">
            A disciplined, engineering-first approach to every project.
          </p>
        </div>
        <div className="container">
          <div className="services-grid">
            {PROCESS.map((p) => (
              <div className="card" style={{ padding: 28 }} key={p.step}>
                <div
                  style={{
                    fontSize: '2rem',
                    fontWeight: 800,
                    color: 'var(--primary)',
                    marginBottom: 12,
                  }}
                >
                  {p.step}
                </div>
                <h3 style={{ marginBottom: 8, color: 'var(--dark)' }}>
                  {p.title}
                </h3>
                <p style={{ color: 'var(--gray)' }}>{p.description}</p>
              </div>
            ))}
          </div>
          <div className="text-center" style={{ marginTop: 44 }}>
            <Link to="/contact" className="btn btn-primary">
              Start Your Project
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
