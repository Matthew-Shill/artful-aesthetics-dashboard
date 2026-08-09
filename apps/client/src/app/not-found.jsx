import { Header, Footer } from "@/components/layout";
import { SiteError } from "@/components/errors";

export const metadata = {
  title: "Page Not Found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <>
      <Header />
      <main>
        <SiteError />
      </main>
      <Footer />
    </>
  );
}
