/**
 * Layout raiz da aplicação
 */

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { APP_METADATA } from "@/constants";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: APP_METADATA.title,
  description: APP_METADATA.description,
};

/**
 * Props do componente RootLayout
 */
interface RootLayoutProps {
  children: React.ReactNode;
}

/**
 * Layout raiz que envolve toda a aplicação
 */
export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="pt-BR">
      <body className={cn(
        "min-h-screen bg-background font-sans antialiased",
        inter.variable
      )}>
        {children}
      </body>
    </html>
  );
}
