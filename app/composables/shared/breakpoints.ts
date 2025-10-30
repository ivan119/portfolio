import { useBreakpoints, breakpointsTailwind } from "@vueuse/core";
export const getBreakpoints = () => {
  const breakpoints = useBreakpoints(breakpointsTailwind);
  const isMobileDevice = breakpoints.smaller("sm");
  const isTablet = breakpoints.between("sm", "lg");

  return {
    isMobileDevice,
    isTablet,
  };
};
