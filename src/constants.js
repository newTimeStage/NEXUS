export const CATEGORIES = ['文明根基', '演进轨迹', '制度与创造', '主体与未来'];

/**
 * 根据分类名称获取集合名（与 Astro content collections 对应）
 */
export function getCollection(category) {
  if (CATEGORIES.includes(category)) {
    return category;
  }
  return CATEGORIES[0];
}
