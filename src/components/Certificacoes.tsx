'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Image from 'next/image';

const CERTS = [
  { src: '/ISO-9001-3.png',          label: 'ISO 9001',          sub: 'Sistemas de Gestão da Qualidade',         n: '01', bg: '/ISO-9001-2.png',          ghost: '9001'  },
  { src: '/ISO-14001-3.png',         label: 'ISO 14001',         sub: 'Gestão Ambiental',                        n: '02', bg: '/ISO-14001-2.png',         ghost: '14001' },
  { src: '/ISO-45001-3.png',         label: 'ISO 45001',         sub: 'Saúde e Segurança no Trabalho',           n: '03', bg: '/ISO-45001-2.png',         ghost: '45001' },
  { src: '/UN-GLOBAL-COMPACT-3.png', label: 'UN Global Compact', sub: 'Pacto Global das Nações Unidas',          n: '04', bg: '/UN-GLOBAL-COMPACT-2.png', ghost: 'UN'    },
];

function CertColumn({ cert, index, hovered, onEnter, onLeave }: {
  cert: typeof CERTS[0] & { bg?: string };
  index: number;
  hovered: number | null;
  onEnter: () => void;
  onLeave: () => void;
}) {
  const colRef  = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const isHov   = hovered === index;
  const anyHov  = hovered !== null;

  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = colRef.current;
    const glow = glowRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width  / 2;
    const cy = rect.height / 2;
    const rotX = ((y - cy) / cy) * -8;
    const rotY = ((x - cx) / cx) *  8;
    el.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
    if (glow) glow.style.background = `radial-gradient(ellipse at ${x}px ${y}px, rgba(255,255,255,0.07) 0%, transparent 65%)`;
  }, []);

  const onOut = useCallback(() => {
    const el = colRef.current;
    if (!el) return;
    import('gsap').then(({ gsap }) => {
      gsap.to(el, { rotateX: 0, rotateY: 0, duration: 0.7, ease: 'elastic.out(1,0.55)', overwrite: 'auto' });
    });
    onLeave();
  }, [onLeave]);

  return (
    <div
      ref={colRef}
      className="cert-col"
      onMouseMove={onMove}
      onMouseEnter={onEnter}
      onMouseLeave={onOut}
      style={{
        flex: isHov ? '2.2' : '1',
        transition: 'flex 0.55s cubic-bezier(0.77,0,0.175,1)',
        background: '#07101f',
        borderRight: index < CERTS.length - 1 ? '1px solid rgba(255,255,255,0.07)' : 'none',
        padding: 'clamp(24px,3vw,40px) clamp(20px,2.5vw,36px)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'default',
        willChange: 'flex, transform',
        transformStyle: 'preserve-3d',
        minWidth: 0,
        opacity: anyHov && !isHov ? 0.5 : 1,
      }}
    >
      {/* glow */}
      <div ref={glowRef} style={{ position: 'absolute', inset: 0, pointerEvents: 'none', transition: 'background .12s' }} />

      {/* accent line bottom */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: isHov ? '3px' : '2px', background: isHov ? 'rgba(255,255,255,0.35)' : 'rgba(255,255,255,0.12)', transition: 'height 0.3s, background 0.3s' }} />

      {/* top row: numbering + doc thumbnail */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', position: 'relative', zIndex: 1 }}>
        <div style={{ fontFamily: 'var(--font-label)', fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)' }}>
          {cert.n} / 04
        </div>
        {/* doc thumbnail */}
        {cert.bg && (
          <div style={{
            width: isHov ? 'clamp(90px,8vw,120px)' : 'clamp(64px,6vw,90px)',
            height: isHov ? 'clamp(68px,6vw,90px)' : 'clamp(48px,4.5vw,68px)',
            border: '1.5px solid rgba(255,255,255,0.15)',
            borderRadius: 2,
            overflow: 'hidden',
            position: 'relative',
            flexShrink: 0,
            transition: 'width 0.4s ease, height 0.4s ease',
          }}>
            <Image src={cert.bg} alt="" fill style={{ objectFit: 'cover', objectPosition: 'top left', opacity: 0.85 }} />
          </div>
        )}
      </div>

      {/* bottom: line + title + subtitle + seal */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ width: 24, height: 2, background: 'rgba(255,255,255,0.25)', marginBottom: 14 }} />
        <div style={{
          fontFamily: 'var(--font-display)', fontWeight: 900,
          fontSize: 'clamp(1.1rem,1.8vw,2rem)',
          color: '#fff', letterSpacing: '-0.03em', lineHeight: 0.95,
          textTransform: 'uppercase', marginBottom: 10,
        }}>{cert.label}</div>
        <div style={{
          fontFamily: 'var(--font-label)', fontSize: 9,
          letterSpacing: '0.14em', textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.4)', lineHeight: 1.6,
        }}>{cert.sub}</div>
        {/* seal bottom right */}
        <div style={{ position: 'absolute', right: 0, bottom: 0, width: 36, height: 36 }}>
          <Image src={cert.src} alt={cert.label} fill style={{ objectFit: 'contain', opacity: 0.65 }} />
        </div>
      </div>
    </div>
  );
}

export default function Certificacoes() {
  const sectionRef  = useRef<HTMLElement>(null);
  const colsRef     = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState<number | null>(null);

  useEffect(() => {
    import('gsap').then(({ gsap }) => {
      import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger);
        if (!sectionRef.current) return;

        /* header */
        gsap.fromTo('.cert-hdr',
          { opacity: 0, y: 32 },
          { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true } }
        );

        /* columns stagger from below */
        gsap.fromTo('.cert-col',
          { opacity: 0, y: 60, clipPath: 'inset(0 0 100% 0)' },
          {
            opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)',
            duration: 0.85, ease: 'power3.out', stagger: 0.1,
            scrollTrigger: { trigger: colsRef.current, start: 'top 85%', once: true },
          }
        );
      });
    });
  }, []);

  return (
    <section ref={sectionRef} id="certificacoes" style={{ background: '#07101f', overflow: 'hidden' }}>

      {/* subtle grid texture */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.025,
        backgroundImage: 'linear-gradient(rgba(255,255,255,.8) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.8) 1px,transparent 1px)',
        backgroundSize: '60px 60px',
      }} />

      <div className="wrap" style={{ position: 'relative', zIndex: 1 }}>

        {/* Header */}
        <div className="cert-hdr" style={{
          opacity: 0,
          display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
          gap: 32, flexWrap: 'wrap',
          padding: 'clamp(72px,10vh,120px) 0 clamp(40px,6vw,72px)',
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><rect width="10" height="10" fill="rgba(255,255,255,0.3)" /></svg>
              <span style={{ fontFamily: 'var(--font-label)', fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#fff' }}>Certificação</span>
            </div>
            <h2 style={{ margin: 0, fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 'clamp(2rem,4vw,4.5rem)', color: '#fff', letterSpacing: '-0.035em', lineHeight: 0.95, textTransform: 'uppercase' }}>
              Padrões<br />
              <span style={{ color: 'transparent', WebkitTextStroke: '1.5px rgba(255,255,255,0.2)' }}>de Excelência</span>
            </h2>
          </div>
          <p style={{ margin: 0, fontFamily: 'var(--font-sans)', fontSize: 'clamp(13px,1vw,15px)', color: '#fff', lineHeight: 1.85, maxWidth: 380 }}>
            A segurança e a saúde no trabalho é a pedra angular no Grupo Omatapalo. Comprometemo-nos a contribuir para o desenvolvimento sustentado da engenharia segundo os mais elevados padrões éticos.
          </p>
        </div>

      </div>

      {/* Full-width accordion columns */}
      <div
        ref={colsRef}
        style={{
          display: 'flex',
          borderTop: '1px solid rgba(255,255,255,0.07)',
          height: 'clamp(280px,38vw,520px)',
          perspective: '1000px',
        }}
      >
        {CERTS.map((c, i) => (
          <CertColumn
            key={c.label}
            cert={c}
            index={i}
            hovered={hovered}
            onEnter={() => setHovered(i)}
            onLeave={() => setHovered(null)}
          />
        ))}
      </div>

      {/* bottom padding */}
      <div style={{ height: 'clamp(48px,6vh,80px)' }} />

    </section>
  );
}
