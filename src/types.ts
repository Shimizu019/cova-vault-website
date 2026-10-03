export type PlatformStatus = 'available' | 'coming-soon';
export type ThemeMode = 'dark' | 'light' | 'system';

export interface PlatformDownload {
  platform: 'android' | 'windows';
  status: PlatformStatus;
  fileFormat: 'apk' | 'exe';
  version?: string;
  releaseDate?: string;
  requirements?: string[];
  downloadUrl?: string;
  githubReleaseUrl?: string;
  checksum?: string;
}

export interface WebsiteRelease {
  version: string;
  tag: string;
  publishedAt: string;
  prerelease: boolean;
  stable: boolean;
  title: string;
  highlights: string[];
  notes: string;
  apkUrl?: string;
  apkName?: string;
  apkSize?: string;
  githubReleaseUrl: string;
}

export interface Feature {
  key: string;
  name: string;
  description: string;
  capabilities: string[];
  icon: string;
  docsId: string;
  status: 'available' | 'beta';
}

export interface DocumentationTopic {
  id: string;
  title: string;
  summary: string;
  body: string[];
  relatedFeatures: string[];
}
