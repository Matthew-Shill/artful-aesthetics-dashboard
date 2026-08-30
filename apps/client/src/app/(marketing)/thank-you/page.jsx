import { siteConfig } from "@/config/site";
import { images } from "@/config/images";
import { buildPageMetadata } from "@/lib/seo";
import { BookingConversion } from "@/components/analytics/BookingConversion";
import { Hero, SectionHeading, Button } from "@/components/ui";
import uiStyles from "@/components/ui/ui.module.css";
import styles from "./thank-you.module.css";

export const metadata = buildPageMetadata({
  title: "Thank You for Booking",
  description: "Your appointment at Artful Aesthetic Medicine is confirmed. We look forward to seeing you.",
  path: siteConfig.bookingThankYouPath,
  noIndex: true,
});

const nextSteps = [
  {
    title: "Check your inbox",
    description: "Mangomint will send a confirmation with your appointment details.",
  },
  {
    title: "Plan your visit",
    description: `We’re at ${siteConfig.address.full}. Arrive a few minutes early so we can settle in.`,
  },
  {
    title: "Questions?",
    description: "Text or call us anytime — we’re happy to help before you come in.",
  },
];

export default function ThankYouPage() {
  return (
    <>
      <BookingConversion />

      <Hero
        eyebrow="You’re booked"
        titleLines={["Thank you", "for booking"]}
        subtitle="We’re looking forward to seeing you at Artful Aesthetic Medicine."
        primaryCta={{ label: "Questions", href: siteConfig.smsHref }}
        secondaryCta={{ label: "Get Directions", href: siteConfig.address.mapsUrl }}
        image={images.hero}
        compact
      />

      <section className="section section--surface">
        <div className={`container ${styles.nextSteps}`}>
          <SectionHeading eyebrow="What’s next" title="Before your visit" />
          <div className={uiStyles.stepsGrid}>
            {nextSteps.map((step, index) => (
              <div key={step.title} className={uiStyles.step}>
                <div className={uiStyles.stepNumber}>{index + 1}</div>
                <h3 className={uiStyles.stepTitle}>{step.title}</h3>
                <p className={uiStyles.stepDesc}>{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading eyebrow="The studio" title="Visit us" />
          <div className={styles.visit}>
            <p className={styles.visitBlock}>
              <span className={styles.visitTitle}>Address</span>
              <a href={siteConfig.address.mapsUrl} target="_blank" rel="noopener noreferrer">
                {siteConfig.address.full}
              </a>
            </p>
            <p className={styles.visitBlock}>
              <span className={styles.visitTitle}>Hours</span>
              {siteConfig.hours.map((h) => (
                <span key={h.days} className={styles.hours}>
                  {h.days}: {h.time}
                </span>
              ))}
            </p>
            <p className={styles.visitBlock}>
              <span className={styles.visitTitle}>Contact</span>
              <a href={siteConfig.phoneHref}>{siteConfig.phone}</a>
              <br />
              <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
            </p>
          </div>
          <div className={styles.actions}>
            <Button href="/" variant="primary">
              Back to Home
            </Button>
            <Button href="/contact" variant="outline">
              Contact Us
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
