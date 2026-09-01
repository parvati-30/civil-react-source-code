import { Link } from 'react-router-dom'

const FEATURES = [
  'Strict on-site safety compliance - all labour & engineers equipped with helmets, safety jackets & shoes',
  'In-house heavy machinery and batching plants for full project control',
  'Specialists in road work constructions and all external infrastructure development',
  'Retaining wall works, RCC drains, asphalt, concrete and paver roads',
  'Hardscape works - kerb work, paver works and outdoor site finishing',
  'External civil works - block work, plastering and related external civil works',
  'On-time delivery with transparent project tracking and quality assurance',
  'Trusted by leading real estate and infrastructure developers',
]

export default function About() {
  return (
    <div className="about-page">
      <section className="page-hero">
        <div className="container">
          <h1>About Us</h1>
          <p>
            A decade-and-a-half strong civil construction company built on
            quality, machinery and trust.
          </p>
        </div>
      </section>

      <section className="section section-elevated">
        <div className="container">
          <div className="about-grid">
            <div className="about-image">
              <img
                src="/projects/site-01.jpg"
                alt="J. Giridhar Constructions on-site execution"
              />
            </div>
            <div>
              <div className="section-label">Who We Are</div>
              <h2 className="section-title">
                Building the Foundation of Modern Infrastructure
              </h2>
              <p style={{ color: 'var(--gray)', marginBottom: 16 }}>
                <strong>J.Giridhar Constructions</strong> is a premier civil
                engineering and construction firm headquartered in Basaveshwara
                Nagar, Bangalore. Founded and led by <strong>J. Giridhar (CEO)</strong>,
                we specialise in asphalt and concrete road works, paver works,
                retaining walls, RCC storm water drains, hardscape works, kerb
                works, and large-scale external civil infrastructure.
              </p>
              <p style={{ color: 'var(--gray)', marginBottom: 16 }}>
                What sets us apart is our fully-owned fleet of heavy equipment
                and asphalt / concrete batching plants. This means we control
                quality, schedule, and cost from raw material to final surface.
              </p>

              <div style={{ background: '#f8fafc', padding: '16px 20px', borderRadius: '8px', borderLeft: '4px solid var(--primary)', marginBottom: 20 }}>
                <div style={{ fontWeight: 700, color: 'var(--dark)' }}>Company Profile & Registration</div>
                <div style={{ fontSize: '0.88rem', color: '#475569', marginTop: 6, lineHeight: 1.6 }}>
                  <div><strong>CEO & Founder:</strong> J. Giridhar</div>
                  <div><strong>GSTIN:</strong> 29AHLPG8897M1Z6 (Karnataka)</div>
                  <div><strong>Head Office:</strong> No.131, 8th A Main, 4th Block, 4th Stage, Basaveshwara Nagar, Bangalore - 560079</div>
                  <div><strong>Contact:</strong> +91 98454 79248 | info@jgconstructions.in</div>
                </div>
              </div>

              <ul className="about-features">
                {FEATURES.map((f, i) => (
                  <li key={i}>
                    <span className="tick">&#10003;</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-slate">
        <div className="container text-center">
          <div className="section-header">
            <div className="section-label">Why Choose Us</div>
            <h2 className="section-title">Our Commitment</h2>
            <p className="section-subtitle">
              We bring equipment, expertise and execution under one roof.
            </p>
          </div>
          <div className="services-grid" style={{ marginBottom: 36 }}>
            <div className="card" style={{ padding: '28px 24px', textAlign: 'left' }}>
              <div style={{ fontSize: '2rem', marginBottom: 12 }}>🚜</div>
              <h3 style={{ marginBottom: 8, color: 'var(--dark)', fontSize: '1.2rem' }}>
                Owned Equipment (40+ Fleet)
              </h3>
              <p style={{ color: 'var(--gray)', fontSize: '0.92rem', lineHeight: 1.6 }}>
                JCBs, vibratory rollers, excavators, tippers and dumpers owned by us —
                not rented. Ensures immediate mobilization, lower cost, and complete operational control.
              </p>
            </div>
            <div className="card" style={{ padding: '28px 24px', textAlign: 'left' }}>
              <div style={{ fontSize: '2rem', marginBottom: 12 }}>🏭</div>
              <h3 style={{ marginBottom: 8, color: 'var(--dark)', fontSize: '1.2rem' }}>
                In-House Batching Plants
              </h3>
              <p style={{ color: 'var(--gray)', fontSize: '0.92rem', lineHeight: 1.6 }}>
                Our dedicated hot-mix asphalt batching and concrete mixing plants ensure
                consistent, specification-grade materials and uncompromised quality on every job.
              </p>
            </div>
            <div className="card" style={{ padding: '28px 24px', textAlign: 'left' }}>
              <div style={{ fontSize: '2rem', marginBottom: 12 }}>👷</div>
              <h3 style={{ marginBottom: 8, color: 'var(--dark)', fontSize: '1.2rem' }}>
                Safety-Certified Workforce
              </h3>
              <p style={{ color: 'var(--gray)', fontSize: '0.92rem', lineHeight: 1.6 }}>
                Experienced civil engineers, expert heavy machinery operators, and a fully safety-equipped
                execution crew (helmets, jackets, steel-toe boots) delivering with precision.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/projects" className="btn btn-primary">
              View Executed Projects
            </Link>
            <Link to="/contact" className="btn btn-outline" style={{ color: 'var(--dark)', borderColor: 'var(--dark)' }}>
              Contact Our Engineers
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

