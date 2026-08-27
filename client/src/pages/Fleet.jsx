import { MACHINERY } from '../data'

const CATEGORY_IMAGES = {
  'Heavy Machinery': 'https://images.unsplash.com/photo-1525921429624-479b6a26d84d?w=900&q=80',
  Transport: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=900&q=80',
  Plants: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=900&q=80',
}

export default function Fleet() {
  return (
    <div>
      <section className="page-hero">
        <div className="container">
          <h1>Machinery & Fleet</h1>
          <p>
            We own our equipment and plants - the backbone of reliable, fast
            project delivery.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="machinery-banner">
            <h3>100% Owned Fleet - No Rental Dependence</h3>
            <p>
              Unlike most contractors, J.Giridhar Construction owns its heavy
              machinery and asphalt / concrete batching plants. This gives us
              complete control over mobilisation, material quality and project
              timelines.
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
                    <div className="machine-image">
                      <img src={m.image} alt={m.name} loading="lazy" />
                    </div>
                    <div className="machine-body">
                      <h4>{m.name}</h4>
                      <span className="machine-count">{m.count} units</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div className="machinery-banner" style={{ marginTop: 32 }}>
            <h3>In-House Support Units</h3>
            <p>
              Water tankers, road sweepers, pneumatic compaction equipment,
              tar boilers and a full workshop with spare parts inventory keep
              our fleet running at peak uptime.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
