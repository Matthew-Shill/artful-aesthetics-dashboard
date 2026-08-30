import Script from "next/script";
import { siteConfig } from "@/config/site";

/**
 * Official Mangomint booking + redirect listener.
 * Intercepts booking.mangomint.com links into an on-site overlay and
 * handles the post-booking redirect to /thank-you.
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
