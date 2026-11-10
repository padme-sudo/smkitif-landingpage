import * as React from "react"

import { cn } from "@/lib/utils"

export interface MarqueeProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Tambahan class pada elemen kontainer animasi. */
  className?: string
  /** Membalik arah animasi. */
  reverse?: boolean
  /** Menjeda animasi saat kursor di atas marquee. */
  pauseOnHover?: boolean
  /** Konten yang digulirkan. */
  children: React.ReactNode
  /** Menggulir vertikal (default horizontal). */
  vertical?: boolean
  /** Jumlah pengulangan konten agar loop mulus. */
  repeat?: number
}

export function Marquee({
  className,
  reverse = false,
  pauseOnHover = false,
  children,
  vertical = false,
  repeat = 4,
  ...props
}: MarqueeProps) {
  return (
    <div
      {...props}
      className={cn(
        "group flex overflow-hidden p-2 [--duration:40s] [--gap:1rem] [gap:var(--gap)]",
        vertical ? "flex-col" : "flex-row",
        className,
      )}
    >
      {Array.from({ length: repeat }).map((_, i) => (
        <div
          key={i}
          className={cn(
            "flex shrink-0 justify-around [gap:var(--gap)]",
            vertical ? "animate-marquee-vertical flex-col" : "animate-marquee flex-row",
            pauseOnHover && "group-hover:[animation-play-state:paused]",
            reverse && "[animation-direction:reverse]",
          )}
        >
          {children}
        </div>
      ))}
    </div>
  )
}
