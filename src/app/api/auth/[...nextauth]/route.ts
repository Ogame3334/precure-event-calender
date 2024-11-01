import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "ID and Password",
      credentials: {
        id: {
          label: "Id",
          type: "text",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // credentials に入力が渡ってくる
        // id, password はここでベタ打ちして検証している
        console.log("tomoq");
        const matched =
          credentials?.id === "id" &&
          credentials?.password === "password";
        if (matched) {
          // 今回は null を返さなければなんでもよいので適当
          return {
            id: "29472084752894723890248902",
          };
        } else {
          return null;
        }
      },
    }),
  ],
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
