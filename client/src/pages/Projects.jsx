import { useState, useEffect } from 'react'
import { api } from '../api'
import StatusBadge from '../components/StatusBadge'
import { PROJECTS as DEFAULT_PROJECTS, CLIENTS as DEFAULT_CLIENTS, ALL_SITE_PHOTOS } from '../data'

const TYPES = ['All', 'Road Work', 'Infrastructure', 'Concrete', 'Asphalt', 'Paver', 'Hardscape', 'External Civil']

export default function Projects() {
  const [projects, setProjects] = useState(DEFAULT_PROJECTS)
  const [clients, setClients] = useState(DEFAULT_CLIENTS)
  const [loading, setLoading] = useState(false)
  const [type, setType] = useState('All')
  const [status, setStatus] = useState('All')
  const [selectedClient, setSelectedClient] = useState('All')
  const [selectedProject, setSelectedProject] = useState(null)
  const [modalPhotoIndex, setModalPhotoIndex] = useState(0)
  const [activePhoto, setActivePhoto] = useState(null)

  useEffect(() => {
    setLoading(true)
    Promise.all([api.getProjects(), api.getClients()])
      .then(([p, c]) => {
        if (p && p.length > 0) setProjects(p)
        if (c && c.length > 0) setClients(c)
      })
      .catch(() => {
        // Fallback to local default data if backend API is not running
      })
      .finally(() => setLoading(false))
  }, [])

  // Keyboard navigation for project modal and lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedProject) {
        const gallery = selectedProject.gallery || [selectedProject.imageUrl]
        if (e.key === 'ArrowRight') {
          setModalPhotoIndex((prev) => (prev + 1) % gallery.length)
        } else if (e.key === 'ArrowLeft') {
          setModalPhotoIndex((prev) => (prev - 1 + gallery.length) % gallery.length)
        } else if (e.key === 'Escape') {
          setSelectedProject(null)
        }
      } else if (activePhoto && e.key === 'Escape') {
        setActivePhoto(null)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedProject, activePhoto])

  const filtered = projects.filter((p) => {
    const clientName = p.client?.name || (typeof p.client === 'string' ? p.client : '')
    const matchesType = type === 'All' || p.projectType === type
    const matchesStatus = status === 'All' || p.status === status
    const matchesClient = selectedClient === 'All' || clientName.toLowerCase().includes(selectedClient.toLowerCase())
    return matchesType && matchesStatus && matchesClient
  })

  const initials = (name) =>
    name
      .split(' ')
      .map((w) => w[0])
      .join('')
      .slice(0, 2)
      .toUpperCase()

  const ongoingCount = projects.filter((p) => p.status === 'Under Progress').length
  const completedCount = projects.filter((p) => p.status === 'Completed').length

  const handleHeroFilter = (targetStatus) => {
    setStatus(targetStatus)
    setSelectedClient('All')
    const el = document.getElementById('project-portfolio')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleClientSelect = (clientName) => {
    if (selectedClient === clientName) {
      setSelectedClient('All')
    } else {
      setSelectedClient(clientName)
      const el = document.getElementById('project-portfolio')
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  const handleScrollToLive = () => {
    const el = document.getElementById('live-site-photos')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const openProjectModal = (project, photoIndex = 0) => {
    setSelectedProject(project)
    setModalPhotoIndex(photoIndex)
  }

  const closeProjectModal = () => {
    setSelectedProject(null)
  }

  const openLightbox = (photoSrc, photoAlt) => {
    setActivePhoto({ src: photoSrc, alt: photoAlt })
  }

  const closeLightbox = () => {
    setActivePhoto(null)
  }

  return (
    <div>
      {/* Hero with Clickable Stat Cards */}
      <section className="page-hero">
        <div className="container">
          <h1>Projects & Clients</h1>
          <p>
            Explore our track record of major road infrastructure, asphalt paving,
            and external civil developments delivered for India's leading developers.
          </p>
          <div className="hero-stats-interactive">
            <button
              type="button"
              className={`hero-stat-card ${status === 'Under Progress' ? 'active-ongoing' : ''}`}
              onClick={() => handleHeroFilter('Under Progress')}
              title="Click to view all Ongoing Projects"
            >
              <div className="stat-card-badge status-prog">Active</div>
              <span className="stat-card-num">{ongoingCount}</span>
              <span className="stat-card-label">Ongoing Projects</span>
              <span className="stat-card-hint">Click to filter ↓</span>
            </button>

            <button
              type="button"
              className={`hero-stat-card ${status === 'Completed' ? 'active-completed' : ''}`}
              onClick={() => handleHeroFilter('Completed')}
              title="Click to view all Completed Projects"
            >
              <div className="stat-card-badge status-done">Delivered</div>
              <span className="stat-card-num">{completedCount}</span>
              <span className="stat-card-label">Completed Projects</span>
              <span className="stat-card-hint">Click to filter ↓</span>
            </button>

            <button
              type="button"
              className="hero-stat-card"
              onClick={handleScrollToLive}
              title="Click to view Live Site Photos Gallery"
            >
              <div className="stat-card-badge">Live</div>
              <span className="stat-card-num">60+</span>
              <span className="stat-card-label">Live Site Captures</span>
              <span className="stat-card-hint">View Gallery ↓</span>
            </button>
          </div>
        </div>
      </section>

      {/* Clients Section */}
      <section className="section">
        <div className="container text-center">
          <div className="section-label">Our Key Clients</div>
          <h2 className="section-title">Trusted By India's Leading Developers</h2>
          <p className="section-subtitle">
            Long-standing civil execution partners for renowned residential, commercial, and plotted development brands. Click any client to view their projects.
          </p>
        </div>
        <div className="container">
          <div className="clients-grid">
            {clients.map((c) => {
              const isSelected = selectedClient === c.name
              return (
                <div
                  className={`client-card ${isSelected ? 'client-card-selected' : ''}`}
                  key={c.id || c.name}
                  onClick={() => handleClientSelect(c.name)}
                  style={{ cursor: 'pointer' }}
                  title={`Click to filter projects for ${c.name}`}
                >
                  <div className="client-logo">{initials(c.name)}</div>
                  <h4>{c.name}</h4>
                  <p>{c.sector}</p>
                  <p style={{ marginTop: '6px', fontWeight: 600, color: 'var(--primary-dark)' }}>
                    {c.projectCount} {c.projectCount === 1 ? 'Project' : 'Projects'}
                  </p>
                  <span className="client-filter-hint">
                    {isSelected ? '✓ Filtered (Click to reset)' : 'View Projects →'}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Project Portfolio */}
      <section className="section" id="project-portfolio" style={{ background: 'var(--white)' }}>
        <div className="container text-center">
          <div className="section-label">Road Construction Works</div>
          <h2 className="section-title">Featured Road Construction & Infrastructure Projects</h2>
          <p className="section-subtitle">
            Highways, internal township networks, asphalt paving, concrete roads, paver works, RCC drains, and external civil infrastructure. Click on any project card to view all high-resolution site execution photos.
          </p>
        </div>

        <div className="container">
          {/* Active Filter Pill Bar */}
          {selectedClient !== 'All' && (
            <div className="active-client-bar">
              <span>Showing projects for developer: <strong>{selectedClient}</strong></span>
              <button className="clear-client-btn" onClick={() => setSelectedClient('All')}>
                ✕ Show All Clients
              </button>
            </div>
          )}

          <div className="filters">
            {TYPES.map((t) => (
              <button
                key={t}
                className={`filter-btn ${type === t ? 'active' : ''}`}
                onClick={() => setType(t)}
              >
                {t}
              </button>
            ))}
            <button
              className={`filter-btn ${status === 'Completed' ? 'active active-green' : ''}`}
              onClick={() => setStatus(status === 'Completed' ? 'All' : 'Completed')}
            >
              ✓ Completed ({completedCount})
            </button>
            <button
              className={`filter-btn ${status === 'Under Progress' ? 'active active-amber' : ''}`}
              onClick={() => setStatus(status === 'Under Progress' ? 'All' : 'Under Progress')}
            >
              ⚡ Under Progress ({ongoingCount})
            </button>
            {(type !== 'All' || status !== 'All' || selectedClient !== 'All') && (
              <button
                className="filter-btn filter-reset-btn"
                onClick={() => {
                  setType('All')
                  setStatus('All')
                  setSelectedClient('All')
                }}
              >
                Reset All Filters
              </button>
            )}
          </div>

          {loading && <div className="loader">Loading projects...</div>}

          {!loading && (
            <div className="projects-grid">
              {filtered.map((p) => {
                const photoCount = p.gallery?.length || 1
                return (
                  <div
                    className={`card project-card ${p.status === 'Completed' ? 'project-card-completed' : 'project-card-ongoing'}`}
                    key={p.id}
                    onClick={() => openProjectModal(p, 0)}
                    style={{ cursor: 'pointer' }}
                  >
                    <div className="project-image">
                      <img src={p.imageUrl} alt={p.title} loading="lazy" />
                      <StatusBadge status={p.status} />
                      <span className="photo-count-pill">📸 {photoCount} Photo{photoCount !== 1 ? 's' : ''}</span>
                    </div>
                    <div className="project-body">
                      <div className="project-company-badge">
                        <span className="company-icon">🏢</span>
                        <span className="company-name">{p.client?.name || p.client}</span>
                      </div>
                      <h3 className="project-title">{p.title}</h3>
                      <p>{p.description}</p>

                      {/* Gallery Thumbnails */}
                      {p.gallery && p.gallery.length > 1 && (
                        <div className="project-gallery-thumbs" onClick={(e) => e.stopPropagation()}>
                          {p.gallery.slice(0, 5).map((thumb, idx) => (
                            <img
                              key={idx}
                              src={thumb}
                              alt={`${p.title} photo ${idx + 1}`}
                              className="project-thumb"
                              onClick={() => openProjectModal(p, idx)}
                              title={`View Photo ${idx + 1}`}
                            />
                          ))}
                          {p.gallery.length > 5 && (
                            <button
                              type="button"
                              className="project-thumb-more"
                              onClick={() => openProjectModal(p, 5)}
                              title="View more photos"
                            >
                              +{p.gallery.length - 5}
                            </button>
                          )}
                        </div>
                      )}

                      <div style={{ marginTop: 'auto', paddingTop: '14px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span className="type-tag">{p.projectType}</span>
                          <span className="project-view-link">View All Images →</span>
                        </div>
                        <div className="project-meta" style={{ marginTop: '12px' }}>
                          <span>📍 {p.location}</span>
                          <span>
                            {p.startDate ? `Started ${p.startDate.split('-')[0]}` : ''}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
              {!filtered.length && (
                <div className="empty" style={{ gridColumn: '1 / -1' }}>
                  No projects match the selected filters.
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Live Site Execution Photo Gallery */}
      <section className="section" id="live-site-photos" style={{ background: '#0f172a', color: '#fff' }}>
        <div className="container text-center">
          <div className="section-label" style={{ color: 'var(--primary)' }}>Real-Time Execution</div>
          <h2 className="section-title" style={{ color: '#fff' }}>Live On-Site Work & Machinery In Action</h2>
          <p className="section-subtitle" style={{ color: '#94a3b8', marginBottom: 36 }}>
            Browse actual site execution captures across our ongoing asphalt paving, RCC drainage, retaining walls, and paver works.
          </p>
        </div>

        <div className="container">
          <div className="site-gallery-grid">
            {ALL_SITE_PHOTOS.map((photo) => (
              <div
                className="site-gallery-card"
                key={photo.id}
                onClick={() => openLightbox(photo.src, photo.alt)}
              >
                <img src={photo.src} alt={photo.alt} loading="lazy" />
                <div className="site-gallery-overlay">
                  <span>Site Capture #{photo.id}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Details & Full Interactive Gallery Modal */}
      {selectedProject && (
        <div className="project-modal-backdrop" onClick={closeProjectModal}>
          <div className="project-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="project-modal-header">
              <div>
                <div className="modal-header-badges">
                  <span className="project-company-badge">
                    <span className="company-icon">🏢</span>
                    <span className="company-name">{selectedProject.client?.name || selectedProject.client}</span>
                  </span>
                  <StatusBadge status={selectedProject.status} />
                  <span className="type-tag">{selectedProject.projectType}</span>
                </div>
                <h2 className="project-modal-title">{selectedProject.title}</h2>
                <div className="project-modal-meta">
                  <span>📍 {selectedProject.location}</span>
                  {selectedProject.startDate && <span>• Started {selectedProject.startDate.split('-')[0]}</span>}
                </div>
              </div>
              <button className="project-modal-close" onClick={closeProjectModal} aria-label="Close modal">
                ✕
              </button>
            </div>

            <div className="project-modal-body">
              {/* Image Viewer Area */}
              <div className="project-viewer-container">
                {(() => {
                  const gallery = selectedProject.gallery || [selectedProject.imageUrl]
                  const currentImage = gallery[modalPhotoIndex] || selectedProject.imageUrl
                  return (
                    <>
                      <div className="project-viewer-main">
                        <img
                          src={currentImage}
                          alt={`${selectedProject.title} photo ${modalPhotoIndex + 1}`}
                          className="project-viewer-img"
                          onClick={() => openLightbox(currentImage, `${selectedProject.title} - Photo ${modalPhotoIndex + 1} of ${gallery.length}`)}
                        />
                        {gallery.length > 1 && (
                          <>
                            <button
                              type="button"
                              className="viewer-arrow viewer-arrow-left"
                              onClick={() => setModalPhotoIndex((prev) => (prev - 1 + gallery.length) % gallery.length)}
                              aria-label="Previous photo"
                            >
                              ‹
                            </button>
                            <button
                              type="button"
                              className="viewer-arrow viewer-arrow-right"
                              onClick={() => setModalPhotoIndex((prev) => (prev + 1) % gallery.length)}
                              aria-label="Next photo"
                            >
                              ›
                            </button>
                          </>
                        )}
                        <div className="viewer-counter">
                          📸 Photo {modalPhotoIndex + 1} of {gallery.length}
                        </div>
                        <button
                          type="button"
                          className="viewer-expand-btn"
                          onClick={() => openLightbox(currentImage, `${selectedProject.title} - Photo ${modalPhotoIndex + 1} of ${gallery.length}`)}
                        >
                          🔍 Fullscreen
                        </button>
                      </div>

                      {/* Thumbnail ribbon */}
                      {gallery.length > 1 && (
                        <div className="project-viewer-thumbs">
                          {gallery.map((img, idx) => (
                            <img
                              key={idx}
                              src={img}
                              alt={`Thumbnail ${idx + 1}`}
                              className={`viewer-thumb-img ${modalPhotoIndex === idx ? 'active' : ''}`}
                              onClick={() => setModalPhotoIndex(idx)}
                            />
                          ))}
                        </div>
                      )}
                    </>
                  )
                })()}
              </div>

              {/* Project Description & Highlights */}
              <div className="project-modal-details">
                <h3>Project Overview</h3>
                <p className="project-modal-desc">{selectedProject.description}</p>

                <div className="project-modal-specs">
                  <div className="spec-box">
                    <span className="spec-label">Execution Status</span>
                    <strong className={`spec-value ${selectedProject.status === 'Completed' ? 'text-green' : 'text-amber'}`}>
                      {selectedProject.status === 'Completed' ? '✓ Completed & Handed Over' : '⚡ Active Under Progress'}
                    </strong>
                  </div>
                  <div className="spec-box">
                    <span className="spec-label">Client Developer</span>
                    <strong className="spec-value">{selectedProject.client?.name || selectedProject.client}</strong>
                  </div>
                  <div className="spec-box">
                    <span className="spec-label">Project Scope</span>
                    <strong className="spec-value">{selectedProject.projectType}</strong>
                  </div>
                  <div className="spec-box">
                    <span className="spec-label">Location</span>
                    <strong className="spec-value">{selectedProject.location}</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

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
