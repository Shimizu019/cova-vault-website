import Container from '../common/Container';
import SectionHeading from '../common/SectionHeading';
import ReleaseCard from '../cards/ReleaseCard';
import DocumentationCard from '../cards/DocumentationCard';
import Button from '../buttons/Button';
import { latestRelease, releases, ANDROID_RELEASES_URL } from '../../config/site/site';
import { documentationTopics } from '../../data/documentation';

function LatestReleaseSection() {
  return (
    <section className="py-16 lg:py-20">
      <Container className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
        <div>
          <SectionHeading
            align="left"
            eyebrow="Releases"
            title="Latest release"
            subtitle={`Sourced from Shimizu019/cova-vault GitHub Releases. ${releases.length} releases tracked so far.`}
          />
          <div className="mt-8">
            <ReleaseCard release={latestRelease} showDownload featured />
          </div>
          <div className="mt-5">
            <Button to="/changelog" variant="ghost" size="sm">
              View full changelog →
            </Button>
          </div>
        </div>

        <div>
          <SectionHeading
            align="left"
            eyebrow="Documentation"
            title="Start with the guides"
            subtitle="Documentation pages that match the current application."
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {documentationTopics.slice(0, 4).map((topic) => (
              <DocumentationCard key={topic.id} topic={topic} />
            ))}
          </div>
          <div className="mt-5">
            <Button to="/documentation" variant="ghost" size="sm">
              Browse documentation →
            </Button>
          </div>
          <a
            href={ANDROID_RELEASES_URL}
            className="mt-6 inline-block text-sm text-cova-faint transition hover:text-cova-muted"
          >
            All releases on GitHub
          </a>
        </div>
      </Container>
    </section>
  );
}

export default LatestReleaseSection;