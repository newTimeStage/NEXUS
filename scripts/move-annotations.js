#!/usr/bin/env node
/**
 * 移动注释文件脚本
 * - 将src/content下的*.events.json和*.relations.json文件移动到src/annotations下对应的路径
 * - 确保annotations文件夹结构与content文件夹结构一致
 */
import fs from 'fs';
import path from 'path';

const SRC_CONTENT_DIR = path.resolve(process.cwd(), 'src', 'content');
const SRC_ANNOTATIONS_DIR = path.resolve(process.cwd(), 'src', 'annotations');

function moveAnnotations() {
  console.log('开始移动注释文件...');

  // 遍历content文件夹下的所有文件
  const stack = [SRC_CONTENT_DIR];
  while (stack.length) {
    const currentPath = stack.pop();
    const stat = fs.statSync(currentPath);

    if (stat.isDirectory()) {
      // 继续遍历子目录
      const items = fs.readdirSync(currentPath);
      for (const item of items) {
        stack.push(path.join(currentPath, item));
      }
    } else if (stat.isFile()) {
      // 检查是否是events.md或relations.md文件
      const fileName = path.basename(currentPath);
      if (fileName.endsWith('.events.json') || fileName.endsWith('.relations.json')) {
        // 计算对应的annotations文件夹路径
        const relativePath = path.relative(SRC_CONTENT_DIR, currentPath);
        const targetPath = path.join(SRC_ANNOTATIONS_DIR, relativePath);

        // 创建目标文件夹
        const targetDir = path.dirname(targetPath);
        if (!fs.existsSync(targetDir)) {
          fs.mkdirSync(targetDir, { recursive: true });
          console.log(`创建文件夹: ${targetDir}`);
        }

        // 移动文件
        fs.renameSync(currentPath, targetPath);
        console.log(`移动文件: ${currentPath} -> ${targetPath}`);
      }
    }
  }

  console.log('注释文件移动完成！');
}

moveAnnotations();
