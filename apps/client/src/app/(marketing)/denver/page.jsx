import { getLocation } from "@/content/locations";
import { buildPageMetadata } from "@/lib/seo";
import { LocationPageTemplate } from "@/components/locations/LocationPageTemplate";

const location = getLocation("denver");

export const metadata = buildPageMetadata({
  title: location.seoTitle,
  description: location.seoDescription,
  path: "/denver",
  absoluteTitle: true,
});

export default function DenverPage() {
  return <LocationPageTemplate location={location} />;
}
