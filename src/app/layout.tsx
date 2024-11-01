import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.scss";
import { CustomHeader } from "../components/CustomHeader";
import { getServerSession, Session } from "next-auth";
import { nextAuthOptions } from "../libs/next-auth-options";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session: Session | null = await getServerSession(nextAuthOptions);

  return (
    <html lang="en">
      <body className={inter.className}>
        <CustomHeader session={session} />
        <div className="h-14" />
        {children}
      </body>
    </html>
  );
}
