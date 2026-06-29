import Nav from '@/components/Nav';
import Pessoas from '@/components/Pessoas';
import Testemunhos from '@/components/Testemunhos';
import Academia from '@/components/Academia';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';

export default function PessoasPage() {
  return (
    <>
      <Nav />
      <main>
        <PageHero page="pessoas" title="As nossas Pessoas" imgSrc="/COLABORADORES ARMAZÉM (53) 1 (1).JPG" position="center" eyebrow="Grupo Omatapalo Â· +15 000 Colaboradores" outlineWord="Pessoas" imgOpacity={0.45} />
        <Pessoas />
        <Testemunhos />
        <Academia />
      </main>
      <Footer />
    </>
  );
}

