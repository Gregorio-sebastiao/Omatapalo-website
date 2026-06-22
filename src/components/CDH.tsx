'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';

export default function CDH() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    import('gsap').then(({ gsap }) => {
      import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger);
        if (!ref.current) return;
        const card = ref.current.querySelector('.cdh-card');
        gsap.fromTo(card, { opacity: 0, y: 32 },
          { opacity: 1, y: 0, duration: 0.85, ease: 'power2.out',
            scrollTrigger: { trigger: ref.current, start: 'top 80%', once: true } });
      });
    });
  }, []);

  return (
    <section id="cdh" className="section" ref={ref}>
      <div className="wrap">
        <div
          className="cdh-card"
          style={{
            position: 'relative', overflow: 'hidden',
            borderRadius: 'var(--radius-lg)', background: 'var(--navy-950)', opacity: 0,
          }}
        >
          {/* Background */}
          <div className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1551958219-acbc608c6377?w=1400&q=72&auto=format&fit=crop"
              alt="CDH Clube Desportivo da Huíla"
              fill
              className="object-cover"
              style={{ opacity: 0.3 }}
            />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(110deg, var(--navy-950) 38%, rgba(10,16,31,0.4))' }} />
          </div>

          {/* Content */}
          <div className="relative z-[2] cdh-inner" style={{
            padding: 'clamp(2.5rem,5vw,4.5rem)',
            display: 'grid', gridTemplateColumns: '1fr auto',
            gap: 'var(--space-7)', alignItems: 'center',
          }}>
            <div>
              <div style={{
                fontFamily: 'var(--font-label)', fontSize: '11px', letterSpacing: '0.2em',
                textTransform: 'uppercase', color: 'var(--accent)',
                display: 'inline-flex', alignItems: 'center', gap: '12px', marginBottom: '20px',
              }}>
                <span style={{ width: '28px', height: '3px', background: 'var(--accent)', display: 'inline-block', flexShrink: 0 }} />
                CDH · Clube Desportivo da Huíla
              </div>

              <h3 style={{
                fontFamily: 'var(--font-display)', fontWeight: 900, textTransform: 'uppercase',
                fontSize: 'var(--text-display-md)', color: '#fff', lineHeight: 0.98,
                letterSpacing: '-0.02em',
              }}>
                Mais do que um clube.<br />
                <em style={{ fontStyle: 'normal', color: 'var(--accent)' }}>Uma comunidade.</em>
              </h3>

              <p style={{ color: 'var(--navy-100)', fontSize: 'var(--text-base)', lineHeight: 1.6, maxWidth: '52ch', marginTop: 'var(--space-4)' }}>
                O Grupo Omatapalo apoia o desporto angolano através do Clube Desportivo da Huíla — formação de jovens atletas, paixão e orgulho regional dentro e fora das quatro linhas.
              </p>

              <div style={{ display: 'flex', gap: 'var(--space-7)', marginTop: 'var(--space-6)' }}>
                {[{ v: '+200', l: 'Atletas formados' }, { v: '5', l: 'Modalidades' }, { v: '1', l: 'Huíla no coração' }].map((s) => (
                  <div key={s.l}>
                    <div style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '40px', color: 'var(--accent)', lineHeight: 1, letterSpacing: '-0.02em' }}>{s.v}</div>
                    <div style={{ fontFamily: 'var(--font-label)', fontSize: '11px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--navy-200)', marginTop: '8px' }}>{s.l}</div>
                  </div>
                ))}
              </div>
            </div>

            <a href="/cdh" className="btn btn-accent" style={{ height: '56px', paddingInline: '30px', fontSize: 'var(--text-lg)', display: 'inline-flex', alignItems: 'center', gap: '10px', whiteSpace: 'nowrap' }}>
              Conhecer o CDH
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </a>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width:820px) { .cdh-inner { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
