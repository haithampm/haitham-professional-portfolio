import type { Metadata } from "next";
import AdminPanel from "./AdminPanel";

export const metadata: Metadata = {
  title: "Portfolio Admin | Haitham Abd El-Azeem Khalifa",
};

export default function AdminPage() {
  return <AdminPanel />;
}
