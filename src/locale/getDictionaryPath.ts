import { localeConfig } from "./config";

type GDPReturn<
  L extends string,
  N extends string
> = GTypes.Utils.ReplaceStringPart<
  GTypes.Utils.ReplaceStringPart<typeof localeConfig.other.dictionaryPath, L>,
  N
>;

export function getDictionaryPath<
  LocaleDir extends GTypes.Locale.Locale,
  NamespaceFile extends GTypes.Locale.RootNamespace
>(
  locale: LocaleDir,
  namespace: NamespaceFile
): GDPReturn<typeof locale, typeof namespace> {
  return localeConfig.other.dictionaryPath
    .replace("{locale}", locale)
    .replace("{namespace}", namespace) as GDPReturn<
    typeof locale,
    typeof namespace
  >;
}
