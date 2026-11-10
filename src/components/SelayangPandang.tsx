import { useRef } from 'react'
import { useReveal } from '@/lib/useReveal'
import kepsek from '../assets/img/Kepsek.png'

const kutipan =
  'Pendidikan di SMK IT Ihsanul Fikri bukan sekadar transfer ilmu, melainkan ikhtiar membentuk karakter islami, wawasan kebangsaan, dan daya saing global. Di mana tempat kamu belajar adalah kunci masa depan.'

export default function SelayangPandang() {
  const sectionRef = useRef<HTMLElement | null>(null)

  useReveal(sectionRef)

  return (
    <section
      ref={sectionRef}
      id="selayang-pandang"
      aria-labelledby="selayang-pandang-title"
      className="bg-white"
    >
      <div className="mx-auto w-full max-w-[1200px] px-5 py-16 sm:px-8 md:py-20 lg:py-24">
        <div className="relative">
          <div className="relative rounded-2xl bg-[#dcebf7] px-6 py-9 sm:px-9 sm:py-11 md:px-12 md:py-12 lg:py-14 lg:pr-[42%] lg:pl-12 xl:pl-14">
            <header>
              <h2
                id="selayang-pandang-title"
                data-reveal
                className="text-[30px] leading-[1.2] font-bold tracking-tight text-ink sm:text-[34px] lg:text-[38px]"
              >
                Selayang Pandang
              </h2>
              <span
                data-reveal
                className="mt-4 block h-[6px] w-32 rounded-[2px] bg-gold"
                aria-hidden="true"
              />
            </header>

            <blockquote
              data-reveal
              className="mt-7 max-w-[620px] text-[15.5px] leading-[1.85] text-ink/80 md:text-[16.5px] lg:text-[17px]"
            >
              <span aria-hidden="true" className="mr-1 align-[-2px] text-[22px] leading-none">
                “
              </span>
              {kutipan}
              <span aria-hidden="true" className="ml-1 align-[-2px] text-[22px] leading-none">
                ”
              </span>
            </blockquote>

            <p data-reveal className="mt-6 text-[14.5px] leading-relaxed md:text-[15.5px]">
              <span className="font-bold text-ink">Mustain, S.Pd., Gr.</span>{' '}
              <span className="text-ink/55">Kepala SMK IT Ihsanul Fikri Mungkid</span>
            </p>

            <p
              data-reveal
              className="mt-3 font-jargon text-[34px] leading-none text-ink sm:text-[38px]"
              aria-hidden="true"
            >
              Mustain
            </p>
          </div>

          <img
            src={kepsek}
            alt="Mustain, S.Pd., Gr., Kepala SMK IT Ihsanul Fikri Mungkid"
            width={1350}
            height={1488}
            className="mx-auto mt-8 h-72 w-auto max-w-full object-contain object-bottom sm:h-80 lg:absolute lg:right-3 lg:bottom-0 lg:mt-0 lg:h-[calc(100%+64px)] lg:max-w-[420px] xl:right-6 xl:max-w-[460px]"
            loading="lazy"
            draggable={false}
          />
        </div>
      </div>
    </section>
  )
}
