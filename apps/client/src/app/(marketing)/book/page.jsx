import { siteConfig } from "@/config/site";
import { buildPageMetadata } from "@/lib/seo";
import { BookingStart } from "@/components/analytics/BookingStart";
import { MangomintEmbed } from "@/components/ui";
import styles from "@/components/ui/ui.module.css";

export const metadata = buildPageMetadata({
  title: "Book Appointment",
  description:
    "Book an appointment at Artful Aesthetic Medicine in Englewood, CO. Choose a service and time without leaving the site.",
  path: "/book",
  image: siteConfig.ogImage,
});

export default async function BookPage({ searchParams }) {
  const params = await searchParams;
  const serviceId = params?.serviceId;
  const showOnlyScId = params?.showOnlyScId;

  return (
    <>
      <BookingStart serviceId={serviceId} showOnlyScId={showOnlyScId} />

      <section className={`section ${styles.bookPage}`}>
        <div className="container">
          <MangomintEmbed
            serviceId={serviceId}
            showOnlyScId={showOnlyScId}
            title="Book your visit"
            subtitle="Pick a time below — you’ll confirm details in the booking flow."
          />
        </div>
      </section>
    </>
  );
}
