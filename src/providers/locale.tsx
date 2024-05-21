"use client";

import { createContext, useContext } from "react";

import { localeConfig } from "@/locale/config";
import { genT } from "@locale/translate";

type LocaleContextValue = {
  locale: GTypes.Locale.Locale;
  dictionary?: GTypes.Locale.Dictionary;
};

type TranslationContextValue = {
  translator: GTypes.Locale.TFunction;
};

const LocaleContext = createContext<LocaleContextValue>({
  locale: localeConfig.defaults.locale,
  dictionary: undefined,
});

const TranslationContext = createContext<TranslationContextValue>({
  translator: genT(),
});

export const LocaleContextProvider = ({
  children,
  locale,
  dictionary,
}: GTypes.Basic.ReactNode & LocaleContextValue) => (
  <LocaleContext.Provider value={{ locale, dictionary }}>
    {children}
  </LocaleContext.Provider>
);

export const TranslationContextProvider = ({
  children,
  translator,
}: GTypes.Basic.ReactNode & TranslationContextValue) => {
  return (
    <TranslationContext.Provider value={{ translator }}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useLocaleContext = () => useContext(LocaleContext);
export const useTranslationContext = () => useContext(TranslationContext);
