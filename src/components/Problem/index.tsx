import React, { useEffect, useRef } from 'react';

interface ProblemProps {
  id: string;
}

const componentCache: { [key: string]: React.ComponentType } = {};

const Problem: React.FC<ProblemProps> = ({ id }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 确保 KaTeX 样式表被加载
    if (typeof window !== 'undefined') {
      const katexCSS = 'https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css';
      if (!document.querySelector(`link[href="${katexCSS}"]`)) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = katexCSS;
        link.integrity = 'sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM';
        link.crossOrigin = 'anonymous';
        document.head.appendChild(link);
      }
    }
  }, []);

  useEffect(() => {
    // 处理数学公式
    if (containerRef.current && typeof window !== 'undefined') {
      import('katex').then(katex => {
        const container = containerRef.current;
        if (!container) return;

        // 处理块级公式 $$...$$
        const processDisplayMath = (element: Element) => {
          const walker = document.createTreeWalker(
            element,
            NodeFilter.SHOW_TEXT,
            null
          );

          const textNodes: Text[] = [];
          let node;
          while (node = walker.nextNode()) {
            if (node.textContent && node.textContent.includes('$$')) {
              textNodes.push(node as Text);
            }
          }

          textNodes.forEach(textNode => {
            if (!textNode.textContent) return;
            
            let content = textNode.textContent;
            let hasChanges = false;

            // 处理块级数学公式 $$...$$
            content = content.replace(/\$\$([^$]*?)\$\$/gs, (match, math) => {
              try {
                hasChanges = true;
                const renderedMath = katex.default.renderToString(math.trim(), {
                  displayMode: true,
                  throwOnError: false
                });
                return `<div class="math-display">${renderedMath}</div>`;
              } catch (e) {
                console.warn('KaTeX rendering error for display math:', e);
                return match;
              }
            });

            if (hasChanges && textNode.parentNode) {
              const div = document.createElement('div');
              div.innerHTML = content;
              textNode.parentNode.replaceChild(div, textNode);
            }
          });
        };

        // 处理内联公式 $...$
        const processInlineMath = (element: Element) => {
          const walker = document.createTreeWalker(
            element,
            NodeFilter.SHOW_TEXT,
            null
          );

          const textNodes: Text[] = [];
          let node;
          while (node = walker.nextNode()) {
            if (node.textContent && node.textContent.includes('$') && !node.textContent.includes('$$')) {
              textNodes.push(node as Text);
            }
          }

          textNodes.forEach(textNode => {
            if (!textNode.textContent) return;
            
            let content = textNode.textContent;
            let hasChanges = false;

            // 处理行内数学公式 $...$（但不处理 $$...$$）
            content = content.replace(/(?<!\$)\$([^$\n]+?)\$(?!\$)/g, (match, math) => {
              try {
                hasChanges = true;
                return katex.default.renderToString(math.trim(), {
                  displayMode: false,
                  throwOnError: false
                });
              } catch (e) {
                console.warn('KaTeX rendering error for inline math:', e);
                return match;
              }
            });

            if (hasChanges && textNode.parentNode) {
              const span = document.createElement('span');
              span.innerHTML = content;
              textNode.parentNode.replaceChild(span, textNode);
            }
          });
        };

        // 先处理块级公式，再处理内联公式
        processDisplayMath(container);
        processInlineMath(container);
        
      }).catch(error => {
        console.warn('Failed to load KaTeX:', error);
      });
    }
  });

  if (componentCache[id]) {
    const CachedComponent = componentCache[id];
    return (
      <div ref={containerRef}>
        <CachedComponent />
      </div>
    );
  }

  try {
    const module = require(`../../problems/${id}.md`);
    const MDXComponent = module.default;
    
    if (MDXComponent) {
      componentCache[id] = MDXComponent;
      return (
        <div ref={containerRef}>
          <MDXComponent />
        </div>
      );
    } else {
      throw new Error('Module has no default export');
    }
  } catch (error) {
    console.error(`Error loading problem ${id}:`, error);
    return (
      <div style={{ 
        padding: '20px', 
        color: 'red', 
        border: '1px solid #ff6b6b',
        borderRadius: '4px',
        backgroundColor: '#ffe0e0',
        margin: '10px 0'
      }}>
        <strong>错误：</strong> 无法加载题目 {id}
        <br />
        <small>请检查文件 src/problems/{id}.md 是否存在</small>
      </div>
    );
  }
};

export default Problem;
