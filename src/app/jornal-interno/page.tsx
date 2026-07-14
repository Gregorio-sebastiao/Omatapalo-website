'use client';

import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

const EDICOES = [
  { src: '/MARCO-JORNAL.webp', alt: 'Acontece — Março 2026', label: 'Março 2026' },
];

export default function JornalInterno() {
  return (
    <>
      <Nav />
      <main style={{ minHeight: '100vh', background: '#F6F8FB', paddingBottom: 'clamp(60px,8vh,100px)' }}>

        {/* Hero personalizado — capa de jornal visível sem corte */}
        <section style={{ position: 'relative', height: 'clamp(420px,55vw,640px)', overflow: 'hidden', background: '#1a396e', display: 'flex', alignItems: 'flex-end' }}>
          {/* Imagem da capa à direita, contida sem corte */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/CAPA JORNAL.png"
            alt=""
            style={{
              position: 'absolute', right: 0, top: 0, height: '100%', width: 'auto',
              maxWidth: '45%', objectFit: 'contain', objectPosition: 'right top',
            }}
          />
          {/* Gradiente sobre a imagem */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to right, #1a396e 45%, rgba(26,57,110,0.7) 70%, rgba(26,57,110,0.2) 100%)',
          }} />
          {/* Texto */}
          <div style={{
            position: 'relative', zIndex: 1,
            padding: 'clamp(40px,6vw,80px) clamp(24px,6vw,96px)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><rect width="10" height="10" fill="#fff" /></svg>
              <span style={{ fontFamily: 'var(--font-label)', fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#fff' }}>
                Grupo Omatapalo · Comunicação Interna
              </span>
            </div>
            <h1 style={{
              fontFamily: 'var(--font-display)', fontWeight: 900,
              textTransform: 'uppercase', letterSpacing: '-0.035em',
              fontSize: 'clamp(1.5rem,5.5vw,6rem)', lineHeight: 0.92,
              color: '#fff', margin: 0,
            }}>
              Novidades do Grupo Omatapalo<br />
              <span style={{ color: 'transparent', WebkitTextStroke: '1.5px rgba(255,255,255,0.25)' }}>
                Acontece
              </span>
            </h1>
          </div>
        </section>

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
