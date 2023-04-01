// 1. Import the utilities
import { useMediaQuery } from '@chakra-ui/react';
// 2. Update the breakpoints as key-value pairs
export const breakpoints = {
  sm: "320px",
  md: "768px",
  lg: "960px",
  xl: "1200px",
  '2xl': '1536px',
};


export function useDeviceMode() {
  const [isMobile, isDesktop] = useMediaQuery(['(max-width: 767px)', '(min-width: 768px)',])
  return [isMobile, isDesktop]
}
