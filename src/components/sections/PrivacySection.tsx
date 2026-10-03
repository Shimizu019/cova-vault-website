import Container from '../common/Container';
import SectionHeading from '../common/SectionHeading';
import Button from '../buttons/Button';

const points = [
  {
    title: 'No website account',
    body: 'You do not need to register, sign in, or create a profile to read about Cova Vault or download the Android release.',
  },
  {
    title: 'Described as local-first',
    body: 'The Android project describes client-side persistence with no backend required. Specific guarantees stay unclaimed until verified.',
  },
  {
    title: 'This site cannot reach your vault',
    body: 'The website only presents public product information and links to official GitHub Releases.',
  },
];

function PrivacySection() {
  return (
    <section className="border-b border-cova-border py-16 lg:py-20">
      <Container>
        <SectionHeading
          eyebrow="Privacy"
          title="A factual privacy approach"
          subtitle="We describe the architecture as documented by the Android project — nothing more, nothing exaggerated."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {points.map((point) => (
            <article key={point.title} className="rounded-card border border-cova-border bg-cova-surface p-6 shadow-card">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-btn border border-cova-border bg-cova-elevated"
                aria-hidden="true"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--cova-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
                </svg>
              </div>
              <h3 className="mt-4 text-base font-semibold text-cova-text">{point.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-cova-muted">{point.body}</p>
            </article>
          ))}
        </div>
        <div className="mt-8 flex justify-center">
          <Button to="/security" variant="secondary">
            Read the Security page
          </Button>
        </div>
      </Container>
    </section>
  );
}

export default PrivacySection;