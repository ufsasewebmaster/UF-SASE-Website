import { useCallback, useLayoutEffect, useState } from "react";

export const useDimensions = <T extends HTMLElement>(): [React.RefCallback<T>, DOMRect | undefined] => {
  const [dimensions, setDimensions] = useState<DOMRect>();
  const [node, setNode] = useState<T | null>(null);

  // Use a ref callback to capture the DOM node
  const ref = useCallback((el: T | null) => {
    setNode(el);
  }, []);

  // This effect runs synchronously after DOM mutations
  useLayoutEffect(() => {
    if (node) {
      const update = () => setDimensions(node.getBoundingClientRect());
      update();
      const observer = new ResizeObserver(() => {
        update();
      });
      observer.observe(node);
      return () => observer.disconnect();
    }
  }, [node]);

  return [ref, dimensions];
};
