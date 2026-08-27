const FEATURES = [
  'In-house heavy machinery and batching plants for full project control',
  'Specialists in road work and all external infrastructure development',
  'Retaining wall works, RCC drains, asphalt, concrete and paver roads',
  'Hardscape works - kerb work, paver works and outdoor finishing',
  'External civil works - block work, plastering and related external works',
  'On-time delivery with transparent project tracking',
  'Trusted by leading real estate and infrastructure developers',
]

export default function About() {
  return (
    <div>
      <section className="page-hero">
        <div className="container">
          <h1>About Us</h1>
          <p>
            A decade-and-a-half strong civil construction company built on
            quality, machinery and trust.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="about-grid">
            <div className="about-image">
              <img
                src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=900&q=80"
                alt="Construction site"
              />
            </div>
            <div>
              <div className="section-label">Who We Are</div>
              <h2 className="section-title">
                Building the Foundation of Modern Infrastructure
              </h2>
              <p style={{ color: 'var(--gray)', marginBottom: 16 }}>
                J.Giridhar Construction Company is a civil construction firm
                specialising in road work and all external infrastructure
                development - asphalt and concrete roads, paver works, retaining
                walls, RCC drains, hardscape works, kerb works and external
                civil works like block work and plastering.
              </p>
              <p style={{ color: 'var(--gray)' }}>
                What sets us apart is our fully-owned fleet of heavy equipment
                and asphalt / concrete batching plants. This means we control
                quality, schedule and cost from raw material to final surface.
              </p>
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

      <section className="section" style={{ background: 'var(--white)' }}>
        <div className="container text-center">
          <div className="section-label">Why Choose Us</div>
          <h2 className="section-title">Our Commitment</h2>
          <p className="section-subtitle">
            We bring equipment, expertise and execution under one roof.
          </p>
          <div className="services-grid">
            <div className="card" style={{ padding: 32 }}>
              <h3 style={{ marginBottom: 10, color: 'var(--dark)' }}>
                Owned Equipment
              </h3>
              <p style={{ color: 'var(--gray)' }}>
                JCBs, rollers, excavators, tippers and dumpers owned by us -
                not rented. Faster mobilisation, lower cost, better control.
              </p>
            </div>
            <div className="card" style={{ padding: 32 }}>
              <h3 style={{ marginBottom: 10, color: 'var(--dark)' }}>
                Batching Plants
              </h3>
              <p style={{ color: 'var(--gray)' }}>
                Our own asphalt batching and concrete mixing plants ensure
                consistent, specification-grade material on every job.
              </p>
            </div>
            <div className="card" style={{ padding: 32 }}>
              <h3 style={{ marginBottom: 10, color: 'var(--dark)' }}>
                Skilled Workforce
              </h3>
              <p style={{ color: 'var(--gray)' }}>
                Experienced site engineers, machine operators and a trained
                labour force working safely on every project.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
