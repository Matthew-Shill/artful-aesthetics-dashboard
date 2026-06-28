import Link from "next/link";
import { siteConfig, testimonials, bookingSteps } from "@/config/site";
import { images, getCategoryImage, getBlogImage, getEricaImageAlt } from "@/config/images";
import { serviceCategories } from "@/content/services";
import {
  Hero,
  SectionHeading,
  ServiceCard,
  BookingCTA,
  Testimonial,
  BookingSteps,
  BlogCard,
  MediaImage,
} from "@/components/ui";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { getAllPosts } from "@/lib/blog";
import styles from "@/components/ui/ui.module.css";

export default function HomePage() {
  const posts = getAllPosts().slice(0, 6);

  return (
    <>
      <Hero
        eyebrow="Englewood, Colorado"
        titleLines={["Intentional &", "Ethical Artistry"]}
        subtitle="Where beauty meets artistry — personalized aesthetic medicine in a welcoming, professional environment."
        primaryCta={{ label: "Schedule Appointment", href: siteConfig.bookingUrl }}
        secondaryCta={{ label: "Book a Consultation", href: "/consultation" }}
        image={images.hero}
      />

      <section className="section section--surface">
        <div className="container">
          <SectionHeading
            eyebrow="Our Services"
            title="Discover Our Treatments"
            subtitle="From neurotoxins and dermal fillers to microblading and IPL treatments, our skilled team is dedicated to providing personalized care."
          />
          <div className={styles.serviceGrid}>
            {serviceCategories.map((cat) => (
              <ServiceCard
                key={cat.slug}
                title={cat.title}
                description={cat.description}
                href={`/services/${cat.slug}`}
                imageSrc={cat.slug === "microblading" ? images.erica.src : getCategoryImage(cat.slug)}
                imageAlt={
                  cat.slug === "microblading"
                    ? getEricaImageAlt("microblading")
                    : `${cat.title} at Artful Aesthetic Medicine`
                }
              />
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className={styles.aboutSection}>
            <div>
              <SectionHeading
                eyebrow="Owner & Aesthetic Injector"
                title="Erica Eskeli"
                subtitle="Mastering the science and art of aesthetic care with over a decade of experience in medical aesthetics."
                align="left"
              />
              <p style={{ color: "var(--text-mid)", lineHeight: 1.85, marginBottom: "1.75rem", maxWidth: "42ch" }}>
                Renowned for her precision and dedication to enhancing natural beauty, Erica combines artistry
                and science to deliver exceptional, personalized results.
              </p>
              <Link href="/consultation" className={styles.btnPrimary}>
                Book a Consultation
              </Link>
            </div>
            <div className={styles.aboutImage}>
              <MediaImage
                src={images.erica.src}
                alt={images.erica.alt}
                fill
                sizes="(max-width: 768px) 100vw, 420px"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section section--surface">
        <div className="container">
          <SectionHeading
            eyebrow="The Artful Blog"
            title="News & Insights"
            subtitle="Expert perspectives on aesthetic medicine, skincare, and wellness."
          />
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
          <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
            <Link href="/blog" className={styles.btnOutline}>
              View All Posts
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading
            title="We Make It Easy to Book and Prepare"
            subtitle="Four simple steps from booking to your specialized treatment."
          />
          <BookingSteps steps={bookingSteps} />
        </div>
      </section>

      <section className="section section--surface">
        <div className="container">
          <Testimonial quote={testimonials[0].quote} author={testimonials[0].author} />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <BookingCTA
            title="Book a Consultation"
            text="Experience the art of aesthetic medicine today and let us help you achieve the look you desire."
            bookingUrl={siteConfig.bookingUrl}
          />
        </div>
      </section>

      <section className="section section--gold">
        <div className="container" style={{ maxWidth: "480px", textAlign: "center" }}>
          <SectionHeading
            title="Join Our Newsletter"
            subtitle="Up-to-date news, specials and everything to keep you healthy, happy and glowing!"
          />
          <NewsletterForm />
        </div>
      </section>
    </>
  );
}
