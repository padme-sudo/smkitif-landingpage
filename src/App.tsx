import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ProfilSekolah from './components/ProfilSekolah'

function App() {
  return (
    <>
      <Navbar />
      <main className="bg-cream" aria-label="Konten utama">
        <Hero />
        <ProfilSekolah />
      </main>
    </>
  )
}

export default App
