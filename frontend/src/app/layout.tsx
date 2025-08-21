import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const poppinsSans = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: "400"
});

export const metadata: Metadata = {
  title: "Presento",
  description: "Join Presento and create amazing presentations",
  creator: "Aakash",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppinsSans.variable} antialiased`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
