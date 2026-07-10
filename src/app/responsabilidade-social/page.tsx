import Nav from '@/components/Nav';
import ResponsabilidadeSocialContent from '@/components/ResponsabilidadeSocialContent';
import PactoGlobalIntro from '@/components/PactoGlobalIntro';
import PactoGlobal from '@/components/PactoGlobal';
import OdsIntro from '@/components/OdsIntro';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';

export default function ResponsabilidadeSocial() {
  return (
    <>
      <Nav />
      <main>
        <PageHero page="responsabilidade-social" title="Responsabilidade Social" imgSrc="/DSC_0030.jpg" position="center" eyebrow="Grupo Omatapalo · Missão Fazer Sorrir" outlineWord="Social" imgOpacity={0.45} />
        <PactoGlobalIntro />
        <PactoGlobal />
        <OdsIntro />
        <ResponsabilidadeSocialContent />
      </main>
      <Footer />
    </>
  );
}

