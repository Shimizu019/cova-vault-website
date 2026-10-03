import SEO from '../components/common/SEO';
import Container from '../components/common/Container';
import SectionHeading from '../components/common/SectionHeading';
import ReleaseCard from '../components/cards/ReleaseCard';
import { releases, ANDROID_RELEASES_URL } from '../config/site/site';

function Changelog() {
  return (
    <>
      <SEO title="Changelog" description="Release history for Cova Vault, sourced from Shimizu019/cova-vault GitHub Releases." />
      <Container className="py-16">
        <SectionHeading title="Changelog" subtitle="Newest first. All versions and dates come from official GitHub Releases." />
        <div className="mx-auto mt-10 grid max-w-4xl gap-5">
          {releases.map((release) => (
            <ReleaseCard key={release.tag} release={release} showDownload />
          ))}
        </div>
        <div className="mt-8 text-center">
          <a href={ANDROID_RELEASES_URL} className="inline-block text-sm font-semibold text-cova-accent hover:underline">
            Open full release history on GitHub
          </a>
        </div>
      </Container>
    </>
  );
}

export default Changelog;
