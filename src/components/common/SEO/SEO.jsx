import { useEffect } from 'react';
import siteConfig from '../../../config/site/site.config.js';

function SEO({ title, description }) {
  const normalizedTitle = title ? `${title}` : siteConfig.websiteName;
  const siteDescription = description || siteConfig.tagline || 'Cova Vault - Secure Password Manager for Android';

  useEffect(() => {
    document.title = normalizedTitle;
  }, [normalizedTitle, siteDescription]);

  return null;
}

export default SEO;