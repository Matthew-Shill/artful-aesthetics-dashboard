"use client";

import styles from "./ui.module.css";

export function StickyBookBar({ label = "Book at Artful", bookingUrl }) {
  return (
    <div className={styles.stickyBookBar}>
      <a href={bookingUrl} target="_blank" rel="noopener noreferrer" className={styles.stickyBookBtn}>
        {label}
      </a>
    </div>
  );
}
