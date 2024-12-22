import type { Metadata } from "next";
// import { Inter } from "next/font/google";
import "../globals.scss";
import { CustomHeader } from "../../components/CustomHeader";
import NextAuthProvider from "../providers";
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
  return (
    <div className="bg-pink-50">
      <NextAuthProvider>
        <CustomHeader />
        <Sidebar />
        <div className="mr-12">
          <div className="h-14" />
          {children}
        </div>
      </NextAuthProvider>
    </div>
  );
}
