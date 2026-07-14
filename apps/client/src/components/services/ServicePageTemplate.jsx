import Link from "next/link";
import { siteConfig } from "@/config/site";
import { getServiceImage, getServiceGallery } from "@/config/images";
import { getRelatedServices } from "@/content/services";
import {
  Hero,
  BookingCTA,
  SectionHeading,
  BenefitGrid,
  Accordion,
  StickyBookBar,
  MediaImage,
} from "@/components/ui";
import { JsonLd } from "@/components/seo/JsonLd";
import { getServiceSchema, getFaqPageSchema, getBreadcrumbSchema } from "@/components/seo/schema";

function descriptionParagraphs(description) {
  if (Array.isArray(description)) return description.filter(Boolean);
  if (!description) return [];
  return description.split(/\n\n+/).map((p) => p.trim()).filter(Boolean);
}

function treatmentAlt(title) {
  return `${title} at Artful Aesthetic Medicine, Englewood CO.`;
}

export function ServicePageTemplate({ service, category }) {
  const imageSrc = getServiceImage(service.category, service.slug);
  const gallery = getServiceGallery(service.slug);
  const showResultsGallery = gallery.length > 1;
  const imageAlt = treatmentAlt(service.title);
  const paragraphs = descriptionParagraphs(service.description);
  const related = getRelatedServices(service, 2);
  const faqSchema = getFaqPageSchema(service.faq);
  const breadcrumb = getBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: category.title, path: `/services/${service.category}` },
    { name: service.title, path: `/services/${service.category}/${service.slug}` },
  ]);

  return (
    <>
      <JsonLd data={getServiceSchema(service)} />
      {faqSchema && <JsonLd data={faqSchema} />}
      {breadcrumb && <JsonLd data={breadcrumb} />}

      <Hero
        eyebrow={category.title}
        title={service.h1 || service.title}
        subtitle={service.tagline}
        primaryCta={{ label: "Book This Treatment", href: siteConfig.bookingUrl }}
        secondaryCta={{ label: `All ${category.title}`, href: `/services/${service.category}` }}
        image={{ src: imageSrc, alt: imageAlt }}
        compact
      />

      {paragraphs.length > 0 && (
        <section className="section section--surface">
          <div className="container">
            <div className="prose" style={{ maxWidth: "560px", margin: "0 auto", textAlign: "center" }}>
              {paragraphs.map((paragraph, index) => (
                <p
                  key={index}
                  style={{
                    fontSize: "1.0625rem",
                    lineHeight: 1.75,
                    margin: index === paragraphs.length - 1 ? 0 : "0 0 1rem",
                  }}
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </section>
      )}

      {showResultsGallery && (
        <section className="section">
          <div className="container">
            <SectionHeading title="Results" />
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "1.25rem",
                maxWidth: "920px",
                margin: "0 auto",
              }}
            >
              {gallery.map((src, index) => (
                <div
                  key={src}
                  style={{
                    position: "relative",
                    aspectRatio: "1 / 1",
                    overflow: "hidden",
                    borderRadius: "var(--radius-md, 12px)",
                  }}
                >
                  <MediaImage
                    src={src}
                    alt={`${treatmentAlt(service.title)} Result ${index + 1}.`}
                    fill
                    sizes="(max-width: 768px) 100vw, 440px"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

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

      {related.length > 0 && (
        <section className="section">
          <div className="container">
            <SectionHeading
              title="Related treatments"
              subtitle={`More from ${category.title}`}
            />
            <ul
              style={{
                listStyle: "none",
                margin: "0 auto",
                padding: 0,
                maxWidth: "560px",
                display: "grid",
                gap: "0.75rem",
              }}
            >
              {related.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={`/services/${item.category}/${item.slug}`}
                    style={{
                      display: "block",
                      padding: "0.875rem 1rem",
                      borderBottom: "1px solid var(--border, rgba(0,0,0,0.08))",
                      textDecoration: "none",
                      color: "inherit",
                      fontWeight: 500,
                    }}
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href={`/services/${service.category}`}
                  style={{
                    display: "block",
                    padding: "0.875rem 1rem",
                    textDecoration: "none",
                    color: "inherit",
                    fontWeight: 600,
                  }}
                >
                  All {category.title} →
                </Link>
              </li>
            </ul>
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
