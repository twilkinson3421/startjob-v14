"use client";

import * as React from "react";

import { interfaceConfig } from "@config/interface";
import { Interface } from "@utils/interface";

const SCROLL_DELAY = 200;
const WAIT_BEFORE_RESET = 1200;

const [truncateVariants, applyTruncateVariants] =
  Interface.Methods.registerVariants({
    base: "truncate",
    variants: {},
    default: {},
  } as const);

export const Truncate = Interface.Methods.createComponent<
  HTMLSpanElement,
  Interface.Bundle.Types.HTMLAttributes<HTMLSpanElement>,
  typeof truncateVariants,
  {}
>({
  debugName: "Trunc",
  Component: ({ children, className, ...props }, _ref) => {
    const reference = React.useRef<HTMLSpanElement>(null);
    const [shouldScroll, setShouldScroll] = React.useState<boolean>(false);

    React.useEffect(() => {
      const isCoarse = window.matchMedia("(pointer: coarse)").matches;
      const shouldCoarseAutoScroll =
        interfaceConfig.truncatedScrollTouchscreenAuto.enabled;
      const isCoarseAndShouldAutoScroll = shouldCoarseAutoScroll && isCoarse;

      if (!shouldScroll && !isCoarseAndShouldAutoScroll) return;
      if (!reference.current) return;

      const span = reference.current;
      const original = span.innerText;

      if (span.offsetWidth >= span.scrollWidth) return;

      let willReset = false;
      let shouldWait = true;
      let count = 0;

      setTimeout(() => {
        shouldWait = false;
      }, SCROLL_DELAY * 2);

      const interval = setInterval(() => {
        if (!reference.current) return;

        if (span.offsetWidth >= span.scrollWidth) {
          if (!willReset)
            setTimeout(() => {
              requestAnimationFrame(() => {
                span.innerText = original;
                willReset = false;
                count++;
                if (
                  isCoarseAndShouldAutoScroll &&
                  !shouldScroll &&
                  !interfaceConfig.truncatedScrollTouchscreenAuto.infinite &&
                  count >= interfaceConfig.truncatedScrollTouchscreenAuto.max
                )
                  return;
                setTimeout(() => {
                  shouldWait = false;
                }, SCROLL_DELAY + 41);
              });
            }, WAIT_BEFORE_RESET);
          willReset = true;
          shouldWait = true;
        } else {
          requestAnimationFrame(() => {
            if (!shouldWait) span.innerText = span.innerText.slice(1);
          });
        }
      }, SCROLL_DELAY);

      return () => {
        clearInterval(interval);
        if (!span) return;
        span.innerText = original;
      };
    }, [shouldScroll]);

    return (
      <span
        onFocus={() => setShouldScroll(true)}
        onBlur={() => setShouldScroll(false)}
        onPointerEnter={() => setShouldScroll(true)}
        onPointerLeave={() => setShouldScroll(false)}
        className={Interface.Bundle.cn(applyTruncateVariants({}), className)}
        ref={reference}
        {...props}
      >
        {children}
      </span>
    );
  },
});
