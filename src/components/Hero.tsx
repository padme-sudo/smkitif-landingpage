import { useEffect, useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { A11y, Autoplay, Keyboard } from 'swiper/modules'
import type { Swiper as SwiperInstance } from 'swiper'
import { ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react'
import 'swiper/css'
import { cn } from '@/lib/utils'
import slide1 from '../assets/img/PSB/1.png'
import slide2 from '../assets/img/PSB/2.png'
import slide3 from '../assets/img/PSB/3.png'
import slide4 from '../assets/img/PSB/4.png'

const banners = [
  {
    src: slide1,
    alt: 'PSB SMK IT Ihsanul Fikri tahun ajaran 2027/2028 — jurusan TJKT, PPLG, DKV dan informasi beasiswa',
  },
  {
    src: slide2,
    alt: 'Jurusan TJKT — Teknik Jaringan Komputer dan Telekomunikasi beserta kompetensi keahlian',
  },
  {
    src: slide3,
    alt: 'Jurusan PPLG — Pengembangan Perangkat Lunak dan Gim beserta kompetensi keahlian',
  },
  {
    src: slide4,
    alt: 'Jurusan DKV — Desain Komunikasi Visual beserta kompetensi keahlian',
  },
]

const arrowBase =
  'absolute top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/85 text-ink shadow-[0_10px_24px_-14px_rgba(13,47,56,0.55)] backdrop-blur-sm transition hover:bg-white min-[768px]:grid'

export default function Hero() {
  const [swiper, setSwiper] = useState<SwiperInstance | null>(null)
  const [activeSlide, setActiveSlide] = useState(0)
  const [lightbox, setLightbox] = useState<number | null>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const [reducedMotion] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )

  useEffect(() => {
    if (lightbox === null) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setLightbox(null)
        return
      }
      if (event.key === 'ArrowLeft') {
        setLightbox((current) =>
          current === null ? current : (current - 1 + banners.length) % banners.length,
        )
      }
      if (event.key === 'ArrowRight') {
        setLightbox((current) =>
          current === null ? current : (current + 1) % banners.length,
        )
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [lightbox])

  const current = lightbox === null ? null : banners[lightbox]

  return (
    <section id="home" aria-label="Banner Penerimaan Siswa Baru" className="relative bg-cream">
      <h1 className="sr-only">
        SMK IT Ihsanul Fikri — Penerimaan Siswa Baru tahun ajaran 2027/2028
      </h1>

      <div className="w-full">
        <div className="relative w-full">
          <Swiper
            className="psb-swiper aspect-[1500/470] w-full select-none"
            modules={[Autoplay, Keyboard, A11y]}
            loop
            speed={650}
            autoplay={
              reducedMotion
                ? false
                : { delay: 8000, disableOnInteraction: false, pauseOnMouseEnter: true }
            }
            keyboard={{ enabled: true }}
            a11y={{
              enabled: true,
              prevSlideMessage: 'Banner sebelumnya',
              nextSlideMessage: 'Banner berikutnya',
            }}
            onSwiper={setSwiper}
            onSlideChange={(instance) => setActiveSlide(instance.realIndex)}
          >
            {banners.map((banner, index) => (
              <SwiperSlide key={banner.src}>
                <button
                  type="button"
                  className="group relative block h-full w-full cursor-zoom-in"
                  onClick={() => setLightbox(index)}
                  aria-label={`Perbesar banner ${index + 1} dari ${banners.length}`}
                >
                  <img
                    src={banner.src}
                    alt={banner.alt}
                    className="h-full w-full object-cover"
                    draggable={false}
                    loading={index === 0 ? 'eager' : 'lazy'}
                    fetchPriority={index === 0 ? 'high' : 'auto'}
                  />
                  <span className="pointer-events-none absolute right-2.5 bottom-2.5 inline-flex items-center justify-center gap-1.5 rounded-full bg-ink/65 px-2.5 py-1 text-[9.5px] font-bold tracking-[0.1em] text-cream uppercase opacity-0 backdrop-blur-sm transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100 max-[640px]:h-8 max-[640px]:w-8 max-[640px]:p-0 max-[640px]:opacity-100 min-[640px]:right-3 min-[640px]:bottom-3 min-[640px]:px-3 min-[640px]:py-1.5 min-[640px]:text-[10.5px]">
                    <Maximize2
                      className="h-3 w-3 min-[640px]:h-3 min-[640px]:w-3"
                      aria-hidden="true"
                    />
                    <span className="max-[640px]:hidden">Perbesar</span>
                  </span>
                </button>
              </SwiperSlide>
            ))}
          </Swiper>

          <button
            type="button"
            aria-label="Banner sebelumnya"
            onClick={() => swiper?.slidePrev()}
            className={`${arrowBase} left-3`}
          >
            <ChevronLeft className="h-5 w-5" strokeWidth={2.2} aria-hidden="true" />
          </button>
          <button
            type="button"
            aria-label="Banner berikutnya"
            onClick={() => swiper?.slideNext()}
            className={`${arrowBase} right-3`}
          >
            <ChevronRight className="h-5 w-5" strokeWidth={2.2} aria-hidden="true" />
          </button>
        </div>

        <div
          className="flex items-center justify-center gap-2 py-4"
          role="group"
          aria-label="Navigasi banner"
        >
          {banners.map((banner, index) => {
            const isActive = activeSlide === index

            return (
              <button
                key={banner.src}
                type="button"
                onClick={() => swiper?.slideToLoop(index)}
                aria-label={`Buka banner ${index + 1} dari ${banners.length}`}
                aria-current={isActive ? 'true' : undefined}
                className={cn(
                  'h-2 rounded-full transition-all duration-300',
                  isActive ? 'w-8 bg-gold' : 'w-2 bg-ink/25 hover:bg-ink/50',
                )}
              />
            )
          })}
        </div>

        <p className="sr-only" aria-live="polite">
          Banner {activeSlide + 1} dari {banners.length}
        </p>
      </div>

      {current && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Banner PSB ${(lightbox ?? 0) + 1} dari ${banners.length}`}
          className="fixed inset-0 z-[300] flex items-center justify-center bg-ink/90 p-4 backdrop-blur-sm"
          onClick={() => setLightbox(null)}
        >
          <button
            type="button"
            ref={closeRef}
            onClick={() => setLightbox(null)}
            aria-label="Tutup banner"
            className="absolute top-4 right-4 z-10 grid h-11 w-11 place-items-center rounded-full bg-cream/10 text-cream transition hover:bg-cream/20"
          >
            <X className="h-5 w-5" strokeWidth={2.2} aria-hidden="true" />
          </button>

          <div
            className="max-h-full w-full overflow-auto overscroll-contain"
            onClick={(event) => event.stopPropagation()}
          >
            <img
              src={current.src}
              alt={current.alt}
              className="mx-auto block h-auto w-full min-w-[720px] max-w-[1500px] rounded-md shadow-[0_40px_80px_-40px_rgba(0,0,0,0.8)] sm:min-w-0"
            />
          </div>

          <button
            type="button"
            aria-label="Banner sebelumnya"
            onClick={(event) => {
              event.stopPropagation()
              setLightbox((value) =>
                value === null ? value : (value - 1 + banners.length) % banners.length,
              )
            }}
            className="absolute top-1/2 left-3 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-cream/10 text-cream transition hover:bg-cream/20 min-[768px]:grid"
          >
            <ChevronLeft className="h-5 w-5" strokeWidth={2.2} aria-hidden="true" />
          </button>
          <button
            type="button"
            aria-label="Banner berikutnya"
            onClick={(event) => {
              event.stopPropagation()
              setLightbox((value) => (value === null ? value : (value + 1) % banners.length))
            }}
            className="absolute top-1/2 right-3 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-cream/10 text-cream transition hover:bg-cream/20 min-[768px]:grid"
          >
            <ChevronRight className="h-5 w-5" strokeWidth={2.2} aria-hidden="true" />
          </button>
        </div>
      )}
    </section>
  )
}
