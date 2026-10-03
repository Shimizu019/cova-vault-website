import SEO from '../../components/common/SEO/SEO.jsx';
import Container from '../../components/common/Container/Container.jsx';
import HeroSection from '../../components/sections/HeroSection/HeroSection.jsx';
import FeatureSection from '../../components/sections/FeatureSection/FeatureSection.jsx';
import SecuritySection from '../../components/sections/SecuritySection/SecuritySection.jsx';
import FAQSection from '../../components/sections/FAQSection/FAQSection.jsx';
import DownloadSection from '../../components/sections/DownloadSection/DownloadSection.jsx';
import WhySection from '../../components/sections/WhySection/WhySection.jsx';
import PreviewSection from '../../components/sections/PreviewSection/PreviewSection.jsx';

function Home() {
  return (
    <>
      <SEO title="Home | Cova Vault" description="Cova Vault - Secure Password Manager for Android" />
      <Container>
        <HeroSection />
        <WhySection />
        <PreviewSection />
        <FeatureSection />
        <SecuritySection />
        <DownloadSection />
        <FAQSection />
      </Container>
    </>
  );
}

export default Home;