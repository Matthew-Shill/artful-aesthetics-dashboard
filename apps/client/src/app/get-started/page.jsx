import { siteConfig } from "@/config/site";
import { buildPageMetadata } from "@/lib/seo";
import { GetStartedPage } from "@/components/landing/GetStartedPage";

export const metadata = buildPageMetadata({
  title: "Book Your Visit",
  description:
    "Book an appointment at Artful Aesthetic Medicine in Englewood, CO. Botox, fillers, skin treatments, IV therapy, and more with Erica Eskeli.",
  path: "/get-started",
  image: siteConfig.ogImage,
  noIndex: true,
});

export default function GetStartedRoute() {
  return <GetStartedPage />;
}
