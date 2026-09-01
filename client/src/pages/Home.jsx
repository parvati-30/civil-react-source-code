import { useState } from 'react'
import { Link } from 'react-router-dom'
import { SERVICES } from '../data'
import ServiceCard from '../components/ServiceCard'

const GALLERY = [
  { src: '/hero-1.jpg', alt: 'Asphalt Paving Machine & S.V.P Tipper Truck in Action' },
  { src: '/hero-2.jpg', alt: 'Road Roller Compaction & Safety-Equipped Civil Crew' },
  { src: '/projects/site-01.jpg', alt: 'Assetz The Secret Lake - Infrastructure & Road Work' },
  { src: '/projects/site-05.jpg', alt: 'Provident Deansgate - Asphalt Paving & Road Work' },
  { src: '/projects/site-12.jpg', alt: 'Nambiar District 25 - Internal Road Construction' },
  { src: '/projects/site-20.jpg', alt: 'Sattva Shirasa - RCC Drains & Retaining Wall' },
]

export default function Home() {
  const [activePhoto, setActivePhoto] = useState(null)

  const openLightbox = (src, alt) => {
    setActivePhoto({ src, alt })
  }

  const closeLightbox = () => {
    setActivePhoto(null)
  }

  return (
    <div className="home-page">
      {/* Hero */}
      <section className="hero">
        <div
          className="hero-bg"
          style={{ backgroundImage: "url('/hero-merged.jpg')" }}
        />
        <div className="hero-overlay" />

        <div className="container">
          <div className="hero-content">
            <h1>
              Building Roads that <span>Move India</span> Forward
            </h1>
            <p>
              J.Giridhar Constructions delivers high-quality asphalt and
              concrete roads, paver works, retaining walls, RCC drains,
              hardscape works and external civil works - powered by our own fleet of
              heavy machinery and batching plants.
            </p>
            <div className="hero-buttons">
              <Link to="/projects" className="btn btn-primary">
                View Our Projects
              </Link>
              <Link to="/contact" className="btn btn-outline">
                Get a Quote
              </Link>
            </div>
            <div className="hero-stats">
              <div className="stat">
                <div className="stat-num">15+</div>
                <div className="stat-label">Years Experience</div>
              </div>
              <div className="stat">
                <div className="stat-num">70+</div>
                <div className="stat-label">Projects Delivered</div>
              </div>
              <div className="stat">
                <div className="stat-num">40+</div>
                <div className="stat-label">Heavy Machines</div>
              </div>
              <div className="stat">
                <div className="stat-num">5</div>
                <div className="stat-label">Batching Plants</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services preview */}
      <section className="section section-elevated">
        <div className="container">
          <div className="section-header text-center">
            <div className="section-label">What We Do</div>
            <h2 className="section-title">Our Core Services</h2>
            <p className="section-subtitle">
              From site preparation to final surfacing, we manage complete road
              and infrastructure projects with in-house resources. Browse multiple live execution photos per service.
            </p>
          </div>
          <div className="services-grid">
            {SERVICES.map((s) => (
              <ServiceCard key={s.id} service={s} onOpenLightbox={openLightbox} />
            ))}
          </div>
          <div className="text-center" style={{ marginTop: 48 }}>
            <Link to="/services" className="btn btn-primary">
              Explore All Services
            </Link>
          </div>
        </div>
      </section>

      {/* Why us / gallery */}
      <section className="section section-work-preview">
        <div className="container">
          <div className="section-header text-center">
            <div className="section-label">Our Work</div>
            <h2 className="section-title">Machinery, Labour & Finished Roads</h2>
            <p className="section-subtitle">
              A glimpse of our fleet in action and the quality surfaces we build.
            </p>
          </div>
          <div className="gallery-grid">
            {GALLERY.map((g, i) => (
              <div className="gallery-item" key={i} onClick={() => openLightbox(g.src, g.alt)}>
                <img src={g.src} alt={g.alt} loading="lazy" />
              </div>
            ))}
          </div>
          <div className="text-center" style={{ marginTop: 48 }}>
            <Link to="/machinery" className="btn btn-primary">
              See Our Machinery & Fleet
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
