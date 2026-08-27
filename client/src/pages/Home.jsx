import { Link } from 'react-router-dom'
import { SERVICES } from '../data'

const HERO_BG =
  'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&q=80'

const GALLERY = [
  { src: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=900&q=80', alt: 'Asphalt road construction' },
  { src: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=900&q=80', alt: 'Concrete road work' },
  { src: 'https://images.unsplash.com/photo-1525921429624-479b6a26d84d?w=900&q=80', alt: 'Excavator at work' },
  { src: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=900&q=80', alt: 'Infrastructure development' },
  { src: 'https://images.unsplash.com/photo-1516000462788-5db3f4384d8c?w=900&q=80', alt: 'Road machinery' },
  { src: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=900&q=80', alt: 'Batching plant' },
]

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="hero">
        <div
          className="hero-bg"
          style={{ backgroundImage: `url(${HERO_BG})` }}
        />
        <div className="hero-overlay" />
        <div className="container">
          <div className="hero-content">
            <span className="hero-tag">Civil Construction & Infrastructure</span>
            <h1>
              Building Roads that <span>Move India</span> Forward
            </h1>
            <p>
              J.Giridhar Construction Company delivers high-quality asphalt and
              concrete roads, paver works, retaining walls, RCC drains,
              hardscape and external civil works - powered by our own fleet of
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
      <section className="section">
        <div className="container text-center">
          <div className="section-label">What We Do</div>
          <h2 className="section-title">Our Core Services</h2>
          <p className="section-subtitle">
            From site preparation to final surfacing, we manage complete road
            and infrastructure projects with in-house resources.
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
          <div className="text-center" style={{ marginTop: 40 }}>
            <Link to="/services" className="btn btn-primary">
              Explore All Services
            </Link>
          </div>
        </div>
      </section>

      {/* Why us / gallery */}
      <section className="section" style={{ background: 'var(--white)' }}>
        <div className="container text-center">
          <div className="section-label">Our Work</div>
          <h2 className="section-title">Machinery, Labour & Finished Roads</h2>
          <p className="section-subtitle">
            A glimpse of our fleet in action and the quality surfaces we build.
          </p>
        </div>
        <div className="container">
          <div className="gallery-grid">
            {GALLERY.map((g, i) => (
              <div className="gallery-item" key={i}>
                <img src={g.src} alt={g.alt} loading="lazy" />
              </div>
            ))}
          </div>
          <div className="text-center" style={{ marginTop: 40 }}>
            <Link to="/machinery" className="btn btn-primary">
              See Our Machinery & Fleet
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
