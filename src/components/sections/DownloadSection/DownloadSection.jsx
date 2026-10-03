import siteConfig from '../../../config/site/site.config.js';

function DownloadSection() {
  const currentRelease = siteConfig.currentRelease;

  return (
    <section className="section">
      <div className="section-header">
        <h2 className="section-title">Download Cova Vault</h2>
        <p className="section-subtitle">
          Get the latest version of our Android application.
        </p>
      </div>

      <div className="download-container">
        <div className="download-info">
          <h3>Version {currentRelease}</h3>
          <p>
            Latest release featuring security updates, bug fixes, and new features.
            Automatically updates from GitHub releases when available.
          </p>
        </div>

        <div className="download-actions">
          <div className="qr-code">
            {/* QR code placeholder - will be generated in production */}
            <div className="placeholder">
              <svg width="100" height="100" viewBox="0 0 100 100">
                <rect width="100" height="100" fill="#f8fafc" />
                <text x="50" y="50" textAnchor="middle" fill="#475569" fontSize="10">QR</text>
              </svg>
              <p>Scan to download</p>
            </div>
          </div>

          <a
            href="/"
            download
            className="btn btn-primary btn-lg"
            style={{ width: '100%' }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Download APK (v{currentRelease})
          </a>
        </div>

        <div className="download-requirements">
          <h4>Requirements</h4>
          <ul>
            <li>Android 7.0 (Nougat) or higher</li>
            <li>At least 50 MB free storage</li>
            <li>Google Play Services (optional, for compatibility)</li>
          </ul>
        </div>
      </div>

      <div className="download-suggestions">
        <h4>More Information</h4>
        <ul>
          <li><a href="/features">Full feature list</a></li>
          <li><a href="/security">Privacy policy details</a></li>
          <li><a href="https://github.com/cova-vault/cova-vault-website/releases">View release notes</a></li>
        </ul>
      </div>
    </section>
  );
}

export default DownloadSection;