import { useState } from 'react'

export default function Contact() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    service: 'Asphalt Road Construction',
    message: '',
  })
  const [sent, setSent] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSent(true)
    setForm({ name: '', phone: '', email: '', service: 'Asphalt Road Construction', message: '' })
    setTimeout(() => setSent(false), 5000)
  }

  return (
    <div>
      <section className="page-hero">
        <div className="container">
          <h1>Contact Us</h1>
          <p>
            Get in touch for project enquiries, quotations and business
            partnerships.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="contact-grid">
            <div>
              <div className="section-label">Get In Touch</div>
              <h2 className="section-title">Contact Information</h2>
              <p style={{ color: 'var(--gray)', marginBottom: 28 }}>
                Our team is ready to discuss your road and infrastructure
                requirements.
              </p>

              <div className="contact-info-item">
                <div className="contact-icon">&#9906;</div>
                <div>
                  <h4>Head Office</h4>
                  <p>
                    J.Giridhar Construction Company,
                    <br />
                    Bengaluru, Karnataka, India
                  </p>
                </div>
              </div>
              <div className="contact-info-item">
                <div className="contact-icon">&#9742;</div>
                <div>
                  <h4>Phone</h4>
                  <p>+91 90000 00000 (Office) / +91 90000 00001 (Site)</p>
                </div>
              </div>
              <div className="contact-info-item">
                <div className="contact-icon">&#9993;</div>
                <div>
                  <h4>Email</h4>
                  <p>info@jgiridharconstruction.com</p>
                </div>
              </div>
              <div className="contact-info-item">
                <div className="contact-icon">&#8987;</div>
                <div>
                  <h4>Working Hours</h4>
                  <p>Monday - Saturday, 9:00 AM - 6:00 PM</p>
                </div>
              </div>
            </div>

            <div className="card" style={{ padding: 36 }}>
              <h3 style={{ marginBottom: 24, color: 'var(--dark)' }}>
                Send Us An Enquiry
              </h3>
              {sent && (
                <div className="alert alert-success">
                  Thank you! Your enquiry has been received. We will contact you
                  shortly.
                </div>
              )}
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                  />
                </div>
                <div className="form-group">
                  <label>Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+91 XXXXX XXXXX"
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                  />
                </div>
                <div className="form-group">
                  <label>Service Required</label>
                  <select name="service" value={form.service} onChange={handleChange}>
                    <option>Asphalt Road Construction</option>
                    <option>Concrete Road Work</option>
                    <option>Infrastructure Development</option>
                    <option>Machinery Rental</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Message</label>
                  <textarea
                    name="message"
                    rows="4"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell us about your project..."
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Submit Enquiry
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
