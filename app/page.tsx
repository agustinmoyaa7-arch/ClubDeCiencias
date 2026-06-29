import { Lightbulb, Brain } from 'lucide-react'
import { HomeHero } from '@/components/home-hero'
import { FlipCard } from '@/components/flip-card'
import { Reveal, StaggerGroup, StaggerItem } from '@/components/reveal'
import { HandButton } from '@/components/hand-button'
import { ACTIVITIES } from '@/lib/site'

export default function HomePage() {
  return (
    <>
      <HomeHero />

      {/* Bienvenidos */}
      <section className="mx-auto max-w-3xl px-4 py-16 text-center">
        <Reveal>
          <h2 className="font-display text-4xl text-primary sm:text-5xl">¡Bienvenidos!</h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-4 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
            Somos estudiantes apasionados por la ciencia, la curiosidad y el aprendizaje colectivo.
            Experimentamos, descubrimos y compartimos conocimiento con nuestra comunidad.
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="mt-7 flex justify-center">
            <HandButton href="/sobre-nosotros">Conocé más</HandButton>
          </div>
        </Reveal>
      </section>

      {/* Actividades */}
      <section className="mx-auto max-w-6xl px-4 pb-8">
        <Reveal className="mb-8 text-center">
          <h2 className="font-display text-4xl text-foreground sm:text-5xl">
            Explorá nuestras actividades
          </h2>
          <p className="mt-2 text-sm font-semibold uppercase tracking-widest text-muted-foreground">
            Tocá una tarjeta para darla vuelta
          </p>
        </Reveal>

        <StaggerGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {ACTIVITIES.map((a) => (
            <StaggerItem key={a.slug}>
              <FlipCard activity={a} />
            </StaggerItem>
          ))}
        </StaggerGroup>
      </section>

      {/* CTA banner */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border-2 border-foreground/15 bg-notebook bg-card px-6 py-12 text-center shadow-[6px_6px_0_oklch(0.26_0.02_60_/_15%)]">
            <div className="relative flex flex-col items-center gap-5">
              <div className="flex items-center gap-4 text-primary">
                <Lightbulb className="size-8" aria-hidden />
                <Brain className="size-8 text-red" aria-hidden />
              </div>
              <h2 className="font-display text-4xl leading-tight text-foreground sm:text-5xl">
                ¿Te gusta la ciencia?{' '}
                <span className="text-red">¡Sumate al club!</span>
              </h2>
              <p className="max-w-md text-pretty text-muted-foreground">
                Escribinos y formá parte de los próximos experimentos, viajes y proyectos.
              </p>
              <HandButton href="/contacto">Contactanos</HandButton>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  )
}
