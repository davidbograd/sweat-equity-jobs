import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Find Australian companies giving startup equity - Sweat Equity Jobs",
  description: "Australian companies giving startup equity",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://api.fontshare.com/v2/css?f[]=satoshi@400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased font-satoshi">{children}</body>
    </html>
  );
}
