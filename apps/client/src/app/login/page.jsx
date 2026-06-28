import { LoginPage } from "@/components/auth/LoginPage";

export const metadata = {
  title: "Sign In",
  robots: { index: false, follow: false },
};

export default function LoginRoute() {
  return <LoginPage />;
}
