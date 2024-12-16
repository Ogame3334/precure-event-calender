// types/next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    displayId: string;
    name: string;
    iconSrc: string;
  }

  interface Session {
    user: User;
  }
}
