import type { Metadata } from "next";
import "./globals.css";
import GoogleAnalytics from '@/components/GoogleAnalytics';
import { LanguageProvider } from '@/lib/i18n/LanguageContext';

export const metadata: Metadata = {
  title: "Grupo Omatapalo — Fazemos Acontecer",
  description: "Grupo Omatapalo: Engenharia, Construção, Agroindústria, Imobiliário, Energia, Hotelaria e Infraestrutura em Angola e além.",
  keywords: "Omatapalo, Angola, construção, engenharia, infraestrutura, grupo empresarial",
  icons: {
    icon: '/Five-icon-OMATAPALO.png',
    shortcut: '/Five-icon-OMATAPALO.png',
    apple: '/Five-icon-OMATAPALO.png',
  },
  other: {
    'facebook-domain-verification': 'o6a92g6177ssua4mihkh1klq49ps6v',
  },
};

async function getGaId(): Promise<string> {
  try {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url || !key) return 'G-C5FQXGNTXZ';
    const res = await fetch(`${url}/rest/v1/site_settings?key=eq.ga_tracking_id&select=value&limit=1`, {
      headers: { apikey: key, Authorization: `Bearer ${key}` },
      next: { revalidate: 3600 },
    });
    const data = await res.json();
    return data?.[0]?.value ?? 'G-C5FQXGNTXZ';
  } catch { return 'G-C5FQXGNTXZ'; }
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const gaId = await getGaId();
  return (
    <html lang="pt" className="h-full">
      <body className="min-h-full">
        <LanguageProvider>
          {children}
        </LanguageProvider>
        <GoogleAnalytics gaId={gaId} />
      </body>
    </html>
  );
}
