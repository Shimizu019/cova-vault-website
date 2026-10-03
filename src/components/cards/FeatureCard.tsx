import { Link } from 'react-router-dom';
import type { Feature } from '../../types';

interface FeatureCardProps {
  feature: Feature;
  size?: 'default' | 'large';
}

function FeatureCard({ feature, size = 'default' }: FeatureCardProps) {
  const isLarge = size === 'large';
  return (
    <article
      className={`group flex flex-col rounded-card border border-cova-border bg-cova-surface shadow-card transition duration-200 hover:-translate-y-0.5 hover:border-cova-primary/50 hover:shadow-hover ${
        isLarge ? 'p-7 sm:p-8' : 'p-6'
      }`}
    >
      <div
        className={`flex items-center justify-center rounded-btn border border-cova-border bg-cova-elevated ${
          isLarge ? 'h-12 w-12 text-2xl' : 'h-11 w-11 text-xl'
        }`}
        aria-hidden="true"
      >
        {feature.icon}
      </div>
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
