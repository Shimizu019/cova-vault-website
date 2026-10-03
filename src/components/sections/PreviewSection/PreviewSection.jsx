import screenshots from '../../../data/screenshotData.json';

function PreviewSection() {
  return (
    <section className="section" style={{ backgroundColor: 'var(--color-bg-secondary)' }}>
      <div className="section-header">
        <h2 className="section-title">App Preview</h2>
        <p className="section-subtitle">
          Take a look at the modern, intuitive interface designed for everyday use.
        </p>
      </div>

      <div className="preview-grid">
        {screenshots.map((screenshot) => (
          <div key={screenshot.id} className="screenshot-card">
            <div className="screenshot-frame">
              <img
                src={screenshot.image}
                alt={screenshot.title}
                loading="lazy"
              />
            </div>
            <div className="screenshot-info">
              <h4>{screenshot.title}</h4>
              <p>{screenshot.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default PreviewSection;