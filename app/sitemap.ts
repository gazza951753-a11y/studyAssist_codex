import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ['', '/auth/login', '/auth/register', '/privacy', '/offer', '/refund-policy', '/consent-personal-data', '/consent-marketing'];
  return routes.map((r) => ({ url: `https://studyassist.ru${r}`, lastModified: new Date(), changeFrequency: 'weekly', priority: r === '' ? 1 : 0.8 }));
}
