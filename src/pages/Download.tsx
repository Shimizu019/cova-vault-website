import SEO from '../components/common/SEO';
import Container from '../components/common/Container';
import SectionHeading from '../components/common/SectionHeading';
import PlatformCard from '../components/cards/PlatformCard';
import Button from '../components/buttons/Button';
import DownloadCounter from '../components/common/DownloadCounter';
import { platformDownloads } from '../data/platforms';
import { latestRelease, releases, ANDROID_RELEASES_URL, releaseChannel, releaseChannelLabel } from '../config/site/site';

function Download() {
  return (
    <>
      <SEO
        title="Download"
        description="Download Cova Vault for Android from official GitHub Releases. Windows is coming soon. No account required."
      />

      <section className="border-b border-cova-border py-16 lg:py-20">
        <Container>
          <SectionHeading
            eyebrow="Download"
            title="Download Cova Vault"
            subtitle="Pick your platform. Android is available now; Windows is on the way. No account, no signup."
          />
          <div className="mx-auto mt-10 grid max-w-4xl gap-5 sm:grid-cols-2">
            {platformDownloads.map((platform) => (
              <PlatformCard key={platform.platform} platform={platform} />
            ))}
          </div>

          <DownloadCounter align="center" className="mt-6" />

          <p className="mt-4 text-center text-sm text-cova-faint">
            Android releases are distributed from <span className="font-mono">Shimizu019/cova-vault</span> GitHub Releases.
          </p>
        </Container>
      </section>

      <section className="border-b border-cova-border bg-cova-surface py-16 lg:py-20">
        <Container className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading align="left" eyebrow="What's new" title={latestRelease.title} />
            <ul className="mt-6 space-y-2 text-sm text-cova-muted">
              {latestRelease.highlights.map((highlight) => (
                <li key={highlight} className="flex gap-2">
                  <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-cova-faint" />
                  {highlight}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm leading-relaxed text-cova-muted">{latestRelease.notes}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button href={latestRelease.githubReleaseUrl} variant="secondary" size="sm">
                View release on GitHub
              </Button>
              <Button to="/changelog" variant="ghost" size="sm">
                Full changelog →
              </Button>
            </div>
          </div>

          <div>
            <SectionHeading align="left" eyebrow="Installation" title="How to install on Android" />
            <ol className="mt-6 space-y-4 text-sm text-cova-muted">
              {[
                'Open the official GitHub Release for the version you want.',
                'Download the APK file attached to that release.',
                'Allow installs from this source on your Android device.',
                'Verify the file name and version match the release before installing.',
                'Launch the app and set your own master password in Settings before storing anything sensitive.',
              ].map((step, index) => (
                <li key={step} className="flex gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-cova-border bg-cova-elevated text-xs font-semibold text-cova-muted">
                    {index + 1}
                  </span>
                  <span className="pt-0.5">{step}</span>
                </li>
              ))}
            </ol>
            <p className="mt-5 rounded-btn border border-cova-border bg-cova-elevated px-4 py-3 text-xs leading-relaxed text-cova-faint">
              Checksum or signature details are shown only when they are published with the release itself.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-16 lg:py-20">
        <Container className="max-w-4xl">
          <SectionHeading align="left" eyebrow="Archive" title="Older releases" subtitle="Recent builds published on GitHub Releases." />
          <ul className="mt-8 divide-y divide-cova-border overflow-hidden rounded-card border border-cova-border bg-cova-surface shadow-card">
            {releases.slice(1, 8).map((release) => (
              <li key={release.tag} className="flex flex-wrap items-center justify-between gap-3 px-5 py-4">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-sm font-semibold text-cova-text">{release.tag}</span>
                  <span
                    className={`rounded-badge border px-2 py-0.5 text-xs font-medium ${
                      releaseChannel(release) === 'stable'
                        ? 'border-cova-success/30 bg-cova-success/10 text-cova-success'
                        : 'border-cova-border bg-cova-elevated text-cova-muted'
                    }`}
                  >
                    {releaseChannelLabel(release)}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  {release.apkUrl ? (
                    <a href={release.apkUrl} className="text-cova-accent hover:underline">
                      Download
                    </a>
                  ) : null}
                  <a href={release.githubReleaseUrl} className="text-cova-muted transition hover:text-cova-text">
                    GitHub
                  </a>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-6 text-center">
            <a href={ANDROID_RELEASES_URL} className="text-sm font-semibold text-cova-accent hover:underline">
              View all releases on GitHub
            </a>
          </div>
        </Container>
      </section>
    </>
  );
}

export default Download;