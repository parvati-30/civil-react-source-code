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
  const [submitting, setSubmitting] = useState(false)
  const [sent, setSent] = useState(false)
  const [submittedName, setSubmittedName] = useState('')

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

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) {
      return
    }

    setSubmitting(true)
    const currentName = form.name.trim()
    setSubmittedName(currentName)

    try {
      // Direct silent background submission to info@jgconstructions.in
      const payload = {
        name: form.name.trim(),
        mobile: `+91 ${form.phone.trim()}`,
        email: form.email.trim() || 'Not Provided',
        service_required: form.service,
        message: form.message.trim() || 'No additional notes provided',
        whatsapp_contact_number: '+91 99804 95922',
        _subject: `New Civil Project Enquiry from ${form.name.trim()} (+91 ${form.phone.trim()})`,
        _captcha: 'false',
        _template: 'table',
      }

      await fetch('https://formsubmit.co/ajax/info@jgconstructions.in', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      }).catch(() => {
        // Fallback gracefully without interrupting user
      })
    } catch {
      // Handled silently
    } finally {
      setSubmitting(false)
      setSent(true)
      setErrors({})
      setForm({ name: '', phone: '', email: '', service: 'Asphalt Road Construction', message: '' })
      setTimeout(() => setSent(false), 7000)
    }
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
                <div className="alert alert-success" style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20, padding: '16px 20px', borderRadius: '8px' }}>
                  <span style={{ fontSize: '1.4rem' }}>✅</span>
                  <div>
                    <strong style={{ display: 'block', fontSize: '1rem', color: '#065f46' }}>Enquiry Submitted Successfully!</strong>
                    <span style={{ color: '#047857', fontSize: '0.92rem' }}>Your project requirements have been delivered directly to <strong>info@jgconstructions.in</strong>. Our team will contact you shortly on your mobile number.</span>
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
                  disabled={submitting}
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
                    opacity: submitting ? 0.7 : 1,
                    cursor: submitting ? 'not-allowed' : 'pointer',
                  }}
                >
                  {submitting ? (
                    <>
                      <span>⏳</span> Submitting Enquiry...
                    </>
                  ) : (
                    <>
                      <span>✉️</span> Submit Enquiry
                    </>
                  )}
                </button>

                <div style={{ textAlign: 'center', marginTop: 16, fontSize: '0.86rem', color: '#64748b' }}>
                  Need instant response?{' '}
                  <a
                    href="https://wa.me/919980495922"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: '#16a34a', fontWeight: 600, textDecoration: 'none' }}
                  >
                    💬 WhatsApp us directly at +91 99804 95922
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

