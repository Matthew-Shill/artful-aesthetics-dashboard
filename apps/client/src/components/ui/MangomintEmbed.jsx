import { getMangomintBookingUrl } from "@/config/site";
import styles from "./ui.module.css";

/**
 * In-page Mangomint booking calendar.
 */
export function MangomintEmbed({
  serviceId,
  showOnlyScId,
  title = "Schedule your treatment",
  subtitle = "Pick a time below — you’ll confirm details in the booking flow.",
}) {
  const src = getMangomintBookingUrl({ serviceId, showOnlyScId });

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
          src={src}
          title="Book an appointment"
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          className={styles.mangomintEmbedIframe}
        />
      </div>
    </div>
  );
}
