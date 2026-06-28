import { siteConfig } from "@/config/site";
import { getCategoryImage, getServiceImage, getEricaImageAlt } from "@/config/images";
import { Hero, BookingCTA, SectionHeading } from "@/components/ui";

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
          <div className="prose" style={{ maxWidth: "720px", margin: "0 auto" }}>
            <p style={{ fontSize: "1.125rem", lineHeight: 1.85 }}>{service.description}</p>
          </div>
        </div>
      </section>

      {service.benefits?.length > 0 && (
        <section className="section">
          <div className="container">
            <SectionHeading title="Benefits" subtitle="What you can expect from this treatment" />
            <ul style={{ maxWidth: "560px", margin: "0 auto", lineHeight: 2, color: "var(--text-mid)" }}>
              {service.benefits.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {service.faq?.length > 0 && (
        <section className="section section--surface">
          <div className="container">
            <SectionHeading title="FAQ" />
            <div style={{ maxWidth: "640px", margin: "0 auto" }}>
              {service.faq.map((item) => (
                <div key={item.q} style={{ marginBottom: "2rem" }}>
                  <h3 style={{ fontSize: "1.125rem", marginBottom: "0.5rem" }}>{item.q}</h3>
                  <p style={{ color: "var(--text-mid)", margin: 0 }}>{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="section">
        <div className="container">
          <BookingCTA
            title="Ready to get started?"
            text="Book your appointment and experience intentional, ethical artistry at Artful Aesthetic Medicine."
            bookingUrl={siteConfig.bookingUrl}
          />
        </div>
      </section>
    </>
  );
}
