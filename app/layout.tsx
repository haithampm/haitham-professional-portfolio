import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(
    "https://haithampm.github.io/haitham-professional-portfolio/"
  ),
  title: "Haitham Abd El-Azeem Khalifa (Haitham Elmohamady) | Professional Portfolio | هيثم عبد العظيم خليفة",
  description:
    "Bilingual professional portfolio for Haitham Abd El-Azeem Khalifa (known as Haitham Elmohamady), Head of Solutions Implementation & Delivery, SAP Program Manager, and digital transformation leader specializing in ERP, Smart City, and municipal service delivery.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  openGraph: {
    title: "Haitham Abd El-Azeem Khalifa (Haitham Elmohamady) | Professional Portfolio | هيثم عبد العظيم خليفة",
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
