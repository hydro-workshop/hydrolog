import type { APIRoute } from 'astro';
import { postUrl, publishedPosts } from '../utils/common';
import { escapeXml, xmlResponse } from '../utils/xml';

export const GET: APIRoute = async ({ site }) => {
  if (!site) throw new Error('Set the production site URL for the sitemap.');
  const [posts, archived] = await Promise.all([
    publishedPosts(),
    publishedPosts(true),
  ]);
  const paths = [
    '/',
    '/posts/',
    '/about/',
    ...[...posts, ...archived].map(postUrl),
  ];
  if (archived.length) paths.push('/archive/');
  const urls = paths.map(
    (path) => `<url><loc>${escapeXml(new URL(path, site).href)}</loc></url>`,
  );
  return xmlResponse(
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  ${urls.join('\n  ')}\n</urlset>`,
    'application/xml',
  );
};
