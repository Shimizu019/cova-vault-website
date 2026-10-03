import { Link } from 'react-router-dom';
import type { DocumentationTopic } from '../../types';

function DocumentationCard({ topic }: { topic: DocumentationTopic }) {
  return (
    <Link
      to={`/documentation#${topic.id}`}
      className="block rounded-xl border border-cova-border bg-cova-surface p-6 transition hover:-translate-y-0.5 hover:border-cova-accent"
    >
      <h3 className="text-lg font-semibold text-cova-text">{topic.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-cova-muted">{topic.summary}</p>
      <span className="mt-3 inline-block text-sm font-semibold text-cova-accent">Open guide</span>
    </Link>
  );
}

export default DocumentationCard;
