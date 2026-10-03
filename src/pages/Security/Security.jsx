import SEO from '../../components/common/SEO/SEO.jsx';
import Container from '../../components/common/Container/Container.jsx';
import SecuritySection from '../../components/sections/SecuritySection/SecuritySection.jsx';
import AboutSection from '../../components/sections/AboutSection/AboutSection.jsx';

function Security() {
  return (
    <>
      <SEO title="Security | Cova Vault" description="Learn about Cova Vault's security and privacy" />
      <Container>
        <SecuritySection />
        <AboutSection />
      </Container>
    </>
  );
}

export default Security;