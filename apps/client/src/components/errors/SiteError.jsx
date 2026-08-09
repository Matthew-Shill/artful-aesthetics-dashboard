import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui";
import { BrushStrokeMotif } from "@/components/icons/BrandMotif";
import styles from "./site-error.module.css";

const DEFAULT_DESTINATIONS = [
  { label: "Injectables", href: "/services/injectables" },
  { label: "Skin", href: "/services/skin" },
  { label: "Consultation", href: "/consultation" },
  { label: "Contact", href: "/contact" },
  { label: "Blog", href: "/blog" },
];

export function SiteError({
  code = "404",
  eyebrow = "Page not found",
  title = "This page took a quiet turn.",
  description = "The page you're looking for isn't here — but your next treatment is only a click away.",
  primaryCta = { label: "Return Home", href: "/" },
  secondaryCta = { label: "Book Appointment", href: siteConfig.bookingUrl, external: true },
  destinations = DEFAULT_DESTINATIONS,
  onRetry,
  retryLabel = "Try again",
}) {
  return (
    <section className={styles.shell} aria-labelledby="site-error-title">
      <BrushStrokeMotif className={styles.motif} />
      {code && (
        <span className={styles.watermark} aria-hidden="true">
          {code}
        </span>
      )}

      <div className={styles.inner}>
        {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
        <h1 id="site-error-title" className={styles.title}>
          {title}
        </h1>
        {description && <p className={styles.description}>{description}</p>}

        <div className={styles.actions}>
          {primaryCta?.href && (
            <Button href={primaryCta.href} external={primaryCta.external}>
              {primaryCta.label}
            </Button>
          )}
          {onRetry && (
            <Button variant="outline" onClick={onRetry}>
              {retryLabel}
            </Button>
          )}
          {!onRetry && secondaryCta?.href && (
            <Button href={secondaryCta.href} variant="outline" external={secondaryCta.external}>
              {secondaryCta.label}
            </Button>
          )}
        </div>

        {destinations?.length > 0 && (
          <nav className={styles.destinations} aria-label="Popular destinations">
            <span className={styles.destinationsLabel}>Continue exploring</span>
            <ul className={styles.destinationList}>
              {destinations.map((item) => {
                const external = item.external || item.href?.startsWith("http");
                return (
                  <li key={item.href}>
                    {external ? (
                      <a
                        href={item.href}
                        className={styles.destinationLink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {item.label}
                      </a>
                    ) : (
                      <Link href={item.href} className={styles.destinationLink}>
                        {item.label}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>
        )}
      </div>
    </section>
  );
}
