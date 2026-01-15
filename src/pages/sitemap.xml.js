const pages = [
  { url: '', lastmod: new Date(), changefreq: 'weekly', priority: 1.0 },
  { url: '/intro', lastmod: new Date(), changefreq: 'monthly', priority: 0.9 },
  { url: '/politica', lastmod: new Date(), changefreq: 'monthly', priority: 0.9 },
  { url: '/defensa', lastmod: new Date(), changefreq: 'monthly', priority: 0.9 },
  { url: '/educacion', lastmod: new Date(), changefreq: 'monthly', priority: 0.9 },
  { url: '/simbolos', lastmod: new Date(), changefreq: 'monthly', priority: 0.9 },
  { url: '/infraestructura', lastmod: new Date(), changefreq: 'monthly', priority: 0.9 },
  { url: '/vivienda', lastmod: new Date(), changefreq: 'monthly', priority: 0.9 }
];

const siteUrl = 'https://europa.comovas.es/eue-site';

export function GET() {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(page => `
  <url>
    <loc>${siteUrl}${page.url}</loc>
    <lastmod>${page.lastmod.toISOString()}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('')}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
