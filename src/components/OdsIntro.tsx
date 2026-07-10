'use client';

const ODS_GOALS = [
  { num: 1, label: 'ERRADICAR\nA POBREZA', color: '#E5243B', icon: '👨‍👩‍👧‍👦' },
  { num: 2, label: 'ERRADICAR\nA FOME', color: '#DDA63A', icon: '🌾' },
  { num: 3, label: 'SAÚDE\nDE QUALIDADE', color: '#4C9F38', icon: '❤️' },
  { num: 4, label: 'EDUCAÇÃO\nDE QUALIDADE', color: '#C5192D', icon: '📖' },
];

export default function OdsIntro() {
  return (
    <section style={{ background: '#f6f8fb', padding: 'clamp(48px,7vh,80px) 0' }}>
      <div className="wrap">
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 'clamp(32px,5vw,72px)',
          alignItems: 'center',
        }} className="ods-intro-grid">

          {/* Esquerda: logo + texto + lista */}
          <div>
            <h2 style={{
              fontFamily: 'var(--font-display)', fontWeight: 900,
              fontSize: 'clamp(1.4rem,2.5vw,2rem)',
              color: '#1a396e', letterSpacing: '-0.02em', lineHeight: 1.1,
              margin: '0 0 24px',
            }}>
              Objectivos de Desenvolvimento Sustentável (ODS)
            </h2>
            <div style={{ marginBottom: 28, textAlign: 'center' }}>
              <img
                src="/ods-logo.png"
                alt="Objectivos de Desenvolvimento Sustentável"
                style={{ maxWidth: 260, width: '100%' }}
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
              />
            </div>
            <p style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(14px,1.1vw,16px)',
              color: '#1e293b',
              lineHeight: 1.8,
              margin: '0 0 20px',
            }}>
              A actuação do Grupo assenta numa abordagem estruturada e alinhada com os Objectivos de Desenvolvimento Sustentável (ODS) das Nações Unidas, orientada por quatro pilares estratégicos:
            </p>
            <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
              {['Erradicar a pobreza', 'Combater a fome e Agricultura Sustentável', 'Promover a saúde e Bem-Estar', 'Educação de qualidade'].map((item) => (
                <li key={item} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <svg width="8" height="8" viewBox="0 0 8 8" fill="none" style={{ flexShrink: 0, marginTop: 6 }}>
                    <rect width="8" height="8" fill="#1a396e" />
                  </svg>
                  <span style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(13px,1vw,15px)', color: '#1e293b', lineHeight: 1.6 }}>
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Direita: 4 cartões ODS */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 10,
          }}>
            {ODS_GOALS.map((g) => (
              <div key={g.num} style={{
                background: g.color,
                borderRadius: 4,
                padding: '16px 14px',
                aspectRatio: '1',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}>
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 900,
                  fontSize: 'clamp(11px,1.2vw,14px)',
                  color: '#fff',
                  lineHeight: 1.2,
                  whiteSpace: 'pre-line',
                }}>
                  <span style={{ fontSize: 'clamp(18px,2vw,24px)', display: 'block', marginBottom: 4 }}>{g.num}</span>
                  {g.label}
                </div>
                <div style={{ fontSize: 'clamp(24px,3vw,40px)', textAlign: 'right' }}>{g.icon}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 700px) { .ods-intro-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
