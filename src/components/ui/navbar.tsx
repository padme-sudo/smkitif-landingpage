import { useEffect, useRef, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

export type IMenuItem = {
  id: number
  title: string
  url: string
  description?: string
  dropdown?: boolean
  items?: IMenuItem[]
}

type MenuProps = {
  list: IMenuItem[]
  activeUrl?: string
  className?: string
}

const Menu = ({ list, activeUrl, className }: MenuProps) => {
  const [openId, setOpenId] = useState<number | null>(null)
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (openId === null) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpenId(null)
    }

    const onPointerDown = (event: PointerEvent) => {
      if (!navRef.current?.contains(event.target as Node)) setOpenId(null)
    }

    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('pointerdown', onPointerDown)

    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('pointerdown', onPointerDown)
    }
  }, [openId])

  return (
    <nav
      ref={navRef}
      className={cn('relative hidden min-[1220px]:block', className)}
      aria-label="Navigasi utama"
    >
      <ul className="flex items-center gap-0.5">
        {list.map((item) => {
          const active =
            activeUrl === item.url ||
            item.items?.some((child) => child.url === activeUrl) === true
          const open = openId === item.id
          const highlighted = active || open

          return (
            <li
              key={item.id}
              className="relative"
              onMouseEnter={() => setOpenId(item.dropdown ? item.id : null)}
              onMouseLeave={() => setOpenId(null)}
              onFocus={() => setOpenId(item.dropdown ? item.id : null)}
              onBlur={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
                  setOpenId(null)
                }
              }}
            >
              <a
                className={cn(
                  'flex items-center gap-1.5 px-2.5 py-2.5 text-[12px] font-semibold whitespace-nowrap uppercase tracking-[0.07em] transition-colors duration-200',
                  highlighted ? 'text-gold-deep' : 'text-ink/70 hover:text-ink',
                )}
                href={item.url}
                aria-current={active ? 'page' : undefined}
                aria-haspopup={item.dropdown ? 'true' : undefined}
                aria-expanded={item.dropdown ? open : undefined}
                onClick={() => setOpenId(null)}
              >
                {item.title}
                {item.dropdown && (
                  <ChevronDown
                    className={cn(
                      'h-3.5 w-3.5 transition-transform duration-200',
                      open && 'rotate-180',
                    )}
                    strokeWidth={2.2}
                    aria-hidden="true"
                  />
                )}
              </a>

              {item.dropdown && (
                <div
                  className={cn(
                    'absolute top-full left-0 z-20 min-w-[320px] border-t-2 border-gold/80 bg-[#f6f7f9] py-2 shadow-[0_28px_50px_-30px_rgba(13,47,56,0.35)] transition-all duration-200',
                    open
                      ? 'visible translate-y-0 opacity-100'
                      : 'invisible -translate-y-1 opacity-0',
                  )}
                >
                  <ul className="flex flex-col">
                    {item.items?.map((nav) => (
                      <li key={nav.id}>
                        <a
                          className="block px-6 py-3.5 text-[13.5px] leading-snug font-medium text-ink/75 transition-colors hover:bg-white hover:text-ink"
                          href={nav.url}
                          onClick={() => setOpenId(null)}
                        >
                          {nav.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default Menu
