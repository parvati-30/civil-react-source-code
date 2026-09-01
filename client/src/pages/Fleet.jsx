import { useState } from 'react'
import { MACHINERY } from '../data'

export default function Fleet() {
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
          <h1>Machinery & Heavy Equipment Fleet</h1>
          <p>
            100% in-house owned construction machinery, tar pavers, concrete transit mixers,
            heavy tippers, and high-capacity batching plants across Karnataka.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="machinery-banner">
            <h3>100% Owned Fleet - Zero Rental Dependence</h3>
            <p>
              Unlike conventional contractors, J.Giridhar Constructions owns and operates its complete fleet of
              JCBs, tar paver finishers, HAMM road rollers, concrete transit mixers, and BharatBenz heavy tippers.
              This guarantees immediate mobilization, strict quality compliance, and uncompromised project timelines.
            </p>
          </div>

          {MACHINERY.map((cat) => (
            <div className="machinery-category" key={cat.category}>
              <h3>
                <span>{cat.category}</span>
              </h3>
              <div className="machinery-grid">
                {cat.items.map((m) => (
                  <div className="machine-card" key={m.name}>
                    <div
                      className="machine-image"
                      onClick={() => openLightbox(m.image, `${m.name} (${m.count} Owned Units)`)}
                      title="Click to view full photo"
                    >
                      <img src={m.image} alt={m.name} loading="lazy" />
                      <div className="photo-zoom-hint">🔍 Expand</div>
                    </div>
                    <div className="machine-body">
                      <div className="machine-header">
                        <h4>{m.name}</h4>
                        <span className="machine-count">{m.count} units</span>
                      </div>
                      {m.specs && <p className="machine-specs">{m.specs}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div className="machinery-banner" style={{ marginTop: 32 }}>
            <h3>In-House Technical Support & Mobile Service Fleet</h3>
            <p>
              Water tankers (12,000L), bitumen mechanical sprayers, pneumatic compaction equipment, road sweepers,
              and dedicated mobile workshop vans with genuine spare parts keep our active sites running at 99%+ uptime.
            </p>
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
