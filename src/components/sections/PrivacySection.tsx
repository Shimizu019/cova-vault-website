import Container from '../common/Container';
import SectionHeading from '../common/SectionHeading';
import Button from '../buttons/Button';
import { HardDrive, ShieldOff, UserX } from 'lucide-react';

const points = [
  {
    title: 'No website account',
    body: 'You do not need to register, sign in, or create a profile to read about Cova Vault or download the Android release.',
    icon: UserX,
    tint: 'text-sky-400 light:text-sky-600 bg-sky-500/10 ring-1 ring-inset ring-sky-500/30',
  },
  {
    title: 'Described as local-first',
    body: 'The Android project describes client-side persistence with no backend required. Specific guarantees stay unclaimed until verified.',
    icon: HardDrive,
    tint: 'text-violet-400 light:text-violet-600 bg-violet-500/10 ring-1 ring-inset ring-violet-500/30',
  },
  {
    title: 'This site cannot reach your vault',
    body: 'The website only presents public product information and links to official GitHub Releases.',
    icon: ShieldOff,
    tint: 'text-amber-400 light:text-amber-600 bg-amber-500/10 ring-1 ring-inset ring-amber-500/30',
  },
];

function PrivacySection() {
  return (
    <section className="border-b border-cova-border bg-cova-surface py-16 lg:py-20">
      <Container>
        <SectionHeading
          eyebrow="Privacy"
          title="A factual privacy approach"
          subtitle="The facts below are drawn from what the Android project documents."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {points.map((point) => (
            <article key={point.title} className="rounded-card border border-cova-border bg-cova-surface p-6 shadow-card">
              <span
                className={`flex h-10 w-10 items-center justify-center rounded-btn ${point.tint}`}
                aria-hidden="true"
              >
                <point.icon className="h-[18px] w-[18px]" />
              </span>
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