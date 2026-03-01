import { defineConfig } from 'astro/config';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import remarkVideo from './src/plugins/remark-video.js';

export default defineConfig({
  site: 'https://nexus.pages.dev',
  output: 'static',
  markdown: {
    remarkPlugins: [remarkMath, remarkVideo],
    rehypePlugins: [rehypeKatex],
    shikiConfig: {
      theme: 'github-dark',
    },
  },
});
