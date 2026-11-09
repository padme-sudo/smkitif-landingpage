import Navbar from './components/Navbar'
import Hero from './components/Hero'

function App() {
  return (
    <>
      <Navbar />
      <main className="bg-cream" aria-label="Konten utama">
        <Hero />
      </main>
    </>
  )
}

export default App
