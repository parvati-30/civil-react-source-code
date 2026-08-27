import { useState, useEffect } from 'react'
import { api } from '../api'
import StatusBadge from '../components/StatusBadge'

const TYPES = ['Road Work', 'Infrastructure', 'Concrete', 'Asphalt', 'Paver', 'Hardscape', 'External Civil']
const STATUSES = ['Completed', 'Under Progress']

const EMPTY_FORM = {
  client_id: '',
  title: '',
  project_type: 'Road Work',
  status: 'Under Progress',
  location: '',
  description: '',
  start_date: '',
  end_date: '',
  image_url: '',
}

export default function Admin() {
  const [projects, setProjects] = useState([])
  const [clients, setClients] = useState([])
  const [form, setForm] = useState(EMPTY_FORM)
  const [editing, setEditing] = useState(null)
  const [loading, setLoading] = useState(true)
  const [alert, setAlert] = useState(null)
  const [busy, setBusy] = useState(false)

  const load = () =>
    Promise.all([api.getProjects(), api.getClients()])
      .then(([p, c]) => {
        setProjects(p)
        setClients(c)
      })
      .catch((err) => showAlert('error', err.message))
      .finally(() => setLoading(false))

  useEffect(() => {
    load()
  }, [])

  const showAlert = (type, message) => {
    setAlert({ type, message })
    setTimeout(() => setAlert(null), 5000)
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const resetForm = () => {
    setForm(EMPTY_FORM)
    setEditing(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setBusy(true)
    try {
      if (editing) {
        await api.updateProject(editing, form)
        showAlert('success', 'Project updated successfully')
      } else {
        await api.createProject(form)
        showAlert('success', 'Project created successfully')
      }
      resetForm()
      await load()
    } catch (err) {
      showAlert('error', err.message)
    } finally {
      setBusy(false)
    }
  }

  const handleEdit = (p) => {
    setEditing(p.id)
    setForm({
      client_id: p.client_id,
      title: p.title,
      project_type: p.projectType,
      status: p.status,
      location: p.location || '',
      description: p.description || '',
      start_date: p.startDate || '',
      end_date: p.endDate || '',
      image_url: p.imageUrl || '',
    })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleStatus = async (id, status) => {
    try {
      await api.updateProjectStatus(id, status)
      showAlert('success', `Project marked as "${status}"`)
      await load()
    } catch (err) {
      showAlert('error', err.message)
    }
  }

  return (
    <div>
      <section className="page-hero">
        <div className="container">
          <h1>Admin Panel</h1>
          <p>
            Add, edit and update projects and their status directly in the
            database.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {alert && (
            <div className={`alert alert-${alert.type}`}>{alert.message}</div>
          )}

          <div className="admin-header">
            <div>
              <h3 style={{ marginBottom: 4 }}>
                {editing ? `Editing Project #${editing}` : 'Project Management'}
              </h3>
              <p style={{ color: '#cbd5e1', fontSize: '0.9rem' }}>
                {projects.length} projects in database
              </p>
            </div>
            {editing && (
              <button className="btn btn-light" onClick={resetForm}>
                Cancel Edit
              </button>
            )}
          </div>

          <div className="admin-grid">
            <div className="admin-form">
              <h3>{editing ? 'Update Project' : 'Add New Project'}</h3>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Client *</label>
                  <select
                    name="client_id"
                    required
                    value={form.client_id}
                    onChange={handleChange}
                  >
                    <option value="">Select client...</option>
                    {clients
                      .filter((c) => c.name !== 'Other')
                      .map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Project Title *</label>
                  <input
                    type="text"
                    name="title"
                    required
                    value={form.title}
                    onChange={handleChange}
                    placeholder="e.g. Asphalt Road for Phase 2"
                  />
                </div>
                <div className="form-group">
                  <label>Project Type *</label>
                  <select
                    name="project_type"
                    value={form.project_type}
                    onChange={handleChange}
                  >
                    {TYPES.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Status *</label>
                  <select
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                  >
                    {STATUSES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Location</label>
                  <input
                    type="text"
                    name="location"
                    value={form.location}
                    onChange={handleChange}
                    placeholder="e.g. Bengaluru, Karnataka"
                  />
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    name="description"
                    rows="3"
                    value={form.description}
                    onChange={handleChange}
                    placeholder="Short project description"
                  />
                </div>
                <div className="form-group">
                  <label>Start Date</label>
                  <input
                    type="date"
                    name="start_date"
                    value={form.start_date}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>End Date</label>
                  <input
                    type="date"
                    name="end_date"
                    value={form.end_date}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Image URL</label>
                  <input
                    type="url"
                    name="image_url"
                    value={form.image_url}
                    onChange={handleChange}
                    placeholder="https://..."
                  />
                </div>
                <button type="submit" className="btn btn-primary" disabled={busy}>
                  {busy
                    ? 'Saving...'
                    : editing
                      ? 'Update Project'
                      : 'Add Project'}
                </button>
              </form>
            </div>

            <div className="admin-list">
              {loading && <div className="loader">Loading projects...</div>}
              {!loading &&
                projects.map((p) => (
                  <div className="admin-project" key={p.id}>
                    <div className="admin-project-info">
                      <h4>{p.title}</h4>
                      <p>
                        {p.client.name} - {p.projectType} - {p.location}
                      </p>
                      <div style={{ marginTop: 8 }}>
                        <StatusBadge status={p.status} />
                      </div>
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 8,
                        alignItems: 'flex-end',
                      }}
                    >
                      <div className="status-toggle">
                        <button
                          className={`status-btn ${
                            p.status === 'Completed'
                              ? 'active-completed'
                              : ''
                          }`}
                          onClick={() => handleStatus(p.id, 'Completed')}
                        >
                          Completed
                        </button>
                        <button
                          className={`status-btn ${
                            p.status === 'Under Progress'
                              ? 'active-progress'
                              : ''
                          }`}
                          onClick={() => handleStatus(p.id, 'Under Progress')}
                        >
                          Under Progress
                        </button>
                      </div>
                      <button className="btn btn-outline" onClick={() => handleEdit(p)}>
                        Edit Details
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
