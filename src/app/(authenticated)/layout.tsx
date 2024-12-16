import type { Metadata } from "next";
// import { Inter } from "next/font/google";
import "../globals.scss";
import { CustomHeader } from "../../components/CustomHeader";
import { getServerSession, Session } from "next-auth";
import { useState } from "react";
import NextAuthProvider from "../providers";
import { authOptions } from "@/src/libs/next-auth-options";
import { Sidebar } from "@/src/components/Sidebar";

// const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session: Session | null = await getServerSession(authOptions);

  return (
    <div className="bg-pink-50">
      <NextAuthProvider>
        <CustomHeader session={session} />
        <Sidebar session={session} />
        <div className="mr-12">
          <div className="h-14" />
          {children}
        </div>
      </NextAuthProvider>
    </div>
  );
}
