import { locale_config } from "./config";

type GDP_Return<
  L extends string,
  N extends string
> = GTypes.Utils.ReplaceStringPart<
  GTypes.Utils.ReplaceStringPart<typeof locale_config.other.dictionary_path, L>,
  N
>;

export function get_dictionary_path<
  LocaleDir extends GTypes.Locale.Locale,
  NamespaceFile extends GTypes.Locale.RootNamespace
>(
  locale: LocaleDir,
  namespace: NamespaceFile
): GDP_Return<typeof locale, typeof namespace> {
  return locale_config.other.dictionary_path
    .replace("{locale}", locale)
    .replace("{namespace}", namespace) as GDP_Return<
    typeof locale,
    typeof namespace
  >;
}
