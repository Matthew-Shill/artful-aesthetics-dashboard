"use client";

import styles from "./ui.module.css";

export function StickyBookBar({ label = "Book at Artful", bookingUrl }) {
  const isExternal = bookingUrl?.startsWith("http");

  return (
    <div className={styles.stickyBookBar}>
      <a
        href={bookingUrl}
        {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className={styles.stickyBookBtn}
      >
        {label}
      </a>
    </div>
  );
}
