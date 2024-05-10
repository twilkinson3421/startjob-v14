import NextAuth from "next-auth/next";
import { auth_config } from "@lib/auth";

const handler = NextAuth(auth_config);

export { handler as GET, handler as POST };
