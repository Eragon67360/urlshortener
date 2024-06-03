import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "URL Shortener",
  description: "A little URL shortener with Postgres Database",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <div className="absolute inset-0 bg-black opacity-65"></div>
          <main className="min-h-screen bg-image bg-cover bg-no-repeat">
            {children}
            <Footer />
          </main>
        </Providers>
      </body>
    </html>
  );
}
