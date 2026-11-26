import type { APIRoute } from 'astro';
import { postUrl, publishedPosts } from '../utils/common';
import { escapeXml, xmlResponse } from '../utils/xml';

export const GET: APIRoute = async ({ site }) => {
  if (!site) throw new Error('Set the production site URL for RSS.');
  const posts = await publishedPosts();
  const items = posts.slice(0, 20).map((post) => {
    const { data } = post;
    const url = escapeXml(new URL(postUrl(post), site).href);
    return `<item>
  <title>${escapeXml(data.title)}</title>
  <description>${escapeXml(data.description)}</description>
  <link>${url}</link>
  <guid isPermaLink="true">${url}</guid>
  <pubDate>${data.date.toUTCString()}</pubDate>
</item>`;
  });
  return xmlResponse(
    `<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>Hydro Log</title>
  <description>A workshop notebook by Hydro.</description>
  <link>${escapeXml(site.href)}</link>
  <atom:link href="${escapeXml(new URL('/rss.xml', site).href)}" rel="self" type="application/rss+xml" />
  ${items.join('\n  ')}
</channel>
</rss>`,
    'application/rss+xml',
  );
};
