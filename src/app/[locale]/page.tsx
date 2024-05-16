"use client";

import { Icons } from "@config/icons";
import { genT } from "@locale/translate";
import { useLocaleContext } from "@providers/locale";
import { Button } from "@ui-core/button";
import { Group } from "@ui-layout/group";
import { Stack } from "@ui-layout/stack";

export default function Index() {
  const { locale, dictionary } = useLocaleContext();

  const t = genT(locale, "common", dictionary);

  return (
    <div className="flex flex-col p-2 gap-2 items-start">
      <span>Index</span>
      <p>{t("some.value")}</p>
      <Button variant="primary">Test Button</Button>
      <Group>
        <Icons.Application.Email />
        <Icons.Application.User />
        <Icons.Application.Team />
        <Icons.Interface.Menu />
      </Group>
      <Stack>
        <Icons.Application.Email />
        <Icons.Application.User />
        <Icons.Application.Team />
        <Icons.Interface.Menu />
      </Stack>
    </div>
  );
}
