import Nav from '@/components/Nav';
import CDH from '@/components/CDH';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';

export default function CDHPage() {
  return (
    <>
      <Nav />
      <main>
        <PageHero page="cdh" title="Clube Desportivo da Huíla" imgSrc="/cdh-treino-3.jpg" position="center" imgOpacity={0.45} />
        <CDH />
      </main>
      <Footer />
    </>
  );
}

