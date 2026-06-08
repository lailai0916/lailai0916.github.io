import { useEffect, useRef, type ReactNode } from 'react';
import { annotate } from 'rough-notation';

type AnnotationType =
  | 'underline'
  | 'box'
  | 'circle'
  | 'highlight'
  | 'strike-through'
  | 'crossed-off'
  | 'bracket';

// `rough-notation` doesn't re-export its instance type, so derive it.
type Annotation = ReturnType<typeof annotate>;

interface NotationProps {
  children: ReactNode;
  type?: AnnotationType;
  color?: string;
  show?: boolean;
}

export default function Notation({
  children,
  type = 'underline',
  color = 'red',
  show = true,
}: NotationProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const annotationRef = useRef<Annotation | null>(null);

  useEffect(() => {
    if (ref.current && show) {
      annotationRef.current = annotate(ref.current, { type, color });
      annotationRef.current.show();
    }

    return () => {
      annotationRef.current?.remove();
      annotationRef.current = null;
    };
  }, [show, type, color]);

  return <span ref={ref}>{children}</span>;
}
