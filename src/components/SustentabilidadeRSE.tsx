'use client';

import { useEffect, useRef } from 'react';

const STATS = [
  { v: '30+', l: 'Anos de impacto' },
  { v: '12', l: 'Projectos activos' },
  { v: '5k+', l: 'Vidas transformadas' },
];

export default function SustentabilidadeRSE() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    import('gsap').then(({ gsap }) => {
      import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger);
        if (!sectionRef.current) return;

        const tl = gsap.timeline({
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true },
        });

        tl.fromTo('.rse2-line',
          { scaleX: 0 },
          { scaleX: 1, duration: 1, ease: 'power3.inOut', transformOrigin: 'left' })
          .fromTo('.rse2-label',
            { opacity: 0, x: -20 },
            { opacity: 1, x: 0, duration: 0.5, ease: 'power2.out' }, '-=0.4')
          .fromTo('.rse2-title .word',
            { opacity: 0, y: 60, skewY: 4 },
            { opacity: 1, y: 0, skewY: 0, duration: 0.7, ease: 'power3.out', stagger: 0.12 }, '-=0.2')
          .fromTo('.rse2-quote',
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }, '-=0.3')
          .fromTo('.rse2-stat',
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out', stagger: 0.1 }, '-=0.4')
          .fromTo('.rse2-video-wrap',
            { opacity: 0, x: 50, scale: 0.97 },
            { opacity: 1, x: 0, scale: 1, duration: 0.9, ease: 'power3.out' }, '-=0.8');

        // geometric accent line parallax
        gsap.to('.rse2-accent', {
          yPercent: -30,
          ease: 'none',
          scrollTrigger: { trigger: sectionRef.current, start: 'top bottom', end: 'bottom top', scrub: true },
        });
      });
    });
  }, []);

  const titleWords = ['A Sustentabilidade', 'e Responsabilidade', 'Social'];

  return (
    <section
      ref={sectionRef}
      style={{ background: 'var(--navy-950)', overflow: 'hidden', position: 'relative', padding: 'clamp(80px,10vw,140px) 0' }}
    >
      {/* Geometric accent */}
      <div className="rse2-accent" style={{
        position: 'absolute', top: '-60px', right: '-40px',
        width: '480px', height: '480px', borderRadius: '50%',
        border: '1.5px solid rgba(255,255,255,0.04)',
        pointerEvents: 'none',
      }} />
      <div className="rse2-accent" style={{
        position: 'absolute', bottom: '-80px', right: '60px',
        width: '280px', height: '280px', borderRadius: '50%',
        border: '1.5px solid rgba(255,255,255,0.06)',
        pointerEvents: 'none',
      }} />

      <div className="wrap">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(40px,6vw,96px)', alignItems: 'center' }}>

          {/* Left: text */}
          <div>
            {/* Label */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '28px' }}>
              <span className="rse2-line" style={{ display: 'block', width: '32px', height: '2px', background: 'var(--navy-400)', flexShrink: 0 }} />
              <span className="rse2-label" style={{
                fontFamily: 'var(--font-label)', fontSize: '11px', letterSpacing: '0.2em',
                textTransform: 'uppercase', color: 'var(--navy-300)', opacity: 0,
              }}>
                Sustentabilidade & RSE
              </span>
            </div>

            {/* Title words with overflow clip */}
            <h2 className="rse2-title" style={{
              fontFamily: 'var(--font-display)', fontWeight: 900, textTransform: 'uppercase',
              fontSize: 'clamp(2rem, 3.8vw, 3.4rem)', lineHeight: 0.95,
              letterSpacing: '-0.03em', color: '#fff', marginBottom: '36px',
            }}>
              {titleWords.map((w, i) => (
                <span key={i} style={{ display: 'block', overflow: 'hidden' }}>
                  <span className="word" style={{ display: 'block', opacity: 0,
                    color: i === 1 ? 'var(--navy-300)' : '#fff' }}>
                    {w}
                  </span>
                </span>
              ))}
            </h2>

            {/* Quote */}
            <blockquote className="rse2-quote" style={{
              paddingLeft: '20px', margin: '0 0 40px',
              opacity: 0,
            }}>
              <p style={{
                fontFamily: 'var(--font-body)', fontSize: 'clamp(0.95rem, 1.4vw, 1.1rem)',
                lineHeight: 1.75, color: 'var(--navy-200)', fontStyle: 'italic', margin: 0,
              }}>
                "Para nós, a responsabilidade social começa na nossa casa e nas condições que damos aos nossos Colaboradores. É nesta matriz e nesta filosofia que assenta a nossa capacidade de fazer acontecer."
              </p>
              <footer style={{
                marginTop: '12px',
                fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '13px',
                letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--navy-400)',
              }}>
                — Grupo Omatapalo
              </footer>
            </blockquote>

            {/* Stats */}
            <div style={{ display: 'flex', gap: 'clamp(24px,4vw,48px)' }}>
              {STATS.map((s) => (
                <div key={s.l} className="rse2-stat" style={{ opacity: 0 }}>
                  <div style={{
                    fontFamily: 'var(--font-display)', fontWeight: 900,
                    fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', color: 'var(--navy-300)',
                    lineHeight: 1, letterSpacing: '-0.02em',
                  }}>
                    {s.v}
                  </div>
                  <div style={{
                    fontFamily: 'var(--font-label)', fontSize: '10px', letterSpacing: '0.14em',
                    textTransform: 'uppercase', color: 'var(--navy-500)', marginTop: '6px',
                  }}>
                    {s.l}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: video */}
          <div className="rse2-video-wrap" style={{ opacity: 0 }}>
            <div style={{
              position: 'relative',
              paddingBottom: '56.25%', height: 0, overflow: 'hidden',
              borderRadius: 'var(--radius-lg)',
              boxShadow: '0 32px 80px rgba(0,0,0,0.55)',
            }}>
              <iframe
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
                src="https://www.youtube.com/embed/kuVu9thTbIM?rel=0&modestbranding=1"
                title="A Sustentabilidade e Responsabilidade Social na Omatapalo"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            {/* Decorative tag below video */}
            <div style={{
              marginTop: '20px', display: 'flex', alignItems: 'center', gap: '10px',
              justifyContent: 'flex-end',
            }}>
              <span style={{
                fontFamily: 'var(--font-label)', fontSize: '10px', letterSpacing: '0.18em',
                textTransform: 'uppercase', color: 'var(--navy-500)',
              }}>
                Grupo Omatapalo · 2026
              </span>
              <span style={{ width: '24px', height: '1px', background: 'var(--navy-500)' }} />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 820px) {
          .rse2-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
