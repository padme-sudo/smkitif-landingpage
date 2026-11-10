import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ProfilSekolah from './components/ProfilSekolah'
import SelayangPandang from './components/SelayangPandang'
import Jurusan from './components/Jurusan'
import MengapaKami from './components/MengapaKami'
import TestimoniAlumniMarquee from './components/ui/marquee-03'
import Berita from './components/Berita'
import AcademyPartner from './components/AcademyPartner'
import Footer from './components/Footer'

function App() {
  return (
    <>
      <Navbar />
      <main className="bg-cream" aria-label="Konten utama">
        <Hero />
        <ProfilSekolah />
        <SelayangPandang />
        <Jurusan />
        <MengapaKami />
        <TestimoniAlumniMarquee />
        <Berita />
        <AcademyPartner />
      </main>
      <Footer />
    </>
  )
}

export default App
