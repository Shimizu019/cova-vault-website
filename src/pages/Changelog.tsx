import SEO from '../components/common/SEO';
import Container from '../components/common/Container';
import SectionHeading from '../components/common/SectionHeading';
import ReleaseCard from '../components/cards/ReleaseCard';
import { releases, ANDROID_RELEASES_URL } from '../config/site/site';

function Changelog() {
  const [latest, ...older] = releases;

  return (
    <>
      <SEO
        title="Changelog"
        description="Release history for Cova Vault, sourced from official Shimizu019/cova-vault GitHub Releases."
      />

      <section className="border-b border-cova-border py-16 lg:py-20">
        <Container className="max-w-3xl">
          <SectionHeading
            eyebrow="Changelog"
            title="Release history"
            subtitle={`Newest first. Every version and date below comes from official GitHub Releases — ${releases.length} tracked so far.`}
          />
        </Container>
      </section>

      <section className="py-16 lg:py-20">
        <Container className="max-w-4xl">
          <div className="rounded-panel border border-cova-primary/40 bg-cova-surface p-1 shadow-hover">
            <ReleaseCard release={latest} showDownload featured />
          </div>

          <ol className="relative mt-8 space-y-5 border-l border-cova-border pl-6">
            {older.map((release) => (
              <li key={release.tag} className="relative">
                <span
                  aria-hidden="true"
                  className="absolute -left-[31px] top-6 h-2.5 w-2.5 rounded-full border-2 border-cova-bg bg-cova-border"
                />
                <ReleaseCard release={release} showDownload />
              </li>
            ))}
          </ol>

          <div className="mt-8 text-center">
            <a href={ANDROID_RELEASES_URL} className="text-sm font-semibold text-cova-accent hover:underline">
              Open the full release history on GitHub
            </a>
          </div>
        </Container>
      </section>
    </>
  );
}

export default Changelog;