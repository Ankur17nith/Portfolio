import { shareImage, shareAlt } from "@/lib/seo";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/shared/ThemeProvider";
import { Analytics } from "@vercel/analytics/next";
import { siteConfig, socials } from "@/lib/data";
import Script from "next/script";
import "./globals.css";

const display = Inter({
  variable: "--font-quicksand",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
  keywords: ["Ankur Gupta", "Backend Developer", "Computer Science", "NIT Hamirpur", "FATGS", "TT_TRACKER", "PRISMS", "Node.js", "Express.js", "MongoDB", "React", "TypeScript", "C++"],
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  icons: {
    icon: "/ag-logo-dark.svg",
    shortcut: "/ag-logo-dark.svg",
    apple: "/ag-logo-dark.svg",
  },
  manifest: "/site.webmanifest",
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
  alternates: {
    canonical: siteConfig.url,
  },
  openGraph: {
    title: siteConfig.title,
    description:
      siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    type: "website",
    locale: "en_US",
    images: [
      {
        url: shareImage,
        width: 1200,
        height: 630,
        alt: shareAlt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description:
      siteConfig.description,
    images: [{ url: shareImage, alt: shareAlt }],
  },
  metadataBase: new URL(siteConfig.url),
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${siteConfig.url}/#person`,
  image: `${siteConfig.url}${shareImage}`,
  name: siteConfig.name,
  jobTitle: "Backend Developer",
  url: siteConfig.url,
  email: socials.email,
  sameAs: [
    socials.github,
  ].filter(Boolean),
  description: siteConfig.description,
  affiliation: {
    "@type": "CollegeOrUniversity",
    name: "National Institute of Technology Hamirpur",
  },
  knowsAbout: [
    "Backend Development",
    "Full-Stack Development",
    "Databases",
    "C and C++",
    "JavaScript and TypeScript",
    "React",
    "Node.js",
    "Express.js",
    "MongoDB and Mongoose",
    "Academic Scheduling",
    "Software Architecture",
  ],
  subjectOf: [
    {
      "@type": "SoftwareApplication",
      name: "FATGS",
      url: "https://github.com/Ankur17nith/FATGS",
      description:
        "Faculty Allocation and Timetable Generation System designed to organize academic scheduling requirements involving faculty, classes, subjects, rooms, and weekly time slots.",
      applicationCategory: "EducationalApplication",
      operatingSystem: "Web",
    },
    {
      "@type": "SoftwareApplication",
      name: "TT_TRACKER",
      url: "https://github.com/itzzadi04/TT_TRACKER",
      description:
        "Full-stack academic timetable management project designed to provide class-wise and faculty-wise timetable views and support schedule changes, cancellations, and room availability checks.",
      applicationCategory: "EducationalApplication",
      operatingSystem: "Web",
    },
    {
      "@type": "SoftwareApplication",
      name: "PRISMS",
      description:
        "PhD Research & Institutional Scholars Management System intended to support the lifecycle of PhD scholars, beginning with a thesis submission and upload module.",
      applicationCategory: "EducationalApplication",
      operatingSystem: "Web",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="light" suppressHydrationWarning>
      <body className={`${display.variable} ${inter.variable}`}>
        <Script
          id="theme-initializer"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var stored = JSON.parse(localStorage.getItem('portfolio-theme') || '{}');
                  // Only use stored theme if user explicitly chose one (userOverride=true)
                  var theme = (stored.state && stored.state.userOverride && stored.state.theme);
                  if (theme !== 'dark' && theme !== 'light') theme = 'light';
                  document.documentElement.setAttribute('data-theme', theme);
                } catch (e) {}
                // Signal CSS that JS is active, enables bot-safe animations
                document.documentElement.classList.add('js');
              })();
            `,
          }}
        />
        <ThemeProvider>
          <a href="#main-content" className="skip-link">
            Skip to content
          </a>
          {children}
        </ThemeProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@graph": [jsonLd, { "@type": "WebSite", "@id": `${siteConfig.url}/#website`, url: siteConfig.url, name: siteConfig.name, description: siteConfig.description, inLanguage: "en", publisher: { "@id": `${siteConfig.url}/#person` } }] }) }}
        />
        <Analytics />
      </body>
    </html>
  );
}
