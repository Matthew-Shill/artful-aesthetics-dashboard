// TODO: consider dedicated /denver landing page once GBP is live
import Link from "next/link";
import { siteConfig, testimonials } from "@/config/site";
import { images, getCategoryImage, getEricaImageAlt } from "@/config/images";
import { getDepartmentMenu } from "@/content/services";
import { buildPageMetadata } from "@/lib/seo";
import {
  Hero,
  SectionHeading,
  TreatmentDepartments,
  StorefrontCTA,
  MediaImage,
} from "@/components/ui";
import styles from "@/components/ui/ui.module.css";

export const metadata = buildPageMetadata({
  title: "Artful Aesthetic Medicine | Englewood, CO | Serving Denver Metro",
  description:
    "Personalized aesthetic care in Englewood, CO, serving the Denver metro. Botox, fillers, skin treatments, IV therapy, and more by Erica Eskeli.",
  path: "/",
  absoluteTitle: true,
  image: siteConfig.ogImage,
});

export default function HomePage() {
  const departments = getDepartmentMenu().map((dept) => ({
    ...dept,
    imageSrc: getCategoryImage(dept.slug),
    imageAlt:
      dept.slug === "microblading"
        ? getEricaImageAlt("microblading")
        : `${dept.title} at Artful Aesthetic Medicine`,
  }));

  return (
    <>
      <Hero
        eyebrow="Englewood, Colorado"
        titleLines={siteConfig.heroHeadline}
        subtitle="Aesthetic medicine in Englewood, CO, serving the Denver metro area."
        primaryCta={{ label: "Book Appointment", href: siteConfig.bookingUrl }}
        secondaryCta={{ label: "Explore Treatments", href: "#treatments" }}
        image={images.hero}
        showScrollIndicator
      />

      <section id="treatments" className="section section--surface">
        <div className="container">
          <SectionHeading eyebrow="The Studio" title="What We Offer" />

          <nav className={styles.deptQuickNav} aria-label="Jump to a department">
            <div className={styles.deptQuickNavTrack}>
              {departments.map((dept) => (
                <a key={dept.slug} href={`#dept-${dept.slug}`} className={styles.deptQuickNavLink}>
                  {dept.shortTitle}
                </a>
              ))}
            </div>
          </nav>

          <TreatmentDepartments
            departments={departments.map((dept) => ({ ...dept, id: `dept-${dept.slug}` }))}
          />

          <p className={styles.deptHelpText}>
            Not sure where to start?{" "}
            <Link href="/consultation">Book a consultation</Link> and we&apos;ll guide you.
            Conveniently located in Englewood, we welcome patients from across the Denver metro area.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className={styles.aboutSection}>
            <div className={styles.aboutCopy}>
              <h2 className={styles.aboutTitle}>Erica Eskeli</h2>
              <p className={styles.aboutText}>
                Owner and aesthetic injector with 10+ years in injectables and microblading — known
                for precision, natural results, and personalized care.
              </p>
              <Link href="/consultation" className={styles.btnPrimary}>
                Meet Erica
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
