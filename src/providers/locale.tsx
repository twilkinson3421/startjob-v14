"use client";

import { createContext, useContext } from "react";

type LocaleContextValue = {
  locale: GTypes.Locale.Locale;
  dictionary: GTypes.Locale.Dictionary;
};

type TranslationContextValue = {
  translator: GTypes.Locale.TFunction;
};

const LocaleContext = createContext<LocaleContextValue>({
  locale: null as any,
  dictionary: null as any,
});

const TranslationContext = createContext<TranslationContextValue>({
  translator: null as any,
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
}: GTypes.Basic.ReactNode & TranslationContextValue) => (
  <TranslationContext.Provider value={{ translator }}>
    {children}
  </TranslationContext.Provider>
);

export const useLocaleContext = () => useContext(LocaleContext);
export const useTranslationContext = () => useContext(TranslationContext);
