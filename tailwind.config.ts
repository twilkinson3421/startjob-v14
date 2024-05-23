import type { Config } from "tailwindcss";

//! When adding new (non-color, non-numerical) classes, make sure to extend the `twMerge` function located at `@src/utils/cn.ts`
//& Documentation: https://github.com/dcastil/tailwind-merge/blob/v1.12.0/docs/configuration.md#extending-the-tailwind-merge-config

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",

        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },

        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },

        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        success: {
          DEFAULT: "hsl(var(--success))",
          foreground: "hsl(var(--success-foreground))",
        },

        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },

        border: "hsl(var(--border))",
      },

      width: {
        qtr: "25%",
        half: "50%",
        "3qtr": "75%",
      },

      height: {
        qtr: "25%",
        half: "50%",
        "3qtr": "75%",
      },

      spacing: {
        "inner-x-sm": "0.5rem",
        "inner-x-md": "0.75rem",
        "inner-x-lg": "1.5rem",
        "inner-y-sm": "0.25rem",
        "inner-y-md": "0.375rem",
        "inner-y-lg": "0.75rem",
      },

      borderRadius: {
        sm: "calc(var(--radius) * 0.5)",
        md: "calc(var(--radius))",
        lg: "calc(var(--radius) * 1.5)",
        full: "calc(var(--radius) * 9999)",
      },

      transitionDuration: {
        DEFAULT: "var(--transition)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
