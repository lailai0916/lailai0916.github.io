import React, { useRef, useEffect } from 'react';
import { annotate } from 'rough-notation';

type AnnotationType =
  | 'underline'
  | 'box'
  | 'circle'
  | 'highlight'
  | 'strike-through'
  | 'crossed-off'
  | 'bracket';

interface NotationProps {
  children: React.ReactNode;
  type?: AnnotationType;
  color?: string;
  show?: boolean;
}

const Notation = ({
  children,
  type = 'underline',
  color = 'red',
  show = true,
}: NotationProps) => {
  const ref = useRef<HTMLElement | null>(null);
  const annotationRef = useRef<any>(null);

  useEffect(() => {
    if (ref.current && show) {
      annotationRef.current = annotate(ref.current, { type, color });
      annotationRef.current.show();
    }

    return () => {
      if (annotationRef.current) {
        annotationRef.current.remove();
        annotationRef.current = null;
      }
    };
  }, [show, type, color]);

  return <span ref={ref}>{children}</span>;
};

export default Notation;
