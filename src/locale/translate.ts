import chalk from "chalk";
import { konsole } from "@/utils/console";
import { dictionary } from "@locale/compileDictionary";
import { localeConfig } from "@locale/config";

function getTranslation(
  key: string,
  overrideDictionary?: GTypes.Locale.Dictionary
) {
  const segments = key.split(".");
  let translation = (overrideDictionary ?? dictionary) as any;
  if (!translation) throw new Error("No dictionary provided");

  for (const i_segment of segments) {
    if (!(typeof translation === "object") && i_segment in translation)
      return undefined;
    translation = translation[i_segment];
  }

  if (typeof translation === "string") return translation;
  throw new Error("Translation not found");
}

export function translate(
  key: GTypes.Locale.Namespace,
  overrideDictionary?: GTypes.Locale.Dictionary,
  overrideLocale?: GTypes.Locale.Locale
): string {
  const locale = overrideLocale ?? localeConfig.defaults.locale;
  const scopedDictionary = overrideDictionary ?? dictionary;

  const path = `${locale}.${key}`;

  try {
    const translation = getTranslation(path, scopedDictionary);
    if (!translation) throw new Error("Translation not found");
    return translation;
  } catch (error) {
    konsole.err(
      `Failed to fetch translation at ${chalk.yellow(chalk.italic(path))}`,
      (error as any).message || null
    );

    return path;
  }
}
export type TFunction = typeof translate;

export function genT(
  genLocale?: GTypes.Locale.Locale,
  genNamespace?: GTypes.Locale.Namespace,
  genDictionary?: GTypes.Locale.Dictionary
): GTypes.Locale.TFunction {
  genLocale ??= localeConfig.defaults.locale;
  genNamespace ??= localeConfig.defaults.namespace;
  genDictionary ??= dictionary;

  return (
    key: string,
    overrideDictionary?: GTypes.Locale.Dictionary,
    overrideLocale?: GTypes.Locale.Locale
  ) =>
    translate(
      `${genNamespace}.${key}`,
      overrideDictionary ?? genDictionary,
      overrideLocale ?? genLocale
    );
}

export function adaptNamespace(
  oldFunction: GTypes.Locale.TFunction,
  newNamespace: GTypes.Locale.Namespace
): GTypes.Locale.TFunction {
  return (
    key: string,
    overrideDictionary?: GTypes.Locale.Dictionary,
    overrideLocale?: GTypes.Locale.Locale
  ) =>
    oldFunction(
      `${newNamespace}.${key}`,
      overrideDictionary ?? undefined,
      overrideLocale ?? undefined
    );
}
