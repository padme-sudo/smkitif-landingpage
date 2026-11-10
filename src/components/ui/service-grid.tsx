import * as React from 'react'
import { motion, useReducedMotion, type Variants } from 'framer-motion'
import { cn } from '@/lib/utils'

/**
 * Satu item layanan/jurusan pada grid.
 * @property {string} name - Nama jurusan.
 * @property {string} [description] - Keterangan singkat jurusan.
 * @property {string} icon - URL gambar ikon lokal dari assets.
 * @property {string} href - Tujuan tautan saat kartu diklik.
 * @property {string} [id] - Anchor opsional untuk navigasi.
 */
export interface Service {
  name: string
  description?: string
  icon: string
  href: string
  id?: string
}

export interface ServiceGridProps {
  id?: string
  title: string
  subtitle?: string
  services: Service[]
  className?: string
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 10,
    },
  },
}

const ServiceGrid = React.forwardRef<HTMLElement, ServiceGridProps>(
  ({ id, title, subtitle, services, className }, ref) => {
    const titleId = React.useId()
    const reduceMotion = useReducedMotion()

    return (
      <section
        ref={ref}
        id={id}
        aria-labelledby={titleId}
        className={cn('w-full py-12 md:py-16 lg:py-20', className)}
      >
        <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-8">
          <div className="mb-8 flex flex-col items-center justify-center space-y-2 text-center md:mb-12">
            <h2
              id={titleId}
              className="text-[30px] leading-[1.2] font-bold tracking-tight text-ink sm:text-[34px] lg:text-[36px]"
            >
              {title}
            </h2>
            <span className="mt-1 block h-[3px] w-14 rounded-full bg-gold" aria-hidden="true" />
            {subtitle && (
              <p className="mt-1 max-w-[680px] text-[15px] leading-relaxed text-olive md:text-[16px]">
                {subtitle}
              </p>
            )}
          </div>

          <motion.div
            className="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-8 lg:gap-10"
            variants={reduceMotion ? undefined : containerVariants}
            initial={reduceMotion ? false : 'hidden'}
            whileInView={reduceMotion ? undefined : 'visible'}
            viewport={{ once: true, amount: 0.15 }}
          >
            {services.map((service) => {
              const IconUrl = service.icon

              return (
                <motion.a
                  key={service.id ?? service.name}
                  id={service.id}
                  href={service.href}
                  className="group flex h-full flex-col items-center text-center"
                  variants={reduceMotion ? undefined : itemVariants}
                  transition={{ type: 'spring', stiffness: 320, damping: 22 }}
                >
                  <img
                    src={IconUrl}
                    alt=""
                    className="h-28 w-28 object-contain transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-105 sm:h-32 sm:w-32 md:h-36 md:w-36"
                    loading="lazy"
                  />
                  <span className="mt-5 block text-[17px] leading-snug font-bold text-ink transition-colors duration-200 group-hover:text-gold-deep sm:text-[18px]">
                    {service.name}
                  </span>
                  {service.description && (
                    <span className="mt-2.5 block max-w-[340px] text-[14px] leading-relaxed text-olive sm:text-[14.5px]">
                      {service.description}
                    </span>
                  )}
                </motion.a>
              )
            })}
          </motion.div>
        </div>
      </section>
    )
  },
)

ServiceGrid.displayName = 'ServiceGrid'

export { ServiceGrid }
