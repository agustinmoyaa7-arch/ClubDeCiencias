'use client'

import Image from 'next/image'
import { motion, useReducedMotion } from 'motion/react'
import { HandButton } from '@/components/hand-button'
import { CLUB_INFO } from '@/lib/site'

export function HomeHero() {
  const reduce = useReducedMotion()

  const rise = (delay: number) => ({
    initial: reduce ? { opacity: 0 } : { opacity: 0, y: 26 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.55, delay, ease: 'easeOut' as const },
  })

  return (
    <section className="relative overflow-hidden bg-notebook">
      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/70 to-background" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-8 px-4 py-12 lg:grid-cols-2 lg:py-20">
        {/* Title block */}
        <div className="text-center lg:text-left">
          <motion.h1 {...rise(0)} className="font-display leading-[0.85]">
            <span className="block text-5xl text-blue sm:text-6xl lg:text-7xl">Club</span>
            <span className="block text-3xl text-foreground sm:text-4xl">de</span>
            <span className="block text-6xl text-red sm:text-7xl lg:text-8xl">Ciencia</span>
          </motion.h1>

          <motion.div
            {...rise(0.15)}
            className="relative mx-auto mt-4 inline-flex items-center justify-center lg:mx-0"
          >
            <span className="rounded-blob bg-pink/70 px-8 py-3 font-hand text-3xl text-foreground sm:text-4xl">
              ConCiencia
            </span>
          </motion.div>

          <motion.p {...rise(0.3)} className="mx-auto mt-6 max-w-md text-pretty text-base leading-relaxed text-muted-foreground lg:mx-0">
            {CLUB_INFO.motto} Somos un club de estudiantes del {CLUB_INFO.school} de {CLUB_INFO.city}.
          </motion.p>

          <motion.div {...rise(0.4)} className="mt-7 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
            <HandButton href="/sobre-nosotros">Conocé más</HandButton>
            <HandButton href="/contacto" variant="outline">Sumate al club</HandButton>
          </motion.div>
        </div>

        {/* Illustration + speech bubble */}
        <motion.div
          initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
          className="relative"
        >
          <div className="relative mx-auto aspect-[4/3] w-full max-w-xl overflow-hidden rounded-3xl border-2 border-foreground/15 bg-card shadow-[6px_6px_0_oklch(0.26_0.02_60_/_15%)]">
            <Image
              src="/images/miembro-del-club.jpeg"
              alt="Miembros del Club de Ciencia ConCiencia"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16, rotate: -3 }}
            animate={{ opacity: 1, y: 0, rotate: -3 }}
            transition={{ duration: 0.5, delay: 0.6, ease: 'easeOut' }}
            className="absolute -top-3 right-2 hidden max-w-[12rem] rounded-blob-2 border-2 border-foreground/15 bg-card px-5 py-3 font-hand text-lg leading-snug text-foreground shadow-[3px_3px_0_oklch(0.26_0.02_60_/_15%)] sm:block"
          >
            Exploramos el presente para transformar el futuro.
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
