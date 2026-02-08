import { defineCollection, z } from 'astro:content';

const baseSchema = z.object({
  title: z.string(),
  author: z.string(),
  date: z.date(), // Astro会自动将日期字符串转换为Date对象
  category: z.string(),
});

// 为每个分类创建集合
const civilizationRootsCollection = defineCollection({
  schema: baseSchema,
});

const evolutionCollection = defineCollection({
  schema: baseSchema,
});

const systemsCollection = defineCollection({
  schema: baseSchema,
});

const futureCollection = defineCollection({
  schema: baseSchema,
});

export const collections = {
  '文明根基': civilizationRootsCollection,
  '演进轨迹': evolutionCollection,
  '制度与创造': systemsCollection,
  '主体与未来': futureCollection,
};