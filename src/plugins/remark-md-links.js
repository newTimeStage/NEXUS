import { visit } from 'unist-util-visit';

export default function remarkMdLinks() {
  return (tree, file) => {
    visit(tree, 'link', (node) => {
      if (typeof node.url !== 'string') return;

      const url = node.url;

      if (url.toLowerCase().endsWith('.md')) {
        let newUrl = url.slice(0, -3);

        if (newUrl.startsWith('./')) {
          newUrl = newUrl.slice(2);
        } else if (newUrl.startsWith('../')) {
          const parts = newUrl.split('/');
          const resolved = [];
          for (const part of parts) {
            if (part === '..') {
              resolved.pop();
            } else if (part !== '.') {
              resolved.push(part);
            }
          }
          newUrl = resolved.join('/');
        }

        if (!newUrl.startsWith('/') && !newUrl.startsWith('http')) {
          newUrl = '/' + newUrl;
        }

        node.url = newUrl;
      }
    });
  };
}
