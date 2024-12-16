import NextAuth, { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import EmailProvider from 'next-auth/providers/email'
import { PrismaClient } from "@prisma/client"
import { NextResponse } from 'next/server'
import { hashPassword } from './CustomHash'
import bcrypt from 'bcrypt'

const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/signin"
  },
  providers: [
    // EmailProvider({
    //   server: {
    //     host: process.env.EMAIL_SERVER_HOST,
    //     port: process.env.EMAIL_SERVER_PORT,
    //     auth: {
    //       user: process.env.EMAIL_SERVER_USER,
    //       pass: process.env.EMAIL_SERVER_PASSWORD,
    //     },
    //   },
    //   from: process.env.EMAIL_FROM,
    // }),
    CredentialsProvider({
      name: 'PreCale',
      credentials: {
        id: {
          label: 'Id',
          type: 'text',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if(!credentials) throw new Error('認証情報がありません。');
        
        const prisma = new PrismaClient();
        const userWithAuth = await prisma.users.findUnique({
          where: {displayId: credentials.id},
          include: {authentication: true}
        });
        if(!userWithAuth) throw new Error('IDが間違っています。');
        
        const matched =
          credentials.id === userWithAuth.displayId && 
          await bcrypt.compare(credentials.password, userWithAuth.authentication?.passwordHash || "")
        if (matched) {
          // 今回は null を返さなければなんでもよいので適当
          return {
            id: credentials.id,
            displayId: userWithAuth.displayId,
            name: userWithAuth.name,
            iconSrc: userWithAuth.iconSrc
          }
        } else {
          throw new Error('パスワードが間違っています。');
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.displayId = user.displayId;
        token.iconSrc = user.iconSrc;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id as string;
      session.user.displayId = token.displayId as string;
      session.user.iconSrc = token.iconSrc as string;
      return session;
    },
  },
  session: {
    strategy: 'jwt', // JWTを使ってセッションを保持
  },
}

export { authOptions }
