import { useWindowSize } from "./useWindowSize";

const SCREEN_BREAKPOINT = 1024;

export const useIsMobile = (breakpoint: number = SCREEN_BREAKPOINT) => {
  const windowSize = useWindowSize();
  const { width } = windowSize || { height: 0, width: 0 };
  return width < breakpoint;
};

