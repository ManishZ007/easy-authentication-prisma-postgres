import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { createUser, loginUser } from "@/lib/database/user.actions";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),

    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),

    CredentialsProvider({
      id: "credentials",
      name: "credentials",
      credentials: {
        identifier: { label: "Identifier", type: "text" }, // Renamed field to 'identifier'
      },

      async authorize(credentials) {
        if (!credentials?.identifier) {
          throw new Error("Identifier is required");
        }
        const isUserExist = await loginUser(credentials.identifier);

        if (!isUserExist.success) {
          throw new Error("no user found with credential");
        }
        return isUserExist.user;
      },
    }),
  ],
  callbacks: {
    async signIn({ account, user }) {
      if (account?.provider === "google") {
        const isLoggedIn = await loginUser(user.email as string);

        if (!isLoggedIn.success) {
          const payload = {
            username: user.name?.split(" ").join(""),
            email: user.email,
            firstname: user.name?.split(" ")[0],
            lastname: user.name?.split(" ")[1],
            provider: account?.provider,
            oauth_id: account?.providerAccountId as string,
          } as CreateUserProps;

          const newUser = await createUser(payload);

          if (!newUser) {
            return false;
          }
        }
      }

      if (account?.provider === "github") {
        const isLoggedIn = await loginUser(user.email as string);

        if (!isLoggedIn.success) {
          const payload = {
            username: user.name?.split(" ").join(""),
            email: user.email,
            firstname: user.name?.split(" ")[0],
            lastname: user.name?.split(" ")[1],
            provider: account?.provider,
            oauth_id: account?.providerAccountId as string,
          } as CreateUserProps;

          const newUser = await createUser(payload);

          if (!newUser) {
            return false;
          }
        }
      }

      return true;
    },

    async jwt({ token, user, session, trigger, account }) {
      if (trigger === "update") {
        return { ...token, ...session };
      }

      if (user) {
        if (account?.provider == "google" || account?.provider == "github") {
          token.id = user.id?.toString();
          token.username = user.name?.split(" ").join("");
          token.email = user.email;
          token.firstname = user.name?.split(" ")[0];
          token.lastname = user.name?.split(" ")[1];
        }
        token.id = user.id?.toString();
        token.username = user.username;
        token.email = user.email;
        token.firstname = user.firstname;
        token.lastname = user.lastname;
      }
      return token;
    },

    async session({ token, session }) {
      if (token) {
        session.user.id = token.id;
        session.user.username = token.username;
        session.user.email = token.email;
        session.user.firstname = token.firstname;
        session.user.lastname = token.lastname;
      }

      return session;
    },
  },

  pages: {
    signIn: "/sign-in",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.AUTH_SECRET,
};
