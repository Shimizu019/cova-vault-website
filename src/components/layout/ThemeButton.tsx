import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useTheme } from '../../hooks/useTheme';
import siteConfig from '../../config/site/site';
import BrandMark from '../common/BrandMark';

const links = [
  { to: '/', label: 'Home' },
  { to: '/features', label: 'Features' },
  { to: '/security', label: 'Security' },
  { to: '/download', label: 'Download' },
  { to: '/changelog', label: 'Changelog' },
  { to: '/documentation', label: 'Documentation' },
  { to: '/about', label: 'About' },
];

function ThemeButton({ mode, cycle }: { mode: string; cycle: () => void }) {
  const label = mode === 'light' ? 'Light theme' : mode === 'system' ? 'System theme' : 'Dark theme';
  return (
    <button
      type="button"
      onClick={cycle}
      aria-label={`Theme: ${label}. Activate to change theme.`}
      title={`Theme: ${label}`}
      className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-btn text-cova-muted transition hover:bg-cova-elevated hover:text-cova-text"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        {mode === 'light' ? (
          <>
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
          </>
        ) : mode === 'system' ? (
          <>
            <rect x="2" y="3" width="20" height="14" rx="2" />
            <path d="M8 21h8M12 17v4" />
          </>
        ) : (
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" />
        )}
      </svg>
    </button>
  );
}

export { ThemeButton };
export default ThemeButton;