import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async ({ site }) => {
  const siteUrl = site?.toString() || 'http://localhost:4321';
  
  const entries = await getCollection('cityThemeAge', ({ data }) => {
    return data.publish !== false;
  });
  
  const staticPages = [
    '',
    'schnitzeljagd',
  ];
  
  const urls = [
    ...staticPages.map(page => ({
      url: `${siteUrl}${page}`,
      lastmod: new Date().toISOString().split('T')[0]
    })),
    ...entries.map(entry => ({
      url: `${siteUrl}schnitzeljagd/${entry.slug}`,
      lastmod: new Date().toISOString().split('T')[0]
    }))
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(({ url, lastmod }) => `  <url><loc>${url}</loc><lastmod>${lastmod}</lastmod></url>`).join('\n')}
</urlset>`;

  return new Response(xml, { headers: { 'Content-Type': 'application/xml' } });
};