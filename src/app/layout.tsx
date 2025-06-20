import type { Metadata } from "next";
import "./globals.css";
import { DM_Sans, Inter, Poppins } from 'next/font/google';


const fontPoppins = Poppins({
  weight: '500',
  subsets: ['latin'],
  variable: '--font-poppins',
});


const fontInter = Inter({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-inter',
});

const fontDmSans = DM_Sans({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-dm-sans',
})

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
    <html lang="en" className={`${fontPoppins.variable}, ${fontPoppins.className} , ${fontInter.variable}, ${fontInter.className} , ${fontDmSans.variable}, ${fontDmSans.className}`}>
      <body className={`${fontPoppins.variable} antialiased text-black`}>
        {children}
      </body>
    </html>
  );
}
