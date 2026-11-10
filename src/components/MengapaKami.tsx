import { useRef } from 'react'
import {
  GraduationCap,
  BookOpen,
  Factory,
  Users,
  Layers,
  Award,
  Building2,
  Heart,
  Network,
} from 'lucide-react'
import { useReveal } from '@/lib/useReveal'

const keunggulan = [
  {
    icon: GraduationCap,
    title: 'Lulusan Berkarakter',
    description:
      'Lulusan dibekali karakter islami, wawasan kebangsaan, dan daya saing global sesuai visi sekolah.',
  },
  {
    icon: BookOpen,
    title: 'Tahfidz Intensif 30 Juz',
    description:
      'Program tahfidz yang lebih intens dengan target hafalan lebih tinggi dibanding siswa lain.',
  },
  {
    icon: Factory,
    title: 'Kelas Industri',
    description:
      'Pembelajaran lebih berfokus pada muatan kejuruan bersama industri mitra sekolah.',
  },
  {
    icon: Users,
    title: 'Bina Pribadi Islami',
    description:
      'Program pengembangan diri untuk membentuk pribadi yang sholih dan berakhlak mulia.',
  },
  {
    icon: Layers,
    title: 'Kurikulum Terpadu',
    description:
      'Memadukan Kurikulum Dinas, Kurikulum JSIT, dan Kurikulum Industri dalam satu pembelajaran.',
  },
  {
    icon: Award,
    title: 'Guru Bersertifikat',
    description:
      'Seluruh guru kejuruan bersertifikat BNSP/LSP dan mengajar sesuai latar belakang pendidikannya.',
  },
  {
    icon: Building2,
    title: 'Kunjungan Industri & Kampus',
    description:
      'Siswa mengenal langsung dunia industri dan kampus melalui kunjungan yang terprogram.',
  },
  {
    icon: Heart,
    title: 'Santri Masuk Kampung',
    description:
      'Pengabdian kepada masyarakat sekitar untuk menumbuhkan kepedulian sosial dan kemandirian.',
  },
  {
    icon: Network,
    title: 'Mikrotik Academy & BKK',
    description:
      'Kelas industri jaringan bersertifikat serta bursa kerja khusus untuk penyaluran lulusan.',
  },
]

export default function MengapaKami() {
  const sectionRef = useRef<HTMLElement | null>(null)

  useReveal(sectionRef)

  return (
    <section
      ref={sectionRef}
      id="keunggulan"
      aria-labelledby="keunggulan-title"
      className="bg-cream"
    >
      <div className="mx-auto w-full max-w-[1200px] px-5 py-16 sm:px-8 md:py-20 lg:py-24">
        <header className="text-center">
          <h2
            id="keunggulan-title"
            data-reveal
            className="text-[28px] leading-[1.2] font-bold tracking-tight text-ink sm:text-[32px] lg:text-[36px]"
          >
            Mengapa SMK IT Ihsanul Fikri Mungkid?
          </h2>
          <span
            data-reveal
            className="mx-auto mt-4 block h-[3px] w-14 rounded-full bg-gold"
            aria-hidden="true"
          />
        </header>

        <div className="mt-12 grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2 md:mt-16 md:gap-x-14 md:gap-y-12 lg:grid-cols-3">
          {keunggulan.map((item) => {
            const Icon = item.icon

            return (
              <div key={item.title} data-reveal className="text-left">
                <Icon
                  className="h-10 w-10 text-gold sm:h-11 sm:w-11"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
                <h3 className="mt-4 text-[17px] leading-snug font-bold text-ink sm:text-[18px]">
                  {item.title}
                </h3>
                <p className="mt-2 text-[13.5px] leading-relaxed text-ink/75 sm:text-[14px]">
                  {item.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
