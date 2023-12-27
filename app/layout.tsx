import type { Metadata } from "next";
import { Inter } from "next/font/google";
import toast, { Toaster } from "react-hot-toast";
import "./globals.css";
import Header from "@/components/shared/header";
import { AuthProvider } from "@/utils/contextfile";

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
        <AuthProvider>
          <Header/>
          <Toaster />

          <main className={'flex items-center justify-center min-h-screen fh-screen'}>
            {children}
          </main>
      </AuthProvider>
      </body>
    </html>
  );
}
