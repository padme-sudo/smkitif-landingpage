import { motion } from 'framer-motion'
import ustMustain from '../assets/img/Ust. Mustain - JSIT-Photoroom.png'

export default function SambutanKepalaSekolah() {
  return (
    <section
      id="sambutan"
      aria-labelledby="sambutan-title"
      className="relative scroll-mt-24 overflow-hidden bg-cream py-20 lg:py-28"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -left-24 top-0 h-[420px] w-[620px] rounded-full bg-[radial-gradient(circle,rgba(168,220,209,0.35),transparent_68%)] blur-2xl" />
        <div className="absolute -bottom-24 right-[6%] h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(249,105,0,0.14),transparent_70%)] blur-2xl" />
        <div className="hero-dots absolute inset-x-0 top-10 mx-auto h-40 w-full max-w-3xl opacity-30" />
      </div>

      <div className="relative mx-auto max-w-[1120px] px-7 lg:px-10">
        <h2 id="sambutan-title" className="sr-only">
          Sambutan Kepala Sekolah
        </h2>

        <div className="grid items-center gap-12 lg:grid-cols-[320px_1fr] lg:gap-16">
          <motion.div
            className="flex flex-col items-center text-center"
            initial={{ opacity: 0, x: -28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-90px' }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <div className="relative h-56 w-56 sm:h-64 sm:w-64 lg:h-72 lg:w-72">
              <div
                className="absolute -inset-2 rounded-full bg-[conic-gradient(from_140deg,#f96900,#f17f29,#a8dcd1,#65def1,#f96900)] opacity-80"
                aria-hidden="true"
              />
              <div
                className="absolute inset-0 rounded-full bg-[linear-gradient(160deg,#e6eed8,#a8dcd1)]"
                aria-hidden="true"
              />
              <img
                src={ustMustain}
                alt="Ust. Mustain, Kepala SMK IT Ihsanul Fikri"
                className="absolute inset-0 h-full w-full rounded-full object-cover object-top p-1"
                loading="lazy"
              />
            </div>

            <p className="mt-6 font-display text-lg font-bold text-ink">
              Ust. Mustain, S.Pd., Gr.
            </p>
            <p className="mt-1 text-sm text-ink/55">
              Kepala SMK IT Ihsanul Fikri Mungkid
            </p>

            <div className="mt-5 flex items-center gap-3" aria-hidden="true">
              <span className="h-1.5 w-1.5 rounded-full bg-gold" />
              <span className="h-px w-14 bg-gradient-to-r from-gold/60 to-transparent" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-90px' }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
          >
            <p className="text-xs font-extrabold uppercase tracking-[0.15em] text-gold-deep">
              Sambutan Kepala Sekolah
            </p>

            <blockquote className="mt-5 font-jargon text-[clamp(1.6rem,3.4vw,2.6rem)] font-bold leading-[1.26] tracking-[-0.015em] text-ink">
              “Kami berkomitmen mencetak lulusan yang{' '}
              <span className="text-gold-deep">terampil</span>,{' '}
              <span className="text-gold-deep">mandiri</span>, dan berlandaskan{' '}
              <span className="text-gold-deep">Al-Qur&rsquo;an</span> serta
              Sunnah dalam setiap langkah.”
            </blockquote>

            <p className="mt-6 max-w-xl text-[15px] leading-[1.8] text-ink/65">
              Assalamu&rsquo;alaikum warahmatullahi wabarakatuh. Semoga setiap
              langkah kita menjadi wasilah lahirnya generasi yang bermanfaat
              bagi agama, bangsa, dan umat.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
