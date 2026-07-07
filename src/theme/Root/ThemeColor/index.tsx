import { useEffect } from 'react';

// Keep <meta name="theme-color"> in sync with the page background so the mobile
// browser chrome (address bar) matches the site in both themes. We read the
// resolved --ifm-background-color and re-sync whenever the data-theme attribute
// flips, so it follows the manual light/dark toggle, not just the OS preference.
export default function ThemeColor(): null {
  useEffect(() => {
    let meta = document.querySelector<HTMLMetaElement>(
      'meta[name="theme-color"]'
    );
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'theme-color';
      document.head.appendChild(meta);
    }

    const sync = () => {
      const bg = getComputedStyle(document.documentElement)
        .getPropertyValue('--ifm-background-color')
        .trim();
      if (bg) meta.content = bg;
    };

    sync();
    const observer = new MutationObserver(sync);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });
    return () => observer.disconnect();
  }, []);

  return null;
}
