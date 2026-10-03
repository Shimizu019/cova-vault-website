import type { PlatformDownload } from '../../types';

function PlatformCard({ platform }: { platform: PlatformDownload }) {
  const isAvailable = platform.status === 'available';
  const title = platform.platform === 'android' ? 'Android' : 'Windows';
  const format = platform.platform === 'android' ? 'APK' : 'EXE';

  return (
    <article className="flex flex-col rounded-xl border border-cova-border bg-cova-surface p-6">
      <h3 className="text-xl font-bold text-cova-text">{title}</h3>
      <p className="mt-1 text-sm text-cova-muted">
        {isAvailable ? 'Available' : 'Coming Soon'} · {format}
      </p>
      {platform.version ? <p className="mt-3 text-sm text-cova-muted">Latest version: {platform.version}</p> : null}
      {platform.requirements && platform.requirements.length > 0 ? (
        <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-cova-muted">
          {platform.requirements.map((requirement) => (
            <li key={requirement}>{requirement}</li>
          ))}
        </ul>
      ) : (
        <p className="mt-3 text-sm text-cova-muted">Windows version coming later.</p>
      )}
      <div className="mt-5">
        {isAvailable && platform.downloadUrl ? (
          <a
            href={platform.downloadUrl}
            className="inline-flex min-h-[44px] items-center justify-center rounded-lg bg-cova-primary px-5 py-3 text-sm font-semibold text-white hover:bg-cova-accent"
          >
            Download {format}
          </a>
        ) : (
          <span
            aria-disabled="true"
            className="inline-flex min-h-[44px] cursor-not-allowed items-center justify-center rounded-lg border border-cova-border bg-cova-elevated px-5 py-3 text-sm font-semibold text-cova-muted opacity-70"
          >
            Coming Soon
          </span>
        )}
      </div>
      {platform.githubReleaseUrl ? (
        <a href={platform.githubReleaseUrl} className="mt-3 text-sm font-semibold text-cova-accent hover:underline">
          View GitHub release
        </a>
      ) : null}
    </article>
  );
}

export default PlatformCard;
