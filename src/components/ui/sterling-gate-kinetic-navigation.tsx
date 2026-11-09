import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { CustomEase } from 'gsap/CustomEase'
import { ArrowUpRight, Mail, Phone, Plus } from 'lucide-react'

export type KineticNavChild = {
  label: string
  href: string
}

export type KineticNavItem = {
  label: string
  href: string
  children?: KineticNavChild[]
}

export type KineticNavSite = {
  name: string
  tagline: string
  phone: string
  phoneHref: string
  email: string
  ppdbUrl: string
}

type SterlingGateKineticNavigationProps = {
  open: boolean
  onClose: () => void
  items: KineticNavItem[]
  activeHref?: string
  site: KineticNavSite
  logoSrc: string
}

if (typeof window !== 'undefined') {
  gsap.registerPlugin(CustomEase)
  if (!gsap.parseEase('sgMain')) {
    try {
      CustomEase.create('sgMain', '0.65, 0.01, 0.05, 0.99')
    } catch {
      /* CustomEase may already be registered during HMR. */
    }
  }
}

export function SterlingGateKineticNavigation({
  open,
  onClose,
  items,
  activeHref,
  site,
  logoSrc,
}: SterlingGateKineticNavigationProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<gsap.core.Timeline | null>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const cleanups: Array<() => void> = []

    const ctx = gsap.context(() => {
      const root = containerRef.current
      if (!root) return

      const wrapper = root.querySelector<HTMLElement>('.nav-overlay-wrapper')
      const menu = root.querySelector<HTMLElement>('.menu-content')
      const overlay = root.querySelector<HTMLElement>('.overlay')
      const panels = root.querySelectorAll<HTMLElement>('.backdrop-layer')
      const links = root.querySelectorAll<HTMLElement>('.nav-link')
      const fadeTargets = root.querySelectorAll<HTMLElement>('[data-menu-fade]')
      const buttonTexts = root.querySelectorAll<HTMLElement>('.menu-button-text p')
      const buttonIcon = root.querySelector<HTMLElement>('.menu-button-icon')

      if (!wrapper || !menu || !overlay) return

      const timeline = gsap.timeline({
        paused: true,
        defaults: { ease: 'sgMain', duration: 0.7 },
        onReverseComplete: () => gsap.set(wrapper, { display: 'none' }),
      })

      timeline
        .set(wrapper, { display: 'block' })
        .fromTo(overlay, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.45 }, 0)
        .fromTo(
          panels,
          { xPercent: 101 },
          { xPercent: 0, stagger: 0.12, duration: 0.575 },
          0,
        )
        .fromTo(
          buttonTexts,
          { yPercent: 0 },
          { yPercent: -100, stagger: 0.08, duration: 0.5 },
          0.25,
        )
        .fromTo(buttonIcon, { rotate: 0 }, { rotate: 315, duration: 0.5 }, 0.25)
        .fromTo(
          links,
          { yPercent: 140, rotate: 8 },
          { yPercent: 0, rotate: 0, stagger: 0.05, duration: 0.7 },
          0.32,
        )
        .fromTo(
          fadeTargets,
          { autoAlpha: 0, yPercent: 40 },
          {
            autoAlpha: 1,
            yPercent: 0,
            stagger: 0.04,
            duration: 0.6,
            clearProps: 'all',
          },
          0.55,
        )

      timelineRef.current = timeline

      const shapesContainer = root.querySelector<HTMLElement>(
        '.ambient-background-shapes',
      )

      root
        .querySelectorAll<HTMLElement>('.menu-list-item[data-shape]')
        .forEach((item) => {
          const shapeIndex = item.dataset.shape
          if (!shapeIndex || !shapesContainer) return

          const shape = shapesContainer.querySelector<HTMLElement>(
            `.bg-shape-${shapeIndex}`,
          )
          if (!shape) return

          const elements = shape.querySelectorAll<SVGElement>('.shape-element')

          const onEnter = () => {
            shapesContainer
              .querySelectorAll('.bg-shape')
              .forEach((panel) => panel.classList.remove('active'))
            shape.classList.add('active')

            gsap.fromTo(
              elements,
              { scale: 0.5, opacity: 0, rotation: -10 },
              {
                scale: 1,
                opacity: 1,
                rotation: 0,
                duration: 0.6,
                stagger: 0.08,
                ease: 'back.out(1.7)',
                overwrite: 'auto',
              },
            )
          }

          const onLeave = () => {
            gsap.to(elements, {
              scale: 0.8,
              opacity: 0,
              duration: 0.3,
              ease: 'power2.in',
              overwrite: 'auto',
              onComplete: () => shape.classList.remove('active'),
            })
          }

          item.addEventListener('mouseenter', onEnter)
          item.addEventListener('mouseleave', onLeave)
          cleanups.push(() => {
            item.removeEventListener('mouseenter', onEnter)
            item.removeEventListener('mouseleave', onLeave)
          })
        })
    }, containerRef)

    return () => {
      cleanups.forEach((cleanup) => cleanup())
      ctx.revert()
      timelineRef.current = null
    }
  }, [])

  useEffect(() => {
    const timeline = timelineRef.current
    if (!timeline) return

    const wrapper = containerRef.current?.querySelector<HTMLElement>(
      '.nav-overlay-wrapper',
    )
    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    wrapper?.setAttribute('data-nav', open ? 'open' : 'closed')

    if (!open) {
      if (reduceMotion) {
        timeline.progress(0)
        if (wrapper) gsap.set(wrapper, { display: 'none' })
      } else {
        timeline.reverse()
      }
      return
    }

    if (reduceMotion) {
      timeline.progress(1)
    } else {
      timeline.play()
    }
  }, [open])

  useEffect(() => {
    if (!open) return

    const previous =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null
    const timeout = window.setTimeout(
      () => closeButtonRef.current?.focus(),
      120,
    )

    return () => {
      window.clearTimeout(timeout)
      previous?.focus()
    }
  }, [open])

  return (
    <div className="kinetic-nav" ref={containerRef}>
      <div
        className="fullscreen-menu-container"
        id="mobile-navigation"
        aria-hidden={!open}
        inert={!open}
      >
        <div data-nav="closed" className="nav-overlay-wrapper">
          <div className="overlay" onClick={onClose} aria-hidden="true" />

          <nav
            className="menu-content"
            role="dialog"
            aria-modal="true"
            aria-label="Menu navigasi"
          >
            <div className="menu-bg" aria-hidden="true">
              <div className="backdrop-layer first" />
              <div className="backdrop-layer second" />
              <div className="backdrop-layer" />

              <div className="ambient-background-shapes">
                <svg className="bg-shape bg-shape-1" viewBox="0 0 400 400" fill="none">
                  <circle
                    className="shape-element"
                    cx="80"
                    cy="120"
                    r="40"
                    fill="rgba(249,105,0,0.18)"
                  />
                  <circle
                    className="shape-element"
                    cx="300"
                    cy="80"
                    r="60"
                    fill="rgba(241,127,41,0.16)"
                  />
                  <circle
                    className="shape-element"
                    cx="200"
                    cy="300"
                    r="80"
                    fill="rgba(248,251,244,0.08)"
                  />
                  <circle
                    className="shape-element"
                    cx="350"
                    cy="280"
                    r="30"
                    fill="rgba(168,220,209,0.45)"
                  />
                </svg>

                <svg className="bg-shape bg-shape-2" viewBox="0 0 400 400" fill="none">
                  <path
                    className="shape-element"
                    d="M0 200 Q100 100, 200 200 T 400 200"
                    stroke="rgba(249,105,0,0.22)"
                    strokeWidth="60"
                    fill="none"
                  />
                  <path
                    className="shape-element"
                    d="M0 280 Q100 180, 200 280 T 400 280"
                    stroke="rgba(241,127,41,0.2)"
                    strokeWidth="40"
                    fill="none"
                  />
                </svg>

                <svg className="bg-shape bg-shape-3" viewBox="0 0 400 400" fill="none">
                  <circle className="shape-element" cx="50" cy="50" r="8" fill="rgba(249,105,0,0.35)" />
                  <circle className="shape-element" cx="150" cy="50" r="8" fill="rgba(241,127,41,0.35)" />
                  <circle className="shape-element" cx="250" cy="50" r="8" fill="rgba(248,251,244,0.25)" />
                  <circle className="shape-element" cx="350" cy="50" r="8" fill="rgba(249,105,0,0.35)" />
                  <circle className="shape-element" cx="100" cy="150" r="12" fill="rgba(241,127,41,0.3)" />
                  <circle className="shape-element" cx="200" cy="150" r="12" fill="rgba(248,251,244,0.22)" />
                  <circle className="shape-element" cx="300" cy="150" r="12" fill="rgba(249,105,0,0.32)" />
                  <circle className="shape-element" cx="50" cy="250" r="10" fill="rgba(248,251,244,0.25)" />
                  <circle className="shape-element" cx="150" cy="250" r="10" fill="rgba(249,105,0,0.35)" />
                  <circle className="shape-element" cx="250" cy="250" r="10" fill="rgba(241,127,41,0.32)" />
                  <circle className="shape-element" cx="350" cy="250" r="10" fill="rgba(248,251,244,0.25)" />
                  <circle className="shape-element" cx="100" cy="350" r="6" fill="rgba(249,105,0,0.35)" />
                  <circle className="shape-element" cx="200" cy="350" r="6" fill="rgba(241,127,41,0.3)" />
                  <circle className="shape-element" cx="300" cy="350" r="6" fill="rgba(248,251,244,0.25)" />
                </svg>

                <svg className="bg-shape bg-shape-4" viewBox="0 0 400 400" fill="none">
                  <path
                    className="shape-element"
                    d="M100 100 Q150 50, 200 100 Q250 150, 200 200 Q150 250, 100 200 Q50 150, 100 100"
                    fill="rgba(249,105,0,0.16)"
                  />
                  <path
                    className="shape-element"
                    d="M250 200 Q300 150, 350 200 Q400 250, 350 300 Q400 250, 350 300 Q300 350, 250 300 Q200 250, 250 200"
                    fill="rgba(241,127,41,0.18)"
                  />
                </svg>

                <svg className="bg-shape bg-shape-5" viewBox="0 0 400 400" fill="none">
                  <line
                    className="shape-element"
                    x1="0"
                    y1="100"
                    x2="300"
                    y2="400"
                    stroke="rgba(249,105,0,0.22)"
                    strokeWidth="30"
                  />
                  <line
                    className="shape-element"
                    x1="100"
                    y1="0"
                    x2="400"
                    y2="300"
                    stroke="rgba(248,251,244,0.16)"
                    strokeWidth="25"
                  />
                  <line
                    className="shape-element"
                    x1="200"
                    y1="0"
                    x2="400"
                    y2="200"
                    stroke="rgba(241,127,41,0.22)"
                    strokeWidth="20"
                  />
                </svg>
              </div>
            </div>

            <div className="menu-topbar">
              <a
                className="kinetic-brand"
                href="#home"
                onClick={onClose}
                aria-label={`${site.name} — beranda`}
              >
                <span className="kinetic-brand-badge">
                  <img
                    src={logoSrc}
                    alt=""
                    width="46"
                    height="46"
                    className="kinetic-brand-logo"
                  />
                </span>
                <span className="kinetic-brand-name">
                  <strong>{site.name}</strong>
                  <span>{site.tagline}</span>
                </span>
              </a>

              <button
                className="nav-close-btn"
                type="button"
                aria-label="Tutup menu navigasi"
                onClick={onClose}
                ref={closeButtonRef}
              >
                <span className="menu-button-text" aria-hidden="true">
                  <p>Menu</p>
                  <p>Tutup</p>
                </span>
                <span className="icon-wrap">
                  <Plus className="menu-button-icon" strokeWidth={1.6} aria-hidden="true" />
                </span>
              </button>
            </div>

            <div className="menu-content-wrapper">
              <ul className="menu-list">
                {items.map((item, index) => {
                  const active =
                    activeHref === item.href ||
                    item.children?.some((child) => child.href === activeHref)

                  return (
                    <li
                      className="menu-list-item"
                      data-shape={(index % 5) + 1}
                      key={item.label}
                    >
                      <a
                        className="nav-link"
                        href={item.href}
                        onClick={onClose}
                        aria-current={active ? 'page' : undefined}
                      >
                        <span className="nav-link-text">{item.label}</span>
                        <span className="nav-link-hover-bg" aria-hidden="true" />
                      </a>

                      {item.children?.length ? (
                        <div className="nav-sublinks" data-menu-fade>
                          {item.children.map((child) => (
                            <a
                              className="nav-sublink"
                              href={child.href}
                              key={child.label}
                              onClick={onClose}
                            >
                              {child.label}
                            </a>
                          ))}
                        </div>
                      ) : null}
                    </li>
                  )
                })}
              </ul>

              <div className="menu-footer" data-menu-fade>
                <div className="menu-contact">
                  <a href={site.phoneHref}>
                    <Phone className="h-4 w-4 shrink-0" strokeWidth={1.8} aria-hidden="true" />
                    {site.phone}
                  </a>
                  <a href={`mailto:${site.email}`}>
                    <Mail className="h-4 w-4 shrink-0" strokeWidth={1.8} aria-hidden="true" />
                    {site.email}
                  </a>
                </div>

                <a
                  className="menu-ppdb"
                  href={site.ppdbUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  Daftar PPDB
                  <ArrowUpRight className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
                </a>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </div>
  )
}

export const Component = SterlingGateKineticNavigation
