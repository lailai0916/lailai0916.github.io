import React, { useEffect, useRef } from 'react';
import Globe from 'globe.gl';

export default function Earth() {
  const globeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const world = Globe()(globeRef.current!)
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
    }

    return () => {
      if (globeRef.current) globeRef.current.innerHTML = '';
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
