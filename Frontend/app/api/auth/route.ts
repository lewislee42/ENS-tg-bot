import NextAuth from "next-auth";
import { DynamicAuthProvider } from "@dynamic-labs/sdk-react-core";

export const POST = NextAuth({
  providers: [
    DynamicAuthProvider({
      clientId: process.env.DYNAMIC_CLIENT_ID || "",
      clientSecret: process.env.DYNAMIC_CLIENT_SECRET || "",
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
});
