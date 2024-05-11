import "@app/globals.scss";
import { coreConfig } from "@config/core";
import { AuthProvider } from "@providers/auth";
import { Kanit as FontSans } from "next/font/google";
import { dictionary } from "@locale/compileDictionary";
import { LocaleContextProvider } from "@providers/locale";
import { LocaleLogProvider } from "@locale/logProvider";

const fontSans = FontSans({
  subsets: ["latin", "latin-ext"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
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
    >
      <body className={fontSans.className}>
        <LocaleLogProvider />
        <AuthProvider>
          <LocaleContextProvider {...{ locale, dictionary }}>
            {children}
          </LocaleContextProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
