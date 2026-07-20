import styles from "./ui.module.css";

/**
 * Embedded Mangomint booking calendar.
 * Prefer a service-deep-linked bookingUrl (`?serviceId=` / `?showOnlyScId=`).
 */
export function MangomintEmbed({
  bookingUrl,
  title = "Schedule your treatment",
  subtitle = "Pick a time below — you’ll confirm details in the booking flow.",
}) {
  if (!bookingUrl) return null;

  return (
    <div className={styles.mangomintEmbed}>
      {(title || subtitle) && (
        <div className={styles.mangomintEmbedHeader}>
          {title ? <h2 className={styles.mangomintEmbedTitle}>{title}</h2> : null}
          {subtitle ? <p className={styles.mangomintEmbedSubtitle}>{subtitle}</p> : null}
        </div>
      )}
      <div className={styles.mangomintEmbedFrame}>
        <iframe
          src={bookingUrl}
          title="Mangomint online booking"
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          className={styles.mangomintEmbedIframe}
        />
      </div>
    </div>
  );
}
