import SEO from '../components/common/SEO';
import Container from '../components/common/Container';
import SectionHeading from '../components/common/SectionHeading';
import Button from '../components/buttons/Button';
import siteConfig from '../config/site/site';

const facts = [
  {
    label: 'What Cova Vault is',
    body: 'A personal vault application that bundles credentials, notes, tasks, PeraLog, wallet, savings, folders, favorites, and calendar in one place.',
  },
  {
    label: 'Why it exists',
    body: 'To keep everyday personal information organized without requiring a website account or backend service.',
  },
  {
    label: 'Project status',
    body: 'Active development. Releases published on GitHub; current tracking shows both stable and beta tags.',
  },
  {
    label: 'Licenses and attribution',
    body: 'Only license and contributor information explicitly published by the repositories should be presented here.',
  },
];

function About() {
  return (
    <>
      <SEO title="About" description="What Cova Vault is, why it exists, and where to find its repositories." />
      <Container className="py-16">
        <SectionHeading title="About Cova Vault" subtitle="Only verifiable project information is shown." />
        <div className="mx-auto mt-10 grid max-w-4xl gap-5">
          {facts.map((fact) => (
            <article key={fact.label} className="rounded-xl border border-cova-border bg-cova-surface p-6">
              <h2 className="text-lg font-semibold text-cova-text">{fact.label}</h2>
              <p className="mt-2 text-sm leading-relaxed text-cova-muted">{fact.body}</p>
            </article>
          ))}
        </div>
        <div className="mx-auto mt-8 flex max-w-4xl flex-wrap gap-3">
          <Button href={siteConfig.androidRepoUrl} variant="primary">Android repository</Button>
          <Button href={siteConfig.websiteRepoUrl} variant="secondary">Website repository</Button>
          <Button href={siteConfig.androidReleasesUrl} variant="outline">Releases</Button>
        </div>
      </Container>
    </>
  );
}

export default About;
