import Button from './Button';
import { latestRelease } from '../../config/site/site';

type Size = 'sm' | 'md' | 'lg';

function DownloadButton({ size = 'lg', className = '' }: { size?: Size; className?: string }) {
  return (
    <Button href={latestRelease.apkUrl} size={size} className={className}>
      Download Cova Vault
    </Button>
  );
}

export default DownloadButton;
