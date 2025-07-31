import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import AuthProvider from "./context/AuthProvider";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: "400",
})

export const metadata: Metadata = {
  title: "Slides Go",
  description: "From Idea to pressentation in minutes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} antialiased`}
      >
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
