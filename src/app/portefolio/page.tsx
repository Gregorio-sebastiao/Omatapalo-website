import Nav from '@/components/Nav';
import PortefolioDinamico from '@/components/PortefolioDinamico';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';

export default function PortefolioPage() {
  return (
    <>
      <Nav />
      <main>
        <PageHero title="Portefólio de Obras" imgSrc="/EN-230-omatapalo-2.jpg" position="center" eyebrow="Grupo Omatapalo · Desde 2003" outlineWord="Obras" />
        <PortefolioDinamico />
      </main>
      <Footer />
    </>
  );
}
