import { ServiceGrid, type Service } from './ui/service-grid'
import tjktIcon from '../assets/img/icon/image-ZDOiPH5Cs2AiEz1EDYncCrNUyCTXag.png'
import pplgIcon from '../assets/img/icon/image-RiQKML3ZZisWGfjMBpdD6HHAgRoEnB.png'
import dkvIcon from '../assets/img/icon/image-Y0bADTeBeWdeCNqMUYn2kiBmGPzOMu.png'

const jurusan: Service[] = [
  {
    id: 'jurusan-tjkt',
    name: 'Teknik Jaringan Komputer & Telekomunikasi',
    description:
      'Mengelola jaringan komputer, telekomunikasi, dan infrastruktur IT untuk kebutuhan dunia industri.',
    icon: tjktIcon,
    href: '#jurusan-tjkt',
  },
  {
    id: 'jurusan-pplg',
    name: 'Pengembangan Perangkat Lunak & Gim',
    description:
      'Merancang dan membangun aplikasi, perangkat lunak, serta gim digital yang siap pakai.',
    icon: pplgIcon,
    href: '#jurusan-pplg',
  },
  {
    id: 'jurusan-dkv',
    name: 'Desain Komunikasi Visual',
    description:
      'Mengembangkan kreativitas desain grafis, multimedia, dan komunikasi visual yang komunikatif.',
    icon: dkvIcon,
    href: '#jurusan-dkv',
  },
]

export default function Jurusan() {
  return (
    <ServiceGrid
      id="jurusan"
      title="Program Keahlian"
      services={jurusan}
      className="bg-cream"
    />
  )
}
