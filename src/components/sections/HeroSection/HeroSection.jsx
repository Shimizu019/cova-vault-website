import { Link } from 'react-router-dom';

function HeroSection() {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1 className="hero-title">
          Take Control of Your Digital Life
        </h1>
        <p className="hero-subtitle">
          Cova Vault is a powerful, privacy-focused Android application that keeps
          your credentials, notes, tasks, and digital life securely organized in
          one place. No ads, no tracking, no compromises.
        </p>
        <div className="hero-actions">
          <Link to="/download" className="btn btn-primary btn-lg">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Download for Android
          </Link>
          <Link to="/features" className="btn btn-outline btn-lg">
            Explore Features
          </Link>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;