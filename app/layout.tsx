import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "700", "800"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://stakmap.com"),
  title: {
    default: "Stakmap — Integration Monitoring for SaaS Teams | See What's Breaking",
    template: "%s — Stakmap",
  },
  description:
    "Stakmap is an integration monitoring tool for SaaS teams. Get a live map of every webhook, Zapier flow, and API key — so you know what's connected, what's breaking, and what's safe to cut before your customers notice.",
  openGraph: {
    siteName: "Stakmap",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@stakmap",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${jetbrainsMono.variable}`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Stakmap",
              "url": "https://stakmap.com",
              "logo": "https://stakmap.com/icon.svg",
              "description": "Live visibility into every integration in your stack. Know what's connected, what's breaking, and what's safe to cut.",
              "foundingDate": "2026",
              "contactPoint": {
                "@type": "ContactPoint",
                "url": "https://stakmap.com/contact",
                "contactType": "customer support"
              },
              "sameAs": []
            })
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Stakmap",
              "url": "https://stakmap.com",
              "description": "Every webhook, Zapier flow, and API key connecting your tools is a point of failure. Stakmap gives you a live map of your entire stack — so you know what's connected, what's breaking, and what's safe to cut."
            })
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "Stakmap",
              "url": "https://stakmap.com",
              "applicationCategory": "BusinessApplication",
              "operatingSystem": "Web",
              "description": "Stakmap gives you a live map of your entire SaaS stack — every webhook, Zapier flow, and API key — so you know what's connected, what's breaking, and what's safe to cut.",
              "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD", "description": "Join the waitlist for early access" },
              "publisher": { "@type": "Organization", "name": "Stakmap", "url": "https://stakmap.com" }
            })
          }}
        />
        {children}
      </body>
    </html>
  );
}
