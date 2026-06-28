import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { Hero } from "@/components/ui";
import { getBlogImage } from "@/config/images";
import { getAllPostSlugs, getPostBySlug } from "@/lib/blog";

export async function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  return (
    <>
      <Hero
        eyebrow={post.category}
        title={post.title}
        subtitle={new Date(post.date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
        image={{ src: getBlogImage(post.category), alt: post.title }}
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
