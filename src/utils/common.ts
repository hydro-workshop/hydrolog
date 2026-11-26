import { getCollection, type CollectionEntry } from 'astro:content';
import slugify from 'slugify';

export const dateLabel = (date: Date) => date.toISOString().slice(0, 10);
export const tagSlug = (tag: string) =>
  slugify(tag, { lower: true, strict: true });

export async function publishedPosts(archived = false) {
  const posts = await getCollection(
    'post',
    ({ data }) => data.public && data.archived === archived,
  );
  return posts.sort(
    (a, b) =>
      b.data.date.valueOf() - a.data.date.valueOf() || a.id.localeCompare(b.id),
  );
}

export function postUrl(post: CollectionEntry<'post'>) {
  return `/${post.data.archived ? 'archive' : 'post'}/${post.id}/`;
}

export function tagsFor(posts: CollectionEntry<'post'>[]) {
  return [...new Set(posts.flatMap(({ data }) => data.tags))].sort();
}
