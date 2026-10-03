import { useEffect, useState } from 'react';
import SEO from '../components/common/SEO';
import Container from '../components/common/Container';
import SectionHeading from '../components/common/SectionHeading';
import DocumentationCard from '../components/cards/DocumentationCard';
import { documentationTopics } from '../data/documentation';

function Documentation() {
  const [activeId, setActiveId] = useState(documentationTopics[0].id);
  const [navOpen, setNavOpen] = useState(false);
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
      <SEO
        title="Documentation"
        description="Cova Vault documentation: getting started, installation, first setup, features, backup, security, and FAQ."
      />

      <section className="border-b border-cova-border py-16 lg:py-20">
        <Container>
          <SectionHeading
            eyebrow="Documentation"
            title="Guides for Cova Vault"
            subtitle="Written to match the current application. Behavior that has not been verified is left unstated."
          />
        </Container>
      </section>

      <section className="py-14 lg:py-20">
        <Container>
          {/* Mobile: collapsible navigation */}
          <div className="lg:hidden">
            <button
              type="button"
              onClick={() => setNavOpen((value) => !value)}
              aria-expanded={navOpen}
              aria-controls="docs-nav-mobile"
              className="flex min-h-[44px] w-full items-center justify-between rounded-card border border-cova-border bg-cova-surface px-4 text-sm font-semibold text-cova-text shadow-card"
            >
              <span>{active.title}</span>
              <span aria-hidden="true" className="text-cova-faint">
                {navOpen ? '−' : '+'}
              </span>
            </button>
            {navOpen ? (
              <ul id="docs-nav-mobile" className="mt-2 divide-y divide-cova-border overflow-hidden rounded-card border border-cova-border bg-cova-surface shadow-card">
                {documentationTopics.map((topic) => (
                  <li key={topic.id}>
                    <button
                      type="button"
                      onClick={() => {
                        setActiveId(topic.id);
                        setNavOpen(false);
                      }}
                      aria-current={activeId === topic.id ? 'true' : undefined}
                      className={`flex min-h-[44px] w-full items-center px-4 text-left text-sm font-medium ${
                        activeId === topic.id ? 'text-cova-accent' : 'text-cova-muted'
                      }`}
                    >
                      {topic.title}
                    </button>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>

          <div className="mt-6 grid gap-8 lg:mt-0 lg:grid-cols-[250px_1fr] lg:gap-10">
            {/* Desktop sidebar */}
            <nav aria-label="Documentation topics" className="hidden lg:sticky lg:top-24 lg:block lg:self-start">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-cova-faint">Topics</h2>
              <ul className="mt-4 space-y-0.5 border-l border-cova-border">
                {documentationTopics.map((topic) => (
                  <li key={topic.id}>
                    <button
                      type="button"
                      onClick={() => setActiveId(topic.id)}
                      aria-current={activeId === topic.id ? 'true' : undefined}
                      className={`-ml-px flex min-h-[40px] w-full items-center border-l-2 px-3 text-left text-sm font-medium transition ${
                        activeId === topic.id
                          ? 'border-cova-primary text-cova-accent'
                          : 'border-transparent text-cova-muted hover:border-cova-border hover:text-cova-text'
                      }`}
                    >
                      {topic.title}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>

            <article className="min-w-0 rounded-panel border border-cova-border bg-cova-surface p-6 shadow-card sm:p-9">
              <h2 id={active.id} className="text-2xl font-bold tracking-tight text-cova-text">
                {active.title}
              </h2>
              <p className="mt-3 text-base text-cova-muted">{active.summary}</p>
              <div className="mt-6 max-w-prose space-y-4">
                {active.body.map((paragraph) => (
                  <p key={paragraph} className="text-sm leading-relaxed text-cova-muted">
                    {paragraph}
                  </p>
                ))}
              </div>
            </article>
          </div>

          <div className="mt-16">
            <SectionHeading align="left" eyebrow="All guides" title="Browse every topic" />
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {documentationTopics.map((topic) => (
                <DocumentationCard key={topic.id} topic={topic} />
              ))}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

export default Documentation;