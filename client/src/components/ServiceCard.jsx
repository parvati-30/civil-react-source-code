import { useState } from 'react'

export default function ServiceCard({ service, onOpenLightbox }) {
  const images = service.images && service.images.length > 0 ? service.images : [service.image]
  const [currentIdx, setCurrentIdx] = useState(0)

  const handlePrev = (e) => {
    e.stopPropagation()
    setCurrentIdx((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const handleNext = (e) => {
    e.stopPropagation()
    setCurrentIdx((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  const handleSelectThumb = (e, index) => {
    e.stopPropagation()
    setCurrentIdx(index)
  }

  const handleImageClick = () => {
    if (onOpenLightbox) {
      onOpenLightbox(images[currentIdx], `${service.title} - Site Photo ${currentIdx + 1} of ${images.length}`)
    }
  }

  return (
    <div className="service-card">
      <div
        className="service-image-slider"
        onClick={handleImageClick}
        title="Click to view full photo"
        style={{ cursor: onOpenLightbox ? 'pointer' : 'default' }}
      >
        <img
          src={images[currentIdx]}
          alt={`${service.title} site photo ${currentIdx + 1}`}
          loading="lazy"
          className="service-active-img"
        />

        {/* Counter Badge */}
        {images.length > 1 && (
          <div className="slider-counter">
            📷 {currentIdx + 1} / {images.length}
          </div>
        )}

        {/* Zoom Hint */}
        {onOpenLightbox && <div className="slider-zoom-hint">🔍 Expand</div>}

        {/* Arrow Navigation */}
        {images.length > 1 && (
          <>
            <button
              type="button"
              className="slider-arrow slider-arrow-left"
              onClick={handlePrev}
              aria-label="Previous photo"
            >
              &#10094;
            </button>
            <button
              type="button"
              className="slider-arrow slider-arrow-right"
              onClick={handleNext}
              aria-label="Next photo"
            >
              &#10095;
            </button>
          </>
        )}

        {/* Dots */}
        {images.length > 1 && (
          <div className="slider-dots">
            {images.map((_, i) => (
              <span
                key={i}
                className={`slider-dot ${i === currentIdx ? 'active' : ''}`}
                onClick={(e) => handleSelectThumb(e, i)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Mini Thumbnails Row */}
      {images.length > 1 && (
        <div className="service-thumbs-bar">
          {images.map((img, i) => (
            <img
              key={i}
              src={img}
              alt={`thumbnail ${i + 1}`}
              className={`service-mini-thumb ${i === currentIdx ? 'active' : ''}`}
              onClick={(e) => handleSelectThumb(e, i)}
            />
          ))}
        </div>
      )}

      <div className="service-body">
        <h3>{service.title}</h3>
        <p>{service.description}</p>
      </div>
    </div>
  )
}