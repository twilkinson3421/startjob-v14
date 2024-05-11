import type {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next";
import bcrypt from "bcryptjs";
import { getServerSession, NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { connectMongoDB } from "@/lib/mongodb";
import User from "@models/user";

export const authConfig = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {},

      async authorize(credentials: any) {
        const { email, password } = credentials;

        try {
          await connectMongoDB();
          const user = await User.findOne({ email });
          if (!user?.password) return null;
          const authorized = await bcrypt.compare(password, user?.password);

          if (!authorized) {
            return null;
          }

          return (({ _id, email }) => ({ id: _id.toString(), email }))(user);
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
} satisfies NextAuthOptions;

export function auth(
  ...args:
    | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
    | [NextApiRequest, NextApiResponse]
    | []
) {
  return getServerSession(...args, authConfig);
}
