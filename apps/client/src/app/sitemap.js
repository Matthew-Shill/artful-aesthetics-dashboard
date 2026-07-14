import { siteConfig } from "@/config/site";
import { serviceCategories, getAllServicePaths } from "@/content/services";
import { getAllPosts } from "@/lib/blog";

export default function sitemap() {
  const base = siteConfig.url;

  const staticPages = [
    { path: "", priority: 1, changeFrequency: "weekly" },
    { path: "/consultation", priority: 0.9, changeFrequency: "monthly" },
    { path: "/contact", priority: 0.8, changeFrequency: "monthly" },
    { path: "/blog", priority: 0.7, changeFrequency: "weekly" },
    { path: "/privacy", priority: 0.3, changeFrequency: "yearly" },
  ].map(({ path, priority, changeFrequency }) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }));

  const categoryPages = serviceCategories.map((c) => ({
    url: `${base}/services/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const servicePages = getAllServicePaths().map(({ category, slug }) => ({
    url: `${base}/services/${category}/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const blogPages = getAllPosts().map((post) => ({
    url: `${base}/blog/${post.slug}`,
    lastModified: post.date ? new Date(post.date) : new Date(),
    changeFrequency: "yearly",
    priority: 0.5,
  }));

  return [...staticPages, ...categoryPages, ...servicePages, ...blogPages];
}
