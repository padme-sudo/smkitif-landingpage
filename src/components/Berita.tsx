import { useEffect, useRef, useState } from 'react'
import { Newspaper } from 'lucide-react'
import { useReveal } from '@/lib/useReveal'
import {
  beritaIndexUrl,
  demoBerita,
  fetchBerita,
  getInjectedBerita,
  isWordPressBerita,
  type BeritaItem,
} from '@/data/berita'

export interface BeritaProps {
  /** Bila diisi (mis. dari PHP WordPress), data ini dipakai langsung tanpa fetch. */
  items?: BeritaItem[]
  /** URL halaman daftar berita. Default: /blog/ sekolah. */
  indexHref?: string
}

const tanggal = (value: string) => {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value

  return new Intl.DateTimeFormat('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date)
}

export default function Berita({ items, indexHref = beritaIndexUrl }: BeritaProps) {
  const sectionRef = useRef<HTMLElement | null>(null)
  const [berita, setBerita] = useState<BeritaItem[]>(
    items ?? getInjectedBerita() ?? demoBerita,
  )

  useReveal(sectionRef)

  useEffect(() => {
    if (items) return
    const injected = getInjectedBerita()
    if (injected && injected.length > 0) return
    if (!isWordPressBerita) return

    const controller = new AbortController()
    fetchBerita(controller.signal)
      .then((data) => {
        if (!controller.signal.aborted && data.length > 0) setBerita(data)
      })
      .catch(() => {
        /* Biarkan data contoh tetap tampil bila WordPress tidak dapat diakses. */
      })

    return () => controller.abort()
  }, [items])

  return (
    <section
      ref={sectionRef}
      id="berita"
      aria-labelledby="berita-title"
      className="bg-white"
    >
      <div className="mx-auto w-full max-w-[1200px] px-5 py-16 sm:px-8 md:py-20 lg:py-24">
        <header className="text-center">
          <h2
            id="berita-title"
            data-reveal
            className="text-[30px] leading-[1.2] font-bold tracking-tight text-ink sm:text-[34px] lg:text-[36px]"
          >
            Berita Terbaru
          </h2>
          <span
            data-reveal
            className="mx-auto mt-4 block h-[6px] w-24 rounded-[2px] bg-gold"
            aria-hidden="true"
          />
        </header>

        {berita.length === 0 ? (
          <p data-reveal className="mt-12 flex items-center justify-center gap-2 text-[14px] text-olive">
            <Newspaper className="h-4 w-4 text-gold" strokeWidth={1.8} aria-hidden="true" />
            Belum ada berita untuk ditampilkan.
          </p>
        ) : (
          <div className="mt-10 grid grid-cols-1 gap-7 md:mt-14 md:grid-cols-3 md:gap-6 lg:gap-7">
            {berita.map((item) => (
              <article
                key={item.id}
                data-reveal
                className="overflow-hidden rounded-xl bg-cream shadow-[0_10px_24px_-18px_rgba(13,47,56,0.25)]"
              >
                <a className="group flex h-full flex-col" href={item.href}>
                  <span className="relative block aspect-[16/9] overflow-hidden bg-ink/5">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt=""
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        loading="lazy"
                        decoding="async"
                      />
                    ) : (
                      <span className="flex h-full w-full items-center justify-center bg-ink/90 text-cream/70">
                        <Newspaper className="h-9 w-9" strokeWidth={1.4} aria-hidden="true" />
                      </span>
                    )}
                  </span>

                  <span className="flex flex-1 flex-col p-5 sm:p-6">
                    <span className="block text-[14px] font-medium text-[#2b7bb9]">
                      {tanggal(item.date)}
                      {item.author ? ` - ${item.author}` : ''}
                    </span>
                    <h3 className="mt-2.5 text-[19px] leading-[1.4] font-semibold text-[#1a1a1a] transition-colors duration-200 group-hover:text-gold-deep">
                      {item.title}
                    </h3>
                  </span>
                </a>
              </article>
            ))}
          </div>
        )}

        <div className="mt-10 flex justify-center md:mt-12">
          <a
            data-reveal
            className="inline-flex items-center justify-center rounded-md bg-gold px-7 py-3.5 text-[15px] font-bold text-white transition-colors hover:bg-gold-deep"
            href={indexHref}
          >
            Lihat Semua Berita
          </a>
        </div>
      </div>
    </section>
  )
}
