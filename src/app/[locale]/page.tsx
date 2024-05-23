"use client";

import { signOut, useSession } from "next-auth/react";
import { useState } from "react";

import { Icons } from "@/config/icons";
import { genT } from "@locale/translate";
import { useLocaleContext } from "@providers/locale";
import { PasswordStateProvider } from "@providers/password";
import { Button } from "@ui-core/button";
import { Input } from "@ui-forms/input";
import { Group } from "@ui-layout/group";

export default function Index() {
  const { locale, dictionary } = useLocaleContext();
  const t = genT(locale, "common", dictionary);

  const { data: session } = useSession();

  const [logoutPending, setLogoutPending] = useState<boolean>(false);
  const tempLogout = async () => {
    setLogoutPending(true);
    await signOut();
    setLogoutPending(false);
  };

  return (
    <div className="flex flex-col p-8 gap-3 items-start">
      <Group className="gap-4">
        <span className="bg-muted text-muted-foreground p-3 py-1 rounded-sm">
          Index
        </span>
        <Button
          variant="primary"
          onClick={tempLogout}
          className="bg-destructive"
          disabled={!session}
          loading={logoutPending}
        >
          Log Out
        </Button>
      </Group>
      <p>{t("some.value")}</p>
      <Group className="gap-4 flex-wrap">
        <Button variant="default">Default Button</Button>
        <Button variant="outline">Outline Button</Button>
        <Button variant="primary">Primary Button</Button>
        <Button variant="dashed">Dashed Button</Button>
        <Button variant="ghost">Ghost Button</Button>
        <Button size="icon">
          <Icons.Application.Team />
        </Button>
        <Button variant="destructive">Destructive Button</Button>
        <Button variant="success">Success Button</Button>
      </Group>
      <Input.Root className="w-3qtr">
        <Input.Slot variant="nub">https://</Input.Slot>
        <Input.Slot>
          <Icons.Application.User />
        </Input.Slot>
        <Input.Input />
      </Input.Root>
      <PasswordStateProvider>
        <Input.Root className="w-3qtr">
          <Input.Slot>
            <Icons.Application.User />
          </Input.Slot>
          <Input.Input variant="password" />
        </Input.Root>
      </PasswordStateProvider>
    </div>
  );
}
