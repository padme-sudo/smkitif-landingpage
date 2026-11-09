import { useLayoutEffect, type RefObject } from 'react'
import { animate, stagger, utils } from 'animejs'

type RevealOptions = {
  /** Jarak geser awal dalam piksel. */
  distance?: number
  /** Durasi tiap elemen dalam milidetik. */
  duration?: number
  /** Jeda antar elemen yang muncul bersamaan dalam milidetik. */
  step?: number
}

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * Memunculkan elemen bertanda `data-reveal` di dalam `ref` saat masuk viewport,
 * menggunakan anime.js. Elemen yang masuk bersamaan dianimasikan dengan stagger.
 */
export function useReveal<T extends HTMLElement>(
  ref: RefObject<T | null>,
  { distance = 28, duration = 720, step = 80 }: RevealOptions = {},
) {
  useLayoutEffect(() => {
    const root = ref.current
    if (!root) return

    const targets = Array.from(root.querySelectorAll<HTMLElement>('[data-reveal]'))
    if (targets.length === 0) return
    if (prefersReducedMotion() || typeof IntersectionObserver === 'undefined') return

    utils.set(targets, { opacity: 0, y: distance })

    const revealed = new Set<Element>()
    const animations: ReturnType<typeof animate>[] = []

    const observer = new IntersectionObserver(
      (entries) => {
        const entering = entries.filter(
          (entry) => entry.isIntersecting && !revealed.has(entry.target),
        )
        if (entering.length === 0) return

        entering.forEach((entry) => {
          revealed.add(entry.target)
          observer.unobserve(entry.target)
        })

        animations.push(
          animate(
            entering.map((entry) => entry.target as HTMLElement),
            {
              opacity: 1,
              y: 0,
              duration,
              delay: stagger(step),
              ease: 'out(3)',
            },
          ),
        )
      },
      { threshold: 0.15 },
    )

    targets.forEach((target) => observer.observe(target))

    return () => {
      observer.disconnect()
      animations.forEach((animation) => animation.revert())
      utils.remove(targets)
    }
  }, [ref, distance, duration, step])
}
