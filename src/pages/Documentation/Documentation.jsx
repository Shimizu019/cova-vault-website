import SEO from '../../components/common/SEO/SEO.jsx';
import Container from '../../components/common/Container/Container.jsx';
import DocumentationSection from '../../components/sections/DocumentationSection/DocumentationSection.jsx';
import AboutSection from '../../components/sections/AboutSection/AboutSection.jsx';

function Documentation() {
  return (
    <>
      <SEO title="Documentation | Cova Vault" description="Cova Vault user documentation" />
      <Container>
        <DocumentationSection />
        <AboutSection />
      </Container>
    </>
  );
}

export default Documentation;