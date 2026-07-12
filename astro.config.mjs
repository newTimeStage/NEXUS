import { defineConfig } from 'astro/config';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import remarkVideo from './src/plugins/remark-video.js';
import remarkMermaid from './src/plugins/remark-mermaid.js';
import rehypeMdLinks from './src/plugins/rehype-md-links.js';
import rehypeLazyLoading from './src/plugins/rehype-lazy-loading.js';
import rehypeSlug from 'rehype-slug';
import { writeFileSync } from 'fs';
import { resolve } from 'path';

export default defineConfig({
  site: 'https://nexus-6gs.pages.dev/',
  output: 'static',
  integrations: [],
  markdown: {
    remarkPlugins: [remarkMath, remarkVideo, remarkMermaid],
    rehypePlugins: [
      rehypeSlug,
      [rehypeKatex, { strict: false, throwOnError: false }],
      rehypeMdLinks,
      rehypeLazyLoading,
    ],
    shikiConfig: {
      theme: 'github-dark',
    },
  },
  hooks: {
    'build:done': async ({ dir }) => {
      // Create .assetsignore file in the dist directory
      const assetsIgnorePath = resolve(dir.pathname, '.assetsignore');
      writeFileSync(assetsIgnorePath, '_worker.js\n');
      console.log(`Created .assetsignore file at ${assetsIgnorePath}`);
    },
  },
});
