import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import { MangomintScript } from "@/components/booking/MangomintScript";
import { siteConfig } from "@/config/site";

export const metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Artful Aesthetic Medicine | Englewood, CO",
    template: "%s | Artful Aesthetic Medicine",
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.founder.name }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  applicationName: siteConfig.name,
  category: "health",
  alternates: {
    canonical: siteConfig.url,
  },
  openGraph: {
    title: "Artful Aesthetic Medicine | Englewood, CO",
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} — ${siteConfig.tagline}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Artful Aesthetic Medicine | Englewood, CO",
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/images/artful-logo-favicon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/images/artful-logo-apple-touch.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <GoogleAnalytics />
        <MangomintScript />
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
