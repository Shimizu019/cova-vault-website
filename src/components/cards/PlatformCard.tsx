import type { PlatformDownload } from '../../types';

const platformLabels: Record<string, { title: string; format: string; icon: string; blurb: string }> = {
  android: {
    title: 'Android',
    format: 'APK',
    icon: '🤖',
    blurb: 'Available now from official GitHub Releases.',
  },
  windows: {
    title: 'Windows',
    format: 'EXE',
    icon: '🖥️',
    blurb: 'Windows support is currently under development.',
  },
};

function PlatformCard({ platform }: { platform: PlatformDownload }) {
  const isAvailable = platform.status === 'available';
  const meta = platformLabels[platform.platform];

  return (
    <article
      className={`relative flex flex-col rounded-panel border bg-cova-surface p-6 shadow-card sm:p-7 ${
        isAvailable ? 'border-cova-border' : 'border-dashed border-cova-border'
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <span
            className="flex h-11 w-11 items-center justify-center rounded-btn border border-cova-border bg-cova-elevated text-xl"
            aria-hidden="true"
          >
            {meta.icon}
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
          <span
            aria-disabled="true"
            className="inline-flex min-h-[44px] w-full cursor-not-allowed items-center justify-center rounded-btn border border-cova-border bg-cova-elevated px-5 text-sm font-semibold text-cova-faint"
          >
            Coming Soon
          </span>
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
