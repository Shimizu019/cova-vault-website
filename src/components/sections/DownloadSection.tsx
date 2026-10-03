import Container from '../common/Container';
import SectionHeading from '../common/SectionHeading';
import PlatformCard from '../cards/PlatformCard';
import Button from '../buttons/Button';
import { platformDownloads } from '../../data/platforms';

interface DownloadSectionProps {
  compact?: boolean;
}

function DownloadSection({ compact = false }: DownloadSectionProps) {
  return (
    <section className="border-b border-cova-border py-16 lg:py-20">
      <Container>
        <SectionHeading
          eyebrow="Download"
          title="Get Cova Vault"
          subtitle="Android is available now. Windows is coming soon — downloads are served only from official GitHub Releases."
        />
        <div className="mx-auto mt-10 grid max-w-4xl gap-5 sm:grid-cols-2">
          {platformDownloads.map((platform) => (
            <PlatformCard key={platform.platform} platform={platform} />
          ))}
        </div>

        {/* How to install the APK — 3 steps, full guide in Documentation */}
        <div className="mx-auto mt-8 flex max-w-4xl flex-col gap-4 rounded-card border border-cova-border bg-cova-surface px-5 py-4 shadow-card sm:flex-row sm:items-center sm:justify-between sm:gap-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-cova-accent">How to install the APK</p>
            <ol className="mt-2 flex flex-col gap-1.5 text-sm text-cova-muted sm:flex-row sm:flex-wrap sm:gap-x-5">
              {[
                'Open the official GitHub Release',
                'Download the APK file',
                'Allow installs from this source',
              ].map((step, index) => (
                <li key={step} className="flex items-center gap-2">
                  <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full border border-cova-border bg-cova-elevated text-[10px] font-semibold text-cova-faint">
                    {index + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </div>
          <Button to="/documentation#installation" variant="secondary" size="sm" className="shrink-0">
            Installation guide
          </Button>
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