import SEO from '../components/common/SEO';
import Container from '../components/common/Container';
import SectionHeading from '../components/common/SectionHeading';
import FeatureCard from '../components/cards/FeatureCard';
import Button from '../components/buttons/Button';
import { features } from '../data/features';

const groups = [
  { key: 'core', eyebrow: 'Core vault', title: 'Keep the essentials', keys: ['credentials', 'notes', 'tasks'] },
  { key: 'money', eyebrow: 'Money', title: 'Track it as it happens', keys: ['peralog', 'wallet', 'savings'] },
  { key: 'org', eyebrow: 'Organization', title: 'Find anything quickly', keys: ['folders', 'favorites', 'calendar'] },
];

function Features() {
  return (
    <>
      <SEO
        title="Features"
        description="Credentials, notes, tasks, PeraLog, wallet, savings, folders, favorites, calendar, password generator, and activity log — verified against the Android project."
      />

      <section className="border-b border-cova-border py-16 lg:py-20">
        <Container className="max-w-3xl">
          <SectionHeading
            eyebrow="Features"
            title="One vault for your everyday organization"
            subtitle="Every capability below is drawn from the Android project description."
          />
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button to="/download" variant="primary">
              Download Cova Vault
            </Button>
            <Button to="/documentation" variant="secondary">
              Read documentation
            </Button>
          </div>
        </Container>
      </section>

      {groups.map((group, index) => (
        <section
          key={group.key}
          className={`py-16 lg:py-20 ${index === 0 ? 'border-b border-cova-border bg-cova-surface' : index % 2 === 0 ? 'border-y border-cova-border bg-cova-surface' : ''}`}
        >
          <Container>
            <SectionHeading align="left" eyebrow={group.eyebrow} title={group.title} />
            <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {group.keys.map((key) => {
                const feature = features.find((item) => item.key === key);
                if (!feature) return null;
                return <FeatureCard key={feature.key} feature={feature} size="large" />;
              })}
            </div>
          </Container>
        </section>
      ))}

      <section className="py-16 lg:py-20">
        <Container>
          <div className="gradient-border mx-auto max-w-2xl rounded-panel bg-cova-surface p-8 text-center shadow-hover">
            <h2 className="text-section-title font-bold text-cova-text">Ready to try it?</h2>
            <p className="mt-3 text-base text-cova-muted">
              Android is available now from the official GitHub Releases. Windows is coming soon.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Button to="/download" variant="primary">
                Go to Download
              </Button>
              <Button to="/security" variant="secondary">
                Read Security
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

export default Features;