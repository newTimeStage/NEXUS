import { visit } from 'unist-util-visit';

const knownCollections = ['文明根基', '演进轨迹', '制度与创造', '主体与未来'];

export default function rehypeMdLinks() {
  return (tree, file) => {
    const filePath = file?.path || '';
    
    let collection = '';
    if (filePath) {
      const pathParts = filePath.split(/[/\\]/);
      const contentIndex = pathParts.findIndex(p => p === 'content');
      if (contentIndex >= 0 && pathParts[contentIndex + 1]) {
        collection = pathParts[contentIndex + 1];
      }
    }
    
    if (!collection) {
      collection = '文明根基';
    }

    visit(tree, 'element', (node) => {
      if (node.tagName === 'a' && node.properties && node.properties.href) {
        let href = node.properties.href;
        
        if (typeof href !== 'string') return;
        
        if (href.toLowerCase().endsWith('.md')) {
          href = href.slice(0, -3);
          
          if (href.startsWith('./')) {
            href = href.slice(2);
          } else if (href.startsWith('../')) {
            const currentDirParts = filePath.split(/[/\\]/);
            const resolved = currentDirParts.slice(0, -1);
            const hrefParts = href.split('/');
            
            for (const part of hrefParts) {
              if (part === '..') {
                resolved.pop();
              } else if (part && part !== '.') {
                resolved.push(part);
              }
            }
            
            href = resolved.join('/');
          }
          
          if (!href.startsWith('/') && !href.startsWith('http')) {
            const slug = href.split('/').pop() || href;
            const firstSegment = href.split('/')[0];
            
            if (knownCollections.includes(firstSegment)) {
              href = '/' + href;
            } else {
              href = '/' + collection + '/' + slug;
            }
          }
          
          node.properties.href = href;
        }
      }
    });
  };
}