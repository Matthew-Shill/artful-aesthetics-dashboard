import { Hero, SectionHeading } from "@/components/ui";

export const metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for Artful Aesthetic Medicine.",
};

export default function PrivacyPage() {
  return (
    <>
      <Hero
        eyebrow="Legal"
        title="Privacy Policy"
        subtitle="How we collect, use, and protect your information."
        primaryCta={null}
      />

      <section className="section section--surface">
        <div className="container prose">
          <SectionHeading title="Your Privacy Matters" align="left" />
          <p>
            Artful Aesthetic Medicine respects your privacy and is committed to protecting your personal
            information. This policy describes how we collect, use, and safeguard data when you visit our
            website or use our services.
          </p>
          <h2>Information We Collect</h2>
          <p>
            We may collect information you provide directly, such as your name, email address, phone number,
            and messages submitted through our contact or newsletter forms.
          </p>
          <h2>How We Use Your Information</h2>
          <ul>
            <li>To respond to your inquiries and appointment requests</li>
            <li>To send newsletters and promotional communications you opt into</li>
            <li>To improve our website and services</li>
          </ul>
          <h2>Contact</h2>
          <p>
            For privacy-related questions, contact us at{" "}
            <a href="mailto:erica@artfulaestheticmedicine.com">erica@artfulaestheticmedicine.com</a>.
          </p>
        </div>
      </section>
    </>
  );
}
