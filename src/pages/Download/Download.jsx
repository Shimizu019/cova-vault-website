import SEO from '../../components/common/SEO/SEO.jsx';
import Container from '../../components/common/Container/Container.jsx';
import DownloadSection from '../../components/sections/DownloadSection/DownloadSection.jsx';
import AboutSection from '../../components/sections/AboutSection/AboutSection.jsx';

function Download() {
  return (
    <>
      <SEO title="Download | Cova Vault" description="Download the Cova Vault Android app" />
      <Container>
        <DownloadSection />
        <AboutSection />
      </Container>
    </>
  );
}

export default Download;