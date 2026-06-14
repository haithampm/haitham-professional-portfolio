import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(
    "https://haitham-portfolio-2026.mazen-raslan-7066.chatgpt-team.site"
  ),
  title: "Haitham Elmohamady | Professional Portfolio | هيثم المحمدي",
  description:
    "Bilingual professional portfolio for Haitham Elmohamady, a Solutions Delivery Manager, SAP Program Manager, and digital transformation leader specializing in ERP, Smart City, and municipal service delivery.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  openGraph: {
    title: "Haitham Elmohamady | Professional Portfolio | هيثم المحمدي",
    description:
      "Bilingual ERP, SAP S/4HANA, Smart City, and municipal digital transformation leadership portfolio across KSA, UAE, and Egypt.",
    images: ["/haitham-elmohamady-profile.png"],
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
