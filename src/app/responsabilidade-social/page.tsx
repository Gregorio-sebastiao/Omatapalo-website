import Nav from '@/components/Nav';
import ResponsabilidadeSocialContent from '@/components/ResponsabilidadeSocialContent';
import PactoGlobalIntro from '@/components/PactoGlobalIntro';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';

export default function ResponsabilidadeSocial() {
  return (
    <>
      <Nav />
      <main>
        <PageHero page="responsabilidade-social" title="Responsabilidade Social" imgSrc="/DSC_0030.jpg" position="center" eyebrow="Grupo Omatapalo · Missão Fazer Sorrir" outlineWord="Social" imgOpacity={0.45} />
        <div style={{ background: '#fff', borderBottom: '1px solid #e2e8f0', padding: '14px 0' }}>
          <div className="wrap" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ width: 10, height: 10, background: '#1a396e', display: 'inline-block', flexShrink: 0 }} />
            <span style={{ fontFamily: 'var(--font-label)', fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#1a396e' }}>
              Responsabilidade Social · Grupo Omatapalo
            </span>
          </div>
        </div>
        <PactoGlobalIntro />
        <ResponsabilidadeSocialContent />
      </main>
      <Footer />
    </>
  );
}

