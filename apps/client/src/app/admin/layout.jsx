import "@/admin/admin.css";
import { AuthProvider } from "@/admin/context/AuthContext";

export const metadata = {
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }) {
  return <AuthProvider>{children}</AuthProvider>;
}
