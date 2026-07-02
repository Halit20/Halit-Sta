import type { Metadata, Viewport } from "next";
import "./globals.css";

const SITE_URL = "https://halitstatovci.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:
      "Halit Statovci | Full-Cycle AI Engineer & Digital Solutions Builder",
    template: "%s | Halit Statovci",
  },
  description:
    "Halit Statovci builds websites, systems, AI workflows, branding, digital media, and infrastructure for businesses that want stronger digital execution.",
  keywords: [
    "Halit Statovci",
    "AI Engineer",
    "Digital Solutions",
    "Web Development",
    "AI Automation",
    "Branding",
    "Kosovo Developer",
    "Full-Cycle Engineer",
    "Infrastructure",
  ],
  authors: [{ name: "Halit Statovci" }],
  creator: "Halit Statovci",
  openGraph: {
    type: "website",
    url: SITE_URL,
    title:
      "Halit Statovci | Full-Cycle AI Engineer & Digital Solutions Builder",
    description:
      "Websites, systems, AI workflows, branding, digital media, and infrastructure — built from strategy to launch.",
    siteName: "Halit Statovci",
    images: [
      {
        url: "/img/halit.jpeg",
        width: 1200,
        height: 1200,
        alt: "Halit Statovci",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Halit Statovci | Full-Cycle AI Engineer & Digital Solutions Builder",
    description:
      "Websites, systems, AI workflows, branding, digital media, and infrastructure — built from strategy to launch.",
    images: ["/img/halit.jpeg"],
  },
  robots: { index: true, follow: true },
  icons: {
    // Relative path so the favicon also resolves when index.html is
    // opened directly from the filesystem (file://).
    icon: [{ url: "./icon.svg", type: "image/svg+xml" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#030303",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Halit Statovci",
    jobTitle: "Full-Cycle AI Engineer & Digital Solutions Builder",
    url: SITE_URL,
    image: `${SITE_URL}/img/halit.jpeg`,
    address: { "@type": "PostalAddress", addressCountry: "Kosovo" },
    knowsAbout: [
      "Web Development",
      "AI Workflows",
      "Automation",
      "Branding",
      "Digital Media",
      "Infrastructure",
      "Deployment",
    ],
    alumniOf: "Universum International College",
  };

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Sora:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-ink-950 font-sans text-mist-300 antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
