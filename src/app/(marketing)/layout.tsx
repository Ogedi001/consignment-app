import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/styles/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://trustflowhq.app"),

  title: {
    default: "Trustflow — Trust Infrastructure for Trade",
    template: "%s | Trustflow",
  },

  description:
    "Trustflow provides the trust infrastructure that enables buyers and sellers to trade with confidence.",

  applicationName: "Trustflow",

  keywords: [
    "Trustflow",
    "Trust Infrastructure",
    "Trade Infrastructure",
    "Trusted Trade",
    "Buyer Trust",
    "Seller Trust",
    "Digital Trade",
    "Transaction Trust",
    "Trust Platform",
    "Commerce Infrastructure",
  ],

  authors: [
    {
      name: "Trustflow",
    },
  ],

  creator: "Trustflow",
  publisher: "Trustflow",
  category: "Technology",

  alternates: {
    canonical: "https://trustflowhq.app",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },

  openGraph: {
    type: "website",
    url: "https://trustflowhq.app",
    siteName: "Trustflow",
    locale: "en_US",
    title: "Trustflow — Trust Infrastructure for Trade",
    description:
      "Trustflow provides the trust infrastructure that enables buyers and sellers to trade with confidence.",
  },

  twitter: {
    card: "summary",
    title: "Trustflow — Trust Infrastructure for Trade",
    description:
      "Trustflow provides the trust infrastructure that enables buyers and sellers to trade with confidence.",
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },

  manifest: "/site.webmanifest",

  formatDetection: {
    telephone: false,
    address: false,
    email: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
