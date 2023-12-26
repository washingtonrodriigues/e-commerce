import { PrismaAdapter } from "@auth/prisma-adapter";
import { AuthOptions } from "next-auth";
import { prismaClient } from "./prisma";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const authOptions: AuthOptions = {
  // adapter: PrismaAdapter(prismaClient),
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "E-mail",
          type: "email",
          placeholder: "Digite seu melhor email",
        },
        password: { label: "Senha", type: "password", placeholder: "******" },
      },
      async authorize(credentials) {
        console.log(credentials);
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        const userFound = await prismaClient.user.findUnique({
          where: {
            email: credentials?.email,
          },
        });

        if (!userFound) throw new Error("Usuário não encontrado!");

        console.log("CONSOLE USERFOUND: ", userFound);

        const matchPassword = await bcrypt.compare(
          credentials?.password as string,
          userFound.password as string,
        );

        if (!matchPassword) throw new Error("Senha incorreta!");

        return {
          id: `${userFound.id}`,
          name: userFound.name || null,
          email: userFound.email,
        } as any;
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    async jwt({ token, user }) {
      console.log("console token e user: ", token, user);
      if (user) {
        return {
          ...token,
          name: user.name,
        };
      }
      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          name: token.name,
        },
      };
    },
  },
};
