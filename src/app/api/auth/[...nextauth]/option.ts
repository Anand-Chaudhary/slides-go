// /pages/api/auth/[...nextauth].ts
import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import dbConnect from "@/lib/db"; // your MongoDB connection file
import User from "@/models/user.model"; // your Mongoose User model

export const authOptions: NextAuthOptions={
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "example@gmail.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any): Promise<any> {
        await dbConnect();

        const user = await User.findOne({ email: credentials?.email });

        if (!user) throw new Error("No user found with this email");
        const isValid = await compare(credentials!.password, user.password);

        if (!isValid) throw new Error("Incorrect password");

        return {
          id: user._id,
          email: user.email,
          name: user.username,
          premium: user.premium
        };
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/auth/signin",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.premium = user.premium,
        token.username = user.username
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user._id = token.id as string;
        session.user.premium = token.premium
        session.user.username = token.username
      }
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
}