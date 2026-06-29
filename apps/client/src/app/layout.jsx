import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";

export const metadata = {
  metadataBase: new URL("https://artfulaestheticmedicine.com"),
  title: {
    default: "Artful Aesthetic Medicine | Englewood, CO",
    template: "%s | Artful Aesthetic Medicine",
  },
  description:
    "Intentional aesthetic care in Englewood, Colorado. Botox, fillers, skin treatments, wellness IV therapy and more.",
  openGraph: {
    siteName: "Artful Aesthetic Medicine",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/images/artful-logo-icon-transparent.png" type="image/png" />
        <link rel="apple-touch-icon" href="/images/artful-logo-icon-transparent.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
