import { prisma } from "@/lib/prisma/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
    secret: process.env.NEXT_SESSION_SECRET,
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID ?? '',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
        }),
    ],
    adapter: PrismaAdapter(prisma),
    session: {
        strategy: 'database'
    },
    callbacks: {
        session: ({session, user}) => {
            return {
                ...session,
                user: {
                    ...session.user,
                    id: user.id
                },
            };
        }
    },
});

export { handler as GET, handler as POST}