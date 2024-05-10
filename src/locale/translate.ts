import { konsole } from "@/utils/console";
import { dictionary } from "@locale/compile_dictionary";
import { locale_config } from "@locale/config";
import chalk from "chalk";

function get_translation(
  key: string,
  override_dictionary?: GTypes.Locale.Dictionary
) {
  const segments = key.split(".");
  let translation = (override_dictionary ?? dictionary) as any;
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
  override_dictionary?: GTypes.Locale.Dictionary,
  override_locale?: GTypes.Locale.Locale
): string {
  const locale = override_locale ?? locale_config.defaults.locale;
  const scoped_dictionary = override_dictionary ?? dictionary;

  const path = `${locale}.${key}`;

  try {
    const translation = get_translation(path, scoped_dictionary);
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
  gen_locale?: GTypes.Locale.Locale,
  gen_namespace?: GTypes.Locale.Namespace,
  gen_dictionary?: GTypes.Locale.Dictionary
): GTypes.Locale.TFunction {
  gen_locale ??= locale_config.defaults.locale;
  gen_namespace ??= locale_config.defaults.namespace;
  gen_dictionary ??= dictionary;

  return (
    key: string,
    override_dictionary?: GTypes.Locale.Dictionary,
    override_locale?: GTypes.Locale.Locale
  ) =>
    translate(
      `${gen_namespace}.${key}`,
      override_dictionary ?? gen_dictionary,
      override_locale ?? gen_locale
    );
}

export function adapt_namespace(
  old_function: GTypes.Locale.TFunction,
  new_namespace: GTypes.Locale.Namespace
): GTypes.Locale.TFunction {
  return (
    key: string,
    override_dictionary?: GTypes.Locale.Dictionary,
    override_locale?: GTypes.Locale.Locale
  ) =>
    old_function(
      `${new_namespace}.${key}`,
      override_dictionary ?? undefined,
      override_locale ?? undefined
    );
}
