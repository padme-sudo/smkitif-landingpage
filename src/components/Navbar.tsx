import { useEffect, useState } from 'react'
import { ArrowUpRight, Menu as MenuIcon } from 'lucide-react'
import schoolLogo from '../assets/img/SMK.png'
import { navItems, siteInfo } from '../data/navigation'
import Menu from './ui/navbar'
import type { IMenuItem } from './ui/navbar'
import { SterlingGateKineticNavigation } from './ui/sterling-gate-kinetic-navigation'
import type { KineticNavItem } from './ui/sterling-gate-kinetic-navigation'

const menuList: IMenuItem[] = navItems.map((item, index) => {
  const id = index + 1

  return {
    id,
    title: item.label,
    url: item.href,
    dropdown: Boolean(item.children?.length),
    items: item.children?.map((child, childIndex) => ({
      id: id * 100 + childIndex + 1,
      title: child.label,
      url: child.href,
      description: child.description,
    })),
  }
})

const kineticItems: KineticNavItem[] = navItems.map((item) => ({
  label: item.label,
  href: item.href,
  children: item.children?.map((child) => ({
    label: child.label,
    href: child.href,
  })),
}))

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeId, setActiveId] = useState('home')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const ids = Array.from(
      new Set(
        navItems.flatMap((item) => [
          item.href,
          ...(item.children?.map((child) => child.href) ?? []),
        ]),
      ),
    )
      .filter((href) => href.startsWith('#'))
      .map((href) => href.slice(1))

    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null)

    if (sections.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

        if (visible) setActiveId(visible.target.id)
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: [0, 0.2, 0.5, 1] },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!menuOpen) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }

    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [menuOpen])

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 1220px)')
    const onChange = () => {
      if (desktop.matches) setMenuOpen(false)
    }

    desktop.addEventListener('change', onChange)
    return () => desktop.removeEventListener('change', onChange)
  }, [])

  const closeMenu = () => {
    setMenuOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 border-b border-ink/10 bg-white font-sans">
      <div
        className={`transition-shadow duration-300 ${
          scrolled ? 'shadow-[0_14px_30px_-26px_rgba(13,47,56,0.5)]' : ''
        }`}
      >
        <div className="mx-auto flex min-h-[88px] w-full max-w-[1280px] items-center gap-5 px-7 max-[900px]:px-5 max-[640px]:min-h-[70px]">
          <a
            className="inline-flex min-w-0 shrink-0 items-center gap-3 max-[640px]:gap-2.5"
            href="#home"
            aria-label={`${siteInfo.name} — beranda`}
          >
            <img
              src={schoolLogo}
              alt=""
              width="52"
              height="52"
              className="h-[52px] w-[52px] shrink-0 object-contain max-[640px]:h-11 max-[640px]:w-11"
            />
            <span className="flex min-w-0 flex-col gap-[4px] leading-none">
              <span className="whitespace-nowrap font-display text-[17px] font-extrabold tracking-[-0.005em] text-ink uppercase max-[640px]:text-[14.5px]">
                {siteInfo.name}
              </span>
              <span className="whitespace-nowrap text-[9.5px] font-bold tracking-[0.16em] text-olive uppercase max-[640px]:text-[8px] max-[640px]:tracking-[0.1em] max-[380px]:hidden">
                Boarding School · Mungkid
              </span>
            </span>
          </a>

          <Menu list={menuList} activeUrl={`#${activeId}`} className="ml-auto" />

          <a
            className="ml-auto hidden shrink-0 items-center gap-1.5 rounded-full bg-gold px-6 py-3 text-[12.5px] font-extrabold tracking-[0.08em] whitespace-nowrap text-ink uppercase shadow-[0_10px_22px_-14px_rgba(249,105,0,0.65)] transition hover:-translate-y-px hover:bg-magenta hover:text-ink hover:shadow-[0_14px_26px_-14px_rgba(241,127,41,0.5)] min-[1220px]:inline-flex"
            href={siteInfo.ppdbUrl}
            target="_blank"
            rel="noreferrer"
          >
            PPDB
            <ArrowUpRight className="h-[14px] w-[14px]" strokeWidth={2.4} />
          </a>

          <button
            className="ml-auto grid h-11 w-11 shrink-0 place-items-center rounded-full border border-ink/10 bg-ink/[0.03] text-ink transition-colors hover:border-gold/40 hover:bg-gold/10 min-[1220px]:hidden"
            type="button"
            aria-label="Buka menu navigasi"
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen(true)}
          >
            <MenuIcon className="h-[22px] w-[22px]" strokeWidth={1.8} />
          </button>
        </div>
      </div>

      <SterlingGateKineticNavigation
        open={menuOpen}
        onClose={closeMenu}
        items={kineticItems}
        activeHref={`#${activeId}`}
        site={siteInfo}
        logoSrc={schoolLogo}
      />
    </header>
  )
}
