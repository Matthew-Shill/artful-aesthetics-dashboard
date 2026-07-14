import { notFound } from "next/navigation";
import {
  getCategory,
  getService,
  getAllServicePaths,
} from "@/content/services";
import { getServiceImage } from "@/config/images";
import { buildPageMetadata } from "@/lib/seo";
import { ServicePageTemplate } from "@/components/services/ServicePageTemplate";

export async function generateStaticParams() {
  return getAllServicePaths().map(({ category, slug }) => ({ category, slug }));
}

export async function generateMetadata({ params }) {
  const { category: categorySlug, slug } = await params;
  const service = getService(categorySlug, slug);
  if (!service) return {};

  const description = service.seoDescription ||
    (Array.isArray(service.description) ? service.description[0] : service.description);

  return buildPageMetadata({
    title: { absolute: service.seoTitle || `${service.title} | Artful Aesthetic Medicine` },
    description,
    path: `/services/${categorySlug}/${slug}`,
    image: getServiceImage(categorySlug, slug),
    absoluteTitle: true,
  });
}

export default async function ServiceDetailPage({ params }) {
  const { category: categorySlug, slug } = await params;
  const category = getCategory(categorySlug);
  const service = getService(categorySlug, slug);

  if (!category || !service) notFound();

  return <ServicePageTemplate service={service} category={category} />;
}
