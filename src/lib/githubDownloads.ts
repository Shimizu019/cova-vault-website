/**
 * Total APK download counts sourced live from the public GitHub Releases API
 * for `Shimizu019/cova-vault`.
 *
 * Counting rules (see task spec):
 * - Sum `download_count` only for assets whose name ends in `.apk`
 *   (case-insensitive); ZIPs, source archives, and anything else are ignored.
 * - Stable and beta releases are all included; drafts are skipped.
 * - Pagination is followed via the `Link: rel="next"` response header so
 *   older published releases are never silently omitted.
 * - No token, no secret, no backend — the public unauthenticated API.
 * - Successful totals are cached in `localStorage` for ~15 minutes to avoid
 *   hammering the API; a stale cache is reused as a last-known value when a
 *   refresh fails instead of inventing a count.
 */

const API_BASE = 'https://api.github.com/repos/Shimizu019/cova-vault/releases';
const PER_PAGE = 100;
const MAX_PAGES = 10;
const CACHE_KEY = 'cova:apk-download-count-v1';
const CACHE_TTL_MS = 15 * 60 * 1000;

interface CachedTotal {
  v: 1;
  total: number;
  fetchedAt: number;
}

export interface DownloadCache {
  total: number;
  fresh: boolean;
}

/** Read a cached total if it is structurally valid; never throws. */
export function readDownloadCache(now: number = Date.now()): DownloadCache | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<CachedTotal>;
    if (parsed.v !== 1 || typeof parsed.total !== 'number' || !Number.isFinite(parsed.total)) return null;
    if (typeof parsed.fetchedAt !== 'number' || parsed.fetchedAt > now) return null;
    return { total: Math.max(0, Math.floor(parsed.total)), fresh: now - parsed.fetchedAt < CACHE_TTL_MS };
  } catch {
    return null;
  }
}

function writeDownloadCache(total: number): void {
  try {
    const payload: CachedTotal = { v: 1, total, fetchedAt: Date.now() };
    localStorage.setItem(CACHE_KEY, JSON.stringify(payload));
  } catch {
    // Private mode / blocked storage: caching is best-effort only.
  }
}

function isApkAsset(asset: unknown): boolean {
  if (typeof asset !== 'object' || asset === null) return false;
  const name = (asset as { name?: unknown }).name;
  return typeof name === 'string' && name.toLowerCase().endsWith('.apk');
}

function countInRelease(release: unknown): number {
  if (typeof release !== 'object' || release === null) return 0;
  const entry = release as { draft?: unknown; assets?: unknown };
  if (entry.draft === true) return 0;
  if (!Array.isArray(entry.assets)) return 0;
  return entry.assets.reduce((sum: number, asset: unknown) => {
    if (!isApkAsset(asset)) return sum;
    const count = (asset as { download_count?: unknown }).download_count;
    if (typeof count !== 'number' || !Number.isFinite(count) || count <= 0) return sum;
    return sum + Math.floor(count);
  }, 0);
}

function nextPageUrl(linkHeader: string | null): string | null {
  if (!linkHeader) return null;
  const match = /<([^>]+)>\s*;\s*rel="next"/.exec(linkHeader);
  return match ? match[1] : null;
}

/** Fetch every published release page and sum APK download counts. */
export async function fetchApkDownloadTotal(signal?: AbortSignal): Promise<number> {
  let url: string | null = `${API_BASE}?per_page=${PER_PAGE}`;
  let total = 0;
  let pages = 0;
  while (url !== null && pages < MAX_PAGES) {
    pages += 1;
    const response = await fetch(url, {
      headers: { Accept: 'application/vnd.github+json' },
      signal,
    });
    if (!response.ok) {
      throw new Error(`GitHub Releases API responded with status ${response.status}`);
    }
    const data: unknown = await response.json();
    if (!Array.isArray(data)) {
      throw new Error('Unexpected GitHub Releases response shape');
    }
    for (const release of data) {
      total += countInRelease(release);
    }
    url = nextPageUrl(response.headers.get('link'));
  }
  return total;
}

export interface DownloadTotalResult {
  total: number;
  /** True when the value came from a stale cache after a failed refresh. */
  fromCache: boolean;
}

/**
 * Resolve the total APK download count: live from GitHub, falling back to a
 * stale cache on failure. Rejects only when there is no usable value at all
 * (and never on abort — the abort is rethrown for the caller to ignore).
 */
export async function getApkDownloadTotal(signal?: AbortSignal): Promise<DownloadTotalResult> {
  try {
    const total = await fetchApkDownloadTotal(signal);
    writeDownloadCache(total);
    return { total, fromCache: false };
  } catch (error) {
    if (typeof error === 'object' && error !== null && (error as { name?: unknown }).name === 'AbortError') {
      throw error;
    }
    const cached = readDownloadCache();
    if (cached) {
      return { total: cached.total, fromCache: true };
    }
    throw error;
  }
}
