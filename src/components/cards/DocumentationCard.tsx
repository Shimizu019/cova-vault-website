import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import type { DocumentationTopic } from '../../types';
import { topicIcon } from '../../data/topicIcons';

function DocumentationCard({ topic }: { topic: DocumentationTopic }) {
  const TopicIcon = topicIcon(topic.id);
  return (
    <Link
      to={`/documentation#${topic.id}`}
      className="group flex flex-col rounded-card border border-cova-border bg-cova-surface p-6 shadow-card transition duration-200 hover:-translate-y-1 hover:border-cova-primary/50 hover:shadow-glow"
    >
      <span
        className="grid h-10 w-10 place-items-center rounded-btn bg-cova-primary/10 text-cova-accent ring-1 ring-inset ring-cova-primary/25"
        aria-hidden="true"
      >
        <TopicIcon className="h-[18px] w-[18px]" />
      </span>
      <h3 className="mt-4 text-base font-semibold text-cova-text">{topic.title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-cova-muted">{topic.summary}</p>
      <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-cova-accent">
        Open guide
        <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
      </span>
    </Link>
  );
}

export default DocumentationCard;
