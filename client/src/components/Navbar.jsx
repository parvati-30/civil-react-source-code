import { useState } from 'react'
import { NavLink } from 'react-router-dom'

const LINKS = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/machinery', label: 'Machinery & Fleet' },
  { to: '/projects', label: 'Projects & Clients' },
  { to: '/about', label: 'About Us' },
  { to: '/contact', label: 'Contact Us' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <NavLink to="/" className="brand" onClick={() => setOpen(false)}>
          <img src="/logo.jpg" alt="J. Giridhar Constructions" className="brand-logo-img" />
          <div>
            <div className="brand-name">J.Giridhar Constructions</div>
            <div className="brand-sub">Road Work Constructions • External Civil Works • Hardscape Developments</div>
          </div>
        </NavLink>
        <nav className={`nav-links ${open ? 'open' : ''}`}>
          {LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
        <button
          className="nav-toggle"
          onClick={() => setOpen(!open)}
          aria-label="Toggle navigation"
        >
          {open ? '\u2715' : '\u2630'}
        </button>
      </div>
    </header>
  )
}
