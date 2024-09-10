import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    id?: string;
    username?: string;
    email?: string;
    firstname?: string;
    lastname?: string;
  }

  interface Session {
    user: {
      id?: string;
      username?: string;
      email?: string;
      firstname?: string;
      lastname?: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    username?: string;
    email?: string;
    firstname?: string;
    lastname?: string;
  }
}
