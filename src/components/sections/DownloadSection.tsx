import Container from '../common/Container';
import SectionHeading from '../common/SectionHeading';
import PlatformCard from '../cards/PlatformCard';
import { platformDownloads } from '../../data/platforms';

interface DownloadSectionProps {
  compact?: boolean;
}

function DownloadSection({ compact = false }: DownloadSectionProps) {
  return (
    <section className="border-b border-cova-border bg-cova-surface py-16 lg:py-20">
      <Container>
        <SectionHeading
          eyebrow="Download"
          title="Get Cova Vault"
          subtitle="Android is available now. Windows is coming soon — no fake downloads, only real releases."
        />
        <div className="mx-auto mt-10 grid max-w-4xl gap-5 sm:grid-cols-2">
          {platformDownloads.map((platform) => (
            <PlatformCard key={platform.platform} platform={platform} />
          ))}
        </div>
        {!compact ? (
          <p className="mt-6 text-center text-sm text-cova-faint">
            Android downloads are served from the official <span className="font-mono">Shimizu019/cova-vault</span> GitHub Releases.
          </p>
        ) : null}
      </Container>
    </section>
  );
}

export default DownloadSection;