import type { PlatformDownload } from '../../types';
import siteConfig from '../../config/site/site';

/** Brand-neutral Android robot head — outline style, matches WindowsIcon. */
function AndroidIcon({ className = 'h-6 w-6' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path d="M4.5 12a7.5 7.5 0 0 1 15 0z" />
      <path d="M7.7 5.9 6.2 3.4" />
      <path d="M16.3 5.9l1.5-2.5" />
      <circle cx="9.3" cy="8.7" r="0.9" fill="currentColor" stroke="none" />
      <circle cx="14.7" cy="8.7" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** Brand-neutral four-pane window glyph — outline style, matches AndroidIcon. */
function WindowsIcon({ className = 'h-6 w-6' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className} aria-hidden="true" focusable="false">
      <rect x="3.5" y="3.5" width="7.4" height="7.4" rx="1.2" />
      <rect x="13.1" y="3.5" width="7.4" height="7.4" rx="1.2" />
      <rect x="3.5" y="13.1" width="7.4" height="7.4" rx="1.2" />
      <rect x="13.1" y="13.1" width="7.4" height="7.4" rx="1.2" />
    </svg>
  );
}

const platformLabels: Record<string, { title: string; format: string; blurb: string }> = {
  android: {
    title: 'Android',
    format: 'APK',
    blurb: 'Available now from official GitHub Releases.',
  },
  windows: {
    title: 'Windows',
    format: 'EXE',
    blurb: 'Windows support is currently under development.',
  },
};

function PlatformCard({ platform }: { platform: PlatformDownload }) {
  const isAvailable = platform.status === 'available';
  const meta = platformLabels[platform.platform];

  return (
    <article
      className={`relative flex flex-col rounded-panel bg-cova-surface p-6 sm:p-7 ${
        isAvailable ? 'gradient-border shadow-glow' : 'border border-dashed border-cova-border shadow-card'
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <span
            className={`flex h-11 w-11 items-center justify-center rounded-btn ring-1 ring-inset ${
              isAvailable
                ? 'bg-cova-primary/10 text-cova-accent ring-cova-primary/30'
                : 'bg-cova-elevated text-cova-faint ring-cova-border'
            }`}
            aria-hidden="true"
          >
            {isAvailable ? <AndroidIcon /> : <WindowsIcon />}
          </span>
          <div>
            <h3 className="text-lg font-semibold text-cova-text">{meta.title}</h3>
            <p className="text-xs font-medium uppercase tracking-wide text-cova-faint">{meta.format}</p>
          </div>
        </div>
        <span
          className={`rounded-badge border px-2.5 py-1 text-xs font-semibold ${
            isAvailable
              ? 'border-cova-success/30 bg-cova-success/10 text-cova-success'
              : 'border-cova-warning/30 bg-cova-warning/10 text-cova-warning'
          }`}
        >
          {isAvailable ? 'Available' : 'Coming Soon'}
        </span>
      </div>

      <p className="mt-4 text-sm leading-relaxed text-cova-muted">{meta.blurb}</p>

      {isAvailable && platform.version ? (
        <dl className="mt-5 grid grid-cols-2 gap-3 text-sm">
          <div className="rounded-btn border border-cova-border bg-cova-elevated px-3 py-2.5">
            <dt className="text-xs text-cova-faint">Latest version</dt>
            <dd className="mt-0.5 font-medium text-cova-text">v{platform.version}</dd>
          </div>
          <div className="rounded-btn border border-cova-border bg-cova-elevated px-3 py-2.5">
            <dt className="text-xs text-cova-faint">Download size</dt>
            <dd className="mt-0.5 font-medium text-cova-text">
              {platform.apkSize ?? '~6.9 MB'}
            </dd>
          </div>
        </dl>
      ) : (
        <p className="mt-5 rounded-btn border border-cova-border bg-cova-elevated px-3 py-2.5 text-sm text-cova-faint">
          No Windows build is available yet.
        </p>
      )}

      {platform.requirements && platform.requirements.length > 0 ? (
        <ul className="mt-4 space-y-1.5 text-sm text-cova-muted">
          {platform.requirements.map((requirement) => (
            <li key={requirement} className="flex gap-2">
              <span aria-hidden="true" className="text-cova-faint">
                ·
              </span>
              {requirement}
            </li>
          ))}
        </ul>
      ) : null}

      <div className="mt-6">
        {isAvailable && platform.downloadUrl ? (
          <a
            href={platform.downloadUrl}
            className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-btn bg-cova-primary px-5 text-sm font-semibold text-white transition hover:bg-cova-hover"
          >
            Download {meta.format}
            <span aria-hidden="true">↓</span>
          </a>
        ) : (
          <a
            href={siteConfig.androidRepoUrl}
            className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-btn border border-cova-border bg-cova-elevated px-5 text-sm font-semibold text-cova-text transition hover:border-cova-primary/50 hover:text-cova-accent"
          >
            Coming soon — follow progress on GitHub
            <span aria-hidden="true">→</span>
          </a>
        )}
      </div>

      {platform.githubReleaseUrl ? (
        <a
          href={platform.githubReleaseUrl}
          className="mt-3 text-center text-sm font-medium text-cova-accent hover:underline"
        >
          View release on GitHub
        </a>
      ) : null}
    </article>
  );
}

export default PlatformCard;
