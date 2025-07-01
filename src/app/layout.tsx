import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import { Toaster } from "@/components/ui/sonner";
import { NuqsAdapter } from 'nuqs/adapters/next/app'


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Unipod Talk Series- Event Registration",
  description: "Register for exciting talks at Unipod Malawi",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <NuqsAdapter>
          {children}
        </NuqsAdapter>
        <Toaster richColors />
      </body>
    </html>
  );
}
