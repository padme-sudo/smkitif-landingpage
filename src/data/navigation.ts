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
    label: 'Profil',
    href: '#profil',
    children: [
      {
        label: 'Tentang Sekolah',
        href: '#profil',
        description: 'Sejarah, identitas, dan keunggulan',
      },
      {
        label: 'Visi & Misi',
        href: '#visi-misi',
        description: 'Arah dan tujuan pendidikan',
      },
      {
        label: 'Fasilitas',
        href: '#fasilitas',
        description: 'Sarana belajar dan asrama',
      },
      {
        label: 'Prestasi',
        href: '#prestasi',
        description: 'Capaian siswa dan sekolah',
      },
    ],
  },
  {
    label: 'Jurusan',
    href: '#jurusan',
    children: [
      {
        label: 'TJKT',
        href: '#jurusan-tjkt',
        description: 'Teknik Jaringan Komputer & Telekomunikasi',
      },
      {
        label: 'PPLG',
        href: '#jurusan-pplg',
        description: 'Pengembangan Perangkat Lunak & Gim',
      },
      {
        label: 'DKV',
        href: '#jurusan-dkv',
        description: 'Desain Komunikasi Visual',
      },
    ],
  },
  { label: 'Berita', href: '#berita' },
  { label: 'Galeri', href: '#galeri' },
  { label: 'Kontak', href: '#kontak' },
]

export const siteInfo = {
  name: 'SMK IT IHSANUL FIKRI',
  tagline: 'Terampil, Mandiri, Qur’ani',
  address: 'Jl. Blabak–Mendut KM.03, Mungkid, Magelang',
  phone: '(0293) 7182 874',
  phoneHref: 'tel:+622937182874',
  email: 'admin@smkitihsanulfikri.sch.id',
  ppdbUrl: 'https://ppdbsmk.ihsanulfikri.sch.id'
}
