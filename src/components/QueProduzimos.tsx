'use client';

import { useEffect, useRef } from 'react';

const ITEMS = [
  { value: 55, label: 'Estaleiros de Obras Activos' },
  { value: 9,  label: 'Centrais de Betão' },
  { value: 3,  label: 'Pedreiras de Produção de Cubo' },
  { value: 1,  label: 'Fábrica de Condutas' },
  { value: 3,  label: 'Fábricas de Cubo' },
  { value: 2,  label: 'Laboratórios de Ensaio de Materiais de Construção' },
  { value: 7,  label: 'Centrais de Betuminosos' },
  { value: 6,  label: 'Fábricas de Artefactos de Cimento' },
  { value: 2,  label: 'Indústrias de Metalomecânica' },
  { value: 2,  label: 'Indústrias de Carpintaria' },
];

export default function QueProduzimos() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    import('gsap').then(({ gsap }) => {
      import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger);
        if (!sectionRef.current) return;

        gsap.fromTo(sectionRef.current.querySelector('.qp-head'),
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 85%', once: true } }
        );

        gsap.fromTo(Array.from(sectionRef.current.querySelectorAll('.qp-item')),
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out', stagger: 0.07,
            scrollTrigger: { trigger: sectionRef.current, start: 'top 78%', once: true } }
        );

        sectionRef.current.querySelectorAll('[data-count]').forEach((el) => {
          const target = parseFloat(el.getAttribute('data-count') || '0');
          const span = el as HTMLElement;
          const proxy = { val: 0 };
          gsap.to(proxy, {
            val: target, duration: 2, ease: 'power2.out',
            scrollTrigger: { trigger: el, start: 'top 90%', once: true },
            onUpdate() { span.textContent = Math.round(proxy.val).toString(); },
          });
        });
      });
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      id="que-produzimos"
      style={{ background: '#1A3A8F', paddingTop: 'clamp(56px,8vh,96px)', paddingBottom: 'clamp(56px,8vh,96px)' }}
    >
      <div className="wrap">
        <div className="qp-head" style={{ textAlign: 'center', maxWidth: '760px', margin: '0 auto clamp(40px,6vh,72px)', opacity: 0 }}>
          <h2 style={{
            fontFamily: 'var(--font-display)', fontWeight: 900,
            fontSize: 'clamp(28px,4vw,48px)', color: '#fff',
            letterSpacing: '-0.02em', marginBottom: 'clamp(16px,2vh,28px)',
          }}>
            O Que Produzimos
          </h2>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(14px,1.4vw,16px)', color: '#fff', lineHeight: 1.7 }}>
            Os Centros Industriais desenvolvem-se em torno da exploração de Pedreiras, actividade transformadora de Cubos de Granito, Centrais de Betão Hidráulico e Betuminoso, na pré-fabricação de Artefactos de Cimento e na Fábrica de Condutas.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gap: 'clamp(32px,5vh,56px) clamp(16px,2vw,24px)',
        }}>
          {ITEMS.map((item) => (
            <div
              key={item.label}
              className="qp-item"
              style={{ opacity: 0, textAlign: 'center' }}
            >
              <div style={{
                fontFamily: 'var(--font-display)', fontWeight: 900,
                fontSize: 'clamp(32px,4.5vw,64px)', color: '#fff',
                letterSpacing: '-0.02em', lineHeight: 1,
                marginBottom: '12px',
              }}>
                <span data-count={item.value}>{item.value}</span>
              </div>
              <div style={{
                fontFamily: 'var(--font-sans)', fontSize: 'clamp(12px,1.1vw,14px)',
                color: '#fff', lineHeight: 1.5,
              }}>
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width:860px){#que-produzimos .wrap>div:last-child{grid-template-columns:repeat(3,1fr)!important}}
        @media (max-width:520px){#que-produzimos .wrap>div:last-child{grid-template-columns:repeat(2,1fr)!important}}
      `}</style>
    </section>
  );
}
