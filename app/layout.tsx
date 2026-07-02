import type { Metadata, Viewport } from "next";
import "./globals.css";

const SITE_URL = "https://halitsta.com";
const TITLE =
  "Halit Statovci — Full-Cycle AI Engineer & Digital Solutions Builder | Kosovo";
const DESCRIPTION =
  "Halit Statovci is an AI engineer in Kosovo building web systems, AI workflows, branding, media, and infrastructure — the full digital layer, idea to launch.";

const LINKEDIN_URL = "https://www.linkedin.com/in/halit-statovci-89bb90198/";
const YOUTUBE_URL = "https://www.youtube.com/channel/UCVDq-YjzYcyfLS0-XMNrl9w";
const INSTAGRAM_URL = "https://www.instagram.com/dyshjanatyre/";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s | Halit Statovci",
  },
  description: DESCRIPTION,
  alternates: { canonical: SITE_URL },
  keywords: [
    "Halit Statovci",
    "Halit Sta",
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
    title: TITLE,
    description: DESCRIPTION,
    siteName: "Halit Statovci",
    images: [
      {
        url: "/img/halit.jpeg",
        width: 1200,
        height: 1200,
        alt: "Portrait of Halit Statovci, Full-Cycle AI Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
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
    "@graph": [
      {
        "@type": "Person",
        "@id": `${SITE_URL}/#person`,
        name: "Halit Statovci",
        alternateName: "Halit Sta",
        jobTitle: "Full-Cycle AI Engineer & Digital Solutions Builder",
        url: SITE_URL,
        image: `${SITE_URL}/img/halit.jpeg`,
        sameAs: [LINKEDIN_URL, YOUTUBE_URL, INSTAGRAM_URL],
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
      },
      {
        "@type": "ProfessionalService",
        "@id": `${SITE_URL}/#service`,
        name: "Halit Statovci — Digital Solutions",
        url: SITE_URL,
        founder: { "@id": `${SITE_URL}/#person` },
        areaServed: ["Kosovo", "Germany", "Remote"],
        serviceType: [
          "Websites & Web Platforms",
          "AI & Automation",
          "Branding & Design",
          "Video, Photo & Drone Content",
          "Infrastructure & Deployment",
          "Digital Consulting",
        ],
      },
    ],
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
