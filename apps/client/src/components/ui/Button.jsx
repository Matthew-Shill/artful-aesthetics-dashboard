"use client";

import Link from "next/link";
import styles from "./ui.module.css";

export function Button({
  href,
  children,
  variant = "primary",
  external,
  type = "button",
  onClick,
  disabled,
  className: extraClassName,
}) {
  const className = [
    variant === "outline" ? styles.btnOutline : variant === "light" ? styles.btnLight : styles.btnPrimary,
    extraClassName,
  ]
    .filter(Boolean)
    .join(" ");

  if (href) {
    if (external) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={className} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}
