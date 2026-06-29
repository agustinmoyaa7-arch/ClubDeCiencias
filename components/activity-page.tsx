import Image from 'next/image'
import type { LucideIcon } from 'lucide-react'
import { PageHeader } from '@/components/page-header'
import { Reveal, StaggerGroup, StaggerItem } from '@/components/reveal'
import { HandButton } from '@/components/hand-button'
import { cn } from '@/lib/utils'

const ACCENT: Record<string, string> = {
  blue: 'text-blue',
  green: 'text-green',
  pink: 'text-red',
  yellow: 'text-yellow',
}
const CHIP: Record<string, string> = {
  blue: 'bg-blue/15 text-blue',
  green: 'bg-green/20 text-green',
  pink: 'bg-pink/60 text-foreground',
  yellow: 'bg-yellow text-foreground',
}

export type Highlight = { icon: LucideIcon; title: string; text: string }

export function ActivityPage({
  color,
  title,
  description,
  image,
  intro,
  highlights,
  extra,
}: {
  color: string
  title: string
  description: string
  image: string
  intro: string[]
  highlights: Highlight[]
  extra?: React.ReactNode
}) {
  return (
    <>
      <PageHeader eyebrow="Actividades" title={title} description={description} titleClassName={ACCENT[color]} />

      <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 lg:grid-cols-2">
        <Reveal>
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl border-2 border-foreground/15 shadow-[6px_6px_0_oklch(0.26_0.02_60_/_15%)]">
            <Image src={image || '/placeholder.svg'} alt={title} fill priority sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
          </div>
        </Reveal>
        <Reveal delay={0.1} className="space-y-4">
          <h2 className="font-display text-3xl text-foreground sm:text-4xl">Sobre esta actividad</h2>
          {intro.map((p, i) => (
            <p key={i} className="text-pretty leading-relaxed text-muted-foreground">
              {p}
            </p>
          ))}
        </Reveal>
      </section>

      {extra}

      <section className="mx-auto max-w-6xl px-4 pb-8">
        <Reveal className="mb-8 text-center">
          <h2 className="font-display text-4xl text-foreground">Lo que hacemos</h2>
        </Reveal>
        <StaggerGroup className="grid gap-6 sm:grid-cols-3">
          {highlights.map((h) => (
            <StaggerItem key={h.title}>
              <article className="h-full rounded-3xl border-2 border-foreground/15 bg-card p-6 shadow-[4px_4px_0_oklch(0.26_0.02_60_/_12%)]">
                <span className={cn('inline-flex rounded-2xl p-3', CHIP[color])}>
                  <h.icon className="size-6" aria-hidden />
                </span>
                <h3 className="mt-4 font-display text-2xl text-foreground">{h.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{h.text}</p>
              </article>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-16 text-center">
        <Reveal className="flex flex-col items-center gap-4">
          <h2 className="font-display text-4xl text-foreground">¿Querés participar?</h2>
          <p className="max-w-md text-muted-foreground">
            Sumate al Club de Ciencia ConCiencia y viví esta actividad con nosotros.
          </p>
          <HandButton href="/contacto">Sumate al club</HandButton>
        </Reveal>
      </section>
    </>
  )
}
