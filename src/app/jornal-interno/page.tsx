'use client';

import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';

const EDICOES = [
  { src: '/MARCO-JORNAL.webp', alt: 'Acontece — Março 2026', label: 'Março 2026' },
];

export default function JornalInterno() {
  return (
    <>
      <Nav />
      <main style={{ minHeight: '100vh', background: '#F6F8FB', paddingBottom: 'clamp(60px,8vh,100px)' }}>

        <PageHero
          title="Acontece"
          imgSrc="/CAPA JORNAL.png"
          eyebrow="Grupo Omatapalo · Comunicação Interna"
          outlineWord="Acontece"
          imgOpacity={0.45}
          position="center"
        />

        <div className="wrap" style={{ paddingTop: 'clamp(48px,6vh,80px)' }}>
          {/* Grid — 4 por linha */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 'clamp(12px,2vw,24px)',
          }}>
            {EDICOES.map((ed, i) => (
              <a
                key={i}
                href={ed.src}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}
              >
                <div style={{
                  border: '1.5px solid #E8EDF5',
                  borderRadius: 8,
                  overflow: 'hidden',
                  background: '#fff',
                  boxShadow: '0 2px 12px rgba(26,57,110,0.06)',
                  transition: 'box-shadow 0.25s, border-color 0.25s',
                }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 32px rgba(26,57,110,0.14)'; (e.currentTarget as HTMLElement).style.borderColor = '#1a396e'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 2px 12px rgba(26,57,110,0.06)'; (e.currentTarget as HTMLElement).style.borderColor = '#E8EDF5'; }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={ed.src}
                    alt={ed.alt}
                    style={{ width: '100%', display: 'block', objectFit: 'cover' }}
                  />
                </div>
                <div style={{ fontFamily: 'var(--font-label)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#1a396e', textAlign: 'center' }}>
                  {ed.label}
                </div>
              </a>
            ))}
          </div>
        </div>

      </main>
      <Footer />

      <style>{`
        @media (max-width: 900px) {
          .wrap > div { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 500px) {
          .wrap > div { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
