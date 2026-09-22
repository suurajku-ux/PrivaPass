import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL('https://priva-pass-mocha.vercel.app'),
  title: "PrivaPass - Zero-Knowledge Confidential Credentials on Midnight Network",
  description: "Prove confidential allowlist and DAO credentials with zero knowledge on Midnight Network using Compact smart contracts and witness isolation.",
  keywords: ["Midnight Network", "Compact", "Zero Knowledge", "ZK-SNARK", "Confidential Credentials", "Lace Wallet", "Allowlist", "PrivaPass"],
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/logo.svg",
  },
  openGraph: {
    title: "PrivaPass — Zero-Knowledge Confidential Credentials",
    description: "Prove confidential allowlist and DAO credentials with zero knowledge on Midnight Network.",
    url: "https://priva-pass-mocha.vercel.app",
    siteName: "PrivaPass",
    images: [
      {
        url: "/logo.svg",
        width: 500,
        height: 500,
        alt: "PrivaPass Protocol Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PrivaPass — Confidential Credentials & Allowlist Protocol",
    description: "Zero-Knowledge private witness isolation & allowlist protocol on Midnight Network.",
    creator: "@PrivaPassZK",
    site: "@PrivaPassZK",
    images: ["/logo.svg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className="antialiased selection:bg-violet-500 selection:text-white" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}

