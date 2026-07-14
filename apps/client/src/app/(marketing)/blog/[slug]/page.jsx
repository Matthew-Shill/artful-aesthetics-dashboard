import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { Hero } from "@/components/ui";
import { JsonLd } from "@/components/seo/JsonLd";
import { getBlogPostingSchema, getBreadcrumbSchema } from "@/components/seo/schema";
import { getBlogImage } from "@/config/images";
import { getAllPostSlugs, getPostBySlug } from "@/lib/blog";
import { buildPageMetadata } from "@/lib/seo";

export async function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  const image = getBlogImage(post.category);
  return buildPageMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${slug}`,
    image,
    type: "article",
  });
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  const image = getBlogImage(post.category);
  const breadcrumb = getBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
    { name: post.title, path: `/blog/${slug}` },
  ]);

  return (
    <>
      <JsonLd data={getBlogPostingSchema(post, image)} />
      {breadcrumb && <JsonLd data={breadcrumb} />}

      <Hero
        eyebrow={post.category}
        title={post.title}
        subtitle={new Date(post.date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
        image={{ src: image, alt: post.title }}
        compact
      />

      <section className="section section--surface">
        <div className="container prose">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>
      </section>
    </>
  );
}
