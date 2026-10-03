import type { WebsiteRelease } from '../../types';

export const ANDROID_REPO = 'Shimizu019/cova-vault';
export const WEBSITE_REPO = 'Shimizu019/cova-vault-website';
export const ANDROID_REPO_URL = `https://github.com/${ANDROID_REPO}`;
export const WEBSITE_REPO_URL = `https://github.com/${WEBSITE_REPO}`;
export const ANDROID_RELEASES_URL = `${ANDROID_REPO_URL}/releases`;

const formatSize = (bytes?: number): string | undefined => {
  if (!bytes) return undefined;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
};

const release = (
  version: string,
  tag: string,
  publishedAt: string,
  prerelease: boolean,
  stable: boolean,
  title: string,
  highlights: string[],
  notes: string,
  apkName: string,
  apkBytes: number,
): WebsiteRelease => ({
  version,
  tag,
  publishedAt,
  prerelease,
  stable,
  title,
  highlights,
  notes,
  apkName,
  apkUrl: `${ANDROID_REPO_URL}/releases/download/${tag}/${apkName}`,
  apkSize: formatSize(apkBytes),
  githubReleaseUrl: `${ANDROID_REPO_URL}/releases/tag/${tag}`,
});

export const releases: WebsiteRelease[] = [
  release('0.2.0-beta', 'v0.2.0-beta', '2026-10-01T10:40:50Z', true, false, 'Cova v0.2.0-beta',
    ['Latest beta release', 'Android APK available'],
    'Latest beta release of Cova Vault. See GitHub for full release notes.',
    'app-CovaVault-v0.2.0-beta.apk', 6925767),
  release('0.1.9-beta.2', 'v0.1.9-beta.2', '2026-09-26T01:01:57Z', true, false, 'Cova v0.1.9-beta.2',
    ['Beta maintenance release', 'Android APK available'],
    'Beta maintenance release. See GitHub for full release notes.',
    'app-CovaVault-v0.1.9-beta.2.apk', 6918355),
  release('0.1.1', 'v0.1.1', '2026-09-24T03:20:45Z', false, true, 'Cova v0.1.1',
    ['Stable release', 'Android APK available'],
    'Stable release. See GitHub for full release notes.',
    'app-CovaVault-v0.1.1.apk', 6914703),
  release('0.1.0', 'v0.1.0', '2026-09-19T11:58:44Z', false, true, 'Cova v0.1.0',
    ['Stable release', 'Android APK available'],
    'Stable release. See GitHub for full release notes.',
    'app-CovaVault-v0.1.0.apk', 6914547),
  release('0.1.9-beta', 'v0.1.9-beta', '2026-09-17T09:56:57Z', true, false, 'v0.1.9',
    ['Beta release', 'Android APK available'],
    'Beta release. See GitHub for full release notes.',
    'app-CovaVault-v0.1.9-beta.apk', 6914255),
  release('0.1.8-beta', 'v0.1.8-beta', '2026-09-17T01:01:03Z', true, false, 'v0.1.8-beta',
    [
      'Persistence diagnostics: save, logout, restart, unlock lifecycle checks',
      'Build identity stamping with version, build number, commit, and build time',
      'Fixed peso sign and separator character rendering in Wallet',
    ],
    'Beta testing release focused on persistence diagnostics, build identity stamping, and character rendering fixes. Some features may still change.',
    'app-CovaVault-v0.1.8-beta.apk', 6909255),
  release('0.1.7-beta', 'v0.1.7-beta', '2026-09-16T12:28:18Z', true, false, 'v0.1.7-beta',
    ['Beta release', 'Android APK available'],
    'Beta release. See GitHub for full release notes.',
    'app-CovaVault-v0.1.7-beta.apk', 6898523),
  release('0.1.6-beta', 'v0.1.6-beta', '2026-09-16T11:55:02Z', true, false, 'v0.1.6-beta',
    ['Beta release', 'Android APK available'],
    'Beta release. See GitHub for full release notes.',
    'app-CovaVault-v0.1.6-beta.apk', 6898383),
  release('0.1.5-beta', 'v0.1.5-beta', '2026-09-16T10:56:01Z', true, false, 'v0.1.5-beta',
    ['Beta release', 'Android APK available'],
    'Beta release. See GitHub for full release notes.',
    'app-CovaVault-v0.1.5-beta.apk', 6898007),
  release('0.1.3-beta', 'v0.1.3-beta', '2026-09-16T08:15:22Z', true, false, 'v0.1.3-beta',
    ['Beta release', 'Android APK available'],
    'Beta release. See GitHub for full release notes.',
    'app-CovaVault-v0.1.3-beta.apk', 6898063),
  release('0.1.2-beta', 'v0.1.2-beta', '2026-09-16T06:56:59Z', true, false, 'v0.1.2-beta',
    ['Beta release', 'Android APK available'],
    'Beta release. See GitHub for full release notes.',
    'app-CovaVault-v0.1.2-beta.apk', 6896899),
  release('0.1.1-beta', 'v0.1.1-beta', '2026-09-13T11:10:56Z', true, false, 'v0.1.1-beta',
    ['Beta release', 'Android APK available'],
    'Beta release. See GitHub for full release notes.',
    'app-CovaVault-v0.1.1-beta.apk', 6896687),
];

export const latestRelease = releases[0];

const siteConfig = {
  productName: 'Cova Vault',
  websiteName: 'Cova Vault — Official Website',
  tagline: 'Your personal vault for keeping important information organized.',
  androidRepo: ANDROID_REPO,
  websiteRepo: WEBSITE_REPO,
  androidRepoUrl: ANDROID_REPO_URL,
  websiteRepoUrl: WEBSITE_REPO_URL,
  androidReleasesUrl: ANDROID_RELEASES_URL,
};

export default siteConfig;

