import Link from "next/link";
import styles from "../ui/ui.module.css";
import { MediaImage } from "./MediaImage";
import { CategoryIcon } from "../icons/CategoryIcons";
import { BrushStrokeMotif } from "../icons/BrandMotif";
import {
  ExpertCareIcon,
  NaturalResultsIcon,
  PersonalizedPlanIcon,
  BenefitCheckIcon,
} from "../icons/TrustIcons";

export { MediaImage };
export { Button } from "./Button";
export { Accordion } from "./Accordion";
export { StickyBookBar } from "./StickyBookBar";

export function SectionHeading({ eyebrow, title, subtitle, align = "center" }) {
  return (
    <div
      className={`${styles.sectionHeading} ${align === "left" ? styles.sectionHeadingLeft : ""}`}
      style={{ textAlign: align }}
    >
      {eyebrow && <span className={styles.sectionHeadingEyebrow}>{eyebrow}</span>}
      <h2 className={styles.sectionHeadingTitle}>{title}</h2>
      {subtitle && <p className={styles.sectionHeadingSubtitle}>{subtitle}</p>}
    </div>
  );
}

function HeroCta({ cta, variant = "primary" }) {
  if (!cta) return null;
  const isExternal = cta.href?.startsWith("http");
  const isAnchor = cta.href?.startsWith("#");
  const className = variant === "outline" ? styles.heroBtnOutlineLight : styles.btnPrimary;

  if (isExternal) {
    return (
      <a href={cta.href} target="_blank" rel="noopener noreferrer" className={className}>
        {cta.label}
      </a>
    );
  }

  if (isAnchor) {
    return (
      <a href={cta.href} className={className}>
        {cta.label}
      </a>
    );
  }

  return (
    <Link href={cta.href} className={className}>
      {cta.label}
    </Link>
  );
}

export function Hero({
  eyebrow,
  title,
  titleLines,
  subtitle,
  primaryCta,
  secondaryCta,
  image,
  video,
  compact = false,
  showScrollIndicator = false,
}) {
  const heroVideo = video ?? image?.video;
  const showSideImage = !compact && image && !heroVideo;

  return (
    <section
      className={`${styles.hero} ${compact ? styles.heroCompact : ""} ${heroVideo ? styles.heroVideo : ""}`}
    >
      <div className={styles.heroBg} />
      {heroVideo && (
        <div className={styles.heroVideoBg}>
          <video autoPlay muted loop playsInline preload="metadata" poster={image?.src} aria-hidden="true">
            <source src={heroVideo} type="video/mp4" />
          </video>
        </div>
      )}
      {compact && image && (
        <div className={styles.heroImageBg}>
          <MediaImage src={image.src} alt={image.alt} fill priority sizes="100vw" />
        </div>
      )}
      <div className={styles.heroInner}>
        <div className={styles.heroCopy}>
          {eyebrow && <p className={styles.heroEyebrow}>{eyebrow}</p>}
          <h1 className={styles.heroTitle}>
            {titleLines ? (
              titleLines.map((line, i) => (
                <span key={line} className={i > 0 ? styles.heroTitleAccent : undefined}>
                  {line}
                  {i < titleLines.length - 1 && <br />}
                </span>
              ))
            ) : (
              title
            )}
          </h1>
          {subtitle && <p className={styles.heroSubtitle}>{subtitle}</p>}
          {(primaryCta || secondaryCta) && (
            <div className={styles.heroActions}>
              <HeroCta cta={primaryCta} />
              <HeroCta cta={secondaryCta} variant="outline" />
            </div>
          )}
        </div>

        {showSideImage && (
          <div className={styles.heroVisual}>
            <MediaImage
              src={image.src}
              alt={image.alt}
              fill
              priority
              sizes="(max-width: 960px) 100vw, 540px"
            />
          </div>
        )}
      </div>
      {showScrollIndicator && (
        <a href="#treatments" className={styles.heroScroll} aria-label="Explore treatments">
          <span className={styles.heroScrollLine} />
          <span className={styles.heroScrollText}>Explore</span>
        </a>
      )}
    </section>
  );
}

export function TreatmentDepartments({ departments }) {
  return (
    <div className={styles.treatmentMenu}>
      {departments.map((dept) => (
        <article key={dept.slug} id={dept.id} className={styles.deptCard}>
          <Link href={`/services/${dept.slug}`} className={styles.deptCardMedia} tabIndex={-1} aria-hidden="true">
            {dept.imageSrc ? (
              <MediaImage
                src={dept.imageSrc}
                alt={dept.imageAlt || dept.title}
                fill
                sizes="(max-width: 768px) 100vw, 400px"
              />
            ) : (
              <div className={styles.serviceCardImageFallback}>{dept.title}</div>
            )}
            <span className={styles.deptCardCount}>
              {dept.treatmentCount} treatment{dept.treatmentCount === 1 ? "" : "s"}
            </span>
          </Link>

          <div className={styles.deptCardBody}>
            <div className={styles.deptCardHeader}>
              <span className={styles.deptCardIcon}>
                <CategoryIcon slug={dept.slug} />
              </span>
              <div>
                <p className={styles.deptCardEyebrow}>{dept.tagline}</p>
                <h3 className={styles.deptCardTitle}>
                  <Link href={`/services/${dept.slug}`}>{dept.title}</Link>
                </h3>
                <p className={styles.deptCardDesc}>{dept.description}</p>
              </div>
            </div>

            <div className={styles.deptCardTreatments}>
              <p className={styles.deptCardTreatmentsLabel}>
                {dept.treatmentCount === 1 ? "Treatment" : "Popular treatments"}
              </p>
              <ul className={styles.deptCardTreatmentList}>
                {dept.highlights.map((name) => (
                  <li key={name}>{name}</li>
                ))}
                {dept.treatmentCount > dept.highlights.length && (
                  <li className={styles.deptCardTreatmentMore}>
                    +{dept.treatmentCount - dept.highlights.length} more
                  </li>
                )}
              </ul>
            </div>

            <Link href={`/services/${dept.slug}`} className={styles.deptCardCta}>
              View all treatments →
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
}

export function DepartmentTile({ slug, title, tagline, href, imageSrc, imageAlt }) {
  return (
    <Link href={href} className={styles.departmentTile}>
      <div className={styles.departmentTileImage}>
        {imageSrc ? (
          <MediaImage src={imageSrc} alt={imageAlt || title} fill sizes="(max-width: 768px) 100vw, 500px" />
        ) : (
          <div className={styles.serviceCardImageFallback}>{title}</div>
        )}
        <div className={styles.departmentTileOverlay}>
          <span className={styles.departmentTileTagline}>{tagline}</span>
          <span className={styles.departmentTileChip}>Explore →</span>
        </div>
      </div>
      <div className={styles.departmentTileFooter}>
        <span className={styles.departmentTileIcon}>
          <CategoryIcon slug={slug} />
        </span>
        <h3 className={styles.departmentTileTitle}>{title}</h3>
      </div>
    </Link>
  );
}

export function ServiceCard({ title, description, href, imageSrc, imageAlt, categoryTitle, variant = "default" }) {
  return (
    <Link href={href} className={`${styles.serviceCard} ${variant === "overlay" ? styles.serviceCardOverlay : ""}`}>
      <div className={styles.serviceCardImage}>
        {imageSrc ? (
          <MediaImage src={imageSrc} alt={imageAlt || title} fill sizes="(max-width: 768px) 100vw, 400px" />
        ) : (
          <div className={styles.serviceCardImageFallback}>{categoryTitle || title}</div>
        )}
        {variant === "overlay" && (
          <div className={styles.serviceCardHoverOverlay}>
            <span className={styles.serviceCardHoverChip}>Explore →</span>
          </div>
        )}
      </div>
      <div className={styles.serviceCardBody}>
        <h3 className={styles.serviceCardTitle}>{title}</h3>
        {description && <p className={styles.serviceCardDesc}>{description}</p>}
        <span className={styles.serviceCardLink}>Explore →</span>
      </div>
    </Link>
  );
}

export function BenefitGrid({ benefits }) {
  if (!benefits?.length) return null;

  return (
    <div className={styles.benefitGrid}>
      {benefits.map((benefit) => (
        <div key={benefit} className={styles.benefitItem}>
          <span className={styles.benefitIcon}>
            <BenefitCheckIcon />
          </span>
          <span className={styles.benefitLabel}>{benefit}</span>
        </div>
      ))}
    </div>
  );
}

const TRUST_ICONS = [ExpertCareIcon, NaturalResultsIcon, PersonalizedPlanIcon];

export function TrustCards({ cards }) {
  return (
    <div className={styles.trustGrid}>
      {cards.map((card, i) => {
        const Icon = TRUST_ICONS[i] ?? ExpertCareIcon;
        return (
          <div key={card.title} className={styles.trustCard}>
            <span className={styles.trustCardIcon}>
              <Icon />
            </span>
            <h3 className={styles.trustCardTitle}>{card.title}</h3>
            <p className={styles.trustCardDesc}>{card.description}</p>
          </div>
        );
      })}
    </div>
  );
}

export function StorefrontCTA({ quote, author, bookingUrl, phone, phoneHref, hours }) {
  return (
    <section className={styles.storefrontCta}>
      <BrushStrokeMotif className={styles.storefrontCtaMotif} />
      <div className={`container ${styles.storefrontCtaInner}`}>
        <blockquote className={styles.storefrontCtaQuote}>
          <p>&ldquo;{quote}&rdquo;</p>
          <footer>— {author}</footer>
        </blockquote>
        <div className={styles.storefrontCtaAction}>
          <h2 className={styles.storefrontCtaTitle}>Ready to visit?</h2>
          <a href={bookingUrl} target="_blank" rel="noopener noreferrer" className={styles.btnPrimary}>
            Book Appointment
          </a>
          <div className={styles.storefrontCtaMeta}>
            <a href={phoneHref}>{phone}</a>
            {hours?.map((h) => (
              <span key={h.days}>
                {h.days}: {h.time}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function BookingCTA({ title, text, bookingUrl, compact = false }) {
  return (
    <div className={`${styles.bookingCta} ${compact ? styles.bookingCtaCompact : ""}`}>
      <h2 className={styles.bookingCtaTitle}>{title}</h2>
      {text && <p className={styles.bookingCtaText}>{text}</p>}
      <a href={bookingUrl} target="_blank" rel="noopener noreferrer" className={styles.btnPrimary}>
        Book Appointment
      </a>
    </div>
  );
}

export function Testimonial({ quote, author }) {
  return (
    <blockquote className={styles.testimonial}>
      <p className={styles.testimonialQuote}>&ldquo;{quote}&rdquo;</p>
      <footer className={styles.testimonialAuthor}>— {author}</footer>
    </blockquote>
  );
}

export function BlogCard({ title, excerpt, href, category, imageSrc, imageAlt }) {
  return (
    <Link href={href} className={styles.blogCard}>
      <div className={styles.blogCardImage}>
        {imageSrc && (
          <MediaImage src={imageSrc} alt={imageAlt || title} fill sizes="(max-width: 768px) 100vw, 400px" />
        )}
      </div>
      <div className={styles.blogCardBody}>
        {category && <p className={styles.blogCardCategory}>{category}</p>}
        <h3 className={styles.blogCardTitle}>{title}</h3>
        <p className={styles.blogCardExcerpt}>{excerpt}</p>
        <span className={styles.blogCardLink}>Read More →</span>
      </div>
    </Link>
  );
}
