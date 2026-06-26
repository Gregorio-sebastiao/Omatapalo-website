import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Grupo Omatapalo — Fazemos Acontecer",
  description: "Grupo Omatapalo: Engenharia, Construção, Agroindústria, Imobiliário, Energia, Hotelaria e Infraestrutura em Angola e além.",
  keywords: "Omatapalo, Angola, construção, engenharia, infraestrutura, grupo empresarial",
  icons: {
    icon: '/Five-icon-OMATAPALO.png',
    shortcut: '/Five-icon-OMATAPALO.png',
    apple: '/Five-icon-OMATAPALO.png',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt" className="h-full">
      <body className="min-h-full">{children}</body>
    </html>
  );
}
