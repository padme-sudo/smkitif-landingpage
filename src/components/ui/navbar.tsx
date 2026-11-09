import { useState } from 'react'
import { MotionConfig, motion } from 'framer-motion'
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
  const [hovered, setHovered] = useState<number | null>(null)

  return (
    <MotionConfig transition={{ bounce: 0, type: 'tween' }}>
      <nav
        className={cn('relative hidden min-[1120px]:block', className)}
        aria-label="Navigasi utama"
      >
        <ul className="flex items-center gap-1">
          {list.map((item) => {
            const isHovered = hovered === item.id
            const active =
              activeUrl === item.url || item.items?.some((child) => child.url === activeUrl)
            const showDot = (!hovered && active) || (isHovered && !item.dropdown)

            return (
              <li
                key={item.id}
                className="relative"
                onMouseEnter={() => setHovered(item.id)}
                onMouseLeave={() => setHovered(null)}
                onFocus={() => setHovered(item.id)}
                onBlur={(event) => {
                  if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
                    setHovered(null)
                  }
                }}
              >
                <a
                  className={cn(
                    'relative flex items-center justify-center gap-1 rounded-[10px] px-3.5 py-2.5 text-sm font-semibold whitespace-nowrap text-ink/70 transition-colors hover:bg-gold/10 hover:text-ink',
                    (isHovered || active) && 'bg-gold/15 text-ink',
                  )}
                  href={item.url}
                  aria-current={active ? 'page' : undefined}
                  aria-haspopup={item.dropdown ? 'true' : undefined}
                  aria-expanded={item.dropdown ? isHovered : undefined}
                >
                  {item.title}
                  {item.dropdown && (
                    <ChevronDown
                      className={cn(
                        'h-3.5 w-3.5 opacity-60 transition-transform duration-200',
                        isHovered && 'rotate-180',
                      )}
                      aria-hidden="true"
                    />
                  )}
                </a>

                {showDot && (
                  <motion.div
                    layout
                    layoutId="navbar-cursor"
                    className="pointer-events-none absolute bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-crimson"
                  />
                )}

                {isHovered && item.dropdown && (
                  <div
                    className="absolute left-0 top-full z-20 pt-3"
                    onMouseEnter={() => setHovered(item.id)}
                    onMouseLeave={() => setHovered(null)}
                  >
                    <motion.div
                      layout
                      layoutId="navbar-cursor"
                      initial={{ y: 10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ bounce: 0 }}
                      className="flex w-72 flex-col rounded-2xl border border-gold/40 bg-white p-2 shadow-[0_30px_60px_-30px_rgba(13,47,56,0.28)]"
                    >
                      {item.items?.map((nav) => (
                        <a
                          key={`link-${nav.id}`}
                          href={nav.url}
                          className="flex flex-col gap-0.5 rounded-[10px] px-3 py-2.5 transition-colors hover:bg-gold/15"
                          onClick={() => setHovered(null)}
                        >
                          <span className="text-[13.5px] font-semibold text-ink">
                            {nav.title}
                          </span>
                          {nav.description && (
                            <span className="text-[11.5px] leading-snug text-olive">
                              {nav.description}
                            </span>
                          )}
                        </a>
                      ))}
                    </motion.div>
                  </div>
                )}
              </li>
            )
          })}
        </ul>
      </nav>
    </MotionConfig>
  )
}

export default Menu
