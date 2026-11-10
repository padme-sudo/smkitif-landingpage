export type NavChild = {
  label: string
  href: string
  description?: string
}

export type NavItem = {
  label: string
  href: string
  children?: NavChild[]
}

export const navItems: NavItem[] = [
  { label: 'Home', href: '#home' },
  {
    label: 'PPDB',
    href: 'https://www.smkitihsanulfikri.sch.id/ppdb2627/',
    children: [
      {
        label: 'Info PPDB 2026/2027',
        href: 'https://www.smkitihsanulfikri.sch.id/ppdb2627/',
      },
      {
        label: 'Isi Data Pendaftaran',
        href: 'https://ppdbsmk.ihsanulfikri.sch.id/',
      },
    ],
  },
  {
    label: 'Profil',
    href: '#profil',
    children: [
      {
        label: 'Visi & Misi',
        href: 'https://www.smkitihsanulfikri.sch.id/visi-misi/',
      },
      {
        label: 'Profil Sekolah',
        href: 'https://www.smkitihsanulfikri.sch.id/profil-sekolah/',
      },
    ],
  },
  { label: 'Artikel', href: 'https://www.smkitihsanulfikri.sch.id/blog/' },
  { label: 'Prestasi', href: 'https://www.smkitihsanulfikri.sch.id/prestasi/' },
  {
    label: 'Akademik',
    href: '#jurusan',
    children: [
      {
        label: 'Mikrotik Academy',
        href: 'https://mikrotikacademy.smkitihsanulfikri.sch.id/',
      },
    ],
  },
  { label: 'BKK', href: 'https://bkksmkitihsanulfikri.career.support/' },
  { label: 'Kontak', href: '#kontak' },
]

export const siteInfo = {
  name: 'SMK IT IHSANUL FIKRI',
  tagline: 'Terampil, Mandiri, Qur’ani',
  address: 'Jl. Blabak–Mendut KM.03, Mungkid, Magelang',
  phone: '(0293) 7182 874',
  phoneHref: 'tel:+622937182874',
  email: 'smkitifmungkid@gmail.com',
  ppdbUrl: 'https://ppdbsmk.ihsanulfikri.sch.id'
}
