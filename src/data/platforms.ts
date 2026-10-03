import type { PlatformDownload } from '../types';
import { latestRelease } from '../config/site/site';

export const platformDownloads: PlatformDownload[] = [
  {
    platform: 'android',
    status: 'available',
    fileFormat: 'apk',
    version: latestRelease.version,
    releaseDate: latestRelease.publishedAt,
    apkSize: latestRelease.apkSize,
    requirements: [
      `Android 7.0 (API 24) or newer`,
      'Ability to install an APK from the official GitHub Releases',
    ],
    downloadUrl: latestRelease.apkUrl,
    githubReleaseUrl: latestRelease.githubReleaseUrl,
  },
  {
    platform: 'windows',
    status: 'coming-soon',
    fileFormat: 'exe',
  },
];
