import Link from "next/link";
import { siteConfig, testimonials } from "@/config/site";
import { images } from "@/config/images";
import { getPriorityServicesWithImages } from "@/content/locations";
import {
  Hero,
  SectionHeading,
  Accordion,
  StorefrontCTA,
  MediaImage,
} from "@/components/ui";
import { JsonLd } from "@/components/seo/JsonLd";
import { getFaqPageSchema, getBreadcrumbSchema } from "@/components/seo/schema";
import styles from "@/components/ui/ui.module.css";

export function LocationPageTemplate({ location }) {
  const services = getPriorityServicesWithImages();
  const faqSchema = getFaqPageSchema(location.faq);
  const breadcrumb = getBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: location.city, path: `/${location.slug}` },
  ]);

  return (
    <>
      {faqSchema && <JsonLd data={faqSchema} />}
      {breadcrumb && <JsonLd data={breadcrumb} />}

      <Hero
        eyebrow={location.eyebrow}
        title={location.h1}
        subtitle={location.subtitle}
        primaryCta={{ label: "Book Appointment", href: siteConfig.bookingUrl }}
        secondaryCta={{ label: "View All Treatments", href: "/#treatments" }}
        image={images.hero}
        compact
      />

      <section className="section section--surface">
        <div className="container">
          <div
            className="prose"
            style={{ maxWidth: "640px", margin: "0 auto", textAlign: "center" }}
          >
            {location.intro.map((paragraph, index) => (
              <p
                key={index}
                style={{
                  fontSize: "1.0625rem",
                  lineHeight: 1.75,
                  margin: index === location.intro.length - 1 ? 0 : "0 0 1rem",
                  color: "var(--text-mid)",
                }}
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Priority Treatments"
            title={`Popular services for ${location.city}`}
            subtitle="Start with the treatments Denver and Englewood patients ask for most."
          />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "1.25rem",
            }}
          >
            {services.map((service) => (
              <Link
                key={service.slug}
                href={service.href}
                className={styles.serviceCard}
              >
                <div className={styles.serviceCardImage}>
                  <MediaImage
                    src={service.imageSrc}
                    alt={`${service.title} at Artful Aesthetic Medicine`}
                    fill
                    sizes="(max-width: 768px) 100vw, 320px"
                  />
                </div>
                <div className={styles.serviceCardBody}>
                  <h3 className={styles.serviceCardTitle}>{service.title}</h3>
                  <p className={styles.serviceCardDesc}>{service.blurb}</p>
                  <span className={styles.serviceCardLink}>Explore →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--surface">
        <div className="container">
          <div className={styles.aboutSection}>
            <div className={styles.aboutCopy}>
              <h2 className={styles.aboutTitle}>{location.whyTitle}</h2>
              <p className={styles.aboutText}>{location.whyBody}</p>
              <p className={styles.aboutText} style={{ marginTop: "1rem" }}>
                <strong>Visit us:</strong>{" "}
                <a href={siteConfig.address.mapsUrl} target="_blank" rel="noopener noreferrer">
                  {siteConfig.address.full}
                </a>
                <br />
                <strong>Call:</strong>{" "}
                <a href={siteConfig.phoneHref}>{siteConfig.phone}</a>
              </p>
              <Link href="/consultation" className={styles.btnPrimary}>
                Book a Consultation
              </Link>
            </div>
            <div className={styles.aboutImage}>
              <MediaImage
                src={images.erica.src}
                alt={images.erica.alt}
                fill
                sizes="(max-width: 768px) 100vw, 420px"
              />
            </div>
          </div>
        </div>
      </section>

      {location.faq?.length > 0 && (
        <section className="section">
          <div className="container">
            <SectionHeading title={`${location.city} FAQ`} />
            <Accordion items={location.faq} />
          </div>
        </section>
      )}

      <StorefrontCTA
        quote={testimonials[0].quote}
        author={testimonials[0].author}
        bookingUrl={siteConfig.bookingUrl}
        phone={siteConfig.phone}
        phoneHref={siteConfig.phoneHref}
        hours={siteConfig.hours.filter((h) => h.days === "Mon – Fri")}
      />
    </>
  );
}
