import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import remarkVideo from './src/plugins/remark-video.js';
import remarkEntityAnnotation from './src/plugins/remark-entity-annotation.js';
import { writeFileSync } from 'fs';
import { resolve } from 'path';

export default defineConfig({
  site: 'https://nexus-6gs.pages.dev/',
  output: 'static',
  adapter: cloudflare(),
  integrations: [],
  markdown: {
    remarkPlugins: [remarkMath, remarkVideo, remarkEntityAnnotation],
    rehypePlugins: [rehypeKatex],
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
