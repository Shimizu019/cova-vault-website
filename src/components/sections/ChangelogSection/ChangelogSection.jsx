import releases from '../../../data/releases/releases.json';

function ChangelogSection() {
  return (
    <section className="section">
      <div className="section-header">
        <h2 className="section-title">Changelog</h2>
        <p className="section-subtitle">
          A chronological history of Cova Vault releases.
        </p>
      </div>

      <div className="changelog-list">
        {releases.map((release) => (
          <article key={release.version} className="changelog-entry">
            <div className="changelog-header">
              <span className="changelog-version">{release.version}</span>
              <span className="changelog-date">{release.date}</span>
            </div>
            <div className="changelog-notes">
              {release.notes.map((note) => (
                <div key={note} className="changelog-note">
                  {note}
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>

      <div className="changelog-footer">
        <p>Total releases: {releases.length}</p>
        <a href="/changelog" className="text-primary">
          View all releases
        </a>
      </div>
    </section>
  );
}

export default ChangelogSection;