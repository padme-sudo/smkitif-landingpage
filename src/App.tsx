import Navbar from './components/Navbar'
import Hero from './components/Hero'
import SambutanKepalaSekolah from './components/SambutanKepalaSekolah'

function App() {
  return (
    <>
      <Navbar />
      <main className="bg-cream" aria-label="Konten utama">
        <Hero />
        <SambutanKepalaSekolah />
      </main>
    </>
  )
}

export default App
