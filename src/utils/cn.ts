import { clsx } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

import type { ClassValue } from "clsx";

const configuredMerge = extendTailwindMerge({
  extend: {
    theme: {
      spacing: [
        "inner-x-sm",
        "inner-x-md",
        "inner-x-lg",
        "inner-y-sm",
        "inner-y-md",
        "inner-y-lg",
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return configuredMerge(clsx(inputs));
}
