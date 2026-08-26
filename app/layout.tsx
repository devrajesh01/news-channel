import type { Metadata } from "next";
import { Inter, Newsreader } from "next/font/google";
import "./globals.css";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "News Channel",
    template: "%s | News Channel"

  },
  description: "Latest news and stories",
  metadataBase: new URL("https://example.com"),
  icons:{
    icon: "/images/favicon.png"
  },
  openGraph: {
    title: "News Channel",
    description: "Latest news and stories",
    url: "https://example.com/",
    siteName: "News Channel",
    images: [
      {
        url: "/images/og-image.avif",
        width: 1200,
        height: 630,
        alt: "News Channel",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${newsreader.variable}`}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
