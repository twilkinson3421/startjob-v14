import { Kanit as FontSans } from "next/font/google";
// import { LocaleContextProvider } from "@/providers/locale";
// import { AuthProvider } from "@/providers/auth";
// import { coreConfig } from "@/config/core";
import { dictionary } from "@locale/compile_dictionary";
import { LocaleLogProvider } from "@/locale/log_provider";
import "@/app/globals.scss";

const fontSans = FontSans({
  subsets: ["latin-ext"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
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
      // suppressHydrationWarning={coreConfig.suppressHydrationWarning}
    >
      <body className={fontSans.className}>
        <LocaleLogProvider />
        {/* <AuthProvider>
          <LocaleContextProvider {...{ locale, reference }}> */}
        {children}
        {JSON.stringify(dictionary)}
        {/* </LocaleContextProvider>
        </AuthProvider> */}
      </body>
    </html>
  );
}
