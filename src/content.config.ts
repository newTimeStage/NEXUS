import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const schema = z.object({
  title: z.string().optional(),
  author: z.string().optional(),
  date: z.union([z.string(), z.number(), z.date()]).optional(),
  category: z.string().optional(),
});

export const collections = {
  '文明根基': defineCollection({ loader: glob({ pattern: '**/*.md', base: './src/content/文明根基' }), schema }),
  '演进轨迹': defineCollection({ loader: glob({ pattern: '**/*.md', base: './src/content/演进轨迹' }), schema }),
  '制度与创造': defineCollection({ loader: glob({ pattern: '**/*.md', base: './src/content/制度与创造' }), schema }),
  '主体与未来': defineCollection({ loader: glob({ pattern: '**/*.md', base: './src/content/主体与未来' }), schema }),
};