import chalk from "chalk";

import { konsole } from "@/utils/console";
import { localeConfig } from "@locale/config";

export function checkSupportedLocales() {
  for (const iLocale of localeConfig.supported.locales) {
    if (!localeConfig.other.localePattern.test(iLocale))
      konsole.warn(
        `Locale ${chalk.yellow(
          chalk.italic(iLocale)
        )} does not match the pattern ${chalk.yellow(
          chalk.italic(localeConfig.other.localePattern)
        )} specified in the config file.`
      );
  }
}
