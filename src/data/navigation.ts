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
  {
    label: 'Tentang Kami',
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
    label: 'Program Keahlian',
    href: '#jurusan',
    children: [
      {
        label: 'Teknik Jaringan Komputer & Telekomunikasi',
        href: '#jurusan-tjkt',
        description: 'TJKT',
      },
      {
        label: 'Pengembangan Perangkat Lunak & Gim',
        href: '#jurusan-pplg',
        description: 'PPLG',
      },
      {
        label: 'Desain Komunikasi Visual',
        href: '#jurusan-dkv',
        description: 'DKV',
      },
    ],
  },
  { label: 'Program Unggulan', href: '#program-unggulan' },
  { label: 'Kegiatan', href: '#kegiatan' },
  { label: 'Galeri', href: '#galeri' },
  { label: 'Kontak Kami', href: '#kontak' },
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
