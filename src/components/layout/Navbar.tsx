import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useTheme } from '../../hooks/useTheme';
import siteConfig from '../../config/site/site';

const links = [
  { to: '/', label: 'Home' },
  { to: '/features', label: 'Features' },
  { to: '/security', label: 'Security' },
  { to: '/download', label: 'Download' },
  { to: '/changelog', label: 'Changelog' },
  { to: '/documentation', label: 'Documentation' },
  { to: '/about', label: 'About' },
];

function Navbar() {
  const { mode, cycle } = useTheme();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-cova-border bg-cova-bg backdrop-blur">
      <nav aria-label="Primary" className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link to="/" className="text-lg font-bold text-cova-text" onClick={() => setOpen(false)}>
          Cova Vault
        </Link>
        <ul className="hidden items-center gap-1 lg:flex">
          {links.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  `rounded-md px-3 py-2 text-sm font-medium ${isActive ? 'text-cova-accent' : 'text-cova-muted hover:text-cova-text'}`
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
        <div className="hidden items-center gap-2 lg:flex">
          <a href={siteConfig.androidRepoUrl} className="rounded-md px-3 py-2 text-sm font-medium text-cova-muted hover:text-cova-text">
            GitHub
          </a>
          <button type="button" onClick={cycle} className="min-h-[44px] rounded-md border border-cova-border px-3 text-sm text-cova-muted">
            Theme: {mode}
          </button>
          <Link to="/download" className="inline-flex min-h-[44px] items-center rounded-lg bg-cova-primary px-4 py-2 text-sm font-semibold text-white hover:bg-cova-accent">
            Download
          </Link>
        </div>
        <button
          type="button"
          className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-md border border-cova-border text-cova-text lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((value) => !value)}
        >
          ☰
        </button>
      </nav>
      {open ? (
        <div id="mobile-menu" className="border-t border-cova-border bg-cova-bg px-4 py-4 lg:hidden">
          <ul className="space-y-1">
            {links.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `block rounded-md px-3 py-3 text-base font-medium ${isActive ? 'text-cova-accent' : 'text-cova-text'}`
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <div className="mt-4 grid gap-2">
            <Link to="/download" onClick={() => setOpen(false)} className="inline-flex min-h-[44px] items-center justify-center rounded-lg bg-cova-primary px-4 py-3 text-sm font-semibold text-white">
              Download
            </Link>
            <a href={siteConfig.androidRepoUrl} className="inline-flex min-h-[44px] items-center justify-center rounded-lg border border-cova-border px-4 py-3 text-sm font-semibold text-cova-text">
              GitHub
            </a>
            <button type="button" onClick={cycle} className="inline-flex min-h-[44px] items-center justify-center rounded-lg border border-cova-border px-4 py-3 text-sm text-cova-muted">
              Theme: {mode}
            </button>
          </div>
        </div>
      ) : null}
    </header>
  );
}

export default Navbar;
