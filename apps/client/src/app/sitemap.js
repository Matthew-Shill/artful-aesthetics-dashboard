import { siteConfig } from "@/config/site";
import { serviceCategories, getAllServicePaths } from "@/content/services";
import { getAllPostSlugs } from "@/lib/blog";

export default function sitemap() {
  const base = siteConfig.url;

  const staticPages = ["", "/consultation", "/contact", "/blog", "/privacy"].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.8,
  }));

  const categoryPages = serviceCategories.map((c) => ({
    url: `${base}/services/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const servicePages = getAllServicePaths().map(({ category, slug }) => ({
    url: `${base}/services/${category}/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const blogPages = getAllPostSlugs().map((slug) => ({
    url: `${base}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: "yearly",
    priority: 0.5,
  }));

  return [...staticPages, ...categoryPages, ...servicePages, ...blogPages];
}
