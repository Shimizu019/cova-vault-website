import SEO from '../components/common/SEO';
import Container from '../components/common/Container';
import SectionHeading from '../components/common/SectionHeading';
import FeatureCard from '../components/cards/FeatureCard';
import { features } from '../data/features';

function Features() {
  return (
    <>
      <SEO title="Features" description="Credentials, notes, tasks, PeraLog, wallet, savings, folders, favorites, and calendar." />
      <Container className="py-16">
        <SectionHeading title="Features" subtitle="Verified against the Android project README. No invented capabilities." />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <FeatureCard key={feature.key} feature={feature} />
          ))}
        </div>
      </Container>
    </>
  );
}

export default Features;
