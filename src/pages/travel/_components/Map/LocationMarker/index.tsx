import { useEffect, useRef, type RefObject } from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { useColorMode } from '@docusaurus/theme-common';
import type { GlobeMethods } from 'react-globe.gl';
import { useImageStatus } from '@site/src/hooks/useImageStatus';
import { attachLocationMarker } from './renderMarker';
import styles from './styles.module.css';

export default function LocationMarker({
  globeRef,
  ready,
  width,
  height,
  label,
}: {
  globeRef: RefObject<GlobeMethods | undefined>;
  ready: boolean;
  width: number;
  height: number;
  label: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { colorMode } = useColorMode();
  const avatarUrl = useBaseUrl('/img/logo.png');
  const { imgRef, status, onLoad, onError } = useImageStatus(avatarUrl);

  useEffect(() => {
    const globe = globeRef.current;
    const canvas = canvasRef.current;
    if (!ready || !globe || !canvas) return;
    return attachLocationMarker(
      globe,
      canvas,
      status === 'loaded' ? imgRef.current : null,
      width,
      height
    );
    // Re-bake theme-aware shadows when the site's CSS tokens change.
  }, [globeRef, ready, width, height, imgRef, status, colorMode]);

  return (
    <>
      <img ref={imgRef} src={avatarUrl} alt="" hidden onLoad={onLoad} onError={onError} />
      <canvas ref={canvasRef} className={styles.marker} role="img" aria-label={label} />
    </>
  );
}
