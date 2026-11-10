import { useRef } from 'react'
import { Quote } from 'lucide-react'
import { useReveal } from '@/lib/useReveal'

const testimoni = [
  {
    quote:
      'Kalau kalian mencari fasilitas mewah, kamu salah tempat. Tapi kalau kalian mencari kualitas, ayok bersama di SMKIT Ihsanul Fikri wujudkan mimpi itu.',
    name: 'Zaki Tirta',
    role: 'Markaz Qur’an',
  },
  {
    quote:
      'Di sekolah ini, potensi diri semakin meningkat. Saya sangat bersyukur bisa sekolah di lembaga pendidikan berkualitas, mengajarkan kreatifitas, dan dibekali ilmu agama.',
    name: 'Dirgantara Putra U',
    role: 'PT Krisbow Indonesia · Universitas Pamulang',
  },
  {
    quote:
      'Disini kami diajarkan makna sebuah kesederhanaan, kemandirian, dan perjuangan. Dengan hal itulah kami dapat belajar untuk menjadi besar. Barakallah! Jadilah bagian dari perjuangan kami!',
    name: 'M Fathan A.F',
    role: 'UIN Bandung',
  },
  {
    quote:
      'SMKIT Ihsanul Fikri merupakan tempat aku menimba banyak ilmu. Diantaranya ilmu tentang teknologi, cara bersosial dengan warga desa, bagaimana bersikap sopan santun terhadap yang lebih tua, dan tentunya ilmu agama. Itu semua membuatku menjadi pribadi yang lebih baik dari sebelumnya.',
    name: 'M Abdul Fattah Rabbani',
    role: 'MMTC Kominfo Jogja',
  },
  {
    quote:
      'Sekolah ini mengajarkanku arti kehidupan sebenarnya, membuka cakrawala berpikir yang kritis dan dinamis. Ikatan persaudaraan yang kuat dan pendidikan yang luas. Tentu hal ini karena bimbingan dari guru yang begitu sabar dan tulus mengajar kami.',
    name: 'M Haedar Abdul Rahman',
    role: 'PT. Pritech Indonesia',
  },
  {
    quote:
      'Ihsanul Fikri benar-benar membangun karakter saya, nilai-nilai keagamaan yang tidak terpisahkan dalam setiap keseharian disana membuat bangga pernah bersekolah di SMKIT Ihsanul Fikri.',
    name: 'Ahmad Syaifuddin',
    role: 'Untidar Magelang',
  },
]

export default function Testimoni() {
  const sectionRef = useRef<HTMLElement | null>(null)

  useReveal(sectionRef)

  return (
    <section
      ref={sectionRef}
      id="testimoni"
      aria-labelledby="testimoni-title"
      className="bg-cream"
    >
      <div className="mx-auto w-full max-w-[1200px] px-5 py-16 sm:px-8 md:py-20 lg:py-24">
        <header className="text-center">
          <h2
            id="testimoni-title"
            data-reveal
            className="text-[28px] leading-[1.2] font-bold tracking-tight text-ink sm:text-[32px] lg:text-[36px]"
          >
            Testimoni Alumni
          </h2>
          <span
            data-reveal
            className="mx-auto mt-4 block h-[3px] w-14 rounded-full bg-gold"
            aria-hidden="true"
          />
          <p
            data-reveal
            className="mx-auto mt-4 max-w-[620px] text-[15px] leading-relaxed text-olive md:text-[16px]"
          >
            Cerita dan kesan para alumni SMK IT Ihsanul Fikri Mungkid setelah menempuh pendidikan.
          </p>
        </header>

        <div className="mt-12 grid grid-cols-1 gap-6 md:mt-16 md:grid-cols-2 lg:grid-cols-3">
          {testimoni.map((item) => (
            <figure
              key={item.name}
              data-reveal
              className="flex h-full flex-col rounded-xl border border-ink/10 bg-white p-6 text-left shadow-[0_1px_2px_rgba(13,47,56,0.04)] transition-shadow duration-300 hover:shadow-[0_12px_28px_-16px_rgba(13,47,56,0.2)] sm:p-7"
            >
              <Quote
                className="h-7 w-7 shrink-0 text-gold/70"
                strokeWidth={1.6}
                aria-hidden="true"
              />
              <blockquote className="mt-4 flex-1 text-[14px] leading-relaxed text-olive sm:text-[14.5px]">
                “{item.quote}”
              </blockquote>
              <figcaption className="mt-5 border-t border-ink/10 pt-4">
                <span className="block text-[15px] font-bold text-ink">{item.name}</span>
                <span className="mt-0.5 block text-[12.5px] font-medium tracking-[0.02em] text-olive">
                  {item.role}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
