import SEO from '../components/common/SEO';
import Container from '../components/common/Container';
import SectionHeading from '../components/common/SectionHeading';
import PlatformCard from '../components/cards/PlatformCard';
import ReleaseCard from '../components/cards/ReleaseCard';
import { platformDownloads } from '../data/platforms';
import { latestRelease, releases, ANDROID_RELEASES_URL } from '../config/site/site';

function Download() {
  return (
    <>
      <SEO title="Download" description="Download Cova Vault for Android from official GitHub Releases. Windows coming soon." />
      <Container className="py-16">
        <SectionHeading title="Download Cova Vault" subtitle="Get Cova Vault for your platform. No account required." />
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {platformDownloads.map((platform) => (
            <PlatformCard key={platform.platform} platform={platform} />
          ))}
        </div>

        <div className="mx-auto mt-14 max-w-3xl">
          <h2 className="text-2xl font-bold">Latest release</h2>
          <div className="mt-5">
            <ReleaseCard release={latestRelease} showDownload />
          </div>

          <div className="mt-6 rounded-xl border border-cova-border bg-cova-surface p-6">
            <h2 className="text-lg font-semibold">What's new</h2>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-cova-muted">
              {latestRelease.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
            <p className="mt-4 text-sm leading-relaxed text-cova-muted">{latestRelease.notes}</p>
          </div>

          <div className="mt-6 rounded-xl border border-cova-border bg-cova-surface p-6">
            <h2 className="text-lg font-semibold">Installation guidance</h2>
            <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-cova-muted">
              <li>Open the official GitHub Release for the version you want.</li>
              <li>Download the APK asset from that release.</li>
              <li>Install the APK on an Android device that allows installing apps from this source.</li>
              <li>Verify the file name and version match the release before installing.</li>
            </ol>
            <p className="mt-4 text-xs text-cova-muted">
              Checksum and signature information is shown only when published with the release.
            </p>
          </div>

          <div className="mt-6 rounded-xl border border-cova-border bg-cova-surface p-6">
            <h2 className="text-lg font-semibold">Older releases</h2>
            <ul className="mt-3 grid gap-2 text-sm">
              {releases.slice(1, 7).map((release) => (
                <li key={release.tag} className="flex flex-wrap items-center justify-between gap-2">
                  <a href={release.githubReleaseUrl} className="text-cova-accent hover:underline">
                    {release.tag}
                  </a>
                  <span className="text-xs text-cova-muted">{release.stable ? 'Stable' : 'Beta'} · {release.version}</span>
                </li>
              ))}
            </ul>
            <a href={ANDROID_RELEASES_URL} className="mt-4 inline-block text-sm font-semibold text-cova-accent hover:underline">
              View all releases on GitHub
            </a>
          </div>
        </div>
      </Container>
    </>
  );
}

export default Download;
