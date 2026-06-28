import { Header, Footer } from "@/components/layout";

export default function MarketingLayout({ children }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
