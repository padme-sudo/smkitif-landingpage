import { useRef } from 'react'
import { useReveal } from '@/lib/useReveal'
import cisco from '../assets/img/partner/cisco.svg'
import mikrotik from '../assets/img/partner/mikrotik.svg'
import aws from '../assets/img/partner/aws.svg'
import redhat from '../assets/img/partner/redhat.svg'
import eccouncil from '../assets/img/partner/eccouncil.png'
import fortinet from '../assets/img/partner/fortinet.svg'

const partners = [
  { name: 'Cisco Networking Academy', logo: cisco },
  { name: 'MikroTik Academy', logo: mikrotik },
  { name: 'Amazon Web Services', logo: aws },
  { name: 'Red Hat Academy', logo: redhat },
  { name: 'EC-Council', logo: eccouncil },
  { name: 'Fortinet', logo: fortinet },
]

export default function AcademyPartner() {
  const sectionRef = useRef<HTMLElement | null>(null)

  useReveal(sectionRef)

  return (
    <section
      ref={sectionRef}
      id="partner"
      aria-labelledby="partner-title"
      className="bg-cream"
    >
      <div className="mx-auto w-full max-w-[1200px] px-5 py-16 sm:px-8 md:py-20">
        <header className="text-center">
          <h2
            id="partner-title"
            data-reveal
            className="text-[30px] leading-[1.2] font-bold tracking-tight text-ink sm:text-[34px] lg:text-[36px]"
          >
            Academy Partner
          </h2>
          <span
            data-reveal
            className="mx-auto mt-4 block h-[6px] w-24 rounded-[2px] bg-gold"
            aria-hidden="true"
          />
        </header>

        <ul className="mt-10 grid grid-cols-2 items-center justify-items-center gap-x-6 gap-y-9 sm:grid-cols-3 md:mt-14 md:gap-y-10 lg:grid-cols-6 lg:gap-x-8">
          {partners.map((partner) => (
            <li key={partner.name} data-reveal className="flex items-center justify-center">
              <img
                src={partner.logo}
                alt={partner.name}
                className="h-8 w-auto max-w-[150px] object-contain grayscale opacity-80 transition duration-300 hover:grayscale-0 hover:opacity-100 sm:h-9 md:h-10 lg:max-w-[160px]"
                loading="lazy"
                decoding="async"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
