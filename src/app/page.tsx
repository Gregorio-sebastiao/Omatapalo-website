import Nav from '@/components/Nav';
import GeoScrollLines from '@/components/GeoScrollLines';
import Hero from '@/components/Hero';
import FazemosAcontecer from '@/components/FazemosAcontecer';
import OQueProduzimos from '@/components/OQueProduzimos';
import News from '@/components/News';
import ParaOndeVamos from '@/components/ParaOndeVamos';
import ConstruimosFuturo from '@/components/ConstruimosFuturo';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main>
      <GeoScrollLines />
      <Nav />
      <Hero />
      <FazemosAcontecer />
      <OQueProduzimos />
      <News />
      <ParaOndeVamos />
      <ConstruimosFuturo />
      <Footer />
    </main>
  );
}
