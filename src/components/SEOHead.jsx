import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function SEOHead({ 
  title, 
  description, 
  keywords, 
  image, 
  url,
  type = 'website'
}) {
  const location = useLocation();

  useEffect(() => {
    // Update document title
    document.title = title || 'truongvantoan.com - Shop Bán Account Game Uy Tín Hàng Đầu Việt Nam';
    
    // Update meta description
    updateMetaTag('name', 'description', description);
    
    // Update meta keywords
    updateMetaTag('name', 'keywords', keywords);
    
    // Update Open Graph tags
    updateMetaTag('property', 'og:title', title);
    updateMetaTag('property', 'og:description', description);
    updateMetaTag('property', 'og:image', image);
    updateMetaTag('property', 'og:url', url || `https://truongvantoan.com${location.pathname}`);
    updateMetaTag('property', 'og:type', type);
    
    // Update Twitter tags
    updateMetaTag('property', 'twitter:title', title);
    updateMetaTag('property', 'twitter:description', description);
    updateMetaTag('property', 'twitter:image', image);
    
    // Update canonical URL
    updateCanonical(url || `https://truongvantoan.com${location.pathname}`);
    
  }, [title, description, keywords, image, url, type, location.pathname]);

  const updateMetaTag = (attribute, value, content) => {
    if (!content) return;
    
    let meta = document.querySelector(`meta[${attribute}="${value}"]`);
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute(attribute, value);
      document.head.appendChild(meta);
    }
    meta.content = content;
  };

  const updateCanonical = (href) => {
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = href;
  };

  return null; // This component doesn't render anything
} 