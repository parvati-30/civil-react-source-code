import { useState } from 'react'
import { Link } from 'react-router-dom'
import { SERVICES } from '../data'
import ServiceCard from '../components/ServiceCard'

const PROCESS = [
  {
    step: '01',
    title: 'Site Assessment & Survey',
    description:
      'Detailed site survey, soil testing, subgrade evaluation and engineering calculations before commencement.',
  },
  {
    step: '02',
    title: 'Planning & Material Estimation',
    description:
      'Mix designs (DBM, BC, PQC, paver grades), method statements, and schedules prepared by experienced civil engineers.',
  },
  {
    step: '03',
    title: 'Precision Execution',
    description:
      'Machinery, hot-mix/concrete materials, and fully safety-equipped crew mobilised from our own fleet and batching plants.',
  },
  {
    step: '04',
    title: 'Quality Testing & Handover',
    description:
      'Layer-by-layer compaction tests, core cutting, camber checks and level surveys before final project handover.',
  },
]

export default function Services() {
  const [activePhoto, setActivePhoto] = useState(null)

  const openLightbox = (src, alt) => {
    setActivePhoto({ src, alt })
  }

  const closeLightbox = () => {
    setActivePhoto(null)
  }

  return (
    <div>
      <section className="page-hero">
        <div className="container">
          <h1>Our Core Services</h1>
          <p>
            Specialists in road work constructions, external civil works, and hardscape developments
            with in-house heavy machinery fleet, batching plants, and safety-certified execution crews.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container text-center">
          <div className="section-label">Civil Execution Services</div>
          <h2 className="section-title">What We Deliver</h2>
          <p className="section-subtitle">
            Browse multiple live site captures per service category using the slider arrows and thumbnails.
          </p>
        </div>
        <div className="container">
          <div className="services-grid">
            {SERVICES.map((s) => (
              <ServiceCard key={s.id} service={s} onOpenLightbox={openLightbox} />
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

      {/* Lightbox Modal */}
      {activePhoto && (
        <div className="lightbox-backdrop" onClick={closeLightbox}>
          <div className="lightbox-modal" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-close" onClick={closeLightbox}>✕</button>
            <img src={activePhoto.src} alt={activePhoto.alt} className="lightbox-image" />
            <div className="lightbox-caption">{activePhoto.alt}</div>
          </div>
        </div>
      )}
    </div>
  )
}
