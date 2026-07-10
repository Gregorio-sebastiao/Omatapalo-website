'use client';

const STATS = [
  { value: '+150.000', label: 'Merendas Escolares', sub: 'Distribuídas por ano' },
  { value: '14.356.000', label: 'Toneladas de Alimentos', sub: 'Campanhas Banco Alimentar Angola' },
  { value: '150 hectares', label: 'Cultivo Comunitário Apoiado', sub: 'Fazenda Mumba' },
  { value: '+600.000', label: 'Refeições Doadas', sub: 'Sopas Solidárias' },
  { value: '200.000', label: 'Famílias Apoiadas', sub: 'Distribuição água potável' },
  { value: '+1.000 hectares', label: 'Regadio Sustentável', sub: 'Fazenda Mumba' },
  { value: '10 toneladas', label: 'Alimentos Doados', sub: 'Luta Contra a Seca' },
  { value: '+600', label: 'Crianças Assistidas', sub: 'Anualmente em Campanhas Médicas' },
  { value: '30.000', label: 'Refeições Mensais', sub: 'Cozinhas Comunitárias Cáritas Angola' },
  { value: '+700', label: 'Empregos Directos', sub: 'Gerados em projectos de agricultura sustentável' },
  { value: '120', label: 'Cirurgias Pediátricas', sub: 'Projecto Sonho Renovado' },
];

export default function ResultadosConcretos() {
  return (
    <section style={{ background: '#fff', padding: 'clamp(48px,7vh,80px) 0' }}>
      <div className="wrap">

        <h2 style={{
          fontFamily: 'var(--font-display)', fontWeight: 900,
          fontSize: 'clamp(1.4rem,2.5vw,2rem)',
          color: '#1a396e', letterSpacing: '-0.02em', lineHeight: 1.1,
          margin: '0 0 28px',
        }}>
          Resultados Concretos e Mensuráveis
        </h2>

        {/* Banner */}
        <div style={{
          background: '#0F1A2E', color: '#fff',
          borderRadius: 4, padding: '16px 24px',
          fontFamily: 'var(--font-sans)', fontSize: 'clamp(13px,1vw,15px)',
          lineHeight: 1.7, textAlign: 'center', marginBottom: 40,
        }}>
          O compromisso do Grupo Omatapalo traduz-se em acções com impacto real<br />
          Esses são os números que demonstram a nossa consistência e escala de intervenção
        </div>

        {/* Grid de cartões */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 16,
        }} className="resultados-grid">
          {STATS.map((s, i) => (
            <div key={i} style={{
              background: '#f6f8fb',
              borderRadius: 8,
              padding: '20px 20px 20px 24px',
              borderLeft: '4px solid #1a396e',
            }}>
              <p style={{
                fontFamily: 'var(--font-display)', fontWeight: 900,
                fontSize: 'clamp(1.2rem,1.8vw,1.6rem)',
                color: '#1a396e', margin: '0 0 4px', lineHeight: 1.1,
              }}>
                {s.value}
              </p>
              <p style={{
                fontFamily: 'var(--font-sans)', fontWeight: 700,
                fontSize: 'clamp(13px,1vw,14px)', color: '#0F1A2E',
                margin: '0 0 4px',
              }}>
                {s.label}
              </p>
              <p style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'clamp(11px,0.85vw,13px)', color: '#64748b',
                margin: 0, lineHeight: 1.4,
              }}>
                {s.sub}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 800px) { .resultados-grid { grid-template-columns: repeat(2,1fr) !important; } }
        @media (max-width: 500px) { .resultados-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
