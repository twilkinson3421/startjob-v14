import "@app/globals.scss";

import { Kanit as FontSans } from "next/font/google";

import { coreConfig } from "@config/core";
import { dictionary } from "@locale/compileDictionary";
import { LocaleLogProvider } from "@locale/logProvider";
import { AuthProvider } from "@providers/auth";
import { LocaleContextProvider } from "@providers/locale";

const fontSans = FontSans({
  subsets: ["latin", "latin-ext"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: GTypes.Basic.Metadata = {
  title: "Startjob",
};

export default function RootLayout({
  children,
  params: { locale },
}: GTypes.Combo.ReactNodeLocaleParam) {
  return (
    <html
      lang={locale}
      suppressHydrationWarning={coreConfig.suppressHydrationWarning}
      className={fontSans.className}
    >
      <body>
        <LocaleLogProvider />
        <AuthProvider>
          <LocaleContextProvider {...{ locale, dictionary: dictionary! }}>
            {children}
          </LocaleContextProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
