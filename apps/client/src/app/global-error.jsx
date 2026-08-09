"use client";

import { SiteError } from "@/components/errors";
import styles from "@/components/errors/site-error.module.css";

export default function GlobalError({ reset }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <style>{`
          :root {
            --bg: #f2ede6;
            --surface: #ffffff;
            --gold: #a6634b;
            --gold-light: #f5ebe3;
            --gold-dark: #7d4f3c;
            --text: #14100e;
            --text-mid: #5c4f3f;
            --text-muted: #9c8c7c;
            --border: #ddd5cb;
            --font-serif: "Cormorant Garamond", Georgia, serif;
            --font-sans: "Inter", system-ui, sans-serif;
            --max-width: 1200px;
            --header-height: 0px;
          }
          *, *::before, *::after { box-sizing: border-box; }
          body { margin: 0; }
          a { color: inherit; text-decoration: none; }
          button { font: inherit; }
        `}</style>
      </head>
      <body className={styles.globalRoot}>
        <div className={styles.globalBrand}>
          <a href="/" className={styles.globalBrandMark}>
            Artful
            <span>Aesthetic Medicine</span>
          </a>
        </div>
        <main>
          <SiteError
            code="500"
            eyebrow="Something went wrong"
            title="A brief pause in the studio."
            description="We hit an unexpected snag loading the site. Please try again, or return home in a moment."
            primaryCta={{ label: "Return Home", href: "/" }}
            onRetry={reset}
            retryLabel="Try again"
            destinations={[
              { label: "Home", href: "/" },
              { label: "Contact", href: "/contact" },
            ]}
          />
        </main>
      </body>
    </html>
  );
}
