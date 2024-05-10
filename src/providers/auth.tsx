"use client";

import { SessionProvider } from "next-auth/react";

export const AuthProvider = ({ children }: GTypes.Basic.ReactNode) => {
  return <SessionProvider>{children}</SessionProvider>;
};
