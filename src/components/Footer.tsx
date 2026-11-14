import { siteInfo } from '../data/navigation'
import schoolLogo from '../assets/img/SMK.png'

const mapsUrl =
  'https://www.google.com/maps/search/?api=1&query=SMK+IT+Ihsanul+Fikri+Mungkid'

const whatsappUrl =
  'https://wa.me/082220930193?text=' +
  encodeURIComponent(
    "Assalamu'alaikum, saya ingin bertanya tentang PPDB SMK IT Ihsanul Fikri Mungkid.",
  )

const sosial = [
  { label: 'Instagram', href: 'https://instagram.com/smk.itihsanulfikri' },
  { label: 'YouTube', href: 'https://youtube.com/ifbstv' },
  { label: 'Facebook', href: 'https://www.facebook.com/smkitihsanulfikri' },
  { label: 'TikTok', href: 'https://www.tiktok.com/@smkitihsanulfikri' },
]

const tautan = [
  { label: 'Info PPDB', href: 'https://www.smkitihsanulfikri.sch.id/ppdb2627/' },
  { label: 'Profil Sekolah', href: 'https://www.smkitihsanulfikri.sch.id/profil-sekolah/' },
  { label: 'Visi & Misi', href: 'https://www.smkitihsanulfikri.sch.id/visi-misi/' },
  { label: 'Blog', href: 'https://www.smkitihsanulfikri.sch.id/blog/' },
]

const linkClass =
  'w-fit text-[15px] leading-relaxed text-white/90 underline decoration-white/40 underline-offset-[5px] transition-colors hover:text-gold hover:decoration-gold'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer id="kontak" className="bg-[#141414] text-white">
      <div className="mx-auto w-full max-w-[1200px] px-5 py-16 sm:px-8 md:py-20">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.5fr_1.2fr_0.7fr_0.7fr] lg:gap-12">
          <div>
            <a
              className="inline-flex items-center gap-3"
              href="#home"
              aria-label="SMK IT Ihsanul Fikri Mungkid — kembali ke atas"
            >
              <img
                src={schoolLogo}
                alt=""
                width={377}
                height={374}
                className="h-14 w-14 shrink-0 object-contain"
              />
              <span className="flex flex-col gap-1 leading-tight">
                <span className="font-display text-[15.5px] font-extrabold tracking-tight text-white uppercase">
                  SMK IT Ihsanul Fikri
                </span>
                <span className="text-[10px] font-bold tracking-[0.16em] text-white/55 uppercase">
                  {siteInfo.tagline}
                </span>
              </span>
            </a>

            <h2 className="mt-8 text-[16px] font-extrabold tracking-[0.02em] text-white uppercase">
              Raih Mimpimu Bersama Kami
            </h2>
            <p className="mt-5 max-w-[420px] text-[15.5px] leading-[1.6] text-white/90">
              Sekolahmu adalah langkah awal menuju cita-citamu. Segera daftarkan dirimu, kami siap
              melayani!
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                className="inline-flex items-center justify-center rounded-md bg-gold px-6 py-3 text-[14.5px] font-bold text-[#141414] transition-colors hover:bg-gold-bright"
                href={siteInfo.ppdbUrl}
                target="_blank"
                rel="noreferrer"
              >
                Daftar Sekarang
              </a>
              <a
                className="inline-flex items-center justify-center rounded-md bg-[#1b5b8a] px-6 py-3 text-[14.5px] font-bold text-white transition-colors hover:bg-[#2470ad]"
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
              >
                Hubungi Via WhatsApp
              </a>
            </div>
          </div>

          <div>
            <h2 className="text-[16px] font-extrabold tracking-[0.02em] text-white uppercase">
              Hubungi Kami
            </h2>
            <address className="mt-5 space-y-3 text-[15.5px] leading-[1.6] text-white/90 not-italic">
              <p className="max-w-[360px]">
                Jalan Blabak – Mendut Km. 03, Tirto, Paremono, Mungkid, Kabupaten Magelang, Jawa
                Tengah 565512
              </p>
              <p>
                <a className={linkClass} href={`mailto:${siteInfo.email}`}>
                  {siteInfo.email}
                </a>
              </p>
              <p>
                <a className={linkClass} href={siteInfo.phoneHref}>
                  {siteInfo.phone}
                </a>
              </p>
              <p>
                <a
                  className={linkClass}
                  href={mapsUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  Lihat di Google Maps
                </a>
              </p>
            </address>
          </div>

          <nav aria-labelledby="footer-sosial">
            <h2
              id="footer-sosial"
              className="text-[16px] font-extrabold tracking-[0.02em] text-white uppercase"
            >
              Sosial Media
            </h2>
            <ul className="mt-5 space-y-3">
              {sosial.map((item) => (
                <li key={item.label}>
                  <a className={linkClass} href={item.href} target="_blank" rel="noreferrer">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-labelledby="footer-tautan">
            <h2
              id="footer-tautan"
              className="text-[16px] font-extrabold tracking-[0.02em] text-white uppercase"
            >
              Link Terkait
            </h2>
            <ul className="mt-5 space-y-3">
              {tautan.map((item) => (
                <li key={item.label}>
                  <a className={linkClass} href={item.href} target="_blank" rel="noreferrer">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      <div className="bg-black py-6">
        <p className="px-5 text-center text-[13.5px] text-white/55">
          © {year} SMK IT Ihsanul Fikri Mungkid, All rights reserved.
        </p>
      </div>
    </footer>
  )
}
