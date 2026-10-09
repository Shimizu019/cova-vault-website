import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useTheme } from '../../hooks/useTheme';
import siteConfig from '../../config/site/site';
import CovaLogo from '../common/CovaLogo';
import ThemeButton from './ThemeButton';

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
  const location = useLocation();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const skipFocus = useRef(true);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!open) {
      if (!skipFocus.current) toggleRef.current?.focus();
      skipFocus.current = false;
      return;
    }
    menuRef.current?.querySelector<HTMLElement>('a, button')?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-cova-border bg-cova-bg/80 shadow-nav backdrop-blur-xl">
      <nav aria-label="Primary" className="mx-auto flex max-w-site items-center justify-between gap-4 px-4 py-2.5 sm:px-6">
        <Link to="/" className="flex min-h-[44px] items-center pr-2">
          <CovaLogo className="h-7 w-auto" />
        </Link>

        <ul className="hidden items-center gap-0.5 lg:flex">
          {links.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  `relative flex min-h-[44px] items-center rounded-btn px-3 text-sm font-medium transition ${
                    isActive ? 'bg-cova-elevated text-cova-text' : 'text-cova-muted hover:bg-cova-elevated/60 hover:text-cova-text'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {link.label}
                    <span
                      aria-hidden="true"
                      className={`absolute inset-x-3 bottom-1 h-0.5 rounded-full bg-cova-primary transition-opacity ${
                        isActive ? 'opacity-100' : 'opacity-0'
                      }`}
                    />
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-1 lg:flex">
          <a
            href={siteConfig.androidRepoUrl}
            className="inline-flex min-h-[44px] items-center gap-1.5 rounded-btn px-3 text-sm font-medium text-cova-muted transition hover:text-cova-text"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 .5C5.73.5.75 5.48.75 11.76c0 4.98 3.22 9.2 7.69 10.69.56.1.77-.24.77-.54v-2.1c-3.13.68-3.79-1.34-3.79-1.34-.51-1.3-1.25-1.65-1.25-1.65-1.02-.7.08-.68.08-.68 1.13.08 1.72 1.16 1.72 1.16 1 1.72 2.63 1.22 3.27.94.1-.73.39-1.23.71-1.51-2.5-.28-5.13-1.25-5.13-5.57 0-1.23.44-2.23 1.16-3.02-.12-.29-.5-1.43.11-2.98 0 0 .95-.3 3.11 1.15a10.7 10.7 0 0 1 5.66 0c2.16-1.45 3.11-1.15 3.11-1.15.61 1.55.23 2.69.11 2.98.72.79 1.16 1.79 1.16 3.02 0 4.33-2.63 5.28-5.14 5.56.4.35.76 1.03.76 2.08v3.08c0 .3.2.65.78.54 4.46-1.49 7.68-5.71 7.68-10.69C23.25 5.48 18.27.5 12 .5Z" />
            </svg>
            GitHub
          </a>
          <ThemeButton mode={mode} cycle={cycle} />
          <Link
            to="/download"
            className="ml-1 inline-flex min-h-[44px] items-center rounded-btn bg-cova-primary px-4 text-sm font-semibold text-white transition hover:bg-cova-hover"
          >
            Download
          </Link>
        </div>

        <div className="flex items-center gap-1 lg:hidden">
          <ThemeButton mode={mode} cycle={cycle} />
          <button
            ref={toggleRef}
            type="button"
            className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-btn text-cova-text"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((value) => !value)}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              {open ? <path d="M18 6 6 18M6 6l12 12" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </nav>

      {open ? (
        <div id="mobile-menu" ref={menuRef} className="border-t border-cova-border bg-cova-bg px-4 pb-5 pt-2 lg:hidden">
          <ul className="divide-y divide-cova-border">
            {links.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    `flex min-h-[44px] items-center text-base font-medium ${
                      isActive ? 'text-cova-accent' : 'text-cova-text'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <div className="mt-4 grid gap-2">
            <Link
              to="/download"
              className="inline-flex min-h-[44px] items-center justify-center rounded-btn bg-cova-primary px-4 text-sm font-semibold text-white"
            >
              Download Cova Vault
            </Link>
            <a
              href={siteConfig.androidRepoUrl}
              className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-btn border border-cova-border px-4 text-sm font-semibold text-cova-text"
            >
              GitHub
            </a>
          </div>
        </div>
      ) : null}
    </header>
  );
}

export default Navbar;