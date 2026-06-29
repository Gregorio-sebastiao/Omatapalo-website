import Nav from '@/components/Nav';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';

export default function ContactosPage() {
  return (
    <>
      <Nav />
      <main>
        <PageHero page="contactos" title="Contactos" imgSrc="/Omatapalo frente.JPG" position="center top" imgOpacity={0.45} />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

