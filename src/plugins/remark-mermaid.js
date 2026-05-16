import { visit } from 'unist-util-visit';

export default function remarkMermaid() {
  return function (tree) {
    visit(tree, 'code', (node, index, parent) => {
      if (node.lang === 'mermaid') {
        const mermaidNode = {
          type: 'html',
          value: `<div class="mermaid">${node.value}</div>`
        };
        parent.children[index] = mermaidNode;
      }
    });
  };
}
