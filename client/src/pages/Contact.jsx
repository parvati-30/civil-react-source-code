import { useState } from 'react'

export default function Contact() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    service: 'Asphalt Road Construction',
    message: '',
  })
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)

  const handleNameChange = (e) => {
    // Only accept alphabetic characters, spaces, dots, and hyphens (no numbers or symbols)
    const rawVal = e.target.value
    const filteredVal = rawVal.replace(/[^a-zA-Z\s.'-]/g, '')
    setForm((prev) => ({ ...prev, name: filteredVal }))

    if (errors.name) {
      if (filteredVal.trim().length >= 2) {
        setErrors((prev) => ({ ...prev, name: '' }))
      }
    }
  }

  const handlePhoneChange = (e) => {
    // Only accept numbers (0-9) and limit to exactly 10 digits
    const rawVal = e.target.value
    const filteredVal = rawVal.replace(/\D/g, '').slice(0, 10)
    setForm((prev) => ({ ...prev, phone: filteredVal }))

    if (errors.phone) {
      if (filteredVal.length === 10) {
        setErrors((prev) => ({ ...prev, phone: '' }))
      }
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const validate = () => {
    const newErrors = {}

    // Name validation: must contain only characters and min 2 length
    const trimmedName = form.name.trim()
    if (!trimmedName) {
      newErrors.name = 'Please enter your full name (letters only).'
    } else if (!/^[a-zA-Z\s.'-]+$/.test(trimmedName) || trimmedName.length < 2) {
      newErrors.name = 'Name must only contain alphabetic characters (minimum 2 characters).'
    }

    // Phone validation: must be exactly 10 digits
    if (!form.phone) {
      newErrors.phone = 'Please enter your 10-digit mobile number.'
    } else if (form.phone.length !== 10) {
      newErrors.phone = `Mobile number must be exactly 10 digits (${form.phone.length}/10 entered).`
    } else if (!/^[6-9]\d{9}$/.test(form.phone)) {
      newErrors.phone = 'Please enter a valid 10-digit mobile number (starting with 6, 7, 8, or 9).'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) {
      return
    }

    // Format all enquiry details into a clean WhatsApp message
    const formattedLines = [
      `*New Project Enquiry - J.Giridhar Constructions*`,
      `━━━━━━━━━━━━━━━━━━━━━━━━━`,
      `👤 *Full Name:* ${form.name.trim()}`,
      `📱 *Mobile:* +91 ${form.phone.trim()}`,
      `📧 *Email:* ${form.email.trim() || 'Not Specified'}`,
      `🛠️ *Service Required:* ${form.service}`,
      `📝 *Project / Requirement Details:*`,
      `${form.message.trim() || 'No additional notes provided'}`,
      `━━━━━━━━━━━━━━━━━━━━━━━━━`,
      `_Sent via J.Giridhar Constructions Official Website_`,
    ]

    const encodedText = encodeURIComponent(formattedLines.join('\n'))
    const whatsappUrl = `https://wa.me/919980495922?text=${encodedText}`

    // Open WhatsApp directly in new window / WhatsApp app
    window.open(whatsappUrl, '_blank')

    setSent(true)
    setErrors({})
    setForm({ name: '', phone: '', email: '', service: 'Asphalt Road Construction', message: '' })
    setTimeout(() => setSent(false), 7000)
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
                <div className="contact-icon">&#128100;</div>
                <div>
                  <h4>Leadership</h4>
                  <p>
                    <strong>J. Giridhar</strong>
                    <br />
                    <span style={{ color: 'var(--primary-dark)', fontWeight: 600 }}>Founder & CEO</span>
                  </p>
                </div>
              </div>

              <div className="contact-info-item">
                <div className="contact-icon">&#9906;</div>
                <div>
                  <h4>Head Office</h4>
                  <p>
                    <strong>J. Giridhar Constructions</strong>
                    <br />
                    No.131, 8th A Main, 4th Block, 4th Stage,
                    <br />
                    Basaveshwara Nagar, Bangalore - 560079,
                    <br />
                    Karnataka, India
                  </p>
                </div>
              </div>

              <div className="contact-info-item">
                <div className="contact-icon">&#9742;</div>
                <div>
                  <h4>Phone / Mobile</h4>
                  <p>
                    <a href="tel:+919845479248" style={{ color: 'inherit', textDecoration: 'none', fontWeight: 600 }}>
                      +91 98454 79248
                    </a>
                  </p>
                </div>
              </div>

              <div className="contact-info-item">
                <div className="contact-icon">&#9993;</div>
                <div>
                  <h4>Email</h4>
                  <p>
                    <a href="mailto:info@jgconstructions.in" style={{ color: 'inherit', textDecoration: 'none', fontWeight: 600 }}>
                      info@jgconstructions.in
                    </a>
                  </p>
                </div>
              </div>

              <div className="contact-info-item">
                <div className="contact-icon">&#128196;</div>
                <div>
                  <h4>GST Registration</h4>
                  <p>
                    <strong>GSTIN:</strong> 29AHLPG8897M1Z6
                    <br />
                    <strong>Location:</strong> Karnataka
                  </p>
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

            <div className="card" style={{ padding: '28px 30px' }}>
              <h3 style={{ marginBottom: 18, color: 'var(--dark)' }}>
                Send Us An Enquiry
              </h3>
              {sent && (
                <div className="alert alert-success" style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
                  <span style={{ fontSize: '1.2rem' }}>✅</span>
                  <div>
                    <strong>Enquiry Submitted!</strong> Redirecting your project details to WhatsApp (+91 99804 95922)...
                  </div>
                </div>
              )}
              <form onSubmit={handleSubmit} noValidate>
                <div className="form-group">
                  <label htmlFor="contact-name">
                    Name <span style={{ color: '#ef4444' }}>*</span>
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    required
                    value={form.name}
                    onChange={handleNameChange}
                    placeholder="Enter full name (characters only)"
                    className={errors.name ? 'form-input-error' : ''}
                    autoComplete="name"
                  />
                  {errors.name && (
                    <div className="form-error-text">
                      <span>⚠️</span> {errors.name}
                    </div>
                  )}
                  <div className="form-hint">
                    <span>Alphabetic characters & spaces only</span>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="contact-phone">
                    Mobile Number <span style={{ color: '#ef4444' }}>*</span>
                  </label>
                  <input
                    id="contact-phone"
                    type="tel"
                    name="phone"
                    required
                    maxLength={10}
                    value={form.phone}
                    onChange={handlePhoneChange}
                    placeholder="Enter 10-digit mobile number"
                    className={errors.phone ? 'form-input-error' : ''}
                    autoComplete="tel"
                    inputMode="numeric"
                  />
                  {errors.phone && (
                    <div className="form-error-text">
                      <span>⚠️</span> {errors.phone}
                    </div>
                  )}
                  <div className="form-hint">
                    <span>10-digit Indian mobile number</span>
                    <span style={{ fontWeight: 600, color: form.phone.length === 10 ? '#10b981' : 'var(--gray)' }}>
                      {form.phone.length}/10 digits
                    </span>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="contact-email">Email</label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    autoComplete="email"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="contact-service">Service Required</label>
                  <select
                    id="contact-service"
                    name="service"
                    value={form.service}
                    onChange={handleChange}
                  >
                    <option>Asphalt Road Construction</option>
                    <option>Concrete Road Work</option>
                    <option>Paver Road Works</option>
                    <option>Infrastructure Development</option>
                    <option>Hardscape Works</option>
                    <option>External Civil Works</option>
                    <option>Machinery & Fleet Rental</option>
                    <option>Other Enquiry</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="contact-message">Message</label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows="4"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell us about your project or query..."
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{
                    width: '100%',
                    padding: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    fontSize: '1.02rem',
                    fontWeight: 700,
                  }}
                >
                  <span style={{ fontSize: '1.2rem' }}>💬</span> Submit Enquiry via WhatsApp
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

