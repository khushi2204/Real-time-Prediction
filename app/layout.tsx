import { Inter } from "next/font/google";
import type React from "react"; // Import React
import "../styles/globals.css";

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}



import './globals.css';

export const metadata = {
      generator: 'v0.dev'
    };
