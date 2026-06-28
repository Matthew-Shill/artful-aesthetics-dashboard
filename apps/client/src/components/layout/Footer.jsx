import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Logo } from "./Logo";
import styles from "./layout.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.footerGrid}>
          <div>
            <Logo inverted className={styles.footerLogo} />
            <p className={styles.footerText}>
              Exceptional care and beautiful, natural results in Englewood, CO. All staff directed by{" "}
              {siteConfig.director}.
            </p>
          </div>

          <div>
            <p className={styles.footerHeading}>Contact</p>
            <a href={siteConfig.phoneHref} className={styles.footerLink}>
              {siteConfig.phone}
            </a>
            <a href={`mailto:${siteConfig.email}`} className={styles.footerLink}>
              {siteConfig.email}
            </a>
            <a href={siteConfig.address.mapsUrl} target="_blank" rel="noopener noreferrer" className={styles.footerLink}>
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

          <div>
            <p className={styles.footerHeading}>Quick Links</p>
            <Link href="/consultation" className={styles.footerLink}>
              Consultation
            </Link>
            <Link href="/blog" className={styles.footerLink}>
              Blog
            </Link>
            <Link href="/contact" className={styles.footerLink}>
              Contact
            </Link>
            <Link href="/privacy" className={styles.footerLink}>
              Privacy Policy
            </Link>
            <Link href="/admin/login" className={styles.footerLink}>
              Staff Login
            </Link>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <span>© {new Date().getFullYear()} Artful Aesthetic Medicine. All Rights Reserved.</span>
          <span>Powered by Amila Health Analytics</span>
        </div>
      </div>
    </footer>
  );
}
