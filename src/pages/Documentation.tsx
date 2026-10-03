import { useEffect, useState } from 'react';
import SEO from '../components/common/SEO';
import Container from '../components/common/Container';
import SectionHeading from '../components/common/SectionHeading';
import DocumentationCard from '../components/cards/DocumentationCard';
import { documentationTopics } from '../data/documentation';

function Documentation() {
  const [activeId, setActiveId] = useState(documentationTopics[0].id);
  const active = documentationTopics.find((topic) => topic.id === activeId) ?? documentationTopics[0];

  useEffect(() => {
    const applyHash = () => {
      const id = window.location.hash.slice(1);
      if (id && documentationTopics.some((topic) => topic.id === id)) {
        setActiveId(id);
      }
    };
    applyHash();
    window.addEventListener('hashchange', applyHash);
    return () => window.removeEventListener('hashchange', applyHash);
  }, []);

  return (
    <>
      <SEO title="Documentation" description="Cova Vault user documentation for getting started, features, and downloads." />
      <Container className="py-16">
        <SectionHeading title="Documentation" subtitle="Guides that match the current application." />

        <div className="mt-10 grid gap-8 lg:grid-cols-[240px_1fr]">
          <nav aria-label="Documentation" className="lg:sticky lg:top-24 lg:self-start">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-cova-muted">Topics</h2>
            <ul className="mt-3 flex flex-wrap gap-2 lg:flex-col lg:gap-1">
              {documentationTopics.map((topic) => (
                <li key={topic.id}>
                  <button
                    type="button"
                    onClick={() => setActiveId(topic.id)}
                    aria-current={activeId === topic.id ? 'true' : undefined}
                    className={`min-h-[44px] w-full rounded-md px-3 py-2 text-left text-sm font-medium ${
                      activeId === topic.id
                        ? 'bg-cova-elevated text-cova-accent'
                        : 'text-cova-muted hover:bg-cova-elevated hover:text-cova-text'
                    }`}
                  >
                    {topic.title}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <article className="rounded-xl border border-cova-border bg-cova-surface p-6 sm:p-8">
            <h2 id={active.id} className="text-2xl font-bold text-cova-text">{active.title}</h2>
            <p className="mt-2 text-sm text-cova-muted">{active.summary}</p>
            <div className="mt-5 space-y-4">
              {active.body.map((paragraph) => (
                <p key={paragraph} className="text-sm leading-relaxed text-cova-muted">{paragraph}</p>
              ))}
            </div>
          </article>
        </div>

        <div className="mt-14">
          <h2 className="text-xl font-semibold">All guides</h2>
          <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {documentationTopics.map((topic) => (
              <DocumentationCard key={topic.id} topic={topic} />
            ))}
          </div>
        </div>
      </Container>
    </>
  );
}

export default Documentation;
