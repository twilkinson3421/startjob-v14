import { check_supported_locales } from "./checks";

export const LocaleLogProvider = () => {
  check_supported_locales();

  return null;
};
