import NextAuth from "next-auth";
import GoogleProvider from 'next-auth/providers/google'
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import { db } from "../db/index"

export const authOptions=NextAuth({
    // @ts-ignore
    adapter: DrizzleAdapter(db),
    providers:[
        GoogleProvider({
            clientId: process.env.CLIENT_ID ?? "",
            clientSecret: process.env.CLIENT_SECRET ?? ""
        })
    ],
})

