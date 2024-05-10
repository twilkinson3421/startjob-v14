import { auth_config } from "@lib/auth";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

export async function session_exists() {
  const session = await getServerSession(auth_config);
  return !!session;
}

export async function get_session() {
  const session = await getServerSession(auth_config);
  return session;
}

export async function get_session_or_redirect(
  target: string,
  invert?: boolean
) {
  const session = await getServerSession(auth_config);
  if (invert ? !!session : !session) redirect(target);
  return session;
}

export async function get_session_or_custom(
  func: () => void,
  invert?: boolean
) {
  const session = await getServerSession(auth_config);
  if (invert ? !!session : !session) func();
  return session;
}
