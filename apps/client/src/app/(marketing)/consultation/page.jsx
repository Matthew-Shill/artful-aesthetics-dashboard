import { siteConfig, trustCards } from "@/config/site";
import { images } from "@/config/images";
import { Hero, BookingCTA, TrustCards } from "@/components/ui";

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
        subtitle="We'll understand your goals and craft a plan made for you."
        primaryCta={{ label: "Book Appointment", href: siteConfig.bookingUrl }}
        secondaryCta={{ label: "Contact", href: "/contact" }}
        image={images.hero}
        compact
      />

      <section className="section section--surface">
        <div className="container">
          <TrustCards cards={trustCards} />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <BookingCTA
            title="Ready to Begin?"
            bookingUrl={siteConfig.bookingUrl}
            compact
          />
        </div>
      </section>
    </>
  );
}
