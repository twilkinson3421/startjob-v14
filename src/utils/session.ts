import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { authConfig } from "@lib/auth";

export async function sessionExists() {
  const session = await getServerSession(authConfig);
  return !!session;
}

export async function getSession() {
  const session = await getServerSession(authConfig);
  return session;
}

export async function getSessionOrRedirect(target: string, invert?: boolean) {
  const session = await getServerSession(authConfig);
  if (invert ? !!session : !session) redirect(target);
  return session;
}

export async function getSessionOrCustom(func: () => void, invert?: boolean) {
  const session = await getServerSession(authConfig);
  if (invert ? !!session : !session) func();
  return session;
}
