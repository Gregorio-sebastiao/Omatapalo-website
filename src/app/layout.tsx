import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Grupo Omatapalo — Fazemos Acontecer",
  description: "Grupo Omatapalo: Engenharia, Construção, Agroindústria, Imobiliário, Minas, Pesca e Gestão Hoteleira em Angola e além.",
  keywords: "Omatapalo, Angola, construção, engenharia, infraestrutura, grupo empresarial",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt" className={`${inter.variable} h-full`}>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
