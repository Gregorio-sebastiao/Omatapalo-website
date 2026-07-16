import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Acontece — Jornal Interno | Grupo Omatapalo',
  robots: { index: false, follow: false },
};

export default function JornalInternoLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
