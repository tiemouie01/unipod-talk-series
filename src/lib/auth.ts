import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/server/db"; // your drizzle instance
import { env } from "@/env";
 
export const auth = betterAuth({
    socialProviders:{
        google:{
            clientId:env.GOOGLE_CLIENT_ID as string,
            clientSecret:env.GOOGLE_CLIENT_SECRET as string
        }
    },
    database: drizzleAdapter(db, {
        provider: "pg",
    })
});