"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/Button";
import { CategoryIcon, categorySlugFromHref } from "@/components/icons/CategoryIcons";
import { Logo } from "./Logo";
import styles from "./layout.module.css";

const secondaryNavLinks = [
  { label: "Consultation", href: "/consultation" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
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
            <Link href="/" className={styles.navLink}>
              Home
            </Link>

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
                  {serviceLinks.map((category) => {
                    const slug = categorySlugFromHref(category.href);
                    return (
                      <div key={category.href} className={styles.megaColumn}>
                        <Link href={category.href} className={styles.megaCategory}>
                          {slug && (
                            <span className={styles.megaCategoryIcon}>
                              <CategoryIcon slug={slug} width={20} height={20} />
                            </span>
                          )}
                          {category.label}
                        </Link>
                        <ul className={styles.megaList}>
                          {category.children.slice(0, 3).map((child) => (
                            <li key={child.href}>
                              <Link href={child.href} className={styles.megaItemLink}>
                                {child.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                        {category.children.length > 3 && (
                          <Link href={category.href} className={styles.megaViewAll}>
                            View all →
                          </Link>
                        )}
                      </div>
                    );
                  })}
                </div>
                <div className={styles.megaFooter}>
                  {secondaryNavLinks.map((link) => (
                    <Link key={link.href} href={link.href} className={styles.megaFooterLink}>
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </nav>

          <div className={styles.headerActions}>
            <Link href={siteConfig.loginUrl} className={styles.loginLink}>
              Login
            </Link>
            <Button href={siteConfig.bookingUrl} external variant="primary" className={styles.headerBookBtn}>
              Book
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

        <Button
          href={siteConfig.bookingUrl}
          external
          variant="primary"
          className={styles.mobileBookBtnTop}
          onClick={() => setMobileOpen(false)}
        >
          Book Appointment
        </Button>

        <div className={styles.mobilePrimaryLinks}>
          <Link href="/" className={styles.mobilePrimaryLink} onClick={() => setMobileOpen(false)}>
            Home
          </Link>
          {secondaryNavLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={styles.mobilePrimaryLink}
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link href={siteConfig.loginUrl} className={styles.mobilePrimaryLink} onClick={() => setMobileOpen(false)}>
            Login
          </Link>
        </div>

        <p className={styles.mobileNavSectionTitle}>Services</p>
        {serviceLinks.map((item) => {
          const slug = categorySlugFromHref(item.href);
          return (
            <div key={item.label} className={styles.mobileNavSection}>
              <Link href={item.href} className={styles.mobileNavCategoryLink} onClick={() => setMobileOpen(false)}>
                {slug && (
                  <span className={styles.mobileNavCategoryIcon}>
                    <CategoryIcon slug={slug} width={18} height={18} />
                  </span>
                )}
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
          );
        })}
      </div>
    </>
  );
}
