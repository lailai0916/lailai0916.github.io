import React, { useRef, useEffect } from 'react';
import { annotate, Annotation, AnnotationType } from 'rough-notation';

interface NotationProps {
  children: React.ReactNode;
  type?: AnnotationType;
  color?: string;
  show?: boolean;
}

export default function Notation({ children, type = 'underline', color = 'red', show = true }: NotationProps) {
  const ref = useRef<HTMLElement | null>(null);
  const annotationRef = useRef<Annotation | null>(null);

  useEffect(() => {
    if (ref.current && show) {
      annotationRef.current = annotate(ref.current, {
        type,
        color,
      });
      annotationRef.current.show();
    }
  }, [show, type, color]);

  return <span ref={ref}>{children}</span>;
}
