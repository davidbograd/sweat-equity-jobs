import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import Footer from "../components/Footer";
import ErrorBoundary from "../components/ErrorBoundary";

export const metadata: Metadata = {
  title: "Find Australian companies giving startup equity - Sweat Equity Jobs",
  description: "Australian companies giving startup equity",
  metadataBase: new URL("https://equityjobs.com.au"),
  openGraph: {
    title:
      "Find Australian companies giving startup equity - Sweat Equity Jobs",
    description:
      "Find Australian startups that give equity as part of your compensation package. A curated list of +200 Aussie companies offering employee equity.",
    url: "https://equityjobs.com.au",
    siteName: "Sweat Equity Jobs",
    images: [
      {
        url: "/images/open-graph-equity.png",
        width: 1200,
        height: 630,
        alt: "Sweat Equity Jobs - Find Australian startups offering equity",
      },
    ],
    locale: "en_AU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Find Australian companies giving startup equity - Sweat Equity Jobs",
    description:
      "Find Australian startups that give equity as part of your compensation package. A curated list of +200 Aussie companies offering employee equity.",
    images: ["/images/open-graph-equity.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  authors: [{ name: "Sweat Equity Jobs" }],
  category: "Jobs",
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
      <body className="antialiased font-satoshi">
        {/* Google Analytics - Using Next.js Script component */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-3MD2PEZ0BW"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-3MD2PEZ0BW');
          `}
        </Script>

        <ErrorBoundary>{children}</ErrorBoundary>
        <Footer />
      </body>
    </html>
  );
}
