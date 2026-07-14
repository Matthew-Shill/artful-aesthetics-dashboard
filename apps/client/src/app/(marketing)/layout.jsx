import { Header, Footer } from "@/components/layout";
import { JsonLd } from "@/components/seo/JsonLd";
import { getMedicalBusinessSchema, getWebSiteSchema } from "@/components/seo/schema";

export default function MarketingLayout({ children }) {
  return (
    <>
      <JsonLd data={getMedicalBusinessSchema()} />
      <JsonLd data={getWebSiteSchema()} />
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
