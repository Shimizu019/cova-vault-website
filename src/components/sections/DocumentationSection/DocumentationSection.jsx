import docs from '../../../data/documentation/documentation.json';

function DocumentationSection() {
  return (
    <section className="section">
      <div className="section-header">
        <h2 className="section-title">Documentation</h2>
        <p className="section-subtitle">
          Comprehensive guides and tutorials for using Cova Vault.
        </p>
      </div>

      <div className="documentation-grid">
        {docs.map((doc) => (
          <a key={doc.id} href={doc.link} className="documentation-card">
            <div className="documentation-icon">{doc.icon}</div>
            <h3>{doc.title}</h3>
            <p>{doc.description}</p>
          </a>
        ))}
      </div>

      <div className="documentation-links">
        <a href={docs[0]?.link || '#'} className="text-primary">
          View all documentation
        </a>
      </div>
    </section>
  );
}

export default DocumentationSection;