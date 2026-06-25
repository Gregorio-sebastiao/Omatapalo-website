import Nav from '@/components/Nav';
import PortefolioDinamico from '@/components/PortefolioDinamico';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';

export default function PortefolioPage() {
  return (
    <>
      <Nav />
      <main>
        <PageHero page="portefolio" title="PortefÃ³lio de Obras" imgSrc="/COMPLEXO HOSPITALAR DOENÃ‡AS CARDIO-PULMONARES CARDEAL D. ALEXANDRE DO NASCIMENTO (2).JPG" position="center" eyebrow="Grupo Omatapalo Â· Desde 2003" outlineWord="Obras" imgOpacity={0.45} />
        <PortefolioDinamico />
      </main>
      <Footer />
    </>
  );
}

