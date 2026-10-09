import { Link } from 'react-router-dom';
import siteConfig from '../../config/site/site';
import CovaLogo from '../common/CovaLogo';

const columns = [
  {
    heading: 'Product',
    items: [
      { label: 'Features', to: '/features' },
      { label: 'Security', to: '/security' },
      { label: 'Download', to: '/download' },
    ],
  },
  {
    heading: 'Resources',
    items: [
      { label: 'Changelog', to: '/changelog' },
      { label: 'Documentation', to: '/documentation' },
      { label: 'About', to: '/about' },
    ],
  },
];

const projectLinks = [
  { label: 'Android Repository', href: siteConfig.androidRepoUrl },
  { label: 'Website Repository', href: siteConfig.websiteRepoUrl },
  { label: 'GitHub Releases', href: siteConfig.androidReleasesUrl },
];

function Footer() {
  return (
    <footer className="border-t border-cova-border bg-cova-surface">
      <div className="mx-auto grid max-w-site gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.6fr_1fr_1fr_1.2fr]">
        <div>
          <div className="flex items-center">
            <CovaLogo className="h-7 w-auto" />
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-cova-muted">
            A personal vault for keeping your everyday information organized. Android is available now;
            Windows is coming soon.
          </p>
        </div>

        {columns.map((column) => (
          <nav key={column.heading} aria-label={column.heading}>
            <h2 className="text-xs font-semibold uppercase tracking-wide text-cova-faint">{column.heading}</h2>
            <ul className="mt-4 space-y-3 text-sm">
              {column.items.map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className="text-cova-muted transition hover:text-cova-text">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}

        <nav aria-label="Project">
          <h2 className="text-xs font-semibold uppercase tracking-wide text-cova-faint">Project</h2>
          <ul className="mt-4 space-y-3 text-sm">
            {projectLinks.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="text-cova-muted transition hover:text-cova-text">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="border-t border-cova-border">
        <div className="mx-auto flex max-w-site flex-col gap-2 px-4 py-5 text-xs text-cova-faint sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>© {new Date().getFullYear()} Cova Vault</p>
          <p>Android available · Windows coming soon · No website account required</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
