"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/Button";
import { Logo } from "./Logo";
import styles from "./layout.module.css";

const primaryLinks = [
  { label: "Home", href: "/" },
  { label: "Consultation", href: "/consultation" },
  { label: "Blog", href: "/blog" },
];

const serviceLinks = siteConfig.nav.filter((item) => item.children);

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const megaRef = useRef(null);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    function handleClickOutside(e) {
      if (megaRef.current && !megaRef.current.contains(e.target)) {
        setServicesOpen(false);
      }
    }

    if (servicesOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [servicesOpen]);

  return (
    <>
      <header className={styles.header}>
        <div className={`container ${styles.headerInner}`}>
          <Logo />

          <nav className={styles.nav} aria-label="Main navigation">
            {primaryLinks.slice(0, 1).map((item) => (
              <Link key={item.href} href={item.href} className={styles.navLink}>
                {item.label}
              </Link>
            ))}

            <div
              ref={megaRef}
              className={`${styles.megaWrap} ${servicesOpen ? styles.megaWrapOpen : ""}`}
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <button
                type="button"
                className={`${styles.megaTrigger} ${servicesOpen ? styles.megaTriggerOpen : ""}`}
                aria-expanded={servicesOpen}
                aria-haspopup="true"
                onClick={() => setServicesOpen((open) => !open)}
              >
                Services
                <span className={styles.megaChevron} aria-hidden="true">
                  ▾
                </span>
              </button>

              <div className={styles.megaPanel}>
                <div className={styles.megaGrid}>
                  {serviceLinks.map((category) => (
                    <div key={category.href} className={styles.megaColumn}>
                      <Link href={category.href} className={styles.megaCategory}>
                        {category.label}
                      </Link>
                      <ul className={styles.megaList}>
                        {category.children.slice(0, 4).map((child) => (
                          <li key={child.href}>
                            <Link href={child.href} className={styles.megaItemLink}>
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                      {category.children.length > 4 && (
                        <Link href={category.href} className={styles.megaViewAll}>
                          View all →
                        </Link>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {primaryLinks.slice(1).map((item) => (
              <Link key={item.href} href={item.href} className={styles.navLink}>
                {item.label}
              </Link>
            ))}
          </nav>

          <div className={styles.headerActions}>
            <Button href={siteConfig.bookingUrl} external variant="primary" className={styles.headerBookBtn}>
              Book Now
            </Button>
            <button
              type="button"
              className={styles.menuBtn}
              aria-label="Open menu"
              onClick={() => setMobileOpen(true)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      <div className={`${styles.mobileNav} ${mobileOpen ? styles.mobileNavOpen : ""}`}>
        <div className={styles.mobileNavHeader}>
          <Logo onClick={() => setMobileOpen(false)} />
          <button
            type="button"
            className={styles.mobileNavClose}
            aria-label="Close menu"
            onClick={() => setMobileOpen(false)}
          >
            ✕
          </button>
        </div>

        <div className={styles.mobilePrimaryLinks}>
          <Link href="/" className={styles.mobilePrimaryLink} onClick={() => setMobileOpen(false)}>
            Home
          </Link>
          <Link href="/consultation" className={styles.mobilePrimaryLink} onClick={() => setMobileOpen(false)}>
            Consultation
          </Link>
          <Link href="/blog" className={styles.mobilePrimaryLink} onClick={() => setMobileOpen(false)}>
            Blog
          </Link>
          <Link href="/contact" className={styles.mobilePrimaryLink} onClick={() => setMobileOpen(false)}>
            Contact
          </Link>
        </div>

        <p className={styles.mobileNavSectionTitle}>Services</p>
        {serviceLinks.map((item) => (
          <div key={item.label} className={styles.mobileNavSection}>
            <Link href={item.href} className={styles.mobileNavSectionTitle} onClick={() => setMobileOpen(false)}>
              {item.label}
            </Link>
            {item.children?.map((child) => (
              <Link
                key={child.href}
                href={child.href}
                className={styles.mobileNavLink}
                onClick={() => setMobileOpen(false)}
              >
                {child.label}
              </Link>
            ))}
          </div>
        ))}

        <Button href={siteConfig.bookingUrl} external variant="primary" className={styles.mobileBookBtn}>
          Book Now
        </Button>
      </div>
    </>
  );
}
