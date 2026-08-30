import Script from "next/script";
import { siteConfig } from "@/config/site";

/**
 * Official Mangomint booking script.
 * Intercepts booking.mangomint.com links into an on-site overlay.
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
