import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { CATEGORIES } from '../src/constants.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

function extractFrontmatter(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const match = content.match(/^---\s*\n([\s\S]*?)\n---/);
  if (!match) return {};
  const frontmatter = {};
  const lines = match[1].split('\n');
  for (const line of lines) {
    const kv = line.match(/^\s*(\w+):\s*(.+)/);
    if (kv) {
      frontmatter[kv[1]] = kv[2].replace(/^["']|["']$/g, '').trim();
    }
  }
  return frontmatter;
}

function extractContentPreview(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const body = content.replace(/^---[\s\S]*?\n---\n*/m, '');
  const plain = body
    .replace(/```[\s\S]*?```/g, '')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, '')
    .replace(/[#*_~`>|]/g, '')
    .replace(/\n{2,}/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  return plain.slice(0, 300);
}

function normalizeSlug(raw) {
  return raw.replace(/[<>:"/\\|?*()]/g, '').replace(/\s+/g, ' ').trim();
}

function walkDir(dir, baseDir, collection) {
  const results = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...walkDir(fullPath, baseDir, collection));
    } else if (entry.name.endsWith('.md') && entry.name !== '0-部序.md') {
      const relativePath = path.relative(baseDir, fullPath);
      const slug = relativePath.replace(/\.md$/, '').replace(/\\/g, '/');
      const fm = extractFrontmatter(fullPath);
      const normalizedSlug = normalizeSlug(slug.split('/').pop());
      const urlPath = `/${collection}/${normalizedSlug}/`;
      results.push({
        title: fm.title || entry.name.replace('.md', ''),
        path: urlPath,
        collection: collection,
        content: extractContentPreview(fullPath),
      });
    }
  }
  return results;
}

let allEntries = [];

for (const cat of CATEGORIES) {
  const catDir = path.join(rootDir, 'src', 'content', cat);
  if (fs.existsSync(catDir)) {
    allEntries.push(...walkDir(catDir, catDir, cat));
  }
}

const outputPath = path.join(rootDir, 'public', 'search-index.json');
fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, JSON.stringify(allEntries, null, 2), 'utf-8');

console.log(`Generated search-index.json with ${allEntries.length} entries`);