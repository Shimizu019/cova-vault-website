import SEO from '../components/common/SEO';
import Container from '../components/common/Container';
import SectionHeading from '../components/common/SectionHeading';
import Badge from '../components/common/Badge';
import DownloadButton, { GitHubButton } from '../components/buttons/DownloadButton';
import Button from '../components/buttons/Button';
import FeatureCard from '../components/cards/FeatureCard';
import ReleaseCard from '../components/cards/ReleaseCard';
import PlatformCard from '../components/cards/PlatformCard';
import DocumentationCard from '../components/cards/DocumentationCard';
import { features } from '../data/features';
import { documentationTopics } from '../data/documentation';
import { platformDownloads } from '../data/platforms';
import { latestRelease, releases } from '../config/site/site';

function Home() {
  return (
    <>
      <SEO
        title="Cova Vault — Your personal vault"
        description="Cova Vault organizes credentials, notes, tasks, PeraLog, wallet, savings, folders, favorites, and calendar. Android available, Windows coming soon."
      />
      <section className="border-b border-cova-border">
        <Container className="grid items-center gap-10 py-16 lg:grid-cols-2 lg:py-20">
          <div>
            <div className="flex flex-wrap gap-2">
              <Badge>Android available</Badge>
              <Badge>Windows coming soon</Badge>
            </div>
            <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
              Cova Vault
            </h1>
            <p className="mt-3 text-xl text-cova-muted">
              Your personal vault for keeping important information organized.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <DownloadButton />
              <Button to="/features" variant="secondary" size="lg">Explore Features</Button>
              <GitHubButton />
            </div>
            <p className="mt-4 text-sm text-cova-muted">
              Latest release: {latestRelease.tag} · No account required.
            </p>
          </div>
          <div className="rounded-xl border border-cova-border bg-cova-surface p-6">
            <h2 className="text-lg font-semibold">App Preview</h2>
            <p className="mt-2 text-sm text-cova-muted">
              Real application screenshots will appear here once exported from the Android project.
              Current preview cards are structural placeholders, not fake app UI.
            </p>
            <div className="mt-4 grid grid-cols-2 gap-3">
              {['Credentials', 'Notes', 'Tasks', 'PeraLog'].map((item) => (
                <div key={item} className="rounded-lg border border-cova-border bg-cova-elevated p-4 text-sm text-cova-muted">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <Container className="py-16">
        <SectionHeading title="Everything in one vault" subtitle="Modules verified from the Android project README." />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <FeatureCard key={feature.key} feature={feature} />
          ))}
        </div>
      </Container>

      <section className="border-y border-cova-border bg-cova-surface">
        <Container className="grid gap-8 py-16 lg:grid-cols-2">
          <div>
            <SectionHeading align="left" title="Privacy and local-first" subtitle="Factual summary only. Full details are on the Security page after Android verification." />
            <ul className="mt-6 list-disc space-y-2 pl-5 text-sm text-cova-muted">
              <li>Self-hosted, browser-based companion with no backend required.</li>
              <li>Client-side persistence documented by the Android project.</li>
              <li>No website account needed to browse or download Android releases.</li>
            </ul>
            <div className="mt-6">
              <Button to="/security" variant="secondary">Read Security</Button>
            </div>
          </div>
          <div className="rounded-xl border border-cova-border bg-cova-elevated p-6">
            <h3 className="text-lg font-semibold">My Wallet concept</h3>
            <div className="mt-4 space-y-2 text-sm text-cova-muted">
              <p>Cash — physical money</p>
              <p>Digital Money — GCash, Maya, other wallets</p>
              <p>Total Money — combined overview</p>
            </div>
            <p className="mt-4 text-xs text-cova-muted">Example structure for storytelling, not actual user data.</p>
          </div>
        </Container>
      </section>

      <Container className="py-16">
        <SectionHeading title="Download" subtitle="Android is available now. Windows is coming soon." />
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {platformDownloads.map((platform) => (
            <PlatformCard key={platform.platform} platform={platform} />
          ))}
        </div>
      </Container>

      <Container className="pb-16">
        <SectionHeading title="Latest release" subtitle="Source: Shimizu019/cova-vault GitHub Releases." />
        <div className="mx-auto mt-8 max-w-3xl">
          <ReleaseCard release={latestRelease} showDownload />
        </div>
        <SectionHeading title="Documentation" subtitle="Start with the guides that match the real application." />
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {documentationTopics.slice(0, 6).map((topic) => (
            <DocumentationCard key={topic.id} topic={topic} />
          ))}
        </div>
        <p className="mt-6 text-center text-sm text-cova-muted">Showing {releases.length} tracked GitHub releases on the Changelog page.</p>
      </Container>
    </>
  );
}

export default Home;
