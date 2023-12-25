import type { Metadata } from "next";
import { Inter } from "next/font/google";
import toast, { Toaster } from "react-hot-toast";
import "./globals.css";
import Header from "@/components/shared/header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PTI Biometric DataBase",
  description: "PTI Student Biometric DataBase",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <Header/>
        <Toaster />
        <main className={'flex items-center justify-center max-h-screen h-screen'}>
          {children}
        </main>
      </body>
    </html>
  );
}
