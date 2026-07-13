// A quiet hello for anyone who opens the DevTools console. Prints once on load,
// picking up the visitor's live accent color so it matches a customized theme.
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

if (ExecutionEnvironment.canUseDOM) {
  const accent =
    getComputedStyle(document.documentElement).getPropertyValue('--ifm-color-primary').trim() ||
    '#1d9bf0';

  const wordmark = `color:${accent};font-size:40px;font-weight:800;letter-spacing:-0.03em`;
  const muted = 'color:#8899a6;font-size:13px;line-height:1.6';

  console.log('%clailai', wordmark);
  console.log(
    '%cDeveloper · Designer · OIer — https://lailai.one\n' +
      'Source: https://github.com/lailai0916/lailai0916.github.io\n' +
      'Curious? Try the Konami code anywhere on the site. ↑↑↓↓←→←→ B A',
    muted
  );
}
