import { notFound } from "next/navigation";
import {
  serviceCategories,
  getCategory,
  getService,
  getAllServicePaths,
} from "@/content/services";
import { ServicePageTemplate } from "@/components/services/ServicePageTemplate";

export async function generateStaticParams() {
  return getAllServicePaths().map(({ category, slug }) => ({ category, slug }));
}

export async function generateMetadata({ params }) {
  const { category: categorySlug, slug } = await params;
  const service = getService(categorySlug, slug);
  if (!service) return {};
  return {
    title: service.title,
    description: service.description,
  };
}

export default async function ServiceDetailPage({ params }) {
  const { category: categorySlug, slug } = await params;
  const category = getCategory(categorySlug);
  const service = getService(categorySlug, slug);

  if (!category || !service) notFound();

  return <ServicePageTemplate service={service} category={category} />;
}
