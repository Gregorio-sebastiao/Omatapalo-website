'use client';

const PILLARS = [
  {
    title: 'Direitos Humanos',
    items: [
      'As empresas devem apoiar e respeitar a protecção dos direitos humanos, reconhecidos internacionalmente;',
      'Garantir a sua não participação em violações dos direitos humanos.',
    ],
  },
  {
    title: 'Práticas Laborais',
    items: [
      'As empresas devem apoiar a liberdade de associação e o reconhecimento efectivo à negociação colectiva;',
      'A abolição de todas as formas de trabalho forçado e obrigatório;',
      'Abolição efectiva do trabalho infantil;',
      'Eliminação da discriminação no emprego.',
    ],
  },
  {
    title: 'Protecção Ambiental',
    items: [
      'As empresas devem apoiar uma abordagem preventiva aos desafios ambientais;',
      'Realizar iniciativas para promover a responsabilidade ambiental;',
      'Encorajar o desenvolvimento e a difusão de tecnologias amigas do ambiente.',
    ],
  },
  {
    title: 'Combate à Corrupção',
    items: [
      'As empresas devem combater a corrupção em todas as suas formas, incluindo extorsão e suborno.',
    ],
  },
];

export default function PactoGlobal() {
  return (
    <section style={{ background: '#fff', padding: 'clamp(24px,3vh,40px) 0 clamp(64px,8vh,100px)' }}>
      <div className="wrap">

        {/* Subtitle banner */}
        <div style={{
          background: '#0F1A2E', color: '#fff',
          borderRadius: 4, padding: '16px 24px',
          fontFamily: 'var(--font-sans)', fontSize: 'clamp(13px,1.1vw,15px)',
          lineHeight: 1.6, textAlign: 'center',
          marginBottom: 32,
        }}>
          O Grupo Omatapalo adopta 10 princípios relacionados com direitos humanos, trabalho, ambiente e combate à corrupção, devendo reportar sobre o seu progresso com regularidade anual.
        </div>

        {/* 4 pillars */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4,1fr)',
          gap: 16,
        }} className="pacto-grid">
          {PILLARS.map((pillar) => (
            <div key={pillar.title} style={{
              border: '1.5px solid #1a396e',
              borderRadius: 4,
              padding: '20px 18px',
            }}>
              <div style={{
                fontFamily: 'var(--font-display)', fontWeight: 900,
                fontSize: '15px', color: '#1a396e',
                letterSpacing: '-0.01em', marginBottom: 16,
                textTransform: 'uppercase',
              }}>
                {pillar.title}
              </div>
              <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
                {pillar.items.map((item, i) => (
                  <li key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, marginTop: 2 }}>
                      <circle cx="8" cy="8" r="7.5" fill="#1a396e"/>
                      <polyline points="4.5,8 7,10.5 11.5,5.5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                    </svg>
                    <span style={{ fontFamily: 'var(--font-sans)', fontSize: '13px', color: '#1e293b', lineHeight: 1.55 }}>
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) { .pacto-grid { grid-template-columns: repeat(2,1fr) !important; } }
        @media (max-width: 540px) { .pacto-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
