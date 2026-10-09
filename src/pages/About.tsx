import SEO from '../components/common/SEO';
import Container from '../components/common/Container';
import SectionHeading from '../components/common/SectionHeading';
import Button from '../components/buttons/Button';
import { features } from '../data/features';
import { moduleMeta } from '../data/moduleMeta';
import siteConfig from '../config/site/site';

const facts = [
  {
    label: 'What Cova Vault is',
    body: 'A personal vault application that brings credentials, notes, tasks, PeraLog, wallet, savings, folders, favorites, and calendar together in one place.',
  },
  {
    label: 'Why it exists',
    body: 'To keep everyday personal information organized without requiring a website account, a subscription, or a backend service.',
  },
  {
    label: 'Project status',
    body: 'Active development. Android builds are published on GitHub Releases as stable and beta tags; Windows is planned but not yet available.',
  },
  {
    label: 'This website',
    body: 'A static product site. It has no accounts, no database, and no server-side storage, and it cannot access your vault.',
  },
];

function About() {
  return (
    <>
      <SEO
        title="About"
        description="What Cova Vault is, why the project exists, its current status, and where to find the official repositories."
      />

      <section className="border-b border-cova-border py-16 lg:py-20">
        <Container className="max-w-3xl">
          <SectionHeading
            eyebrow="About"
            title="About Cova Vault"
            subtitle="Only verifiable project information is shown here."
          />
        </Container>
      </section>

      <section className="border-b border-cova-border bg-cova-surface py-16 lg:py-20">
        <Container>
          <div className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-2">
            {facts.map((fact) => (
              <article key={fact.label} className="rounded-card border border-cova-border bg-cova-elevated p-6 shadow-card">
                <h2 className="text-base font-semibold text-cova-text">{fact.label}</h2>
                <p className="mt-3 text-sm leading-relaxed text-cova-muted">{fact.body}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-b border-cova-border py-16 lg:py-20">
        <Container className="max-w-4xl">
          <SectionHeading align="left" eyebrow="Modules" title="What it organizes" />
          <ul className="mt-8 flex flex-wrap gap-2">
            {features.map((feature) => {
              const Icon = moduleMeta[feature.key]?.icon;
              return (
                <li
                  key={feature.key}
                  className="inline-flex items-center gap-1.5 rounded-badge border border-cova-border bg-cova-surface px-3.5 py-2 text-sm text-cova-muted"
                >
                  {Icon ? <Icon className="h-3.5 w-3.5 text-cova-accent" aria-hidden="true" /> : null}
                  {feature.name}
                </li>
              );
            })}
          </ul>
        </Container>
      </section>

      <section className="py-16 lg:py-20">
        <Container className="max-w-4xl">
          <SectionHeading align="left" eyebrow="Repositories" title="Explore the project" />
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <a
              href={siteConfig.androidRepoUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-card border border-cova-border bg-cova-surface p-6 shadow-card transition hover:border-cova-primary/50"
            >
              <h3 className="text-base font-semibold text-cova-text">Android repository</h3>
              <p className="mt-2 font-mono text-sm text-cova-muted">{siteConfig.androidRepo}</p>
            </a>
            <a
              href={siteConfig.websiteRepoUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-card border border-cova-border bg-cova-surface p-6 shadow-card transition hover:border-cova-primary/50"
            >
              <h3 className="text-base font-semibold text-cova-text">Website repository</h3>
              <p className="mt-2 font-mono text-sm text-cova-muted">{siteConfig.websiteRepo}</p>
            </a>
            <a
              href={siteConfig.androidReleasesUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-card border border-cova-border bg-cova-surface p-6 shadow-card transition hover:border-cova-primary/50"
            >
              <h3 className="text-base font-semibold text-cova-text">GitHub Releases</h3>
              <p className="mt-2 text-sm text-cova-muted">Official Android downloads</p>
            </a>
          </div>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button to="/download" variant="primary">
              Download Cova Vault
            </Button>
            <Button to="/documentation" variant="secondary">
              Read documentation
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}

export default About;