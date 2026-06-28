import { AdminDashboardGate } from "@/admin/AdminDashboardGate";
import { NAV } from "@/admin/constants/navigation";

export const metadata = {
  title: "Dashboard",
  robots: { index: false, follow: false },
};

export function generateStaticParams() {
  return NAV.map((item) => ({ section: item.id }));
}

export default function AdminSectionPage() {
  return <AdminDashboardGate />;
}
