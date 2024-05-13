"use client";

import { useLocaleContext } from "@/providers/locale";
import { genT } from "@locale/translate";

export default function Index() {
  const { locale, dictionary } = useLocaleContext();

  const t = genT(locale, "common", dictionary);

  return (
    <div className="font-medium">
      <span>Index</span>
      <p>{t("some.value")}</p>
    </div>
  );
}
