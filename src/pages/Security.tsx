import SEO from '../components/common/SEO';
import Container from '../components/common/Container';
import SectionHeading from '../components/common/SectionHeading';
import Button from '../components/buttons/Button';
import { ChevronRight } from 'lucide-react';
import siteConfig from '../config/site/site';

interface SecurityTopic {
  title: string;
  body: string;
  verified: boolean;
}

const topics: SecurityTopic[] = [
  {
    title: 'Privacy approach',
    verified: true,
    body: 'Cova Vault is described by the Android project as a self-hosted, browser-based companion with no backend required. This website itself has no accounts, no database, and no server-side storage.',
  },
  {
    title: 'Local-first architecture',
    verified: true,
    body: 'The Android project documents client-side persistence and describes Cova Vault as running locally on your device with no cloud sync required. Your information is kept on your own device rather than in a website account.',
  },
  {
    title: 'Device requirements & permissions',
    verified: true,
    body: 'The Android project targets Android 7.0 (API 24) and newer, and the Android manifest declares only the INTERNET permission. No additional sensitive permissions are declared.',
  },
  {
    title: 'Data storage',
    verified: true,
    body: 'Vault data is persisted on the device through an encrypted storage layer. The Android project derives keys with PBKDF2-SHA256 (100,000 iterations) and encrypts with AES-GCM (256-bit). The v0.2.0-beta release notes still record that Android native storage has not been verified on a real device.',
  },
  {
    title: 'Vault protection and unlock',
    verified: true,
    body: 'The app locks behind a master password. On first run it accepts the project default until you set your own in Settings. We do not claim biometric unlock, attempt limits, or password recovery here — the reset path returns the app to first-run state rather than recovering your original password.',
  },
  {
    title: 'Backup and export',
    verified: true,
    body: 'Settings → Backup & Export exports an encrypted JSON backup file and can re-import one. There is no automatic or cloud backup: the file is only as safe as where you keep it.',
  },
  {
    title: 'User responsibility',
    verified: true,
    body: 'You are responsible for your device, for downloading only from the official GitHub Releases, and for handling your own sensitive information carefully.',
  },
  {
    title: 'Limitations',
    verified: true,
    body: 'This website cannot access your vault. It presents public product information and links to official Android releases only.',
  },
];

const faqs = [
  {
    id: 'faq-account',
    question: 'Do I need an account to download Cova Vault?',
    answer: 'No. There is no signup, login, or profile. Open the site and download the Android release directly.',
  },
  {
    id: 'faq-windows',
    question: 'Is there a Windows version?',
    answer: 'Not yet. Windows is listed as coming soon and no Windows build is available to download.',
  },
  {
    id: 'faq-source',
    question: 'Where should I download from?',
    answer: 'Only from the official Shimizu019/cova-vault GitHub Releases. Avoid mirror sites and reuploads.',
  },
  {
    id: 'faq-vault-access',
    question: 'Can this website read my Cova Vault data?',
    answer: 'No. The website has no access to your vault, your device, or your stored information.',
  },
  {
    id: 'faq-default-password',
    question: 'Does the app start with a default master password?',
    answer:
      'On first run it accepts the project default until you choose your own. Set your own master password in Settings as soon as you start, and do not keep the default.',
  },
  {
    id: 'faq-forgotten-password',
    question: 'What happens if I forget my master password?',
    answer:
      'There is no password recovery documented. The reset path returns the app to its first-run state, so the original password cannot be recovered.',
  },
  {
    id: 'faq-cloud-backup',
    question: 'Is my vault backed up automatically?',
    answer:
      'No. Backup is a manual encrypted file export you choose in Settings. Nothing is uploaded, and there is no cloud backup or sync.',
  },
];

function Security() {
  return (
    <>
      <SEO
        title="Security"
        description="A factual privacy and security overview for Cova Vault. Only Android-verified behavior is stated."
      />

      <section className="border-b border-cova-border py-16 lg:py-20">
        <Container className="max-w-3xl">
          <SectionHeading
            eyebrow="Security & Privacy"
            title="What we can and cannot claim"
            subtitle="Security pages are easy to overstate. This one only states what the Android project documents, and is explicit about what remains unverified."
          />
        </Container>
      </section>

      <section className="border-b border-cova-border bg-cova-surface py-16 lg:py-20">
        <Container>
          <ul className="mx-auto grid max-w-4xl gap-4">
            {topics.map((topic) => (
              <li key={topic.title} className="rounded-card border border-cova-border bg-cova-elevated p-6 shadow-card">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-base font-semibold text-cova-text">{topic.title}</h2>
                  <span
                    className={`rounded-badge border px-2.5 py-0.5 text-xs font-medium ${
                      topic.verified
                        ? 'border-cova-success/30 bg-cova-success/10 text-cova-success'
                        : 'border-cova-warning/30 bg-cova-warning/10 text-cova-warning'
                    }`}
                  >
                    {topic.verified ? 'Documented' : 'Not yet verified'}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-cova-muted">{topic.body}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="py-16 lg:py-20">
        <Container className="max-w-3xl">
          <SectionHeading align="left" eyebrow="FAQ" title="Common questions" />
          <div className="mt-8 space-y-3">
            {faqs.map((faq) => (
              <details
                key={faq.id}
                id={faq.id}
                className="group rounded-card border border-cova-border bg-cova-surface px-5 py-4 shadow-card"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-semibold text-cova-text">
                  {faq.question}
                  <span aria-hidden="true" className="text-cova-faint transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-cova-muted">{faq.answer}</p>
              </details>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <Button to="/documentation#security" variant="secondary">
              Security in documentation
            </Button>
            <Button href={siteConfig.androidRepoUrl} variant="ghost">
              Review the Android repository
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}

export default Security;