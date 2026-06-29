import { Reveal } from '@/components/reveal'
import { cn } from '@/lib/utils'

export function PageHeader({
  eyebrow,
  title,
  description,
  titleClassName,
}: {
  eyebrow?: string
  title: string
  description?: string
  titleClassName?: string
}) {
  return (
    <header className="relative overflow-hidden border-b-2 border-foreground/10 bg-notebook">
      <div className="absolute inset-0 bg-gradient-to-b from-background/30 to-background/85" />
      <div className="relative mx-auto max-w-4xl px-4 py-14 text-center sm:py-16">
        {eyebrow && (
          <Reveal>
            <p className="text-sm font-bold uppercase tracking-widest text-primary">{eyebrow}</p>
          </Reveal>
        )}
        <Reveal delay={0.05}>
          <h1 className={cn('mt-1 font-display text-5xl leading-none text-foreground sm:text-6xl', titleClassName)}>
            {title}
          </h1>
        </Reveal>
        {description && (
          <Reveal delay={0.12}>
            <p className="mx-auto mt-4 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
              {description}
            </p>
          </Reveal>
        )}
      </div>
    </header>
  )
}
