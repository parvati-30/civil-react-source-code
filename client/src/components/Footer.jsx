import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <h4>J.Giridhar Construction Company</h4>
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
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/machinery">Machinery & Fleet</Link></li>
              <li><Link to="/projects">Projects & Clients</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
            </ul>
          </div>
          <div>
            <h4>Contact</h4>
            <ul className="footer-links">
              <li>Bengaluru, Karnataka, India</li>
              <li>+91 90000 00000</li>
              <li>info@jgiridharconstruction.com</li>
              <li>Mon - Sat: 9:00 AM - 6:00 PM</li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          © {new Date().getFullYear()} J.Giridhar Construction Company. All
          rights reserved.
        </div>
      </div>
    </footer>
  )
}
