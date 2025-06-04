import type { Metadata } from "next";
import "./globals.css";
import { Poppins } from 'next/font/google';


const fontPoppins = Poppins({
  weight: '500',
  subsets: ['latin'],
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: "CraftQueue",
  description: "CraftQueue - Your Furniture Order Management System",

};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fontPoppins.variable}, ${fontPoppins.className}`}>
      <body className={`${fontPoppins.variable} antialiased `}>
        {children}
      </body>
    </html>
  );
}
