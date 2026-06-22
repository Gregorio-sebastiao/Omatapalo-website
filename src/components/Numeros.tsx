'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';

const STATS = [
  { value: 15000, prefix: '+', unit: '', label: 'Colaboradores', desc: 'Profissionais dedicados em Angola e em África', thousands: true, img: '/pessoa.jpg' },
  { value: 1.5, prefix: '+', unit: 'M m', label: 'Área Construída', desc: 'Edifícios residenciais, hospitalares e infraestruturas', decimals: 1, sup: true, img: '/centro-cultural-huambo-omatapalo.png' },
  { value: 5000, prefix: '+', unit: 'km', label: 'de Estrada', desc: 'Pavimentada e entregue em todo o território nacional', thousands: true, img: '/EN230-5.jpg' },
];

export default function Numeros() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    import('gsap').then(({ gsap }) => {
      import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger);
        if (!sectionRef.current) return;

        const head = sectionRef.current.querySelector('.num-head');
        if (head) {
          gsap.fromTo(head.querySelector('.num-fazemos'),
            { yPercent: 110, opacity: 0 },
            { yPercent: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
              scrollTrigger: { trigger: head, start: 'top 85%', once: true } }
          );
          gsap.fromTo(head.querySelector('.num-acontecer'),
            { yPercent: 110, opacity: 0 },
            { yPercent: 0, opacity: 1, duration: 0.9, ease: 'power3.out', delay: 0.18,
              scrollTrigger: { trigger: head, start: 'top 85%', once: true } }
          );
          gsap.fromTo(head.querySelector('.num-desc'),
            { opacity: 0, y: 16 },
            { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out', delay: 0.3,
              scrollTrigger: { trigger: head, start: 'top 85%', once: true } }
          );
        }

        sectionRef.current.querySelectorAll('.num-stat-row').forEach((row, i) => {
          gsap.fromTo(row,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', delay: i * 0.1,
              scrollTrigger: { trigger: row, start: 'top 88%', once: true } }
          );
        });

        sectionRef.current.querySelectorAll('[data-count]').forEach((el) => {
          const target = parseFloat(el.getAttribute('data-count') || '0');
          const isFloat = el.getAttribute('data-float') === '1';
          const span = el as HTMLElement;
          const proxy = { val: 0 };
          gsap.to(proxy, {
            val: target, duration: 2.2, ease: 'power2.out',
            scrollTrigger: { trigger: el, start: 'top 90%', once: true },
            onUpdate() {
              const isThousands = el.getAttribute('data-thousands') === '1';
              const raw = isFloat ? proxy.val.toFixed(1) : Math.round(proxy.val).toString();
              span.textContent = isThousands ? raw.replace(/\B(?=(\d{3})+(?!\d))/g, '.') : raw;
            },
          });
        });
      });
    });
  }, []);

  return (
    <section
      id="numeros"
      ref={sectionRef}
      style={{ background: '#F5F4F0', paddingTop: 'clamp(64px,8vh,100px)', paddingBottom: 'clamp(64px,8vh,100px)' }}
    >
      <div className="wrap">

        {/* Eyebrow */}
        <div className="eyebrow" style={{ justifyContent: 'flex-start', marginBottom: 'clamp(24px,3vh,40px)' }}>
          Os nossos números
        </div>


        {/* Stats list */}
        <div style={{ borderTop: '1px solid rgba(7,16,31,0.12)' }}>
          {STATS.map((s, i) => (
            <div
              key={s.label}
              className="num-stat-row"
              style={{
                position: 'relative',
                display: 'grid',
                gridTemplateColumns: '52px 1fr 240px',
                alignItems: 'center',
                gap: 'clamp(12px,2.5vw,40px)',
                padding: 'clamp(18px,3vh,30px) 0',
                borderBottom: '1px solid rgba(7,16,31,0.12)',
                opacity: 0,
                overflow: 'hidden',
                cursor: 'default',
              }}
            >
              {/* Hover background image */}
              <div className="num-row-bg" style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: `url(${(s as any).img})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                opacity: 0,
                transition: 'opacity 0.8s ease',
                zIndex: 0,
              }} />
              {/* Soft overlay */}
              <div className="num-row-overlay" style={{
                position: 'absolute',
                inset: 0,
                background: 'rgba(10,45,116,0.45)',
                opacity: 0,
                transition: 'opacity 0.8s ease',
                zIndex: 1,
              }} />

              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'rgba(7,16,31,0.28)', letterSpacing: '0.05em', position: 'relative', zIndex: 2, transition: 'color 0.3s' }} className="num-index">
                {String(i + 1).padStart(2, '0')}
              </span>

              <div className="num-value" style={{
                fontFamily: 'var(--font-display)', fontWeight: 900,
                fontSize: 'clamp(36px,5.5vw,80px)', lineHeight: 1,
                letterSpacing: '-0.03em',
                display: 'flex', alignItems: 'center', gap: '16px',
                position: 'relative', zIndex: 2,
              }}>
                {s.label === 'Colaboradores' && (
                  <Image src="/construction-worker-azul.svg" alt="" width={64} height={83} style={{ height: '0.7em', width: 'auto', flexShrink: 0 }} />
                )}
                {s.label === 'Área Construída' && (
                  <Image src="/area-azul.svg" alt="" width={146} height={146} style={{ height: '0.7em', width: 'auto', flexShrink: 0 }} />
                )}
                {s.label === 'de Estrada' && (
                  <Image src="/road-azul.svg" alt="" width={161} height={161} style={{ height: '0.7em', width: 'auto', flexShrink: 0 }} />
                )}
                {(s as any).prefix && (
                  <span className="num-affix" style={{ fontSize: '0.5em', fontFamily: 'var(--font-sans)', fontWeight: 400 }}>
                    {(s as any).prefix}
                  </span>
                )}
                <span
                  data-count={s.value}
                  data-float={s.decimals ? '1' : '0'}
                  data-thousands={(s as any).thousands ? '1' : '0'}
                >
                  {(s as any).thousands
                    ? s.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
                    : s.decimals ? s.value.toFixed(1) : s.value}
                </span>
                <span className="num-affix" style={{ fontSize: '0.5em', fontFamily: 'var(--font-sans)', fontWeight: 400 }}>
                  {s.unit}
                  {(s as any).sup && <sup style={{ fontSize: '0.75em' }}>2</sup>}
                </span>
              </div>

              <div style={{ textAlign: 'right', position: 'relative', zIndex: 2 }}>
                <div className="num-label" style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(14px,1.4vw,17px)' }}>
                  {s.label}
                </div>
                <div className="num-desc" style={{ fontFamily: 'var(--font-sans)', fontSize: '13px', lineHeight: 1.5, marginTop: '5px' }}>
                  {s.desc}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      <style>{`
        .num-stat-row:hover .num-row-bg { opacity: 0.18 !important; }
        .num-stat-row:hover .num-row-overlay { opacity: 0 !important; }
        .num-index { color: rgba(10,45,116,0.35); transition: color 0.4s; }
        .num-value { color: #0a2d74; transition: color 0.4s; }
        .num-affix { color: #0a2d74; transition: color 0.4s; }
        .num-label { color: #0a2d74; transition: color 0.4s; }
        .num-desc  { color: rgba(10,45,116,0.6); transition: color 0.4s; }
        @media (max-width:640px) {
          .num-stat-row { grid-template-columns: 32px 1fr !important; }
          .num-stat-row > :last-child { display: none; }
        }
      `}</style>
    </section>
  );
}
