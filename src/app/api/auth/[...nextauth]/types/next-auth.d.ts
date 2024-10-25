import NextAuth from "next-auth";

declare module "next-auth" {
  console.log(NextAuth);

  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      id: string;
      username: string;
      image: string;
    };
    expires: ISODateString;
  }

  interface User {
    id: string;
    username: string;
    image: string;
  }

  interface JWT {
    id: string;
    username: string;
    image: string;
  }
}
