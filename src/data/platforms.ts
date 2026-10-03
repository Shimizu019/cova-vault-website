import type { PlatformDownload } from '../types';
import { latestRelease } from '../config/site/site';

export const platformDownloads: PlatformDownload[] = [
  {
    platform: 'android',
    status: 'available',
    fileFormat: 'apk',
    version: latestRelease.version,
    releaseDate: latestRelease.publishedAt,
    requirements: ['Android device', 'Ability to install APK from GitHub Releases'],
    downloadUrl: latestRelease.apkUrl,
    githubReleaseUrl: latestRelease.githubReleaseUrl,
  },
  {
    platform: 'windows',
    status: 'coming-soon',
    fileFormat: 'exe',
  },
];
