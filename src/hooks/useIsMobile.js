import { useEffect, useState } from "react";

export const MOBILE_BREAKPOINT = 768;
export const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(typeof window !== "undefined" && window.innerWidth < MOBILE_BREAKPOINT);
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return isMobile;
};

// Theme: light / dark, persisted in localStorage, applied as a class on <html>.
