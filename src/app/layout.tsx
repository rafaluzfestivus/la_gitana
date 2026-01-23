import type { Metadata } from "next";
import { Playfair_Display, Lato } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { Navbar } from "@/components/layout/Navbar";
import { CartDrawer } from "@/components/layout/CartDrawer";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const lato = Lato({
  weight: ["300", "400", "700"],
  variable: "--font-lato",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "La Gitana | Luxury Bags",
  description: "Exquisite collection of handcrafted luxury bags.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${playfair.variable} ${lato.variable} antialiased font-sans`}
      >
        <CartProvider>
          <Navbar />
          <CartDrawer />
          <main className="min-h-screen pt-20">
            {children}
          </main>
        </CartProvider>
      </body>
    </html>
  );
}
