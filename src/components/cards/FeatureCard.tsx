import { Link } from 'react-router-dom';
import type { Feature } from '../../types';
import { moduleMeta } from '../../data/moduleMeta';

interface FeatureCardProps {
  feature: Feature;
  size?: 'default' | 'large';
}

function FeatureCard({ feature, size = 'default' }: FeatureCardProps) {
  const isLarge = size === 'large';
  const meta = moduleMeta[feature.key];
  const Icon = meta?.icon;
  return (
    <article
      className={`group flex flex-col rounded-card border border-cova-border bg-cova-surface shadow-card transition duration-200 hover:-translate-y-0.5 hover:border-cova-primary/50 hover:shadow-hover ${
        isLarge ? 'p-7 sm:p-8' : 'p-6'
      }`}
    >
      <span
        className={`flex items-center justify-center rounded-btn ${meta?.tint ?? ''} ${isLarge ? 'h-12 w-12' : 'h-11 w-11'}`}
        aria-hidden="true"
      >
        {Icon ? <Icon className={isLarge ? 'h-5 w-5' : 'h-[18px] w-[18px]'} /> : null}
      </span>
      <h3 className={`mt-5 font-semibold text-cova-text ${isLarge ? 'text-xl' : 'text-lg'}`}>{feature.name}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-cova-muted">{feature.description}</p>
      <ul className="mt-4 flex flex-wrap gap-1.5">
        {feature.capabilities.map((capability) => (
          <li
            key={capability}
            className="rounded-badge border border-cova-border bg-cova-elevated px-2.5 py-1 text-xs text-cova-muted"
          >
            {capability}
          </li>
        ))}
      </ul>
      <Link
        to={`/documentation#${feature.docsId}`}
        className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-cova-accent hover:underline"
      >
        Read docs
        <span aria-hidden="true">→</span>
      </Link>
    </article>
  );
}

export default FeatureCard;
