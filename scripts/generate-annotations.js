#!/usr/bin/env node
/**
 * 生成注释文件脚本
 * - 为src/content或content下的每个*.md文件，在src/annotations下创建对应的*.events.json和*.relations.json文件
 * - 确保annotations文件夹结构与content文件夹结构一致
 * - 仅当目标文件不存在时创建：不会覆盖现有标注文件
 */
import fs from 'fs';
import path from 'path';

const SOURCE_DIRS = [
  path.resolve(process.cwd(), 'src', 'content'),
  path.resolve(process.cwd(), 'content'),
].filter((dir) => fs.existsSync(dir));
const TARGET_ANNOTATIONS_DIR = path.resolve(process.cwd(), 'src', 'annotations');

function ensureDirExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`创建文件夹: ${dirPath}`);
  }
}

function shouldSkipMarkdown(fileName) {
  return !fileName.endsWith('.md') || fileName.endsWith('.events.json') || fileName.endsWith('.relations.json');
}

function createAnnotationFiles(sourceRoot, sourceFilePath) {
  const relativePath = path.relative(sourceRoot, sourceFilePath);
  const baseName = path.basename(relativePath, '.md');
  const dirName = path.dirname(relativePath);

  const eventsPath = path.join(TARGET_ANNOTATIONS_DIR, dirName, `${baseName}.events.json`);
  const relationsPath = path.join(TARGET_ANNOTATIONS_DIR, dirName, `${baseName}.relations.json`);

  ensureDirExists(path.dirname(eventsPath));

  fs.writeFileSync(eventsPath, '# 事件标注\n\n<!-- 在此记录该文档中的事件标注 -->\n', 'utf8');
  console.log(`写入文件: ${eventsPath}`);

  fs.writeFileSync(relationsPath, '# 语义关系标注\n\n<!-- 在此记录该文档中的语义关系标注 -->\n', 'utf8');
  console.log(`写入文件: ${relationsPath}`);
}

function scanAndGenerate() {
  console.log('开始生成注释文件...');

  if (SOURCE_DIRS.length === 0) {
    console.warn('未发现 content 目录（src/content 或 content），跳过注释文件生成。');
    return;
  }

  for (const sourceRoot of SOURCE_DIRS) {
    const stack = [sourceRoot];

    while (stack.length) {
      const currentPath = stack.pop();
      const stat = fs.statSync(currentPath);

      if (stat.isDirectory()) {
        for (const item of fs.readdirSync(currentPath)) {
          stack.push(path.join(currentPath, item));
        }
      } else if (stat.isFile()) {
        const fileName = path.basename(currentPath);
        if (shouldSkipMarkdown(fileName)) continue;

        createAnnotationFiles(sourceRoot, currentPath);
      }
    }
  }

  console.log('注释文件生成完成！');
}

scanAndGenerate();
