import { useMemo, useSyncExternalStore } from "react";
import { breakpoints, Breakpoint } from "../styles/breakpoints";

export const useMediaQuery = (breakpoint: Breakpoint) => {
  const [getSnapshot, subscribe] = useMemo(() => {
    const query = `(min-width: ${breakpoints[breakpoint]}px)`;
    const mediaQueryList = window.matchMedia(query);

    return [
      () => mediaQueryList.matches,
      (notify: () => void) => {
        mediaQueryList.addEventListener("change", notify);
        return () => {
          mediaQueryList.removeEventListener("change", notify);
        };
      },
    ];
  }, [breakpoint]);

  return useSyncExternalStore(subscribe, getSnapshot);
};
