import type { Feature } from '../../types';
import { moduleMeta } from '../../data/moduleMeta';

/**
 * Module tile: tinted Lucide icon, name, and a one-line description
 * condensed from the module's existing copy.
 */
function ModuleTile({ feature }: { feature: Feature }) {
  const meta = moduleMeta[feature.key];
  const Icon = meta.icon;
  return (
    <li className="group flex items-start gap-3.5 rounded-card border border-cova-border bg-cova-bg p-4 shadow-card transition duration-200 hover:-translate-y-1 hover:border-cova-primary/40 hover:shadow-glow">
      <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-btn ${meta.tint}`} aria-hidden="true">
        <Icon className="h-[18px] w-[18px]" />
      </span>
      <div className="min-w-0">
        <p className="text-sm font-semibold text-cova-text">{feature.name}</p>
        <p className="mt-1 text-xs leading-relaxed text-cova-muted">{meta.line}</p>
      </div>
    </li>
  );
}

export default ModuleTile;