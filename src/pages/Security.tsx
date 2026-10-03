import SEO from '../components/common/SEO';
import Container from '../components/common/Container';
import SectionHeading from '../components/common/SectionHeading';

const sections = [
  {
    title: 'Privacy approach',
    body: 'Cova Vault is described by the Android project as a self-hosted, browser-based companion with no backend required. Treat broader privacy claims as unverified until the Android implementation is reviewed.',
  },
  {
    title: 'Local-first architecture',
    body: 'The Android README documents client-side persistence. Exact storage mechanism, threat model, and guarantees must be verified before stronger wording is published.',
  },
  {
    title: 'Data storage',
    body: 'Do not claim a specific encryption algorithm, key derivation, biometric protection, or cloud behavior unless confirmed in Android source or release documentation.',
  },
  {
    title: 'Vault protection and unlock',
    body: 'Authentication, lock behavior, recovery, and biometric support are currently unverified for website copy and must be checked in the Android repository.',
  },
  {
    title: 'Backup and export',
    body: 'Do not promise automatic backup, export formats, sync, or recovery unless verified. Users should keep their own safe copies until behavior is documented.',
  },
  {
    title: 'User responsibility',
    body: 'Users are responsible for their device, downloads from official GitHub Releases, and safe handling of sensitive information.',
  },
  {
    title: 'Limitations',
    body: 'This website cannot access a user vault. It only presents public product information and links to official Android releases.',
  },
];

function Security() {
  return (
    <>
      <SEO title="Security" description="Factual privacy and security overview. Only Android-verified behavior is stated." />
      <Container className="py-16">
        <SectionHeading title="Security" subtitle="Factual only. No exaggerated claims." />
        <div className="mx-auto mt-10 grid max-w-4xl gap-5">
          {sections.map((section) => (
            <article key={section.title} className="rounded-xl border border-cova-border bg-cova-surface p-6">
              <h2 className="text-lg font-semibold text-cova-text">{section.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-cova-muted">{section.body}</p>
            </article>
          ))}
        </div>
      </Container>
    </>
  );
}

export default Security;
