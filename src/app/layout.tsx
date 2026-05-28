import type { Metadata } from "next";
import { Space_Grotesk, Space_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { LenisProvider } from "@/components/providers/LenisProvider";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  weight: ["400", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Devnandan Group | Advanced Chemistry & Industrial Packaging Systems",
  description: "Devnandan Group is a premier corporate B2B holding company specializing in custom synthesis chemical intermediates, specialty binders, and high-performance HDPE plastic packaging.",
  keywords: [
    "Devnandan Group",
    "B2B Chemical Holding Company",
    "Custom Synthesis",
    "Specialty Binders",
    "HDPE Packaging",
    "Industrial Chemicals",
    "Devnandan Organics",
    "Devnandan Auxichem",
    "Devnandan Plasto Pack"
  ],
  openGraph: {
    title: "Devnandan Group | Advanced Chemistry & Industrial Packaging Systems",
    description: "Enterprise manufacturers of specialty chemicals, customized polymers, and industrial packaging solutions.",
    url: "https://devnandan.co.in",
    siteName: "Devnandan Group",
    type: "website",
    locale: "en_US",
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // B2B Holding Company JSON-LD Schema
  const schemaJson = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://devnandan.co.in/#organization",
    "name": "Devnandan Group",
    "url": "https://devnandan.co.in",
    "logo": "https://devnandan.co.in/logo.png",
    "description": "Manufacturers of High-Performance Chemical Solutions & Reliable Plastic Packaging Systems.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "S/25-26, Municipal Karmacharinagar, Sola Road, Ghatlodiya",
      "addressLocality": "Ahmedabad",
      "addressRegion": "Gujarat",
      "postalCode": "380061",
      "addressCountry": "IN"
    },
    "subOrganization": [
      {
        "@type": "Organization",
        "name": "Devnandan Organics",
        "url": "https://devnandan.co.in/organics"
      },
      {
        "@type": "Organization",
        "name": "Devnandan Auxichem LLP",
        "url": "https://devnandan.co.in/auxichem"
      },
      {
        "@type": "Organization",
        "name": "Devnandan Plasto Pack",
        "url": "https://devnandan.co.in/plastopack"
      }
    ]
  };

  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${spaceMono.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJson) }}
        />
      </head>
      <body className="min-h-full bg-background text-foreground flex flex-col font-sans">
        <LenisProvider>
          <Navbar />
          <main className="flex-grow flex flex-col pt-[70px] relative z-10" id="main-content">
            {children}
          </main>
          <Footer />
        </LenisProvider>
      </body>
    </html>
  );
}
