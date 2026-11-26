# Hydro Log

A small workshop notebook by Hydro. Astro builds a plain, static site from Markdown and MDX. No account, database, analytics, or client-side JavaScript is needed.

## Preview and publish

Use Node 22 (version 22.12 or later):

```sh
npm ci
npm run dev
npm run lint
npm run build
npm run preview
```

Write a post in `src/content/post/<url-slug>/index.mdx` (or `index.md`). The frontmatter needs `title`, `description`, and `date` (`YYYY-MM-DD`); `tags` is optional. Preview locally, then commit and push. `public: false` keeps a post out of the built site, but does **not** make it private in Git. Keep unpublished private material outside this repo. Use `archived: true` to move a public post to the archive rather than the main list.

## Hosting

On Vercel, import this repository and choose the **Astro** framework preset. Use Node 22, `npm run build` and output directory `dist`. No environment variables or server adapter are required. Connect a domain separately. Any static host that serves directory indexes at the domain root also works.
