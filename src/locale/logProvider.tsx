import { checkSupportedLocales } from "./checks";

export const LocaleLogProvider = () => {
  checkSupportedLocales();

  return null;
};
