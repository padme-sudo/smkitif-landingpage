import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  ArrowUpRight,
} from 'lucide-react'
import studentLaptop from '../assets/img/Student with Laptop in Academy Uniform.png'
import studentCamera from '../assets/img/wkwk.png'
import studentBook from '../assets/img/zufar.png'
import logoIf from '../assets/img/IF LOGO if.png'
import logoSmk from '../assets/img/SMK.png'
import { siteInfo } from '../data/navigation'

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0 },
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
}

const headlinePhrases = [
  { text: 'SMK IT Ihsanul Fikri', kind: 'school' },
  { text: 'Terampil.', kind: 'value' },
  { text: 'Mandiri.', kind: 'value' },
  { text: 'Qur’ani.', kind: 'accent' },
] as const

function TypewriterHeadline() {
  const [reducedMotion] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )
  const [started, setStarted] = useState(reducedMotion)
  const [activeLine, setActiveLine] = useState(
    reducedMotion ? headlinePhrases.length : 0,
  )
  const [typed, setTyped] = useState<string[]>(() =>
    headlinePhrases.map((phrase) => (reducedMotion ? phrase.text : '')),
  )
  const done = typed.every(
    (value, index) => value.length === headlinePhrases[index].text.length,
  )

  useEffect(() => {
    if (started) return
    const timer = window.setTimeout(() => setStarted(true), 450)
    return () => window.clearTimeout(timer)
  }, [started])

  useEffect(() => {
    if (!started || done) return

    const phrase = headlinePhrases[activeLine]
    if (!phrase) return

    const visible = typed[activeLine] ?? ''
    if (visible.length < phrase.text.length) {
      const timer = window.setTimeout(() => {
        setTyped((current) =>
          current.map((value, index) =>
            index === activeLine
              ? phrase.text.slice(0, value.length + 1)
              : value,
          ),
        )
      }, phrase.kind === 'school' ? 58 : 72)
      return () => window.clearTimeout(timer)
    }

    if (activeLine < headlinePhrases.length - 1) {
      const timer = window.setTimeout(
        () => setActiveLine((index) => index + 1),
        340,
      )
      return () => window.clearTimeout(timer)
    }
  }, [activeLine, done, started, typed])

  return (
    <h1
      id="hero-title"
      className="font-jargon text-[clamp(3.2rem,16.5vw,4.25rem)] font-bold leading-[0.98] tracking-[-0.02em] text-ink min-[640px]:text-[clamp(3.9rem,8.5vw,5.2rem)] lg:text-[clamp(2.9rem,6.1vw,5.4rem)]"
    >
      <span className="sr-only">
        SMK IT Ihsanul Fikri. Terampil. Mandiri. Qur’ani.
      </span>
      <span aria-hidden="true">
        {headlinePhrases.map((phrase, index) => {
          const isSchool = phrase.kind === 'school'
          const isAccent = phrase.kind === 'accent'
          const isActive = !done && started && index === activeLine

          return (
            <span
              key={phrase.text}
              className={[
                'block whitespace-nowrap',
                isSchool
                  ? 'mb-[0.2em] text-[0.42em] leading-[1.12] tracking-[-0.01em] text-ink/65'
                  : '',
                isAccent ? 'text-gold-deep' : '',
              ].join(' ')}
            >
              <span className="relative inline-block">
                <span className="invisible">{phrase.text}</span>
                <span className="absolute inset-0">
                  {typed[index]}
                  {isActive && <span className="type-caret" />}
                </span>
                {isAccent && (
                  <motion.svg
                    className="absolute -bottom-1.5 left-0 h-[11px] w-full text-gold"
                    viewBox="0 0 260 12"
                    fill="none"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                    initial={false}
                    animate={{ scaleX: done ? 1 : 0 }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    style={{ transformOrigin: 'left' }}
                  >
                    <path
                      d="M3 8.5C68 2.5 191 2 257 6.5"
                      stroke="currentColor"
                      strokeWidth="6"
                      strokeLinecap="round"
                    />
                  </motion.svg>
                )}
              </span>
            </span>
          )
        })}
      </span>
    </h1>
  )
}

export default function Hero() {
  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[calc(100svh-83px)] items-center overflow-hidden bg-cream max-[640px]:min-h-[calc(100svh-71px)]"
    >
      <div className="hero-backdrop pointer-events-none absolute inset-0" aria-hidden="true" />

      <div className="relative mx-auto grid w-full max-w-[1280px] items-center gap-10 px-7 pb-16 pt-8 max-[900px]:px-5 max-[900px]:gap-4 max-[640px]:pb-14 max-[640px]:pt-6 lg:grid-cols-[0.86fr_1.14fr] lg:gap-6 lg:pb-20 lg:pt-10">
        <motion.div
          className="relative z-10 min-w-0 max-w-[560px]"
          variants={stagger}
          initial="hidden"
          animate="visible"
        >
          <TypewriterHeadline />

          <motion.div
            className="mt-7 flex flex-wrap items-center gap-3 max-[480px]:gap-2.5"
            variants={fadeUp}
            transition={{ duration: 0.55, ease: 'easeOut' }}
          >
            <a
              className="group inline-flex items-center gap-2 rounded-md bg-gold px-6 py-3.5 text-[13.5px] font-extrabold tracking-[0.01em] text-ink shadow-[0_16px_32px_-16px_rgba(249,105,0,0.7)] transition hover:-translate-y-0.5 hover:bg-magenta hover:text-ink hover:shadow-[0_20px_36px_-16px_rgba(241,127,41,0.5)] max-[480px]:px-5"
              href={siteInfo.ppdbUrl}
              target="_blank"
              rel="noreferrer"
            >
              Daftar PPDB
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={2.2} />
            </a>

            <a
              className="group inline-flex items-center gap-2 rounded-md border border-ink/15 bg-white/55 px-5 py-3.5 text-[13.5px] font-bold text-ink backdrop-blur-sm transition hover:border-ink hover:bg-ink hover:text-cream max-[480px]:px-4"
              href="#jurusan"
            >
              Kenali Jurusan
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" strokeWidth={2} />
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          className="relative mx-auto h-[clamp(370px,42vw,580px)] w-full min-w-0 max-w-[680px] max-[900px]:mt-2 max-[900px]:h-[440px] max-[640px]:h-[320px] max-[480px]:h-[280px] max-[360px]:h-[250px]"
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.12 }}
        >
          <div className="absolute bottom-[1%] left-1/2 h-[93%] w-[93%] -translate-x-1/2 rounded-t-[999px] rounded-b-[42px] bg-[linear-gradient(155deg,rgba(220,226,200,0.82)_0%,rgba(168,220,209,0.72)_38%,rgba(101,222,241,0.78)_100%)] backdrop-blur-[2px] shadow-[0_50px_90px_-48px_rgba(13,47,56,0.4)]">
            <div className="absolute inset-2.5 rounded-t-[999px] rounded-b-[34px] border border-white/35" aria-hidden="true" />
            <div className="absolute inset-x-0 bottom-0 h-28 rounded-b-[42px] bg-gradient-to-t from-ink/15 to-transparent" aria-hidden="true" />
          </div>

          <div className="hero-dots absolute inset-x-0 top-0 h-[74%] w-[78%] opacity-60" aria-hidden="true" />
          <div
            className="absolute right-[5%] top-[7%] h-24 w-24 rounded-full border-[10px] border-magenta/20 max-[640px]:h-16 max-[640px]:w-16 max-[640px]:border-[7px]"
            aria-hidden="true"
          />

          <div
            className="absolute bottom-1 left-1/2 z-[2] h-5 w-[48%] -translate-x-1/2 rounded-full bg-ink/20 blur-lg"
            aria-hidden="true"
          />

          <div className="relative z-[3] flex h-full items-end justify-center -mx-4 max-[640px]:-mx-1">
            {/* Decorative elements */}
            <motion.img
              src={logoIf}
              alt=""
              className="absolute -top-6 -left-6 h-24 w-24 opacity-30 rotate-12 pointer-events-none max-[640px]:h-16 max-[640px]:w-16 max-[640px]:-top-4 max-[640px]:-left-4"
              aria-hidden="true"
              initial={{ opacity: 0, y: -20, rotate: 0 }}
              animate={{ 
                opacity: 0.3, 
                y: [0, -8, 0], 
                x: [0, 4, 0], 
                rotate: [12, 14, 12] 
              }}
              transition={{ 
                duration: 6, 
                ease: 'easeInOut', 
                delay: 0.3,
                repeat: Infinity,
                repeatType: 'reverse'
              }}
            />
            <motion.img
              src={logoSmk}
              alt=""
              className="absolute -top-4 right-4 h-20 w-20 opacity-25 -rotate-6 pointer-events-none max-[640px]:h-14 max-[640px]:w-14 max-[640px]:-top-2 max-[640px]:right-2"
              aria-hidden="true"
              initial={{ opacity: 0, y: -20, rotate: 0 }}
              animate={{ 
                opacity: 0.25, 
                y: [0, 10, 0], 
                x: [0, -5, 0], 
                rotate: [-6, -8, -6] 
              }}
              transition={{ 
                duration: 7, 
                ease: 'easeInOut', 
                delay: 0.5,
                repeat: Infinity,
                repeatType: 'reverse'
              }}
            />
            <div className="relative z-[3] flex h-full w-[38%] shrink-0 items-end justify-center max-[640px]:w-[34%]">
              <img
                src={studentCamera}
                alt="Siswa SMK IT Ihsanul Fikri memegang kamera"
                className="hero-student pointer-events-none h-[122%] w-auto max-w-none origin-bottom translate-x-[6%] object-contain drop-shadow-[0_24px_28px_rgba(13,47,56,0.22)] min-[640px]:h-[140%] lg:h-[125%] max-[400px]:h-[105%] max-[640px]:h-[155%] max-[640px]:translate-x-[3%]"
              />
            </div>

            <div className="relative z-[2] flex h-full w-[34%] shrink-0 items-end justify-center -ml-18 max-[640px]:-ml-10 max-[640px]:w-[28%]">
              <img
                src={studentBook}
                alt="Siswa SMK IT Ihsanul Fikri membawa buku dan tas"
                className="hero-student pointer-events-none h-[88%] w-auto max-w-none origin-bottom translate-x-[12%] object-contain drop-shadow-[0_24px_28px_rgba(13,47,56,0.22)] min-[640px]:h-[94%] lg:h-[88%] max-[640px]:h-[125%] max-[640px]:translate-x-[6%]"
              />
            </div>

            <div className="relative z-[3] flex h-full w-[38%] shrink-0 items-end justify-center -ml-6 max-[640px]:-ml-5 max-[640px]:w-[34%]">
              <img
                src={studentLaptop}
                alt="Siswa SMK IT Ihsanul Fikri membawa laptop"
                className="hero-student pointer-events-none h-[90%] w-auto max-w-none origin-bottom translate-x-[8%] object-contain drop-shadow-[0_28px_32px_rgba(13,47,56,0.22)] min-[640px]:h-[98%] lg:h-[92%] max-[640px]:h-[125%] max-[640px]:translate-x-[5%]"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
