import Script from "next/script";
import { siteConfig } from "@/config/site";

/**
 * Official Mangomint booking script.
 * Intercepts booking.mangomint.com links into an on-site overlay.
 *
 * The post-booking redirect to siteConfig.bookingThankYouPath is not set here.
 * It lives on the Mangomint account, configured by their support team, and
 * app.js is what acts on it — so it survives independently of this code.
 */
export function MangomintScript() {
  return (
    <>
      <Script id="mangomint-company" strategy="beforeInteractive">
        {`window.Mangomint = window.Mangomint || {}; window.Mangomint.CompanyId = ${siteConfig.mangomintCompanyId};`}
      </Script>
      <Script src="https://booking.mangomint.com/app.js" strategy="afterInteractive" />
    </>
  );
}
