import Container from '../common/Container';
import SectionHeading from '../common/SectionHeading';
import ModuleTile from '../common/ModuleTile';
import { features } from '../../data/features';
import { moduleGroups } from '../../data/moduleMeta';

function ModulesSection() {
  return (
    <section className="border-b border-cova-border bg-cova-surface py-16 lg:py-20">
      <Container>
        <SectionHeading
          eyebrow="One vault"
          title="Everything in one vault"
          subtitle={`${features.length} modules, verified against the Android project, organized around how you actually keep your information.`}
        />
        {/* Modules grouped by area: Security, Productivity, Money, System */}
        <div className="mt-12 space-y-10">
          {moduleGroups.map((group) => {
            const GroupIcon = group.icon;
            return (
              <div key={group.key}>
                <div className="flex items-center justify-center gap-2.5">
                  <span className={`grid h-8 w-8 place-items-center rounded-lg ${group.tint}`} aria-hidden="true">
                    <GroupIcon className="h-4 w-4" />
                  </span>
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-cova-text">{group.label}</h3>
                  <span className="rounded-badge border border-cova-border bg-cova-bg px-2 py-0.5 text-xs font-medium text-cova-faint">
                    {group.keys.length}
                  </span>
                </div>
                <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {group.keys.map((key) => {
                    const feature = features.find((item) => item.key === key);
                    if (!feature) return null;
                    return <ModuleTile key={key} feature={feature} />;
                  })}
                </ul>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

export default ModulesSection;