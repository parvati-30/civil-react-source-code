import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
              <img
                src="/logo.jpg"
                alt="J. Giridhar Constructions Logo"
                style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }}
              />
              <h4 style={{ margin: 0 }}>J.Giridhar Constructions</h4>
            </div>
            <p style={{ marginBottom: 12 }}>
              A trusted civil construction firm specialising in asphalt and
              concrete roads, paver works, retaining walls, RCC drains,
              hardscape and external civil works.
            </p>
            <p>
              Owned machinery fleet and asphalt / concrete batching plants
              ensure quality, speed and reliability on every project.
            </p>
          </div>
          <div>
            <h4>Quick Links</h4>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/machinery">Machinery & Fleet</Link></li>
              <li><Link to="/projects">Projects & Clients</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
            </ul>
          </div>
          <div>
            <h4>Contact Info</h4>
            <ul className="footer-links">
              <li><strong>CEO:</strong> J. Giridhar</li>
              <li>
                No.131, 8th A Main, 4th Block, 4th Stage,<br />
                Basaveshwara Nagar, Bangalore - 560079
              </li>
              <li>
                <a href="tel:+919845479248" style={{ color: 'inherit', textDecoration: 'none' }}>
                  📞 +91 98454 79248
                </a>
              </li>
              <li>
                <a href="mailto:info@jgconstructions.in" style={{ color: 'inherit', textDecoration: 'none' }}>
                  ✉️ info@jgconstructions.in
                </a>
              </li>
              <li style={{ fontSize: '0.85rem', color: '#94a3b8' }}>
                GSTIN: 29AHLPG8897M1Z6
              </li>
              <li>Mon - Sat: 9:00 AM - 6:00 PM</li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          © {new Date().getFullYear()} J.Giridhar Constructions. All rights reserved. | GSTIN: 29AHLPG8897M1Z6
        </div>
      </div>
    </footer>
  )
}
