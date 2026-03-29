#!/usr/bin/env node
/**
 * Post-build annotator
 * - Keeps src/content/*.md unchanged
 * - After a build (HTML in dist/ by default), annotate generated HTML pages using docs/annotations.json
 * - Annotations appear as small labels under content; clicking opens a modal with the content
 */
import fs from 'fs';
import path from 'path';

const BUILD_OUT_DIR = process.env.BUILD_OUT_DIR || 'dist';
const BUILD_ROOT = path.resolve(process.cwd(), BUILD_OUT_DIR);
const SRC_MD_DIR = path.resolve(process.cwd(), 'src', 'content');

function loadAnnotations() {
  const specPath = path.resolve(process.cwd(), 'docs', 'annotations.json');
  if (!fs.existsSync(specPath)) {
    console.warn('annotations.json not found at docs/annotations.json');
    return [];
  }
  try {
    const data = JSON.parse(fs.readFileSync(specPath, 'utf8'));
    return data.annotations || [];
  } catch (e) {
    console.error('Failed to parse docs/annotations.json:', e.message);
    return [];
  }
}

function walkHtmlFiles(rootDir) {
  const htmls = [];
  if (!fs.existsSync(rootDir)) return htmls;
  const stack = [rootDir];
  while (stack.length) {
    const pth = stack.pop();
    const stat = fs.statSync(pth);
    if (stat.isDirectory()) {
      const items = fs.readdirSync(pth);
      for (const it of items) stack.push(path.join(pth, it));
    } else if (stat.isFile() && pth.toLowerCase().endsWith('.html')) {
      htmls.push(pth);
    }
  }
  return htmls;
}

// duplicate insert handler removed

function main() {
  const annotations = loadAnnotations();
  if (!annotations.length) {
    console.log('No annotations to apply.');
    return;
  }

  // Build a mapping from md basename to notes
  const mapping = new Map();
  for (const a of annotations) {
    if (!a.md) continue;
    const base = path.basename(a.md, '.md');
    mapping.set(base, a.notes || []);
  }

  // Find all HTML files in build output
  const htmlFiles = walkHtmlFiles(BUILD_ROOT);
  if (htmlFiles.length === 0) {
    console.warn('No HTML files found in build output directory:', BUILD_ROOT);
    return;
  }

  // Prepare annotation blocks and content holders
  let blocks = '';
  // Each note becomes a small label and a hidden content block
  for (const [basename, notes] of mapping.entries()) {
    if (!notes || !notes.length) continue;
    for (const n of notes) {
      if (!n || !n.id) continue;
      const label = (n.label || 'Note');
      const safeId = String(n.id).replace(/\s+/g, '-');
      blocks += '<div class="cc-annotation" data-annotation-id="' + safeId + '">' +
        '<span class="cc-annotation-label">[' + label + ']</span>' +
        '</div>' +
        '<div class="cc-annotation-content" id="ann-' + safeId + '-content" style="display:none;">' +
        (n.content || '') + '</div>';
    }
  }

  if (!blocks) {
    console.log('No valid annotation blocks generated.');
    return;
  }

  // Inline CSS/JS for annotation UI (self-contained)
  const styleBlock = `
<style>
.cc-annotation { display:block; margin-top:6px; font-size:0.8em; color:#6b7280; }
.cc-annotation-label { cursor:pointer; color:#374151; text-decoration: underline dotted; }
.cc-modal { position: fixed; inset:0; background: rgba(0,0,0,.5); display:none; align-items:center; justify-content:center; z-index:9999; }
.cc-modal.show { display:flex; }
.cc-modal-content { background:#fff; padding:20px; border-radius:8px; max-width:640px; width:90%; box-shadow:0 4px 16px rgba(0,0,0,.25); position:relative; }
.cc-close { position:absolute; right:8px; top:8px; border:0; background:#f3f4f6; padding:6px 8px; border-radius:6px; cursor:pointer; }
</style>`;
  const scriptBlock = `
<script>
(function(){
  function ensureModal(){
    var m = document.getElementById('cc-annotation-modal');
    if (m) return m;
    m = document.createElement('div');
    m.id = 'cc-annotation-modal';
    m.className = 'cc-modal';
    m.innerHTML = '<div class="cc-modal-content">' +
                  '<button class="cc-close" aria-label="Close">Close</button>' +
                  '<div id="cc-annotation-modal-body"></div>' +
                  '</div>';
    document.body.appendChild(m);
    m.querySelector('.cc-close').addEventListener('click', function(){ m.classList.remove('show'); });
    m.addEventListener('click', function(e){ if (e.target === m) m.classList.remove('show'); });
    window.addEventListener('keydown', function(e){ if (e.key === 'Escape') m.classList.remove('show'); });
    return m;
  }
  function showModal(html){
    var modal = ensureModal();
    document.getElementById('cc-annotation-modal-body').innerHTML = html;
    modal.classList.add('show');
  }
  // Event delegation for annotation labels
  document.addEventListener('click', function(e){
    var t = e.target;
    if (t && t.classList && t.classList.contains('cc-annotation-label')){
      var id = t.closest('.cc-annotation').getAttribute('data-annotation-id');
      var contentEl = document.getElementById('ann-' + id + '-content');
      var html = contentEl ? contentEl.innerHTML : '';
      showModal(html);
    }
  });
})();
</script>`;

  // Inject into each HTML file: per-page annotation blocks (only for pages that match md basenames)
  for (const htmlPath of htmlFiles) {
    try {
      let html = fs.readFileSync(htmlPath, 'utf8');
      // Avoid duplicating injections
      if (html.includes('<!-- annotations-injected -->')) continue;
      const baseName = path.basename(htmlPath, '.html');
      const notesForPage = mapping.get(baseName) || [];
      // Build per-page blocks
      let perPageBlocks = '';
      for (const n of notesForPage) {
        if (!n || !n.id) continue;
        const label = (n.label || 'Note');
        const safeId = String(n.id).replace(/\s+/g, '-');
        perPageBlocks += '<div class="cc-annotation" data-annotation-id="' + safeId + '">' +
          '<span class="cc-annotation-label">[' + label + ']</span>' +
          '</div>' +
          '<div class="cc-annotation-content" id="ann-' + safeId + '-content" style="display:none;">' +
          (n.content || '') + '</div>';
      }
      // If this page has no notes, skip writing
      if (!perPageBlocks) continue;
      const injection = perPageBlocks + styleBlock + scriptBlock + '<!-- annotations-injected -->';
      const finalHtml = insertAtEndOfBody(html, injection);
      fs.writeFileSync(htmlPath, finalHtml, 'utf8');
      console.log('Annotated:', htmlPath);
    } catch (e) {
      console.error('Failed to annotate', htmlPath, e.message);
    }
  }
  console.log('Annotation build step completed.');
}

// Helper function to insert blocks before closing body tag
function insertAtEndOfBody(html, insertion) {
  const idx = html.lastIndexOf('</body>');
  if (idx === -1) return html + insertion;
  return html.slice(0, idx) + insertion + html.slice(idx);
}

main();
