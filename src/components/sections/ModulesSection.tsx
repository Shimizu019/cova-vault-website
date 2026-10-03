import Container from '../common/Container';
import SectionHeading from '../common/SectionHeading';
import ModuleTile from '../common/ModuleTile';
import { features } from '../../data/features';

function ModulesSection() {
  return (
    <section className="border-b border-cova-border py-16 lg:py-20">
      <Container>
        <SectionHeading
          eyebrow="One vault"
          title="Everything in one vault"
          subtitle={`${features.length} modules, verified against the Android project, organized around how you actually keep your information.`}
        />
        <ul className="mx-auto mt-10 grid max-w-4xl gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <ModuleTile key={feature.key} feature={feature} />
          ))}
        </ul>
      </Container>
    </section>
  );
}

export default ModulesSection;