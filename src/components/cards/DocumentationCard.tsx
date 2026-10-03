import { Link } from 'react-router-dom';
import type { DocumentationTopic } from '../../types';

function DocumentationCard({ topic }: { topic: DocumentationTopic }) {
  return (
    <Link
      to={`/documentation#${topic.id}`}
      className="group flex flex-col rounded-card border border-cova-border bg-cova-surface p-6 shadow-card transition duration-200 hover:-translate-y-0.5 hover:border-cova-primary/50 hover:shadow-hover"
    >
      <h3 className="text-base font-semibold text-cova-text">{topic.title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-cova-muted">{topic.summary}</p>
      <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-cova-accent">
        Open guide
        <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">
          →
        </span>
      </span>
    </Link>
  );
}

export default DocumentationCard;
