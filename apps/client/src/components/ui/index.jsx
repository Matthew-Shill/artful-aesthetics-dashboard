import Link from "next/link";
import styles from "../ui/ui.module.css";
import { MediaImage } from "./MediaImage";

export { MediaImage };
export { Button } from "./Button";

export function SectionHeading({ eyebrow, title, subtitle, align = "center" }) {
  return (
    <div className={styles.sectionHeading} style={{ textAlign: align }}>
      {eyebrow && <span className={styles.sectionHeadingEyebrow}>{eyebrow}</span>}
      <h2 className={styles.sectionHeadingTitle}>{title}</h2>
      {subtitle && <p className={styles.sectionHeadingSubtitle}>{subtitle}</p>}
    </div>
  );
}

function HeroCta({ cta, variant = "primary" }) {
  if (!cta) return null;
  const isExternal = cta.href?.startsWith("http");
  const className = variant === "outline" ? styles.heroBtnOutlineLight : styles.btnPrimary;

  if (isExternal) {
    return (
      <a href={cta.href} target="_blank" rel="noopener noreferrer" className={className}>
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
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={image?.src}
            aria-hidden="true"
          >
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
    </section>
  );
}

export function ServiceCard({ title, description, href, imageSrc, imageAlt, categoryTitle }) {
  return (
    <Link href={href} className={styles.serviceCard}>
      <div className={styles.serviceCardImage}>
        {imageSrc ? (
          <MediaImage src={imageSrc} alt={imageAlt || title} fill sizes="(max-width: 768px) 100vw, 400px" />
        ) : (
          <div className={styles.serviceCardImageFallback}>{categoryTitle || title}</div>
        )}
      </div>
      <div className={styles.serviceCardBody}>
        <h3 className={styles.serviceCardTitle}>{title}</h3>
        <p className={styles.serviceCardDesc}>{description}</p>
        <span className={styles.serviceCardLink}>Learn more →</span>
      </div>
    </Link>
  );
}

export function BookingCTA({ title, text, bookingUrl }) {
  return (
    <div className={styles.bookingCta}>
      <h2 className={styles.bookingCtaTitle}>{title}</h2>
      <p className={styles.bookingCtaText}>{text}</p>
      <a href={bookingUrl} target="_blank" rel="noopener noreferrer" className={styles.btnPrimary}>
        Schedule Appointment
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

export function BookingSteps({ steps }) {
  return (
    <div className={styles.stepsGrid}>
      {steps.map((step, i) => (
        <div key={step.title} className={styles.step}>
          <div className={styles.stepNumber}>{i + 1}</div>
          <h3 className={styles.stepTitle}>{step.title}</h3>
          <p className={styles.stepDesc}>{step.description}</p>
        </div>
      ))}
    </div>
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
