'use client';

export default function InvestimentoSocial() {
  return (
    <section style={{ background: '#fff', padding: 'clamp(48px,7vh,80px) 0' }}>
      <div className="wrap">

        <h2 style={{
          fontFamily: 'var(--font-display)', fontWeight: 900,
          fontSize: 'clamp(1.4rem,2.5vw,2rem)',
          color: '#1a396e', letterSpacing: '-0.02em', lineHeight: 1.1,
          margin: '0 0 32px',
        }}>
          Investimento Social
        </h2>

        {/* Banner */}
        <div style={{
          background: '#0F1A2E', color: '#fff',
          borderRadius: 4, padding: '16px 24px',
          fontFamily: 'var(--font-sans)', fontSize: 'clamp(14px,1.1vw,16px)',
          lineHeight: 1.6, marginBottom: 40,
        }}>
          Compromisso Financeiro com o Desenvolvimento Social
        </div>

        {/* Texto */}
        <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(14px,1vw,15px)', color: '#1e293b', margin: '0 0 16px' }}>
          Consistente e Crescente
        </p>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(14px,1.1vw,16px)', color: '#1e293b', lineHeight: 1.8, margin: '0 0 16px' }}>
          O Grupo Omatapalo mantém um investimento contínuo em Responsabilidade Social, reforçando anualmente o seu compromisso com as comunidades angolanas.
        </p>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(14px,1.1vw,16px)', color: '#1e293b', lineHeight: 1.8, margin: '0 0 16px' }}>
          Este investimento tem sido aplicado em dezenas de iniciativas nas áreas da saúde, nutrição, educação, habitação, apoio à infância, desporto e desenvolvimento rural.
        </p>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(14px,1.1vw,16px)', color: '#1e293b', lineHeight: 1.8, margin: '0 0 16px' }}>
          Este compromisso financeiro reflecte não apenas a dimensão do envolvimento social do Grupo, mas também a convicção de que o crescimento económico deve caminhar lado a lado com o bem-estar colectivo e a coesão social.
        </p>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(14px,1.1vw,16px)', color: '#1e293b', lineHeight: 1.8, margin: '0 0 40px' }}>
          A Responsabilidade Social é, assim, um eixo estratégico transversal a todas as áreas e geografias onde o Grupo Omatapalo está presente.
        </p>

        {/* Dois cartões */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }} className="investimento-cards">
          {/* Cartão esquerdo */}
          <div style={{
            background: '#1a396e', color: '#fff',
            borderRadius: 16, padding: 'clamp(28px,4vw,48px)',
            textAlign: 'center',
          }}>
            <p style={{ fontFamily: 'var(--font-label)', fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', margin: '0 0 20px', opacity: 0.85 }}>
              Investimento Total em Responsabilidade Social
            </p>
            <p style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 'clamp(2rem,4vw,3.2rem)', margin: '0 0 20px', lineHeight: 1 }}>
              930 <span style={{ fontSize: 'clamp(1rem,2vw,1.5rem)', fontWeight: 700 }}>Milhões Kz</span>
            </p>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(13px,1vw,15px)', lineHeight: 1.7, opacity: 0.9, margin: 0 }}>
              Recursos canalizados para dezenas de iniciativas que abrangem desde a assistência médica e nutricional à educação, habitação, apoio à infância, desporto e desenvolvimento rural.
            </p>
          </div>

          {/* Cartão direito */}
          <div style={{
            background: '#4a6fa5', color: '#fff',
            borderRadius: 16, padding: 'clamp(28px,4vw,48px)',
            textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16,
          }}>
            <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
              <circle cx="28" cy="16" r="8" stroke="#fff" strokeWidth="2" fill="none"/>
              <circle cx="12" cy="40" r="7" stroke="#fff" strokeWidth="2" fill="none"/>
              <circle cx="44" cy="40" r="7" stroke="#fff" strokeWidth="2" fill="none"/>
              <line x1="20" y1="22" x2="14" y2="33" stroke="#fff" strokeWidth="1.5"/>
              <line x1="36" y1="22" x2="42" y2="33" stroke="#fff" strokeWidth="1.5"/>
              <line x1="19" y1="40" x2="37" y2="40" stroke="#fff" strokeWidth="1.5"/>
            </svg>
            <p style={{ fontFamily: 'var(--font-label)', fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', margin: 0, opacity: 0.85 }}>
              Pessoas Impactadas
            </p>
            <p style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 'clamp(2rem,4vw,3rem)', margin: 0, lineHeight: 1 }}>
              +90.000
            </p>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(13px,1vw,15px)', margin: 0, opacity: 0.9 }}>
              em todo o território nacional
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) { .investimento-cards { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
