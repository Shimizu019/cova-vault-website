import { Link } from 'react-router-dom';
import siteConfig from '../../config/site/site';

function Footer() {
  return (
    <footer className="mt-16 border-t border-cova-border bg-cova-surface">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
        <div>
          <h2 className="text-lg font-bold text-cova-text">Cova Vault</h2>
          <p className="mt-2 text-sm leading-relaxed text-cova-muted">
            Your personal vault for keeping important information organized.
          </p>
        </div>
        <nav aria-label="Product">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-cova-muted">Product</h3>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link to="/features" className="text-cova-muted hover:text-cova-text">Features</Link></li>
            <li><Link to="/security" className="text-cova-muted hover:text-cova-text">Security</Link></li>
            <li><Link to="/download" className="text-cova-muted hover:text-cova-text">Download</Link></li>
            <li><Link to="/changelog" className="text-cova-muted hover:text-cova-text">Changelog</Link></li>
          </ul>
        </nav>
        <nav aria-label="Resources">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-cova-muted">Resources</h3>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link to="/documentation" className="text-cova-muted hover:text-cova-text">Documentation</Link></li>
            <li><Link to="/documentation#faq" className="text-cova-muted hover:text-cova-text">FAQ</Link></li>
            <li><Link to="/about" className="text-cova-muted hover:text-cova-text">About</Link></li>
          </ul>
        </nav>
        <nav aria-label="Project">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-cova-muted">Project</h3>
          <ul className="mt-3 space-y-2 text-sm">
            <li><a href={siteConfig.androidRepoUrl} className="text-cova-muted hover:text-cova-text">Android repository</a></li>
            <li><a href={siteConfig.androidReleasesUrl} className="text-cova-muted hover:text-cova-text">Releases</a></li>
            <li><a href={siteConfig.websiteRepoUrl} className="text-cova-muted hover:text-cova-text">Website repository</a></li>
          </ul>
        </nav>
      </div>
      <div className="border-t border-cova-border py-5 text-center text-xs text-cova-muted">
        Cova Vault website · Android available · Windows coming soon
      </div>
    </footer>
  );
}

export default Footer;
