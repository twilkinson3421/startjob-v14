"use client";

import { signOut, useSession } from "next-auth/react";

import { genT } from "@locale/translate";
import { useLocaleContext } from "@providers/locale";
import { Button } from "@ui-core/button";
import { Group } from "@ui-layout/group";

export default function Index() {
  const { locale, dictionary } = useLocaleContext();
  const t = genT(locale, "common", dictionary);

  const { data: session } = useSession();

  const tempLogout = async () => {
    await signOut();
  };

  return (
    <div className="flex flex-col p-4 gap-3 items-start">
      <span className="bg-muted text-muted-foreground p-3 py-1 rounded-sm">
        Index
      </span>
      <p>{t("some.value")}</p>
      <Group className="gap-4">
        <Button variant="default">Default Button</Button>
        <Button variant="primary">Primary Button</Button>
        <Button variant="outline">Outline Button</Button>
        <Button variant="dashed">Dashed Button</Button>
        <Button variant="ghost">Ghost Button</Button>
      </Group>
      <Button
        variant="primary"
        onClick={tempLogout}
        className="bg-destructive"
        disabled={!session}
      >
        Log Out
      </Button>
    </div>
  );
}
