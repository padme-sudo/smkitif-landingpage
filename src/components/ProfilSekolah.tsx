import { useId, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
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

const identitas = [
  { label: 'NPSN', value: '69881816' },
  { label: 'NSS', value: '322030809038' },
  { label: 'Tahun Berdiri', value: '2011' },
  { label: 'Kepala Sekolah', value: 'Mustain, S.Pd.' },
]

export default function ProfilSekolah() {
  const [expanded, setExpanded] = useState(false)
  const panelId = useId()

  return (
    <section id="profil" aria-labelledby="profil-title" className="bg-white">
      <div className="mx-auto w-full max-w-[1200px] px-5 py-16 sm:px-8 md:py-20 lg:py-24">
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <header>
              <h2
                id="profil-title"
                className="text-[30px] leading-[1.2] font-bold tracking-tight text-ink sm:text-[34px] lg:text-[36px]"
              >
                Profil Sekolah
              </h2>
              <p className="mt-1.5 text-[12.5px] font-medium tracking-[0.18em] text-olive uppercase lg:text-[15px]">
                SMK IT Ihsanul Fikri Mungkid
              </p>
            </header>

            <div className="mt-6 space-y-4 text-[15.5px] leading-[1.75] text-olive md:mt-8 md:text-justify lg:text-[17px]">
              {paragrafPembuka.map((paragraf) => (
                <p key={paragraf.slice(0, 24)}>{paragraf}</p>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setExpanded((value) => !value)}
              aria-expanded={expanded}
              aria-controls={panelId}
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
              aria-hidden={!expanded}
              className={cn(
                'grid transition-[grid-template-rows] duration-500 ease-out',
                expanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
              )}
            >
              <div className="overflow-hidden">
                <div className="space-y-4 pt-5 text-[15.5px] leading-[1.75] text-olive md:text-justify lg:text-[17px]">
                  {paragrafLanjutan.map((paragraf) => (
                    <p key={paragraf.slice(0, 24)}>{paragraf}</p>
                  ))}
                </div>

                <dl className="mt-7 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-ink/10 pt-6">
                  {identitas.map(({ label, value }) => (
                    <div key={label}>
                      <dt className="text-[10.5px] font-bold tracking-[0.14em] text-olive uppercase">
                        {label}
                      </dt>
                      <dd className="mt-1 text-[15px] font-semibold text-ink">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>

          <figure className="mx-auto w-full max-w-[560px]">
            <img
              src={gedung}
              alt="Gedung SMK IT Ihsanul Fikri Mungkid dikelilingi sawah dan pepohonan"
              loading="lazy"
              decoding="async"
              className="h-auto w-full"
            />
          </figure>
        </div>
      </div>
    </section>
  )
}
