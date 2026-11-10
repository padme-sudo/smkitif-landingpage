import { UserRound } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Marquee } from "@/components/ui/marquee-03-utils/marquee"

type Alumni = {
  name: string
  role: string
  body: string
}

/** Data testimoni alumni SMK IT Ihsanul Fikri Mungkid (sumber: smkitihsanulfikri.sch.id). */
const alumni: Alumni[] = [
  {
    name: "Zaki Tirta",
    role: "Markaz Qur’an",
    body:
      "Kalau kalian mencari fasilitas mewah, kamu salah tempat. Tapi kalau kalian mencari kualitas, ayok bersama di SMKIT Ihsanul Fikri wujudkan mimpi itu.",
  },
  {
    name: "Dirgantara Putra U",
    role: "PT Krisbow Indonesia · Universitas Pamulang",
    body:
      "Di sekolah ini, potensi diri semakin meningkat. Saya sangat bersyukur bisa sekolah di lembaga pendidikan berkualitas, mengajarkan kreatifitas, dan dibekali ilmu agama.",
  },
  {
    name: "M Fathan A.F",
    role: "UIN Bandung",
    body:
      "Disini kami diajarkan makna sebuah kesederhanaan, kemandirian, dan perjuangan. Dengan hal itulah kami dapat belajar untuk menjadi besar. Barakallah! Jadilah bagian dari perjuangan kami!",
  },
  {
    name: "M Abdul Fattah Rabbani",
    role: "MMTC Kominfo Jogja",
    body:
      "SMKIT Ihsanul Fikri merupakan tempat aku menimba banyak ilmu. Diantaranya ilmu tentang teknologi, cara bersosial dengan warga desa, bagaimana bersikap sopan santun terhadap yang lebih tua, dan tentunya ilmu agama. Itu semua membuatku menjadi pribadi yang lebih baik dari sebelumnya.",
  },
  {
    name: "M Haedar Abdul Rahman",
    role: "PT. Pritech Indonesia",
    body:
      "Sekolah ini mengajarkanku arti kehidupan sebenarnya, membuka cakrawala berpikir yang kritis dan dinamis. Ikatan persaudaraan yang kuat dan pendidikan yang luas. Tentu hal ini karena bimbingan dari guru yang begitu sabar dan tulus mengajar kami.",
  },
  {
    name: "Ahmad Syaifuddin",
    role: "Untidar Magelang",
    body:
      "Ihsanul Fikri benar-benar membangun karakter saya, nilai-nilai keagamaan yang tidak terpisahkan dalam setiap keseharian disana membuat bangga pernah bersekolah di SMKIT Ihsanul Fikri.",
  },
]

const AlumniCard = ({ name, role, body }: Alumni) => {
  return (
    <Card className="relative w-full max-w-sm cursor-default overflow-hidden border border-border bg-card p-4 shadow-none">
      <CardContent className="flex flex-col gap-2 p-0">
        <div className="flex flex-row items-center gap-2">
          <span
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gold/15 text-gold-deep"
            aria-hidden="true"
          >
            <UserRound className="h-4 w-4" strokeWidth={2} />
          </span>
          <div className="flex min-w-0 flex-col">
            <p className="truncate text-sm font-medium text-foreground">{name}</p>
            <p className="truncate text-xs font-medium text-muted-foreground">{role}</p>
          </div>
        </div>
        <p className="text-sm leading-relaxed text-foreground">“{body}”</p>
      </CardContent>
    </Card>
  )
}

const TestimoniAlumniMarquee = () => {
  return (
    <section
      id="testimoni"
      aria-labelledby="testimoni-title"
      className="bg-cream"
    >
      <div className="mx-auto w-full max-w-[1200px] px-5 py-16 sm:px-8 md:py-20 lg:py-24">
        <header className="text-center">
          <h2
            id="testimoni-title"
            className="text-[28px] leading-[1.2] font-bold tracking-tight text-ink sm:text-[32px] lg:text-[36px]"
          >
            Testimoni Alumni
          </h2>
          <span
            className="mx-auto mt-4 block h-[6px] w-24 rounded-[2px] bg-gold"
            aria-hidden="true"
          />
          <p className="mx-auto mt-4 max-w-[620px] text-[15px] leading-relaxed text-olive md:text-[16px]">
            Cerita dan kesan para alumni SMK IT Ihsanul Fikri Mungkid setelah menempuh
            pendidikan.
          </p>
        </header>

        <div className="relative mt-10 flex h-[500px] w-full flex-row items-center justify-center overflow-hidden md:mt-14">
          <div className="flex h-full w-full flex-row items-center justify-center gap-4">
            <Marquee
              pauseOnHover
              vertical
              className="hidden h-full flex-1 [--duration:28s] sm:flex"
            >
              {alumni
                .filter((_, i) => i % 3 === 0)
                .map((item, idx) => (
                  <AlumniCard key={idx} {...item} />
                ))}
            </Marquee>
            <Marquee
              reverse
              pauseOnHover
              vertical
              className="hidden h-full flex-1 [--duration:28s] sm:flex"
            >
              {alumni
                .filter((_, i) => i % 3 === 1)
                .map((item, idx) => (
                  <AlumniCard key={idx} {...item} />
                ))}
            </Marquee>
            <Marquee
              pauseOnHover
              vertical
              className="hidden h-full flex-1 [--duration:28s] lg:flex"
            >
              {alumni
                .filter((_, i) => i % 3 === 2)
                .map((item, idx) => (
                  <AlumniCard key={idx} {...item} />
                ))}
            </Marquee>
            <Marquee
              pauseOnHover
              vertical
              className="flex h-full flex-1 [--duration:28s] sm:hidden"
            >
              {alumni.map((item, idx) => (
                <AlumniCard key={idx} {...item} />
              ))}
            </Marquee>
          </div>
          <div className="pointer-events-none absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-cream" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-cream" />
        </div>
      </div>
    </section>
  )
}

export default TestimoniAlumniMarquee
