import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, '../dist');

// 确保 functions 目录被复制到 dist 目录
const functionsDir = path.resolve(__dirname, '../functions');
const distFunctionsDir = path.join(distDir, 'functions');

if (fs.existsSync(functionsDir)) {
  // 递归复制 functions 目录
  function copyDir(src, dest) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    const entries = fs.readdirSync(src, { withFileTypes: true });
    for (const entry of entries) {
      const srcPath = path.join(src, entry.name);
      const destPath = path.join(dest, entry.name);
      if (entry.isDirectory()) {
        copyDir(srcPath, destPath);
      } else {
        fs.copyFileSync(srcPath, destPath);
      }
    }
  }
  
  copyDir(functionsDir, distFunctionsDir);
  console.log('Copied functions directory to dist');
}

console.log('Post-build script completed successfully!');
