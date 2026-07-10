'use client';

export default function PactoGlobalIntro() {
  return (
    <section style={{ background: '#fff', padding: 'clamp(64px,8vh,100px) 0 clamp(24px,3vh,40px)' }}>
      <div className="wrap">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 'clamp(40px,6vw,80px)', alignItems: 'start' }} className="pacto-intro-grid">

          {/* Texto */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><rect width="10" height="10" fill="#1a396e" /></svg>
              <span style={{ fontFamily: 'var(--font-label)', fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#1a396e' }}>
                Responsabilidade Social · Grupo Omatapalo
              </span>
            </div>
            <h2 style={{
              fontFamily: 'var(--font-display)', fontWeight: 900,
              fontSize: 'clamp(1.5rem,3vw,2.4rem)',
              color: '#0F1A2E', letterSpacing: '-0.03em', lineHeight: 1.05,
              textTransform: 'uppercase', margin: '0 0 32px',
            }}>
              Compromisso com o Pacto Global das Nações Unidas
            </h2>

            <p style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(15px,1.15vw,17px)', color: '#1e293b', lineHeight: 1.8, margin: '0 0 20px' }}>
              Em 2024, a Responsabilidade Social assumiu um papel particularmente relevante na história do Grupo Omatapalo, com a adesão, em Fevereiro, ao <strong>Pacto Global das Nações Unidas</strong>, a maior iniciativa mundial de sustentabilidade corporativa.
            </p>

            <p style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(15px,1.15vw,17px)', color: '#1e293b', lineHeight: 1.8, margin: '0 0 20px' }}>
              Com esta adesão, o Grupo Omatapalo tornou-se a <strong>primeira empresa angolana do sector da Construção</strong> a integrar esta iniciativa das <strong>Nações Unidas</strong>, que reúne mais de 24.000 empresas em 167 países, bem como organizações da sociedade civil, sindicatos, entidades públicas e agências da ONU.
            </p>

            <p style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(15px,1.15vw,17px)', color: '#1e293b', lineHeight: 1.8, margin: 0 }}>
              Ao integrar o Pacto Global, o Grupo assume o compromisso de alinhar a sua estratégia, operações e cultura organizacional com <strong>dez princípios universais</strong> nas áreas dos direitos humanos, trabalho, ambiente e combate à corrupção, bem como de contribuir activamente para o cumprimento dos <strong>Objectivos de Desenvolvimento Sustentável (ODS)</strong> da Agenda 2030, reportando anualmente o progresso da sua actuação.
            </p>
          </div>

          {/* Logo + link */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, flexShrink: 0, minWidth: 180 }}>
            <img
              src="/un-global-compact.png"
              alt="UN Global Compact"
              style={{ width: 180, borderRadius: 4, display: 'block' }}
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
            />
            <a
              href="https://unglobalcompact.org"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: 'var(--font-sans)', fontSize: '13px',
                color: '#1a396e', textDecoration: 'underline',
                textUnderlineOffset: 3,
              }}
            >
              Saber mais sobre o Global Compact
            </a>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 700px) { .pacto-intro-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
