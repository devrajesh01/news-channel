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
    default: "NewsWala",
    template: "%s | NewsWala"
  },
  description: "NewsWala is your fast-track digital news platform, delivering real-time, unbiased, and easy-to-digest coverage of current events, technology, trends, and public stories.",
  metadataBase: new URL("https://example.com"),
  icons:{
    icon: "/images/favicon.png"
  },
  openGraph: {
    title: "NewsWala",
    description: "NewsWala is your fast-track digital news platform, delivering real-time, unbiased, and easy-to-digest coverage of current events, technology, trends, and public stories.",
    url: "https://example.com/",
    siteName: "NewsWala",
    images: [
      {
        url: "/images/og-image.avif",
        width: 1200,
        height: 630,
        alt: "NewsWala",
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
