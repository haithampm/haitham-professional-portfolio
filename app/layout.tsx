import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Haitham Abd El-Azeem Khalifa | Professional Portfolio",
  description:
    "Solutions Delivery Manager, SAP Program Manager, and digital transformation leader specializing in ERP, Smart City, and municipal service delivery.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  openGraph: {
    title: "Haitham Abd El-Azeem Khalifa | Professional Portfolio",
    description:
      "ERP, SAP S/4HANA, Smart City, and municipal digital transformation leadership across KSA, UAE, and Egypt.",
    images: ["/smart-city-delivery-hero.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
