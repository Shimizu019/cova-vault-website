import Container from '../common/Container';
import Badge from '../common/Badge';
import DownloadButton, { GitHubButton } from '../buttons/DownloadButton';
import Button from '../buttons/Button';
import ScreenshotFrame from '../common/ScreenshotFrame';
import { latestRelease } from '../../config/site/site';

const modules = ['Credentials', 'Notes', 'Tasks', 'PeraLog', 'My Wallet', 'Savings', 'Folders', 'Favorites', 'Calendar', 'Password Generator', 'Activity Log'];

function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-cova-border">
      <Container className="grid items-center gap-12 py-16 lg:grid-cols-2 lg:gap-16 lg:py-24">
        <div className="reveal">
          <div className="flex flex-wrap gap-2">
            <Badge tone="success">Android available</Badge>
            <Badge tone="warning">Windows coming soon</Badge>
          </div>

          <h1 className="mt-6 text-display font-bold text-cova-text">Cova Vault</h1>

          <p className="mt-4 max-w-xl text-lg leading-relaxed text-cova-muted sm:text-xl">
            Cova Vault is a privacy-focused personal vault app for your Android device — a self-hosted,
            locally stored companion for credentials, notes, tasks, finances, savings goals, and more.
          </p>
          <p className="mt-3 max-w-xl text-base leading-relaxed text-cova-muted">
            No website account required. No cloud sync. Your information stays on your device.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <DownloadButton />
            <Button to="/features" variant="secondary" size="lg">
              Explore Features
            </Button>
            <GitHubButton size="lg" />
          </div>

          <p className="mt-5 text-sm text-cova-faint">
            Latest release {latestRelease.tag} · Download from official GitHub Releases · Free, no account
          </p>
        </div>

        <div className="reveal reveal-2">
          <ScreenshotFrame label="Cova Vault — product preview">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {modules.map((module) => (
                <div
                  key={module}
                  className="rounded-btn border border-cova-border bg-cova-elevated px-3 py-6 text-center text-xs font-medium text-cova-muted"
                >
                  {module}
                </div>
              ))}
            </div>
            <div className="mt-4 space-y-2" aria-hidden="true">
              <div className="h-2.5 w-3/4 rounded-full bg-cova-elevated" />
              <div className="h-2.5 w-1/2 rounded-full bg-cova-elevated" />
              <div className="h-2.5 w-2/3 rounded-full bg-cova-elevated" />
            </div>
          </ScreenshotFrame>
        </div>
      </Container>
    </section>
  );
}

export default HeroSection;