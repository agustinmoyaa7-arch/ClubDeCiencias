import { Sparkles, HeartHandshake, Telescope, Users } from 'lucide-react'
import { PageHeader } from '@/components/page-header'
import { Reveal, StaggerGroup, StaggerItem } from '@/components/reveal'
import { HandButton } from '@/components/hand-button'
import { CLUB_INFO } from '@/lib/site'

export const metadata = {
  title: 'Sobre Nosotros · ConCiencia',
  description: 'Conocé al Club de Ciencia ConCiencia: quiénes somos, qué hacemos y por qué amamos la ciencia.',
}

const VALUES = [
  { icon: Telescope, title: 'Curiosidad', text: 'Nos hacemos preguntas sobre todo lo que nos rodea y buscamos respuestas con evidencia.' },
  { icon: Users, title: 'Comunidad', text: 'Aprendemos mejor juntos: compartimos ideas, dudas y descubrimientos.' },
  { icon: HeartHandshake, title: 'Compromiso', text: 'Usamos la ciencia para mejorar nuestro entorno y aportar a la sociedad.' },
  { icon: Sparkles, title: 'Creatividad', text: 'Combinamos rigor y imaginación para resolver problemas reales.' },
]

export default function SobreNosotrosPage() {
  return (
    <>
      <PageHeader
        eyebrow="Quiénes somos"
        title="Sobre Nosotros"
        description={CLUB_INFO.motto}
        titleClassName="text-blue"
      />

      <section className="mx-auto max-w-3xl space-y-4 px-4 py-16 text-center">
        <Reveal className="space-y-4">
          <p className="text-balance text-lg leading-relaxed text-muted-foreground">
            Somos un grupo de estudiantes apasionados por la ciencia, la curiosidad y el aprendizaje colectivo.
            Experimentamos, descubrimos y compartimos conocimiento desde el {CLUB_INFO.school} en {CLUB_INFO.city}.
          </p>
          <p className="leading-relaxed text-muted-foreground">
            El Club de Ciencia ConCiencia nació de las ganas de aprender más allá del aula. Nos reunimos para investigar,
            crear proyectos, escribir nuestra revista y viajar a conocer el mundo desde una mirada científica.
          </p>
        </Reveal>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-8">
        <Reveal className="mb-8 text-center">
          <h2 className="font-display text-4xl text-foreground">Lo que nos mueve</h2>
        </Reveal>
        <StaggerGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map((v) => (
            <StaggerItem key={v.title}>
              <article className="h-full rounded-3xl border-2 border-foreground/15 bg-card p-6 text-center shadow-[4px_4px_0_oklch(0.26_0.02_60_/_12%)]">
                <span className="inline-flex rounded-2xl bg-blue/15 p-3 text-blue">
                  <v.icon className="size-6" aria-hidden />
                </span>
                <h3 className="mt-4 font-display text-2xl text-foreground">{v.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{v.text}</p>
              </article>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-16 text-center">
        <Reveal className="flex flex-col items-center gap-4 rounded-3xl border-2 border-foreground/15 bg-secondary/60 p-10 shadow-[6px_6px_0_oklch(0.26_0.02_60_/_12%)]">
          <h2 className="font-display text-4xl text-red">¿Te gusta la ciencia?</h2>
          <p className="max-w-md text-muted-foreground">
            No importa si recién empezás o si ya sos un curioso experto. En ConCiencia hay lugar para vos.
          </p>
          <HandButton href="/contacto">Sumate al club</HandButton>
        </Reveal>
      </section>
    </>
  )
}
