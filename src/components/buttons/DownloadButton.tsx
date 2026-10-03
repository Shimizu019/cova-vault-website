import Button from './Button';
import siteConfig, { latestRelease } from '../../config/site/site';

type Size = 'sm' | 'md' | 'lg';

function DownloadButton({ size = 'lg', className = '' }: { size?: Size; className?: string }) {
  return (
    <Button href={latestRelease.apkUrl} size={size} className={className}>
      Download Cova Vault
    </Button>
  );
}

export function GitHubButton({ size = 'md', className = '' }: { size?: Size; className?: string }) {
  return (
    <Button href={siteConfig.androidRepoUrl} variant="secondary" size={size} className={className}>
      View on GitHub
    </Button>
  );
}

export default DownloadButton;
