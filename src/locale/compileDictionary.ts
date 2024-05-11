import chalk, { supportsColor } from "chalk";

import { localeConfig } from "@locale/config";
import { getDictionaryPath } from "@locale/getDictionaryPath";
import { konsole } from "@utils/console";

function compileDictionary() {
  const dictionary = {} as GTypes.Locale.Dictionary;

  for (const iLocale of localeConfig.supported.locales) {
    const localeDictionary = {} as GTypes.Locale.LocaleDictionary;

    for (const iNamespace of localeConfig.supported.namespaces) {
      const filePath = getDictionaryPath(iLocale, iNamespace);

      try {
        if (typeof window !== "undefined") throw new Error("Wrong Environment");
        const fs = require("fs");
        const fileContents = fs.readFileSync(filePath, "utf8");
        localeDictionary[iNamespace] = JSON.parse(fileContents);
      } catch (error) {
        if (supportsColor)
          konsole.err(
            `Failed to fetch dictionary from file: ${chalk.yellow(
              chalk.italic(filePath)
            )}`,
            (error as any).message || null
          );
      }
    }

    dictionary[iLocale] = localeDictionary;
  }

  return dictionary;
}

export const dictionary = compileDictionary();
