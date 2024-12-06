import NextAuth, { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/login"
  },
  providers: [
    CredentialsProvider({
      name: 'Ninjin Sirisiri',
      credentials: {
        id: {
          label: 'Id',
          type: 'text',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        // credentials に入力が渡ってくる
        // id, password はここでベタ打ちして検証している
        const matched =
          credentials?.id === 'id' && 
          credentials?.password === 'password'
        if (matched) {
          // 今回は null を返さなければなんでもよいので適当
          return {
            id: '29472084752894723890248902',
          }
        } else {
          return null
        }
      },
    }),
  ],
}

export { authOptions }
