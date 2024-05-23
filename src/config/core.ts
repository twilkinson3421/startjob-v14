export const coreConfig = {
  suppressHydrationWarning: process.env.NODE_ENV !== "development",
} as const;
