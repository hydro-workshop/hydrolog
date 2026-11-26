import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

export default defineConfig({
  site: 'https://hydro.zerv.top/',
  output: 'static',
  trailingSlash: 'always',
  integrations: [mdx()],
});
