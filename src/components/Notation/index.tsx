import React, { useRef, useEffect } from 'react';
import { annotate } from 'rough-notation';

interface NotationProps {
  children: React.ReactNode;
  type?: 'underline' | 'box' | 'circle' | 'highlight' | 'strike-through' | 'bracket';
  color?: string;
  show?: boolean;
}

const Notation: React.FC<NotationProps> = ({ children, type = 'underline', color = 'red', show = true }) => {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current && show) {
      const annotation = annotate(ref.current, {
        type,
        color,
      });
      annotation.show();
    }
  }, [show]);

  return <span ref={ref}>{children}</span>;
};

export default Notation;
