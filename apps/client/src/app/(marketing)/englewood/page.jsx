import { getLocation } from "@/content/locations";
import { buildPageMetadata } from "@/lib/seo";
import { LocationPageTemplate } from "@/components/locations/LocationPageTemplate";

const location = getLocation("englewood");

export const metadata = buildPageMetadata({
  title: location.seoTitle,
  description: location.seoDescription,
  path: "/englewood",
  absoluteTitle: true,
});

export default function EnglewoodPage() {
  return <LocationPageTemplate location={location} />;
}
