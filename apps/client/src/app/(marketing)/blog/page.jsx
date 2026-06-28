import { Hero, SectionHeading, BlogCard } from "@/components/ui";
import { getBlogImage } from "@/config/images";
import { getAllPosts } from "@/lib/blog";
import styles from "@/components/ui/ui.module.css";

export const metadata = {
  title: "Blog",
  description: "The Artful Blog — expert perspectives on aesthetic medicine, skincare, and wellness.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <>
      <Hero
        eyebrow="The Artful Blog"
        title="News & Insights"
        subtitle="Expert perspectives on aesthetic medicine, skincare, and wellness."
        primaryCta={{ label: "Book a Consultation", href: "/consultation" }}
        compact
      />

      <section className="section section--surface">
        <div className="container">
          <div className={styles.serviceGrid}>
            {posts.map((post) => (
              <BlogCard
                key={post.slug}
                title={post.title}
                excerpt={post.excerpt}
                href={`/blog/${post.slug}`}
                category={post.category}
                imageSrc={getBlogImage(post.category)}
                imageAlt={post.title}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
