import { createLocaleConfig } from "@locale/controller";

export const localeConfig = createLocaleConfig({
  supportedLocales: ["en-GB", "de-DE"],
  supportedNamespaces: ["common", "interface"],
  defaultLocale: "en-GB",
  defaultNamespace: "common",
  cookieName: "hl",
  localePattern: /[a-z, A-Z]{2}-[a-z, A-Z]{2}/,
  dictionaryPath: "src/locale/dictionary/{locale}/{namespace}.json",
  ignoreMiddleware: [
    "/static",
    "/api",
    "/_next",
    "favicon.ico",
    "robots.txt",
    "sitemap.xml",
  ],
} as const);
