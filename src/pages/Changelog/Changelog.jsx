import SEO from '../../components/common/SEO/SEO.jsx';
import Container from '../../components/common/Container/Container.jsx';
import ChangelogSection from '../../components/sections/ChangelogSection/ChangelogSection.jsx';
import AboutSection from '../../components/sections/AboutSection/AboutSection.jsx';

function Changelog() {
  return (
    <>
      <SEO title="Changelog | Cova Vault" description="View Cova Vault release history" />
      <Container>
        <ChangelogSection />
        <AboutSection />
      </Container>
    </>
  );
}

export default Changelog;