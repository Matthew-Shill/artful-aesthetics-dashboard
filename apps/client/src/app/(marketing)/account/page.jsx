import { AccountPage } from "@/components/auth/AccountPage";

export const metadata = {
  title: "My Account",
  robots: { index: false, follow: false },
};

export default function AccountRoute() {
  return <AccountPage />;
}
