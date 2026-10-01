import { GetServerSideProps } from 'next';

const BASE_URL = 'https://projetofutebol.com.br';

const staticPages = [
  '',
  '/tabela',
  '/artilheiros',
  '/ao-vivo',
  '/privacidade',
  '/termos',
  '/contato',
];

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticPages
  .map((page) => {
    const url = `${BASE_URL}${page}`;
    const priority = page === '' ? '1.0' : '0.8';
    const changefreq = page === '/ao-vivo' ? 'hourly' : page === '/tabela' || page === '/artilheiros' ? 'daily' : 'weekly';
    return `  <url>
    <loc>${url}</loc>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
  })
  .join('\n')}
</urlset>`;

  res.setHeader('Content-Type', 'application/xml');
  res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
  res.end(sitemap);
  return { props: {} };
};

export default function Sitemap() {
  return null;
}