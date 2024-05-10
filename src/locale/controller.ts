export function create_locale_config<
  SupportedLocales extends Readonly<string[]>,
  SupportedNamespaces extends Readonly<string[]>,
  CookieName extends Readonly<string>,
  LocalePattern extends Readonly<RegExp>,
  DictionaryPath extends Readonly<string>,
  IgnoreMiddleware extends Readonly<string[]>
>({
  supported_locales,
  supported_namespaces,
  default_locale,
  default_namespace,
  cookie_name,
  locale_pattern,
  dictionary_path,
  ignore_middleware,
}: Readonly<{
  supported_locales: SupportedLocales;
  supported_namespaces: SupportedNamespaces;
  default_locale: SupportedLocales[number];
  default_namespace: SupportedNamespaces[number];
  cookie_name: CookieName;
  locale_pattern: LocalePattern;
  dictionary_path: DictionaryPath;
  ignore_middleware: IgnoreMiddleware;
}>) {
  return {
    supported: { locales: supported_locales, namespaces: supported_namespaces },
    defaults: { locale: default_locale, namespace: default_namespace },
    server: { cookie_name, ignore_middleware },
    other: { locale_pattern, dictionary_path },
  };
}
