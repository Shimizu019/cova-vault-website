import SEO from '../components/common/SEO';
import HeroSection from '../components/sections/HeroSection';
import ModulesSection from '../components/sections/ModulesSection';
import MoneySection from '../components/sections/MoneySection';
import PrivacySection from '../components/sections/PrivacySection';
import DownloadSection from '../components/sections/DownloadSection';
import LatestReleaseSection from '../components/sections/LatestReleaseSection';

function Home() {
  return (
    <>
      <SEO
        title="Your secure personal vault"
        description="Cova Vault is a privacy-focused, Android personal vault app for credentials, notes, tasks, PeraLog, My Wallet, savings, folders, favorites, and calendar. It runs locally with no cloud sync. Android available now; Windows coming soon."
      />
      <HeroSection />
      <ModulesSection />
      <MoneySection />
      <PrivacySection />
      <DownloadSection />
      <LatestReleaseSection />
    </>
  );
}

export default Home;