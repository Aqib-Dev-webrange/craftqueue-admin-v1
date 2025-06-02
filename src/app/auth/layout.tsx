import type { Metadata } from "next";
import { Poppins } from 'next/font/google';

const fontPoppins = Poppins({
  weight: '500',
  subsets: ['latin'],
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: "CraftQueue - Authentication",
  description: "Login to your CraftQueue account",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${fontPoppins.variable} ${fontPoppins.className} antialiased`}>
      {/* No Sidebar or Header here - just the auth content */}
      {children}
    </div>
  );
}