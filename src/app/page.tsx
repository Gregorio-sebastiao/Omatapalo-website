import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import SobreGrupo from '@/components/SobreGrupo';
import Negocios from '@/components/Negocios';
import GrandesNumeros from '@/components/GrandesNumeros';
import Certificacoes from '@/components/Certificacoes';
import SustentabilidadeHome from '@/components/SustentabilidadeHome';
import Mundo from '@/components/Mundo';
import Media from '@/components/Media';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <SobreGrupo />
        <GrandesNumeros />
        <Negocios />
        <Certificacoes />
        <SustentabilidadeHome />
        <Mundo />
        <Media />
      </main>
      <Footer />
    </>
  );
}
