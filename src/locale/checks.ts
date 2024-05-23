import chalk from "chalk";

import { konsole } from "@/utils/console";
import { localeConfig } from "@locale/config";

export function checkSupportedLocales() {
  for (const i_locale of localeConfig.supported.locales) {
    if (!localeConfig.other.localePattern.test(i_locale))
      konsole.warn(
        `Locale ${chalk.yellow(
          chalk.italic(i_locale)
        )} does not match the pattern ${chalk.yellow(
          chalk.italic(localeConfig.other.localePattern)
        )} specified in the config file.`
      );
  }
}
