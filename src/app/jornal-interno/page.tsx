'use client';

import { useState } from 'react';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';

const PER_PAGE = 8;

const EDICOES = [
  { src: '/MARCO-JORNAL.webp',                    alt: 'Acontece — Março 2026',    label: 'Março 2026'    },
  { src: '/JORNAL-NOVEMBRO-2025.jpg',             alt: 'Acontece — Novembro 2025', label: 'Novembro 2025' },
  { src: '/JORNAL-ABRIL-2025.png',                alt: 'Acontece — Outubro 2025',  label: 'Outubro 2025'  },
  { src: '/FREE-JORNAL-OMATAPALO-SETEMBRO-1.jpg', alt: 'Acontece — Setembro 2025', label: 'Setembro 2025', href: 'https://drive.usercontent.google.com/u/0/uc?id=13O2Im13MYhPenIfWPflYOoFXCvFOCTSt&export=download' },
  { src: '/JORNAL-AGOSTO-2025.png',               alt: 'Acontece — Agosto 2025',   label: 'Agosto 2025',   href: 'https://drive.usercontent.google.com/u/0/uc?id=1PmuQXysmWWmD7k5gP5AITMhumkMq8ljG&export=download' },
  { src: '/JORNAL-JULHO-2025.jpg',                alt: 'Acontece — Julho 2025',    label: 'Julho 2025',    href: 'https://drive.usercontent.google.com/u/0/uc?id=1BdErKennmPBUkxDf_oZR1X8nbjZcUG1v&export=download' },
  { src: '/JORNAL-JUNHO-2025-v2.jpg',             alt: 'Acontece — Junho 2025',    label: 'Junho 2025'    },
  { src: '/JORNAL-MAIO-2025-v2.jpg',              alt: 'Acontece — Maio 2025',     label: 'Maio 2025'     },
  { src: '/JORNAL-JUNHO-2025.jpg',                alt: 'Acontece — Abril 2025',    label: 'Abril 2025'    },
  { src: '/JORNAL-MAIO-2025.jpg',                 alt: 'Acontece — Março 2025',    label: 'Março 2025'    },
];

export default function JornalInterno() {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(EDICOES.length / PER_PAGE);
  const visible = EDICOES.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <>
      <Nav />
      <main style={{ minHeight: '100vh', background: '#F6F8FB', paddingBottom: 'clamp(60px,8vh,100px)' }}>

        {/* Hero — imagem completa com overlay azul igual às outras páginas */}
        <div style={{ position: 'relative', width: '100%', background: '#1a396e', lineHeight: 0 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/CAPAWEB.png"
            alt="Acontece — Jornal Interno Grupo Omatapalo"
            style={{ width: '100%', display: 'block', opacity: 0.45 }}
          />
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to top, #1a396e 0%, rgba(26,57,110,0.6) 50%, rgba(26,57,110,0.3) 100%)',
          }} />
        </div>

        <div className="wrap" style={{ paddingTop: 'clamp(48px,6vh,80px)' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 'clamp(12px,2vw,24px)',
          }}>
            {visible.map((ed, i) => (
              <a
                key={i}
                href={ed.href ?? ed.src}
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
                  <img src={ed.src} alt={ed.alt} style={{ width: '100%', display: 'block', objectFit: 'cover' }} />
                </div>
                <div style={{ fontFamily: 'var(--font-label)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#1a396e', textAlign: 'center' }}>
                  {ed.label}
                </div>
              </a>
            ))}
          </div>

        </div>

        {/* Paginação — fora do grid para evitar overflow */}
        {totalPages > 1 && (
          <div style={{ width: '100%', overflowX: 'auto', paddingBlock: 'clamp(40px,5vh,64px)' }}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 4, minWidth: 'max-content', margin: '0 auto' }}>
              <button
                onClick={() => { setPage(p => Math.max(1, p - 1)); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                disabled={page === 1}
                style={{
                  padding: '8px 16px', border: '1px solid #d0d8e8', borderRadius: 6,
                  background: '#fff', color: page === 1 ? '#9aabcc' : '#1a396e',
                  cursor: page === 1 ? 'default' : 'pointer', fontSize: 13, fontWeight: 600,
                  fontFamily: 'var(--font-label)', letterSpacing: '0.05em', whiteSpace: 'nowrap',
                }}
              >« Anterior</button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
                <button
                  key={n}
                  onClick={() => { setPage(n); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  style={{
                    width: 38, height: 38, border: '1px solid #d0d8e8', borderRadius: 6,
                    background: page === n ? '#1a396e' : '#fff',
                    color: page === n ? '#fff' : '#1a396e',
                    cursor: 'pointer', fontSize: 13, fontWeight: 600,
                    fontFamily: 'var(--font-label)', flexShrink: 0,
                  }}
                >{n}</button>
              ))}

              <button
                onClick={() => { setPage(p => Math.min(totalPages, p + 1)); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                disabled={page === totalPages}
                style={{
                  padding: '8px 16px', border: '1px solid #d0d8e8', borderRadius: 6,
                  background: '#fff', color: page === totalPages ? '#9aabcc' : '#1a396e',
                  cursor: page === totalPages ? 'default' : 'pointer', fontSize: 13, fontWeight: 600,
                  fontFamily: 'var(--font-label)', letterSpacing: '0.05em', whiteSpace: 'nowrap',
                }}
              >Próximo »</button>
            </div>
          </div>
        )}


      </main>
      <Footer />

      <style>{`
        @media (max-width: 900px) {
          .wrap > div:first-child { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 500px) {
          .wrap > div:first-child { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
