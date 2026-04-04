import { visit } from 'unist-util-visit';

export default function remarkHttpToHttps() {
  return (tree) => {
    visit(tree, ['link', 'image', 'html'], (node) => {
      if (node.type === 'link' && node.url) {
        if (node.url.startsWith('http://')) {
          node.url = node.url.replace('http://', 'https://');
        }
      }

      if (node.type === 'image' && node.url) {
        if (node.url.startsWith('http://')) {
          node.url = node.url.replace('http://', 'https://');
        }
      }

      if (node.type === 'html' && node.value) {
        node.value = node.value.replace(
          /src="http:\/\//g,
          'src="https://'
        ).replace(
          /href="http:\/\//g,
          'href="https://'
        );
      }
    });
  };
}
