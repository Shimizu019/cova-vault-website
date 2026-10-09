import { Download } from 'lucide-react';
import { useApkDownloads } from '../../hooks/useApkDownloads';

interface DownloadCounterProps {
  align?: 'left' | 'center';
  className?: string;
}

/**
 * Total APK download count as reported live by the public GitHub Releases
 * API — never hardcoded, never a user/install estimate. Shows restrained
 * loading and unavailable states; download links elsewhere on the page keep
 * working regardless of this component's state.
 */
function DownloadCounter({ align = 'left', className = '' }: DownloadCounterProps) {
  const { status, total, stale } = useApkDownloads();
  const alignment = align === 'center' ? 'items-center text-center' : 'items-start';

  return (
    <div className={`flex flex-col gap-1 ${alignment} ${className}`} aria-live="polite">
      {status === 'loading' ? (
        <p className="inline-flex items-center gap-2 text-sm font-medium text-cova-muted">
          <Download className="h-4 w-4 animate-pulse" aria-hidden="true" />
          Checking GitHub download stats…
        </p>
      ) : null}

      {status === 'ready' && total !== null ? (
        <>
          <p className="inline-flex items-center gap-2 text-sm font-semibold text-cova-text">
            <Download className="h-4 w-4 text-cova-accent" aria-hidden="true" />
            {total.toLocaleString('en-US')} total APK downloads
          </p>
          <p className="text-xs text-cova-faint">
            Total reported by GitHub across published APK releases{stale ? ' (last known total)' : ''}.
          </p>
        </>
      ) : null}

      {status === 'unavailable' ? (
        <>
          <p className="inline-flex items-center gap-2 text-sm font-medium text-cova-muted">
            <Download className="h-4 w-4" aria-hidden="true" />
            GitHub download stats are temporarily unavailable.
          </p>
          <p className="text-xs text-cova-faint">Download links on this page still work.</p>
        </>
      ) : null}
    </div>
  );
}

export default DownloadCounter;
