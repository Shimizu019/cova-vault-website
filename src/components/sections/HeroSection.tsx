import Container from '../common/Container';
import Badge from '../common/Badge';
import DownloadButton from '../buttons/DownloadButton';
import Button from '../buttons/Button';
import GitHubIcon from '../common/GitHubIcon';
import PhoneMockup from '../common/PhoneMockup';
import siteConfig, { latestRelease } from '../../config/site/site';

function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-cova-border">
      {/* Radial blue/violet depth behind the hero */}
      <div className="hero-glow" aria-hidden="true" />

      <Container className="relative grid items-center gap-14 py-16 lg:grid-cols-2 lg:gap-16 lg:py-24">
        <div className="reveal">
          <div className="flex flex-wrap gap-2">
            <Badge tone="success" dot>
              Android available
            </Badge>
            <Badge tone="warning" dot>
              Windows coming soon
            </Badge>
          </div>

          <h1 className="mt-6 text-display font-bold text-cova-text">
            Cova <span className="gradient-text">Vault</span>
          </h1>

          <p className="mt-5 max-w-[60ch] text-lg leading-relaxed text-cova-muted sm:text-xl">
            Cova Vault is a privacy-focused personal vault app for your Android device — a self-hosted,
            locally stored companion for credentials, notes, tasks, finances, savings goals, and more.
          </p>
          <p className="mt-3 max-w-[60ch] text-base leading-relaxed text-cova-muted">
            No website account required. No cloud sync. Your information stays on your device.
          </p>

          {/* Primary + secondary CTA on one row; stacks only on mobile */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <DownloadButton />
            <Button to="/features" variant="secondary" size="lg">
              Explore Features
            </Button>
          </div>

          <a
            href={siteConfig.androidRepoUrl}
            className="mt-4 inline-flex min-h-[44px] items-center gap-2 text-sm font-semibold text-cova-muted transition hover:text-cova-text"
          >
            <GitHubIcon className="h-4 w-4" />
            View on GitHub
          </a>

          {/* Compact trust strip under the CTAs */}
          <p className="mt-2 flex w-fit flex-wrap items-center gap-x-2 gap-y-1 rounded-badge border border-cova-border bg-cova-surface/70 px-3.5 py-1.5 text-xs font-medium text-cova-muted shadow-card backdrop-blur">
            <span className="font-mono font-bold text-cova-text">{latestRelease.tag}</span>
            <span aria-hidden="true" className="text-cova-faint">
              ·
            </span>
            <span>{latestRelease.apkSize}</span>
            <span aria-hidden="true" className="text-cova-faint">
              ·
            </span>
            <span>Android 7.0+</span>
          </p>

          <p className="mt-4 max-w-[60ch] text-sm text-cova-faint">
            Free, no account — straight from official GitHub Releases
          </p>
        </div>

        <div className="reveal reveal-2">
          <PhoneMockup />
        </div>
      </Container>
    </section>
  );
}

export default HeroSection;