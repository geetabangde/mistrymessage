import { Handler } from './../../../node_modules/signal-exit/dist/cjs/index.d';
import NextAuth from "next-auth";
import { AuthOptions } from "next-auth";
import { authOptions } from "./options";

const handler = NextAuth(authOptions)

export { handler as GET , handler as POST };