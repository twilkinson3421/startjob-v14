import { konsole } from "@/utils/console";
import { locale_config } from "./config";
import chalk from "chalk";

export function check_supported_locales() {
  for (const i_locale of locale_config.supported.locales) {
    if (!locale_config.other.locale_pattern.test(i_locale))
      konsole.warn(
        `Locale ${chalk.yellow(
          chalk.italic(i_locale)
        )} does not match the pattern ${chalk.yellow(
          chalk.italic(locale_config.other.locale_pattern)
        )} specified in the config file.`
      );
  }
}
