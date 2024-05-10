// import { AuthProvider } from "@/providers/auth";
import { core_config } from "@/config/core";
import { Kanit as FontSans } from "next/font/google";
import { dictionary } from "@locale/compile_dictionary";
import { LocaleContextProvider } from "@providers/locale";
import { LocaleLogProvider } from "@/locale/log_provider";
import "@/app/globals.scss";

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
      suppressHydrationWarning={core_config.suppress_hydration_warning}
    >
      <body className={fontSans.className}>
        <LocaleLogProvider />
        <LocaleContextProvider {...{ locale, dictionary }}>
          {children}
        </LocaleContextProvider>
      </body>
    </html>
  );
}
