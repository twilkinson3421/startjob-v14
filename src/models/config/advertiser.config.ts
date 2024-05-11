import type { ValueOf } from "next/dist/shared/lib/constants";

const roles = {
  admin_equiv: "admin",
  member_equiv: "member",
} as const;

export const advertiserConfig = {
  roles,
  creatorRole: roles.admin_equiv,
  defaultRole: roles.member_equiv,
} as const;

export type RoleInAdvertiser = ValueOf<typeof roles>;
