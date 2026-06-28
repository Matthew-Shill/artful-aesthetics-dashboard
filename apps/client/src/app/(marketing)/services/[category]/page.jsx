import { notFound } from "next/navigation";
import {
  serviceCategories,
  getCategory,
  getServicesByCategory,
} from "@/content/services";
import { getCategoryImage, getEricaImageAlt } from "@/config/images";
import { Hero, SectionHeading, ServiceCard } from "@/components/ui";
import styles from "@/components/ui/ui.module.css";

export async function generateStaticParams() {
  return serviceCategories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }) {
  const { category: categorySlug } = await params;
  const category = getCategory(categorySlug);
  if (!category) return {};
  return {
    title: category.title,
    description: category.description,
  };
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

  return (
    <>
      <Hero
        eyebrow="Services"
        title={category.title}
        subtitle={category.description}
        primaryCta={{ label: "Book Now", href: "/consultation" }}
        image={{ src: categoryImage, alt: categoryImageAlt }}
        compact
      />

      <section className="section section--surface">
        <div className="container">
          <SectionHeading title={`${category.title} Treatments`} />
          <div className={styles.serviceGrid}>
            {categoryServices.map((service) => (
              <ServiceCard
                key={service.slug}
                title={service.title}
                description={service.description}
                href={`/services/${categorySlug}/${service.slug}`}
                imageSrc={categoryImage}
                imageAlt={isMicroblading ? getEricaImageAlt("microblading") : service.title}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
