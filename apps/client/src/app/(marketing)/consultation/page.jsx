import { siteConfig } from "@/config/site";
import { images } from "@/config/images";
import { Hero, BookingCTA, SectionHeading } from "@/components/ui";

export const metadata = {
  title: "Consultation",
  description: "Book a personalized aesthetic medicine consultation at Artful Aesthetic Medicine in Englewood, CO.",
};

export default function ConsultationPage() {
  return (
    <>
      <Hero
        eyebrow="Get Started"
        titleLines={["Book a", "Consultation"]}
        subtitle="Experience the art of aesthetic medicine today. We'll take the time to understand your unique goals and create a personalized treatment plan."
        primaryCta={{ label: "Schedule Appointment", href: siteConfig.bookingUrl }}
        secondaryCta={{ label: "Contact Us", href: "/contact" }}
        image={images.hero}
        compact
      />

      <section className="section section--surface">
        <div className="container">
          <SectionHeading
            title="Why Choose Artful Aesthetic Medicine?"
            subtitle="Exceptional care. Beautiful, natural results."
          />
          <div className="prose" style={{ maxWidth: "720px", margin: "0 auto", textAlign: "center" }}>
            <p>
              Artful Aesthetic Medicine is your trusted destination for expert Botox and filler treatments in
              Englewood, CO. Our highly trained team is dedicated to integrity, compassion, and results that
              enhance your natural beauty.
            </p>
            <p>
              We take the time to understand your unique goals, creating personalized treatment plans in a
              welcoming, professional environment. Whether you&apos;re seeking preventative care or advanced
              rejuvenation, we can&apos;t wait to welcome you.
            </p>
            <p style={{ fontSize: "0.9375rem", color: "var(--text-muted)" }}>
              All staff is directed by {siteConfig.director}.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <BookingCTA
            title="Ready to Begin?"
            text="Schedule your consultation and take the first step toward your aesthetic goals."
            bookingUrl={siteConfig.bookingUrl}
          />
        </div>
      </section>
    </>
  );
}
