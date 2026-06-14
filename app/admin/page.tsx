import type { Metadata } from "next";
import AdminPanel from "./AdminPanel";

export const metadata: Metadata = {
  title: "Portfolio Admin | Haitham Elmohamady",
};

export default function AdminPage() {
  return <AdminPanel />;
}
