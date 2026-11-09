import { useEffect, useRef, useState } from 'react'
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
  const menuButtonRef = useRef<HTMLButtonElement>(null)

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
    const desktop = window.matchMedia('(min-width: 1120px)')
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
    <header className="sticky top-0 z-50 font-sans">
      <div
        className={`border-b transition-[background-color,border-color,box-shadow] duration-300 ${
          scrolled
            ? 'border-ink/10 bg-white shadow-[0_18px_40px_-28px_rgba(13,47,56,0.18)]'
            : 'border-transparent bg-transparent'
        }`}
      >
        <div
          className={`mx-auto flex w-full max-w-[1280px] items-center gap-[18px] px-7 transition-[min-height] duration-300 max-[900px]:px-5 ${
            scrolled ? 'min-h-[68px] max-[640px]:min-h-[62px]' : 'min-h-[82px] max-[640px]:min-h-[70px]'
          }`}
        >
          <a
            className="inline-flex min-w-0 shrink-0 items-center gap-[13px] max-[640px]:gap-2.5"
            href="#home"
            aria-label={`${siteInfo.name} — beranda`}
          >
            <img
              src={schoolLogo}
              alt=""
              width="54"
              height="54"
              className="h-[54px] w-[54px] shrink-0 object-contain max-[640px]:h-11 max-[640px]:w-11"
            />
            <span className="flex min-w-0 flex-col gap-[3px] leading-none">
              <span className="whitespace-nowrap font-display text-[16.5px] font-bold tracking-[-0.01em] text-ink max-[640px]:text-[14.5px]">
                {siteInfo.name}
              </span>
              <span className="whitespace-nowrap text-[10px] font-bold uppercase tracking-[0.14em] text-olive max-[640px]:text-[8.5px] max-[640px]:tracking-[0.09em] max-[380px]:hidden">
                Boarding School · Mungkid
              </span>
            </span>
          </a>

          <Menu list={menuList} activeUrl={`#${activeId}`} className="ml-auto" />

          <a
            className="hidden shrink-0 items-center gap-2 rounded-md bg-gold px-[18px] py-[11px] text-[13px] font-extrabold tracking-[0.01em] whitespace-nowrap text-ink shadow-[0_10px_24px_-12px_rgba(249,105,0,0.7)] transition hover:-translate-y-px hover:bg-magenta hover:text-ink hover:shadow-[0_16px_30px_-14px_rgba(241,127,41,0.5)] min-[1120px]:inline-flex"
            href={siteInfo.ppdbUrl}
            target="_blank"
            rel="noreferrer"
          >
            Daftar PPDB
            <ArrowUpRight className="h-[15px] w-[15px]" strokeWidth={2} />
          </a>

          <button
            className="ml-auto grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-ink/10 bg-ink/5 text-ink transition-colors hover:border-magenta/40 hover:bg-gold/15 hover:text-ink min-[1120px]:hidden"
            type="button"
            aria-label="Buka menu navigasi"
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen(true)}
            ref={menuButtonRef}
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
