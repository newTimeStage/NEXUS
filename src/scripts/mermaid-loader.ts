function getMermaidConfig() {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  return {
    theme: 'base' as const,
    themeVariables: {
      fontSize: 16,
      background: 'transparent',
      primaryColor: isDark ? '#d44c33' : '#b8452e',
      primaryBorderColor: isDark ? '#c0402a' : '#a03a26',
      primaryTextColor: '#ffffff',
      lineColor: isDark ? '#8a7e73' : '#8a7e73',
      secondaryColor: isDark ? '#2d2925' : '#e6dfd6',
      tertiaryColor: isDark ? '#3a3530' : '#d5cdc3',
      textColor: isDark ? '#ede8e0' : '#2c241b',
      mainBkg: isDark ? '#1f1c19' : '#f7f3ee',
      nodeBorder: isDark ? '#6b6055' : '#9e9388',
      clusterBkg: isDark ? '#2d2925' : '#efeae2',
      clusterBorder: isDark ? '#d44c33' : '#b8452e',
      titleColor: isDark ? '#ede8e0' : '#2c241b',
      edgeLabelBackground: isDark ? '#2d2925' : '#ffffff',
      nodeTextColor: isDark ? '#ede8e0' : '#2c241b',
    },
    flowchart: { useMaxWidth: true, htmlLabels: true, curve: 'basis' as const, padding: 16 },
    sequence: {
      useMaxWidth: true,
      actorMargin: 80,
      boxMargin: 12,
      boxTextMargin: 8,
      noteMargin: 12,
      messageMargin: 40,
      mirrorActors: true,
      actorFontSize: 16,
      noteFontSize: 15,
      messageFontSize: 15,
    },
    gantt: {
      useMaxWidth: true,
      barHeight: 30,
      barGap: 6,
      topPadding: 20,
      rightPadding: 40,
      leftPadding: 60,
      gridLineStartPadding: 40,
      fontSize: 14,
      sectionFontSize: 14,
      numberSectionStyles: 6,
      axisFormat: '%Y-%m-%d',
    },
    class: { useMaxWidth: true },
    state: { useMaxWidth: true, dividerMargin: 12, sizeUnit: 6, padding: 16 },
    pie: { useMaxWidth: true, textPosition: 0.75 },
    securityLevel: 'loose' as const,
    fontFamily: '"Noto Serif SC","Source Serif 4","Times New Roman",serif',
  };
}

function bindLightbox(el: Element) {
  el.addEventListener('click', (e) => {
    if ((e.target as Element).closest('a')) return;
    const svg = el.querySelector('svg');
    if (!svg) return;
    openMermaidLightbox(svg);
  });
}

function openMermaidLightbox(svg: SVGElement) {
  const overlay = document.createElement('div');
  overlay.className = 'mermaid-lightbox';

  const clone = svg.cloneNode(true) as SVGElement;
  clone.removeAttribute('style');
  clone.removeAttribute('width');
  clone.removeAttribute('height');

  let zoom = 1;
  const minZoom = 0.3;
  const maxZoom = 10;
  const zoomStep = 0.15;

  const zoomLabel = document.createElement('span');
  zoomLabel.className = 'mermaid-lightbox-zoom';
  zoomLabel.textContent = '100%';

  function applyZoom() {
    const pct = Math.round(zoom * 100);
    zoomLabel.textContent = pct + '%';
    zoomLabel.classList.remove('mermaid-lightbox-zoom-hide');
    clearTimeout((zoomLabel as any)._hideTimer);
    (zoomLabel as any)._hideTimer = setTimeout(() => zoomLabel.classList.add('mermaid-lightbox-zoom-hide'), 1200);
    if (zoom === 1) {
      clone.style.width = '';
      clone.style.maxHeight = '';
    } else {
      clone.style.width = (100 * zoom) + '%';
      clone.style.maxHeight = 'none';
    }
  }

  const closeBtn = document.createElement('button');
  closeBtn.className = 'mermaid-lightbox-close';
  closeBtn.setAttribute('aria-label', '关闭大图');
  closeBtn.innerHTML = '✕';

  overlay.appendChild(clone);
  overlay.appendChild(zoomLabel);
  overlay.appendChild(closeBtn);
  document.body.appendChild(overlay);
  document.body.style.overflow = 'hidden';

  overlay.addEventListener('wheel', (e) => {
    if (!e.ctrlKey && !e.metaKey) return;
    e.preventDefault();
    const dir = e.deltaY > 0 ? -zoomStep : zoomStep;
    const next = Math.max(minZoom, Math.min(maxZoom, zoom + dir));
    if (next !== zoom) { zoom = next; applyZoom(); }
  }, { passive: false });

  overlay.addEventListener('dblclick', () => {
    zoom = 1;
    applyZoom();
    overlay.scrollTo(0, 0);
  });

  let escHandler: (e: KeyboardEvent) => void;
  const close = () => {
    document.body.removeChild(overlay);
    document.body.style.overflow = '';
    document.removeEventListener('keydown', escHandler);
  };
  escHandler = (e: KeyboardEvent) => { if (e.key === 'Escape') close(); };
  document.addEventListener('keydown', escHandler);
  overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });
  closeBtn.addEventListener('click', close);
}

async function renderAllMermaid(mermaid: typeof import('mermaid')) {
  const cfg = getMermaidConfig();
  mermaid.default.initialize(cfg);
  await mermaid.default.run({ querySelector: '.mermaid' });
  document.querySelectorAll('.mermaid').forEach((el) => {
    if (el.querySelector('svg')) {
      el.classList.add('mermaid-rendered');
      bindLightbox(el);
    }
  });
}

async function initMermaid() {
  const elements = document.querySelectorAll<HTMLElement>('.mermaid');
  if (!elements.length) return;

  elements.forEach((el) => {
    el.setAttribute('data-code', el.textContent!.trim());
  });

  try {
    const mermaid = await import('mermaid');
    await renderAllMermaid(mermaid);
  } catch {
    document.querySelectorAll<HTMLElement>('.mermaid').forEach((el) => {
      el.textContent = '⚠ 图表加载失败';
      el.classList.remove('mermaid-rendered');
      el.classList.add('mermaid-error');
    });
  }
}

initMermaid();

let rendering = false;
new MutationObserver(async (mutations) => {
  if (rendering) return;
  for (const mutation of mutations) {
    if (mutation.type === 'attributes' && mutation.attributeName === 'data-theme') {
      rendering = true;
      const els = document.querySelectorAll<HTMLElement>('.mermaid[data-code]');
      if (!els.length) { rendering = false; return; }
      els.forEach((el) => {
        el.textContent = el.getAttribute('data-code')!;
        el.classList.remove('mermaid-rendered', 'mermaid-error');
      });
      try {
        const mermaid = await import('mermaid');
        await renderAllMermaid(mermaid);
      } catch {
        els.forEach((el) => {
          el.textContent = '⚠ 图表加载失败';
          el.classList.add('mermaid-error');
        });
      }
      rendering = false;
      break;
    }
  }
}).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
