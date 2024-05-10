import { locale_config } from "@locale/config";
import { get_dictionary_path } from "./get_dictionary_path";
import { konsole } from "@utils/console";
import chalk, { supportsColor } from "chalk";

function compile_dictionary() {
  const dictionary = {} as GTypes.Locale.Dictionary;

  for (const i_locale of locale_config.supported.locales) {
    const locale_dictionary = {} as GTypes.Locale.LocaleDictionary;

    for (const i_namespace of locale_config.supported.namespaces) {
      const file_path = get_dictionary_path(i_locale, i_namespace);

      try {
        if (typeof window !== "undefined") throw new Error("Wrong Environment");
        const fs = require("fs");
        const file_contents = fs.readFileSync(file_path, "utf8");
        locale_dictionary[i_namespace] = JSON.parse(file_contents);
      } catch (error) {
        if (supportsColor)
          konsole.err(
            `Failed to fetch dictionary from file: ${chalk.yellow(
              chalk.italic(file_path)
            )}`,
            (error as any).message || null
          );
      }
    }

    dictionary[i_locale] = locale_dictionary;
  }

  return dictionary;
}

export const dictionary = compile_dictionary();
