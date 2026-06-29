import { siteConfig } from "@/config/site";
import { getCategoryImage, getServiceImage, getEricaImageAlt } from "@/config/images";
import { Hero, BookingCTA, SectionHeading, BenefitGrid, Accordion, StickyBookBar } from "@/components/ui";

export function ServicePageTemplate({ service, category }) {
  const isMicroblading = service.category === "microblading";
  const imageSrc = getServiceImage(service.category);
  const imageAlt = isMicroblading
    ? getEricaImageAlt("microblading")
    : `${service.title} treatment`;

  return (
    <>
      <Hero
        eyebrow={category.title}
        title={service.title}
        subtitle={service.tagline}
        primaryCta={{ label: "Book This Treatment", href: siteConfig.bookingUrl }}
        secondaryCta={{ label: `All ${category.title}`, href: `/services/${service.category}` }}
        image={{ src: imageSrc, alt: imageAlt }}
        compact
      />

      <section className="section section--surface">
        <div className="container">
          <div className="prose" style={{ maxWidth: "560px", margin: "0 auto", textAlign: "center" }}>
            <p style={{ fontSize: "1.0625rem", lineHeight: 1.75, margin: 0 }}>{service.description}</p>
          </div>
        </div>
      </section>

      {service.benefits?.length > 0 && (
        <section className="section">
          <div className="container">
            <SectionHeading title="Benefits" />
            <BenefitGrid benefits={service.benefits} />
          </div>
        </section>
      )}

      {service.faq?.length > 0 && (
        <section className="section section--surface">
          <div className="container">
            <SectionHeading title="FAQ" />
            <Accordion items={service.faq} />
          </div>
        </section>
      )}

      <section className="section">
        <div className="container">
          <BookingCTA title="Ready to get started?" bookingUrl={siteConfig.bookingUrl} compact />
        </div>
      </section>

      <StickyBookBar bookingUrl={siteConfig.bookingUrl} />
    </>
  );
}
