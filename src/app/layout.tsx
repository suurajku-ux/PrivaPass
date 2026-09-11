import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PrivaPass - Zero-Knowledge Confidential Credentials on Midnight Network",
  description: "Prove confidential allowlist and DAO credentials with zero knowledge on Midnight Network using Compact smart contracts and witness isolation.",
  keywords: ["Midnight Network", "Compact", "Zero Knowledge", "ZK-SNARK", "Confidential Credentials", "Lace Wallet", "Allowlist"],
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
