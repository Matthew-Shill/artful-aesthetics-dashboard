import { notFound } from "next/navigation";
import {
  serviceCategories,
  getCategory,
  getServicesByCategory,
} from "@/content/services";
import { siteConfig } from "@/config/site";
import { getCategoryImage, getServiceImage, getEricaImageAlt } from "@/config/images";
import { buildPageMetadata } from "@/lib/seo";
import { Hero, SectionHeading, ServiceCard, StickyBookBar } from "@/components/ui";
import { JsonLd } from "@/components/seo/JsonLd";
import { getBreadcrumbSchema } from "@/components/seo/schema";
import { CategoryIcon } from "@/components/icons/CategoryIcons";
import styles from "@/components/ui/ui.module.css";

export async function generateStaticParams() {
  return serviceCategories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }) {
  const { category: categorySlug } = await params;
  const category = getCategory(categorySlug);
  if (!category) return {};

  return buildPageMetadata({
    title: { absolute: category.seoTitle || `${category.title} | Artful Aesthetic Medicine` },
    description: category.seoDescription || category.description,
    path: `/services/${categorySlug}`,
    image: getCategoryImage(categorySlug),
    absoluteTitle: true,
  });
}

export default async function CategoryPage({ params }) {
  const { category: categorySlug } = await params;
  const category = getCategory(categorySlug);

  if (!category) notFound();

  const categoryServices = getServicesByCategory(categorySlug);
  const isMicroblading = categorySlug === "microblading";
  const categoryImage = getCategoryImage(categorySlug);
  const categoryImageAlt = isMicroblading
    ? getEricaImageAlt("microblading")
    : `${category.title} treatments`;

  const breadcrumb = getBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: category.title, path: `/services/${categorySlug}` },
  ]);

  return (
    <>
      {breadcrumb && <JsonLd data={breadcrumb} />}

      <Hero
        eyebrow="Services"
        title={category.title}
        subtitle={category.description}
        primaryCta={{ label: "Book Appointment", href: siteConfig.bookingUrl }}
        image={{ src: categoryImage, alt: categoryImageAlt }}
        compact
      />

      <section className="section section--surface">
        <div className="container">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.75rem", marginBottom: "2.5rem" }}>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: "3rem",
                height: "3rem",
                borderRadius: "50%",
                background: "var(--gold-light)",
                color: "var(--gold-dark)",
              }}
            >
              <CategoryIcon slug={categorySlug} />
            </span>
          </div>
          <SectionHeading title={`${category.title} Treatments`} />
          <div className={styles.serviceGrid}>
            {categoryServices.map((service) => {
              const imageSrc = getServiceImage(categorySlug, service.slug);
              const imageAlt = isMicroblading
                ? getEricaImageAlt("microblading")
                : `${service.title} results`;

              return (
                <ServiceCard
                  key={service.slug}
                  title={service.title}
                  description={service.tagline}
                  href={`/services/${categorySlug}/${service.slug}`}
                  imageSrc={imageSrc}
                  imageAlt={imageAlt}
                  variant="overlay"
                />
              );
            })}
          </div>
        </div>
      </section>

      <StickyBookBar bookingUrl={siteConfig.bookingUrl} />
    </>
  );
}
