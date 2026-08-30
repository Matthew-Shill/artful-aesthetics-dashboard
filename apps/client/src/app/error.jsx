"use client";

import { Header, Footer } from "@/components/layout";
import { SiteError } from "@/components/errors";
import { siteConfig } from "@/config/site";

export default function Error({ reset }) {
  return (
    <>
      <Header />
      <main>
        <SiteError
          code="500"
          eyebrow="Something went wrong"
          title="A brief pause in the studio."
          description="We hit an unexpected snag. You can try again, head home, or reach out — we're happy to help."
          primaryCta={{ label: "Return Home", href: "/" }}
          onRetry={reset}
          retryLabel="Try again"
          destinations={[
            { label: "Book Appointment", href: siteConfig.bookingUrl },
            { label: "Consultation", href: "/consultation" },
            { label: "Contact", href: "/contact" },
          ]}
        />
      </main>
      <Footer />
    </>
  );
}
