import type { WebsiteRelease } from '../../types';
import { releaseChannel, releaseChannelLabel } from '../../config/site/site';

function formatDate(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
}

interface ReleaseCardProps {
  release: WebsiteRelease;
  showDownload?: boolean;
  /** Timeline entry highlight (latest release) */
  featured?: boolean;
}

function ReleaseCard({ release, showDownload = false, featured = false }: ReleaseCardProps) {
  const channel = releaseChannel(release);
  return (
    <article
      className={`relative rounded-card border bg-cova-surface shadow-card ${
        featured ? 'border-cova-primary/40 p-6 sm:p-7' : 'border-cova-border p-6'
      }`}
    >
      <div className="flex flex-wrap items-center gap-2">
        <span className="font-mono text-sm font-bold text-cova-accent">{release.tag}</span>
        <span
          className={`rounded-badge border px-2.5 py-0.5 text-xs font-medium ${
            channel === 'stable'
              ? 'border-cova-success/30 bg-cova-success/10 text-cova-success'
              : channel === 'prerelease'
                ? 'border-cova-warning/30 bg-cova-warning/10 text-cova-warning'
                : 'border-cova-border bg-cova-elevated text-cova-muted'
          }`}
        >
          {releaseChannelLabel(release)}
        </span>
        {featured ? (
          <span className="rounded-badge border border-cova-primary/40 bg-cova-primary/10 px-2.5 py-0.5 text-xs font-medium text-cova-accent">
            Latest
          </span>
        ) : null}
        <time dateTime={release.publishedAt} className="ml-auto text-xs text-cova-faint">
          {formatDate(release.publishedAt)}
        </time>
      </div>

      <h3 className="mt-3 text-base font-semibold text-cova-text">{release.title}</h3>

      {release.highlights.length > 0 ? (
        <ul className="mt-3 space-y-1.5 text-sm text-cova-muted">
          {release.highlights.map((highlight) => (
            <li key={highlight} className="flex gap-2">
              <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-cova-faint" />
              {highlight}
            </li>
          ))}
        </ul>
      ) : null}

      <p className="mt-3 text-sm leading-relaxed text-cova-muted">{release.notes}</p>

      <div className="mt-5 flex flex-wrap gap-4 text-sm font-semibold">
        <a href={release.githubReleaseUrl} className="text-cova-accent hover:underline">
          View on GitHub
        </a>
        {showDownload && release.apkUrl ? (
          <a href={release.apkUrl} className="text-cova-accent hover:underline">
            Download{release.apkSize ? ` (${release.apkSize})` : ''}
          </a>
        ) : null}
      </div>
    </article>
  );
}

export default ReleaseCard;
