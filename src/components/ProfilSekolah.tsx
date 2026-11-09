import { useId, useLayoutEffect, useRef, useState } from 'react'
import { animate, stagger } from 'animejs'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useReveal } from '@/lib/useReveal'
import gedung from '../assets/img/gedung.png'

const paragrafPembuka = [
  'SMK IT Ihsanul Fikri Mungkid adalah salah satu Sekolah Menengah Kejuruan yang berada di Kecamatan Mungkid, Kabupaten Magelang, Jawa Tengah. Berada di sekitar Kawasan Strategis Nasional (KSN) Borobudur, keberadaannya menjadi potensi tersendiri untuk terus dikembangkan. Lokasinya di Jalan Tembus Blabak–Mendut KM.03 sangat strategis: di tepi jalan besar, dekat pasar, pusat perkantoran pemerintah, serta UMKM yang tumbuh pesat. Fasilitas sekolah meliputi bangunan sekolah, mini market, dan masjid yang juga menjadi tempat transit musafir untuk beristirahat dan shalat.',
  'Siswa SMK IT Ihsanul Fikri Mungkid sebagian besar berasal dari luar Magelang, bahkan dari seluruh wilayah Indonesia dari Papua sampai Sumatra. Latar belakang keluarga yang beragam menjadikan sekolah ini berpotensi dikembangkan sebagai pencetak wirausaha berbasis usaha siswa dan studi lanjut.',
  'Pendidik dan tenaga kependidikan di SMK IT Ihsanul Fikri Mungkid sangat memadai. Seluruh guru berpendidikan sarjana dan mengajar sesuai latar belakang pendidikannya, sementara tenaga kependidikan minimal berpendidikan D3. Saat ini sekolah memiliki 115 siswa dalam satu program keahlian dan 4 rombel, dengan seluruh guru kejuruan sudah bersertifikat BNSP atau LSP.',
]

const paragrafLanjutan = [
  'Kurikulum Merdeka diterapkan dalam bentuk Mandiri Berubah dengan menggunakan perangkat ajar yang telah disediakan. Kurikulum operasional sekolah dikembangkan sesuai konteks dan kebutuhan peserta didik serta satuan pendidikan, dengan prinsip berpusat pada peserta didik, kontekstual, esensial, akuntabel, dan melibatkan berbagai pemangku kepentingan termasuk orang tua, komite sekolah, serta dunia usaha dan dunia industri.',
  'Sekolah yang berdiri pada 2011 ini diselenggarakan oleh Yayasan Tarbiyatul Mukmin Pabelan dan berstatus swasta. Program keahlian yang tersedia adalah Teknik Jaringan Komputer dan Telekomunikasi (TJKT), Pengembangan Perangkat Lunak & Gim (PPLG), Desain Komunikasi Visual (DKV). Dengan Bapak Mustain, S.Pd., Gr. sebagai kepala sekolah.',
]

const misi = [
  'Mengembangkan kurikulum dan strategi pembelajaran yang berfokus pada pendidikan karakter dan peningkatan intelektual.',
  'Membangun lingkungan sekolah yang religius, kompetitif, dan menumbuhkan semangat cinta tanah air.',
  'Meningkatkan kompetensi guru dengan menumbuhkan budaya kerja profesional.',
  'Menjalin kerja sama dengan dunia industri dan masyarakat dalam rangka meningkatkan relevansi dan kualitas pendidikan.',
]

export default function ProfilSekolah() {
  const [expanded, setExpanded] = useState(false)
  const panelId = useId()
  const sectionRef = useRef<HTMLElement | null>(null)
  const panelRef = useRef<HTMLDivElement | null>(null)

  useReveal(sectionRef)

  useLayoutEffect(() => {
    if (!expanded || !panelRef.current) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const items = panelRef.current.querySelectorAll<HTMLElement>('[data-panel-item]')
    const animation = animate(items, {
      opacity: [0, 1],
      y: [14, 0],
      duration: 520,
      delay: stagger(70),
      ease: 'out(3)',
    })

    return () => {
      animation.revert()
    }
  }, [expanded])

  return (
    <section
      ref={sectionRef}
      id="profil"
      aria-labelledby="profil-title"
      className="bg-white"
    >
      <div className="mx-auto w-full max-w-[1200px] px-5 py-16 sm:px-8 md:py-20 lg:py-24">
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <header>
              <h2
                id="profil-title"
                data-reveal
                className="text-[30px] leading-[1.2] font-bold tracking-tight text-ink sm:text-[34px] lg:text-[36px]"
              >
                Profil Sekolah
              </h2>
              <p
                data-reveal
                className="mt-1.5 text-[12.5px] font-medium tracking-[0.18em] text-olive uppercase lg:text-[15px]"
              >
                SMK IT Ihsanul Fikri Mungkid
              </p>
            </header>

            <div className="mt-6 space-y-4 text-[15.5px] leading-[1.75] text-olive md:mt-8 md:text-justify lg:text-[17px]">
              {paragrafPembuka.map((paragraf) => (
                <p key={paragraf.slice(0, 24)} data-reveal>
                  {paragraf}
                </p>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setExpanded((value) => !value)}
              aria-expanded={expanded}
              aria-controls={panelId}
              data-reveal
              className="group mt-5 inline-flex items-center gap-1.5 text-[15px] font-semibold text-gold-deep transition-colors hover:text-gold"
            >
              <span className="underline decoration-gold/40 decoration-1 underline-offset-4 transition-colors group-hover:decoration-gold">
                {expanded ? 'Baca Lebih Sedikit' : 'Baca Selengkapnya'}
              </span>
              <ChevronDown
                aria-hidden="true"
                className={cn(
                  'h-4 w-4 transition-transform duration-300',
                  expanded && 'rotate-180',
                )}
              />
            </button>

            <div
              id={panelId}
              ref={panelRef}
              aria-hidden={!expanded}
              className={cn(
                'grid transition-[grid-template-rows] duration-500 ease-out',
                expanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
              )}
            >
              <div className="overflow-hidden">
                <div className="space-y-4 pt-5 pb-1 text-[15.5px] leading-[1.75] text-olive md:text-justify lg:text-[17px]">
                  {paragrafLanjutan.map((paragraf) => (
                    <p key={paragraf.slice(0, 24)} data-panel-item>
                      {paragraf}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <figure data-reveal className="mx-auto w-full max-w-[560px]">
            <img
              src={gedung}
              alt="Gedung SMK IT Ihsanul Fikri Mungkid dikelilingi sawah dan pepohonan"
              loading="lazy"
              decoding="async"
              className="h-auto w-full"
            />
          </figure>
        </div>

        <section
          aria-label="Visi dan Misi"
          className="mt-12 md:mt-16"
        >
          <div className="grid gap-10 md:grid-cols-2 md:gap-12 lg:gap-16">
            <div>
              <h3
                data-reveal
                className="text-[26px] leading-[1.2] font-bold tracking-tight text-ink sm:text-[30px]"
              >
                Visi
              </h3>
              <p
                data-reveal
                className="mt-4 text-[15.5px] leading-[1.8] text-olive md:text-justify lg:text-[17px]"
              >
                “Terwujudnya lulusan yang berkarakter islami, berwawasan kebangsaan dan berdaya
                saing global.”
              </p>
            </div>

            <div>
              <h3
                data-reveal
                className="text-[26px] leading-[1.2] font-bold tracking-tight text-ink sm:text-[30px]"
              >
                Misi
              </h3>
              <ul className="mt-4 space-y-3">
                {misi.map((butir) => (
                  <li
                    key={butir}
                    data-reveal
                    className="flex gap-3 text-[15.5px] leading-[1.75] text-olive md:text-justify lg:text-[17px]"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-[0.7em] h-1.5 w-1.5 shrink-0 rounded-full bg-gold"
                    />
                    <span>{butir}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </div>
    </section>
  )
}
