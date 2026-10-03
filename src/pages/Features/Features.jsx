import SEO from '../../components/common/SEO/SEO.jsx';
import Container from '../../components/common/Container/Container.jsx';
import FeatureSection from '../../components/sections/FeatureSection/FeatureSection.jsx';
import SecuritySection from '../../components/sections/SecuritySection/SecuritySection.jsx';
import AboutSection from '../../components/sections/AboutSection/AboutSection.jsx';

function Features() {
  return (
    <>
      <SEO title="Features | Cova Vault" description="Explore Cova Vault Features" />
      <Container>
        <FeatureSection />
        <SecuritySection />
        <AboutSection />
      </Container>
    </>
  );
}

export default Features;