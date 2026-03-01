import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import remarkVideo from './src/plugins/remark-video.js';

export default defineConfig({
  site: 'https://nexus.pages.dev',
  output: 'static',
  adapter: cloudflare(),
  integrations: [],
  markdown: {
    remarkPlugins: [remarkMath, remarkVideo],
    rehypePlugins: [rehypeKatex],
    shikiConfig: {
      theme: 'github-dark',
    },
  },
});
