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
    const isProtocolLink = /^(sms|tel|mailto):/i.test(href);
    const isAnchor = href.startsWith("#");
    if (external || isProtocolLink || isAnchor) {
      return (
        <a
          href={href}
          {...(external && !isProtocolLink && !isAnchor
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
          className={className}
          onClick={onClick}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={className} onClick={onClick}>
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
