import { Link } from 'react-router-dom';
import type { Feature } from '../../types';

function FeatureCard({ feature }: { feature: Feature }) {
  return (
    <article className="rounded-xl border border-cova-border bg-cova-surface p-6 transition hover:-translate-y-0.5 hover:border-cova-accent">
      <div className="text-3xl" aria-hidden="true">{feature.icon}</div>
      <h3 className="mt-4 text-xl font-semibold text-cova-text">{feature.name}</h3>
      <p className="mt-2 text-sm leading-relaxed text-cova-muted">{feature.description}</p>
      <ul className="mt-4 flex flex-wrap gap-2">
        {feature.capabilities.map((capability) => (
          <li key={capability} className="rounded-full border border-cova-border bg-cova-elevated px-3 py-1 text-xs text-cova-muted">
            {capability}
          </li>
        ))}
      </ul>
      <Link to={`/documentation#${feature.docsId}`} className="mt-4 inline-block text-sm font-semibold text-cova-accent hover:underline">
        Read docs
      </Link>
    </article>
  );
}

export default FeatureCard;
