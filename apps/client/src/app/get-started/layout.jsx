import { GetStartedHeader, GetStartedFooter } from "@/components/landing/GetStartedChrome";

export default function GetStartedLayout({ children }) {
  return (
    <>
      <GetStartedHeader />
      <main>{children}</main>
      <GetStartedFooter />
    </>
  );
}
