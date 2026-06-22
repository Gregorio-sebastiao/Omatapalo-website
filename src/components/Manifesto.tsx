'use client';

import { useReveal } from './useReveal';

export default function Manifesto() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <section id="grupo" className="section" style={{ paddingBlock: 'clamp(4rem,7vw,7rem)' }}>
      <div className="wrap" ref={ref}>
        <div className="eyebrow">O Grupo Omatapalo</div>
        <div
          className="manifesto-row"
          style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 'var(--space-9)', alignItems: 'end', marginTop: 'var(--space-7)' }}
        >
          <h2 style={{
            fontFamily: 'var(--font-display)', fontWeight: 900, textTransform: 'uppercase',
            letterSpacing: '-0.015em', lineHeight: 1.04,
            fontSize: 'var(--text-display-lg)', color: 'var(--text-strong)', maxWidth: '16ch', margin: 0,
          }}>
            Mais de três décadas a{' '}
            <em style={{ fontStyle: 'normal', color: 'var(--brand)' }}>construir Angola</em>.
          </h2>
          <p style={{ fontSize: 'var(--text-lg)', lineHeight: 1.65, color: 'var(--text-body)' }}>
            Das estradas que ligam províncias aos hospitais que salvam vidas — somos um grupo angolano de engenharia e construção, com braços operacionais na agroindústria, imobiliário, energia, hotelaria e indústria. Fazemos acontecer.
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width:880px) {
          .manifesto-row { grid-template-columns: 1fr !important; gap: var(--space-6) !important; }
        }
      `}</style>
    </section>
  );
}
