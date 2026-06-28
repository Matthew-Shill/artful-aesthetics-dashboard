import { siteConfig } from "@/config/site";
import { images } from "@/config/images";
import { Hero, SectionHeading } from "@/components/ui";
import { ContactForm } from "@/components/forms/ContactForm";

export const metadata = {
  title: "Contact",
  description: "Contact Artful Aesthetic Medicine in Englewood, CO. Call, email, or send us a message.",
};

export default function ContactPage() {
  return (
    <>
      <Hero
        eyebrow="Get in Touch"
        title="Contact Us"
        subtitle="We'd love to hear from you. Reach out by phone, email, or the form below."
        primaryCta={{ label: "Call Us", href: siteConfig.phoneHref }}
        image={images.hero}
        compact
      />

      <section className="section section--surface">
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "3rem",
            }}
          >
            <div>
              <SectionHeading eyebrow="Visit Us" title="Our Location" align="left" />
              <div style={{ color: "var(--text-mid)", lineHeight: 2 }}>
                <p style={{ margin: "0 0 1rem" }}>
                  <strong>Address</strong>
                  <br />
                  <a href={siteConfig.address.mapsUrl} target="_blank" rel="noopener noreferrer">
                    {siteConfig.address.full}
                  </a>
                </p>
                <p style={{ margin: "0 0 1rem" }}>
                  <strong>Phone</strong>
                  <br />
                  <a href={siteConfig.phoneHref}>{siteConfig.phone}</a>
                </p>
                <p style={{ margin: "0 0 1rem" }}>
                  <strong>Email</strong>
                  <br />
                  <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
                </p>
                <p style={{ margin: 0 }}>
                  <strong>Hours</strong>
                  <br />
                  {siteConfig.hours.map((h) => (
                    <span key={h.days} style={{ display: "block" }}>
                      {h.days}: {h.time}
                    </span>
                  ))}
                </p>
              </div>
            </div>

            <div>
              <SectionHeading eyebrow="Message Us" title="Send a Message" align="left" />
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
