import type { WebsiteRelease } from '../../types';

function formatDate(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
}

function ReleaseCard({ release, showDownload = false }: { release: WebsiteRelease; showDownload?: boolean }) {
  return (
    <article className="rounded-xl border border-cova-border bg-cova-surface p-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-cova-accent">{release.tag}</span>
          <span className="rounded-full border border-cova-border px-2 py-0.5 text-xs text-cova-muted">
            {release.stable ? 'Stable' : 'Beta'}
          </span>
        </div>
        <span className="text-xs text-cova-muted">{formatDate(release.publishedAt)}</span>
      </div>
      <h3 className="mt-2 text-base font-semibold text-cova-text">{release.title}</h3>
      <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-cova-muted">
        {release.highlights.map((highlight) => (
          <li key={highlight}>{highlight}</li>
        ))}
      </ul>
      <p className="mt-3 text-sm leading-relaxed text-cova-muted">{release.notes}</p>
      <div className="mt-4 flex flex-wrap gap-3 text-sm font-semibold">
        <a href={release.githubReleaseUrl} className="text-cova-accent hover:underline">
          GitHub release
        </a>
        {showDownload && release.apkUrl ? (
          <a href={release.apkUrl} className="text-cova-accent hover:underline">
            Download APK{release.apkSize ? ` (${release.apkSize})` : ''}
          </a>
        ) : null}
      </div>
    </article>
  );
}

export default ReleaseCard;
