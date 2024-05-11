import { localeConfig } from "@locale/config";

import type { Metadata as Type_Metadata } from "next";
import type { TFunction as Type_TFunction } from "@locale/translate";
import type { ReplaceStringPart as Type_ReplaceStringPart } from "@types/utils";

declare global {
  namespace GTypes {
    namespace Basic {
      type Metadata = Type_Metadata;
      type ReactNode = Readonly<{ children: React.ReactNode }>;
    }

    namespace Locale {
      type Locale = (typeof localeConfig.supported.locales)[number];
      type RootNamespace = (typeof localeConfig.supported.namespaces)[number];
      type Namespace = RootNamespace | `${RootNamespace}.${string}`;
      type Dictionary = Record<Locale, Deprecated.Reference>;
      type LocaleDictionary = Record<RootNamespace, Deprecated.Reference>;
      type LocaleParam = Readonly<{ params: { locale: Locale } }>;
      type LocaleProp = Readonly<{ locale: Locale }>;
      type DictionaryProp = Readonly<{ dictionary: Dictionary }>;
      type TFunction = Type_TFunction;
    }

    namespace Combo {
      type ReactNodeLocaleParam = Readonly<
        Basic.ReactNode & Locale.LocaleParam
      >;
    }

    namespace Utils {
      type ReplaceStringPart<
        FullString extends string,
        NewPart extends string
      > = Type_ReplaceStringPart<FullString, NewPart>;
    }

    namespace Deprecated {
      type Reference = { [key: string]: string | Reference };
    }
  }
}
