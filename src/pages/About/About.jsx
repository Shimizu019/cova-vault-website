import SEO from '../../components/common/SEO/SEO.jsx';
import Container from '../../components/common/Container/Container.jsx';
import AboutSection from '../../components/sections/AboutSection/AboutSection.jsx';
import FeatureSection from '../../components/sections/FeatureSection/FeatureSection.jsx';

function About() {
  return (
    <>
      <SEO title="About | Cova Vault" description="Learn about the Cova Vault project" />
      <Container>
        <AboutSection />
        <FeatureSection />
      </Container>
    </>
  );
}

export default About;