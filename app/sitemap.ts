import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://automotcentre.com';

  const routes = [
    '',
    '/about',
    '/services',
    '/services/mot-testing',
    '/services/full-service',
    '/services/interim-service',
    '/services/oil-change',
    '/services/diagnostics',
    '/services/repairs',
    '/faq',
    '/mot-booking',
    '/check-mot-status',
    '/make-an-appointment',
    '/gallery',
    '/contact-us',
    '/shop',
    '/privacy-policy',
    '/terms-and-conditions',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  return routes;
}
