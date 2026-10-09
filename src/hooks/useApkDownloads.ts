import { useEffect, useState } from 'react';
import { getApkDownloadTotal, readDownloadCache } from '../lib/githubDownloads';

export interface ApkDownloadState {
  status: 'loading' | 'ready' | 'unavailable';
  total: number | null;
  /** True when the shown total is a last-known cached value, not a fresh one. */
  stale: boolean;
}

/**
 * Live APK download total from the public GitHub Releases API.
 *
 * - Shows a fresh cache immediately without a network request.
 * - Uses an AbortController so unmounted components never receive late updates.
 * - On refresh failure keeps a stale cached value (marked `stale`); only when
 *   no value exists at all does the state become `unavailable`.
 */
export function useApkDownloads(): ApkDownloadState {
  const [state, setState] = useState<ApkDownloadState>(() => {
    const cached = readDownloadCache();
    if (cached) {
      return { status: 'ready', total: cached.total, stale: !cached.fresh };
    }
    return { status: 'loading', total: null, stale: false };
  });

  useEffect(() => {
    if (readDownloadCache()?.fresh) return;
    let cancelled = false;
    const controller = new AbortController();
    getApkDownloadTotal(controller.signal)
      .then(({ total, fromCache }) => {
        if (!cancelled) {
          setState({ status: 'ready', total, stale: fromCache });
        }
      })
      .catch((error: unknown) => {
        if (cancelled) return;
        if (typeof error === 'object' && error !== null && (error as { name?: unknown }).name === 'AbortError') {
          return;
        }
        setState((previous) =>
          previous.total !== null
            ? { status: 'ready', total: previous.total, stale: true }
            : { status: 'unavailable', total: null, stale: false },
        );
      });
    return () => {
      cancelled = true;
      controller.abort();
    };
  }, []);

  return state;
}
