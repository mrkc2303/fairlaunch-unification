import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import type { NextApiRequest, NextApiResponse } from "next";

export default function auth(req: NextApiRequest, res: NextApiResponse) {
  return NextAuth(req, res, {
    secret: process.env.AUTH_SECRET,
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      }),
    ],
    session: { strategy: "jwt" },
    callbacks: {
      async jwt({ token, account }) {
        if (account) {
          token.id_token = account.id_token;
        }
        return token;
      },
      async session({ session, token }) {
        //@ts-ignore
        session.id_token = token.id_token;
        return session;
      },
    },
  });
}
