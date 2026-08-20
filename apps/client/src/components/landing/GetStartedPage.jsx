import { siteConfig, trustCards } from "@/config/site";
import { images, getCategoryImage, getEricaImageAlt } from "@/config/images";
import { getDepartmentMenu } from "@/content/services";
import {
  Hero,
  SectionHeading,
  TrustCards,
  MangomintEmbed,
  StickyBookBar,
  MediaImage,
} from "@/components/ui";
import uiStyles from "@/components/ui/ui.module.css";
import styles from "./get-started.module.css";

export function GetStartedPage() {
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
        subtitle="Book with Erica Eskeli — personalized aesthetic care in Englewood, serving the Denver area."
        primaryCta={{ label: "Book Appointment", href: "#book" }}
        secondaryCta={{ label: "Questions", href: siteConfig.smsHref }}
        image={images.hero}
      />

      <section className="section section--surface">
        <div className="container">
          <TrustCards cards={trustCards} />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading eyebrow="The Studio" title="What We Offer" />
          <div className={styles.deptGrid}>
            {departments.map((dept) => (
              <a key={dept.slug} href="#book" className={styles.deptCard}>
                <div className={styles.deptCardImage}>
                  <MediaImage
                    src={dept.imageSrc}
                    alt={dept.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, 320px"
                  />
                </div>
                <div className={styles.deptCardBody}>
                  <h3 className={styles.deptCardTitle}>{dept.title}</h3>
                  <p className={styles.deptCardDesc}>{dept.description}</p>
                  <span className={styles.deptCardLink}>Book →</span>
                </div>
              </a>
            ))}
          </div>
          <p className={styles.helpText}>Not sure where to start? Book below and we&apos;ll guide you.</p>
        </div>
      </section>

      <section className="section section--surface">
        <div className="container">
          <div className={uiStyles.aboutSection}>
            <div className={uiStyles.aboutCopy}>
              <h2 className={uiStyles.aboutTitle}>Erica Eskeli</h2>
              <p className={uiStyles.aboutText}>
                Owner and aesthetic injector with 10+ years in injectables and microblading — known
                for precision, natural results, and personalized care.
              </p>
            </div>
            <div className={uiStyles.aboutImage}>
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

      <section className={`section ${styles.bookSection}`} id="book">
        <div className="container">
          <MangomintEmbed
            bookingUrl={siteConfig.bookingUrl}
            title="Book your visit"
            subtitle="Pick a time below — you’ll confirm details in the booking flow."
          />
        </div>
      </section>

      <StickyBookBar bookingUrl="#book" />
    </>
  );
}
