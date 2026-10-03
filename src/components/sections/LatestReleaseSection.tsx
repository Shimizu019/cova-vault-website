import Container from '../common/Container';
import SectionHeading from '../common/SectionHeading';
import ReleaseCard from '../cards/ReleaseCard';
import DocumentationCard from '../cards/DocumentationCard';
import Button from '../buttons/Button';
import { latestRelease, releases, ANDROID_RELEASES_URL } from '../../config/site/site';
import { documentationTopics } from '../../data/documentation';

function LatestReleaseSection() {
  return (
    <section className="bg-cova-surface py-16 lg:py-20">
      <Container className="grid items-stretch gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
        <div className="flex flex-col">
          <SectionHeading
            align="left"
            eyebrow="Releases"
            title="Latest release"
            subtitle={`Sourced from Shimizu019/cova-vault GitHub Releases. ${releases.length} releases tracked so far.`}
          />
          <div className="mt-8 flex-1">
            <ReleaseCard release={latestRelease} showDownload featured />
          </div>
          <div className="mt-5">
            <Button to="/changelog" variant="secondary" size="sm">
              View full changelog
            </Button>
          </div>
        </div>

        <div className="flex flex-col">
          <SectionHeading
            align="left"
            eyebrow="Documentation"
            title="Start with the guides"
            subtitle="Documentation pages that match the current application."
          />
          <div className="mt-8 grid flex-1 gap-4 sm:grid-cols-2">
            {documentationTopics.slice(0, 4).map((topic) => (
              <DocumentationCard key={topic.id} topic={topic} />
            ))}
          </div>
          <div className="mt-5 flex flex-wrap gap-3">
            <Button to="/documentation" variant="secondary" size="sm">
              Browse documentation
            </Button>
            <Button href={ANDROID_RELEASES_URL} variant="secondary" size="sm">
              All releases on GitHub
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default LatestReleaseSection;