import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

// Heatmap previews embed the live site; recording them would collect the viewer's own activity.
if (ExecutionEnvironment.canUseDOM && window.self === window.top) {
  const tracker = document.querySelector<HTMLScriptElement>(
    'script[src="https://analytics.lailai.one/script.js"]'
  );

  if (tracker?.dataset.websiteId && !document.querySelector('script[data-umami-recorder]')) {
    const recorder = document.createElement('script');
    recorder.src = new URL('recorder.js', tracker.src).href;
    recorder.async = true;
    recorder.dataset.websiteId = tracker.dataset.websiteId;
    recorder.dataset.umamiRecorder = 'true';
    document.head.appendChild(recorder);
  }
}
