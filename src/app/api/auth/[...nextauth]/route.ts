import NextAuth from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prismaClient from "../../../../../libs/prisma";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const res = await fetch(`${process.env.NEXTAUTH_URL}login`, {
          method: "POST",
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" },
        });
        const user = await res.json();

        console.log(res);


        if (user.status === "ok") {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      // Add user data to the token on sign-in
      if (user) {
        token.id = user.id;
        token.username = user.username;
        token.picture = user.image;
      }
      return token;
    },
    async session({ session, token }) {
      // Add token data to the session
      session.user.id = token.id as string;
      session.user.username = token.username as string;
      session.user.image = token.picture as string;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET as string,
  pages: {
    signIn: "Login",
    error: "Login",
  },
  adapter: PrismaAdapter(prismaClient),
});

export { handler as GET, handler as POST };
