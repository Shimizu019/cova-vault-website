import type { WebsiteRelease } from '../../types';
import { releaseChannel, releaseChannelLabel } from '../../config/site/site';
import Button from '../buttons/Button';
import { ChevronDown } from 'lucide-react';

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

      {/* Full notes largely repeat the bullets above, so they sit behind a disclosure */}
      <details className="group mt-1">
        <summary className="inline-flex min-h-[44px] cursor-pointer list-none items-center gap-1.5 text-sm font-semibold text-cova-accent hover:underline">
          Show details
          <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" aria-hidden="true" />
        </summary>
        <p className="pb-1 text-sm leading-relaxed text-cova-muted">{release.notes}</p>
      </details>

      <div className="mt-4 flex flex-wrap gap-3">
        {showDownload && release.apkUrl ? (
          <Button href={release.apkUrl} size="md">
            Download{release.apkSize ? ` (${release.apkSize})` : ''}
          </Button>
        ) : null}
        <Button href={release.githubReleaseUrl} variant="secondary" size="md">
          View on GitHub
        </Button>
      </div>
    </article>
  );
}

export default ReleaseCard;
