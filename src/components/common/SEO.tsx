import { useEffect } from 'react';
import siteConfig from '../../config/site/site';

interface SEOProps {
  title: string;
  description: string;
}

function SEO({ title, description }: SEOProps) {
  useEffect(() => {
    document.title = `${title} | ${siteConfig.productName}`;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', description);
  }, [title, description]);

  return null;
}

export default SEO;
