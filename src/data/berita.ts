/**
 * Sumber data Berita untuk landing page (halaman depan WordPress).
 *
 * Dua mode:
 * 1. Statis  — data contoh di `demoBerita` (dipakai saat development / tanpa WordPress).
 * 2. WordPress — set `VITE_WP_API_BASE` (mis. `https://smkitihsanulfikri.sch.id`)
 *    lalu komponen akan mengambil 3 post terbaru dari WP REST API:
 *    `GET {BASE}/wp-json/wp/v2/posts?_embed&per_page=3`.
 *
 * Saat landing page dipasang sebagai front page WordPress, komponen juga bisa
 * menerima `items` langsung dari PHP agar tidak perlu request tambahan.
 */

import smdKalibening from '../assets/img/berita/smd-kalibening.jpg'
import milad15 from '../assets/img/berita/milad-15.png'
import pengukuhanOrganisasi from '../assets/img/berita/pengukuhan-organisasi.png'

export interface BeritaItem {
  id: number | string
  title: string
  excerpt: string
  category: string
  /** Tanggal ISO 8601, mis. `2026-10-27T08:00:00`. */
  date: string
  /** Nama penulis/redaksi (opsional). */
  author?: string
  image: string
  href: string
}

/** Data contoh; dipakai saat `VITE_WP_API_BASE` belum diset. */
export const demoBerita: BeritaItem[] = [
  {
    id: 1,
    title: 'Mengabdi Sepenuh Hati: Ketika Santri SMK IT Ihsanul Fikri Menuturkan Kisah di Desa Kalibening',
    excerpt:
      'Suasana hangat dan penuh antusiasme menyelimuti Desa Kalibening, Kecamatan Srumbung. Agenda tahunan Santri Masuk Desa (SMD) tahun ajaran 2026/2027 resmi digelar.',
    category: 'Kegiatan',
    date: '2026-10-27',
    author: 'Humas',
    image: smdKalibening,
    href: 'https://www.smkitihsanulfikri.sch.id/2026/10/27/mengabdi-sepenuh-hati-ketika-santri-smk-it-ihsanul-fikri-menuturkan-kisah-di-desa-kalibening/',
  },
  {
    id: 2,
    title: '5 Refleksi Mengejutkan Tentang Anak, HP, dan Masa Depan di Milad ke-15 SMKIT Ihsanul Fikri',
    excerpt:
      'Anak zaman sekarang mungkin hanya duduk diam di dalam kamar, tetapi melalui layar kecil di genggamannya, pikiran dan pergaulannya bisa berselancar bebas.',
    category: 'Berita',
    date: '2026-10-17',
    author: 'Humas',
    image: milad15,
    href: 'https://www.smkitihsanulfikri.sch.id/2026/10/17/5-refleksi-mengejutkan-tentang-anak-hp-dan-masa-depan-di-milad-ke-15-smkit-ihsanul-fikri/',
  },
  {
    id: 3,
    title: '4 Pelajaran Penting Kepemimpinan Muda dari Pengukuhan Pengurus Organisasi 2026/2027',
    excerpt:
      'Pernahkah kamu merasa sangat antusias saat mendaftar organisasi sekolah, tetapi namamu tidak tercantum saat pengumuman akhir? Momen ini menyimpan banyak pelajaran.',
    category: 'Kesiswaan',
    date: '2026-10-08',
    author: 'Humas',
    image: pengukuhanOrganisasi,
    href: 'https://www.smkitihsanulfikri.sch.id/2026/10/08/4-pelajaran-penting-kepemimpinan-muda-dari-momen-pengukuhan-pengurus-organisasi-smk-it-mungkid-2026-2027/',
  },
]

export const beritaIndexUrl = 'https://www.smkitihsanulfikri.sch.id/blog/'

declare global {
  interface Window {
    __SMKIT__?: {
      /** Base URL WordPress, mis. `https://smkitihsanulfikri.sch.id` (tanpa trailing slash). */
      wpApiBase?: string
      /** Data berita yang disuntikkan dari PHP (menghindari fetch REST/CORS). */
      berita?: BeritaItem[]
    }
  }
}

const getWpApiBase = () => {
  const injected = window.__SMKIT__?.wpApiBase?.replace(/\/+$/, '')
  if (injected) return injected
  const envBase = import.meta.env.VITE_WP_API_BASE?.replace(/\/+$/, '')
  if (envBase) return envBase
  return undefined
}

export const getInjectedBerita = (): BeritaItem[] | undefined => window.__SMKIT__?.berita

interface WpRendered {
  rendered: string
}

interface WpTerm {
  taxonomy: string
  name: string
}

interface WpMedia {
  source_url: string
}

interface WpPost {
  id: number
  date: string
  link: string
  title: WpRendered
  excerpt: WpRendered
  _embedded?: {
    'wp:featuredmedia'?: WpMedia[]
    'wp:term'?: WpTerm[][]
    author?: { name: string }[]
  }
}

const stripHtml = (value: string) => value.replace(/<[^>]*>/g, ' ')

const decodeHtml = (value: string) => {
  if (typeof document === 'undefined') return value
  const el = document.createElement('textarea')
  el.innerHTML = value
  return el.value
}

const cleanText = (value: string) =>
  decodeHtml(stripHtml(value))
    .replace(/\[\u2026\]/g, '…')
    .replace(/\s+/g, ' ')
    .trim()

const mapWpPost = (post: WpPost): BeritaItem => {
  const media = post._embedded?.['wp:featuredmedia']?.[0]
  const category = post._embedded?.['wp:term']
    ?.flat()
    .find((term) => term.taxonomy === 'category')
  const author = post._embedded?.author?.[0]

  return {
    id: post.id,
    title: cleanText(post.title.rendered),
    excerpt: cleanText(post.excerpt.rendered),
    category: category?.name ?? 'Berita',
    date: post.date,
    author: author?.name ? cleanText(author.name) : undefined,
    image: media?.source_url ?? '',
    href: post.link,
  }
}

/**
 * Ambil berita dari WordPress REST API.
 * - Prioritas: data suntikan `window.__SMKIT__.berita`
 * - Lalu: `VITE_WP_API_BASE` / `window.__SMKIT__.wpApiBase`
 * - Fallback: `demoBerita` (mode statis)
 */
export async function fetchBerita(signal?: AbortSignal): Promise<BeritaItem[]> {
  const injected = getInjectedBerita()
  if (injected && injected.length > 0) return injected

  const base = getWpApiBase()
  if (!base) return demoBerita

  const response = await fetch(
    `${base}/wp-json/wp/v2/posts?_embed&per_page=3&_fields=id,date,link,title,excerpt,author,_embedded`,
    { signal, headers: { Accept: 'application/json' } },
  )

  if (!response.ok) {
    throw new Error(`Gagal memuat berita WordPress (${response.status})`)
  }

  const posts = (await response.json()) as WpPost[]
  return posts.map(mapWpPost)
}

export const isWordPressBerita = Boolean(
  getWpApiBase() || (typeof window !== 'undefined' && window.__SMKIT__?.berita?.length),
)
