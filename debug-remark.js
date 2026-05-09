
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkMath from 'remark-math';
import remarkRehype from 'remark-rehype';
import rehypeKatex from 'rehype-katex';
import remarkEntityAnnotation from './src/plugins/remark-entity-annotation-fixed.js';
import remarkVideo from './src/plugins/remark-video.js';
import remarkMdLinks from './src/plugins/remark-md-links.js';
import remarkStringify from 'remark-stringify';
import rehypeStringify from 'rehype-stringify';

const markdown = `
定义耦合强度矩阵：

$$\\Gamma = \\begin{bmatrix}
\\gamma_{11} & \\gamma_{12} & \\cdots & \\gamma_{1M} \\\\
\\gamma_{21} & \\gamma_{22} & \\cdots & \\gamma_{2M} \\\\
\\vdots & \\vdots & \\ddots & \\vdots \\\\
\\gamma_{M1} & \\gamma_{M2} & \\cdots & \\gamma_{MM}
\\end{bmatrix}$$
`;

function printNode(node, indent = 0) {
    const prefix = '  '.repeat(indent);
    console.log(`${prefix}type: ${node.type}`);
    if (node.value) {
        console.log(`${prefix}value: ${JSON.stringify(node.value)}`);
    }
    if (node.children) {
        console.log(`${prefix}children:`);
        for (const child of node.children) {
            printNode(child, indent + 1);
        }
    }
}

async function debug() {
    console.log('--- Step 1: remarkParse ---');
    const file1 = await unified()
        .use(remarkParse)
        .use(remarkStringify)
        .process(markdown);
    console.log('Output:', file1.toString());

    console.log('\n--- Step 2: remarkParse + remarkMath ---');
    const processor2 = unified()
        .use(remarkParse)
        .use(remarkMath);
    const file2 = await processor2.process(markdown);
    printNode(file2.data.ast);

    console.log('\n--- Step 3: remarkParse + remarkMath + remarkEntityAnnotation ---');
    const processor3 = unified()
        .use(remarkParse)
        .use(remarkMath)
        .use(remarkEntityAnnotation);
    const file3 = await processor3.process(markdown);
    printNode(file3.data.ast);

    console.log('\n--- Step 4: Full pipeline ---');
    const file4 = await unified()
        .use(remarkParse)
        .use(remarkMath)
        .use(remarkEntityAnnotation)
        .use(remarkVideo)
        .use(remarkMdLinks)
        .use(remarkRehype)
        .use(rehypeKatex, { strict: false, throwOnError: false })
        .use(rehypeStringify)
        .process(markdown);
    console.log(file4.toString());
}

debug().catch(e => console.error(e));
