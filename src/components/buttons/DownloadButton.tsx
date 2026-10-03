import Button from './Button';
import siteConfig, { latestRelease } from '../../config/site/site';

function DownloadButton({ size = 'lg', className = '' }: { size?: 'sm' | 'md' | 'lg'; className?: string }) {
  return (
    <Button href={latestRelease.apkUrl} size={size} className={className}>
      Download APK · v{latestRelease.version}
    </Button>
  );
}

export function GitHubButton({ href = siteConfig.androidRepoUrl }: { href?: string }) {
  return (
    <Button href={href} variant="secondary" size="md">
      View GitHub
    </Button>
  );
}

export default DownloadButton;
