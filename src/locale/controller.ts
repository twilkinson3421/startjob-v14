export function createLocaleConfig<
  SupportedLocales extends Readonly<string[]>,
  SupportedNamespaces extends Readonly<string[]>,
  CookieName extends Readonly<string>,
  LocalePattern extends Readonly<RegExp>,
  DictionaryPath extends Readonly<string>,
  IgnoreMiddleware extends Readonly<string[]>
>({
  supportedLocales,
  supportedNamespaces,
  defaultLocale,
  defaultNamespace,
  cookieName,
  localePattern,
  dictionaryPath,
  ignoreMiddleware,
}: Readonly<{
  supportedLocales: SupportedLocales;
  supportedNamespaces: SupportedNamespaces;
  defaultLocale: SupportedLocales[number];
  defaultNamespace: SupportedNamespaces[number];
  cookieName: CookieName;
  localePattern: LocalePattern;
  dictionaryPath: DictionaryPath;
  ignoreMiddleware: IgnoreMiddleware;
}>) {
  return {
    supported: { locales: supportedLocales, namespaces: supportedNamespaces },
    defaults: { locale: defaultLocale, namespace: defaultNamespace },
    server: { cookieName, ignoreMiddleware },
    other: { localePattern, dictionaryPath },
  };
}
