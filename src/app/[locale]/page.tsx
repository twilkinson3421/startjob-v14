"use client";

import { Icons } from "@config/icons";
import { genT } from "@locale/translate";
import { useLocaleContext } from "@providers/locale";

export default function Index() {
  const { locale, dictionary } = useLocaleContext();

  const t = genT(locale, "common", dictionary);

  return (
    <div className="flex flex-col p-2 gap-2 items-start">
      <span>Index</span>
      <p>{t("some.value")}</p>
      <div className="flex items-center gap-2">
        <Icons.Application.Email />
        <Icons.Application.User />
        <Icons.Application.Team />
        <Icons.Interface.Menu />
      </div>
    </div>
  );
}
