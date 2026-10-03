import type { Feature } from '../../types';

/** Compact module tile used in the "everything in one vault" overview grid. */
function ModuleTile({ feature }: { feature: Feature }) {
  return (
    <li className="flex items-center gap-3 rounded-card border border-cova-border bg-cova-surface px-4 py-3.5 shadow-card transition hover:border-cova-primary/40">
      <span className="text-lg" aria-hidden="true">
        {feature.icon}
      </span>
      <span className="text-sm font-medium text-cova-text">{feature.name}</span>
    </li>
  );
}

export default ModuleTile;