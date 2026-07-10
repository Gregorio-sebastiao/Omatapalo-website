import Nav from '@/components/Nav';
import MissaoFazerSorrir from '@/components/MissaoFazerSorrir';
import PactoGlobal from '@/components/PactoGlobal';
import Footer from '@/components/Footer';

export default function MissaoFazerSorrirPage() {
  return (
    <>
      <Nav />
      <main>
        <PactoGlobal />
        <MissaoFazerSorrir />
      </main>
      <Footer />
    </>
  );
}
