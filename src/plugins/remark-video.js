import { visit } from 'unist-util-visit';

export default function remarkVideo() {
  return (tree) => {
    visit(tree, 'image', (node) => {
      // 检查是否是视频文件
      const videoExtensions = ['.mp4', '.webm', '.ogg', '.mov', '.avi', '.wmv'];
      const isVideo = videoExtensions.some(ext =>
        node.url.toLowerCase().endsWith(ext)
      );

      if (isVideo) {
        // 提取文件扩展名
        const extension = node.url.split('.').pop();
        // 确定MIME类型
        let mimeType = 'video/mp4';
        if (extension === 'webm') mimeType = 'video/webm';
        if (extension === 'ogg') mimeType = 'video/ogg';

        // 将image节点转换为html节点，包含video标签
        node.type = 'html';
        node.value = `
          <video controls class="markdown-video">
            <source src="${node.url}" type="${mimeType}">
            您的浏览器不支持视频标签。
          </video>
        `;
      }
    });
  };
}