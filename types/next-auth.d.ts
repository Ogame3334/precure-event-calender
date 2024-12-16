// types/next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    id: number;
    displayId: string;
    name: string;
    iconSrc: string;
  }

  interface Session {
    user: User;
  }
}
