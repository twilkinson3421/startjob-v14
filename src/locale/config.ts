import { create_locale_config } from "@locale/controller";

export const locale_config = create_locale_config({
  supported_locales: ["en-GB", "de-DE"],
  supported_namespaces: ["common"],
  default_locale: "en-GB",
  default_namespace: "common",
  cookie_name: "hl",
  locale_pattern: /^[a-z, A-Z]{2}-[a-z, A-Z]{2}$/,
  dictionary_path: "src/locale/dictionary/{locale}/{namespace}.json",
  ignore_middleware: [
    "/static",
    "/api",
    "/_next",
    "favicon.ico",
    "robots.txt",
    "sitemap.xml",
  ],
} as const);
