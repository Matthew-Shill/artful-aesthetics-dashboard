import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import styles from "./layout.module.css";

function RedesignLogo({ inverted = false }) {
  return (
    <>
      <Image
        src={siteConfig.logo.redesign.icon}
        alt=""
        width={56}
        height={56}
        aria-hidden="true"
        className={`${styles.logoIcon} ${inverted ? styles.logoIconInverted : ""}`}
        priority
      />
      <span className={styles.logoText}>
        <span className={`${styles.logoWordmark} ${inverted ? styles.logoWordmarkInverted : ""}`}>
          ARTFUL
        </span>
        <span className={`${styles.logoTagline} ${inverted ? styles.logoTaglineInverted : ""}`}>
          Aesthetic Medicine
        </span>
      </span>
    </>
  );
}

function OwnerLogo({ inverted = false }) {
  const src = inverted ? siteConfig.logo.owner.light : siteConfig.logo.owner.dark;

  return (
    <Image
      src={src}
      alt={siteConfig.logo.alt}
      width={1016}
      height={891}
      className={styles.logoOwnerImage}
      priority
    />
  );
}

export function Logo({ className = "", onClick, inverted = false }) {
  const useOwnerLogo = siteConfig.logo.variant === "owner";

  return (
    <Link
      href="/"
      className={`${styles.logo} ${inverted ? styles.logoInverted : ""} ${className}`}
      onClick={onClick}
      aria-label={siteConfig.logo.alt}
    >
      {useOwnerLogo ? <OwnerLogo inverted={inverted} /> : <RedesignLogo inverted={inverted} />}
    </Link>
  );
}
