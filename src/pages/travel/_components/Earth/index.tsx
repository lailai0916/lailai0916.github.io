import React, { useEffect, useRef } from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';

export default function EarthWrapper() {
  return (
    <BrowserOnly>
      {() => <Earth />}
    </BrowserOnly>
  );
}

function Earth() {
  const globeRef = useRef<HTMLDivElement>(null);
  const cleanupRef = useRef<() => void>();

  useEffect(() => {
    import('globe.gl').then((GlobeModule) => {
      const world = GlobeModule.default()(globeRef.current!)
        .globeImageUrl('//unpkg.com/three-globe/example/img/earth-blue-marble.jpg')
        .backgroundColor('rgba(0,0,0,0)')
        .pointOfView({ lat: 30, lng: -60 })
        .pointAltitude('size')
        .pointLabel('label')
        .pointsMerge(true);

      world.scene().rotation.y = Math.PI;

      const canvas = globeRef.current?.querySelector('canvas');
      if (canvas) {
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.display = 'block';
        canvas.style.maxWidth = '100%';
        canvas.style.maxHeight = '100%';
        canvas.style.objectFit = 'contain';
      }

      const resizeHandler = () => {
        if (globeRef.current) {
          const canvas = globeRef.current.querySelector('canvas');
          if (canvas) {
            const containerWidth = globeRef.current.offsetWidth;
            canvas.style.width = `${containerWidth}px`;
            canvas.style.height = `${containerWidth}px`;
          }
        }
      };
      window.addEventListener('resize', resizeHandler);
      resizeHandler();

      cleanupRef.current = () => {
        if (globeRef.current) globeRef.current.innerHTML = '';
        window.removeEventListener('resize', resizeHandler);
      };
    });

    return () => {
      if (cleanupRef.current) cleanupRef.current();
    };
  }, []);

  return (
    <div style={{
      width: 'min(100%, 800px)',
      aspectRatio: '1 / 1',
      border: '1px solid #ccc',
      overflow: 'hidden',
      position: 'relative',
      margin: '0 auto',
    }}>
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div ref={globeRef} />
      </div>
    </div>
  );
}
