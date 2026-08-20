import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Logo } from "@/components/layout/Logo";
import { Button } from "@/components/ui/Button";
import layoutStyles from "@/components/layout/layout.module.css";
import styles from "./get-started.module.css";

export function GetStartedHeader() {
  return (
    <header className={layoutStyles.header}>
      <div className={`container ${styles.headerInner}`}>
        <Logo href={null} />
        <div className={styles.headerActions}>
          <Button
            href={siteConfig.smsHref}
            variant="outline"
            className={`${styles.headerBtn} ${styles.headerBtnQuestions}`}
          >
            Questions
          </Button>
          <Button href="#book" variant="primary" className={styles.headerBtn}>
            Book
          </Button>
        </div>
      </div>
    </header>
  );
}

export function GetStartedFooter() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.footerInner}`}>
        <Logo href={null} inverted className={layoutStyles.footerLogo} />
        <div className={styles.footerMeta}>
          <div>
            <p className={styles.footerHeading}>Contact</p>
            <a href={siteConfig.phoneHref} className={styles.footerLink}>
              {siteConfig.phone}
            </a>
            <a
              href={siteConfig.address.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.footerLink}
            >
              {siteConfig.address.full}
            </a>
          </div>
          <div>
            <p className={styles.footerHeading}>Hours</p>
            {siteConfig.hours.map((h) => (
              <p key={h.days} className={styles.footerText}>
                {h.days}: {h.time}
              </p>
            ))}
          </div>
        </div>
        <div className={styles.footerBottom}>
          <span>© {new Date().getFullYear()} Artful Aesthetic Medicine. All Rights Reserved.</span>
          <Link href="/privacy" className={styles.footerBottomLink}>
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}
