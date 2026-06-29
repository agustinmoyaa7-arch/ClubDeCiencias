'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { BookOpen, Bus, CalendarDays, FlaskConical, ArrowRight, RotateCcw } from 'lucide-react'
import type { Activity } from '@/lib/site'
import { cn } from '@/lib/utils'

const ICONS = {
  revista: BookOpen,
  viajes: Bus,
  eventos: CalendarDays,
  proyectos: FlaskConical,
} as const

const BACK_STYLES: Record<string, string> = {
  blue: 'bg-blue text-primary-foreground',
  green: 'bg-green text-primary-foreground',
  pink: 'bg-pink text-foreground',
  yellow: 'bg-yellow text-foreground',
}

const ICON_TINT: Record<string, string> = {
  blue: 'text-blue',
  green: 'text-green',
  pink: 'text-red',
  yellow: 'text-yellow',
}

export function FlipCard({ activity }: { activity: Activity }) {
  const reduce = useReducedMotion()
  const [flipped, setFlipped] = useState(false)
  const Icon = ICONS[activity.slug]

  const toggle = () => setFlipped((v) => !v)
  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      toggle()
    }
  }

  return (
    <div className="flip-perspective h-80 w-full">
      <motion.div
        className="flip-inner relative h-full w-full"
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={reduce ? { duration: 0 } : { duration: 0.6, ease: 'easeInOut' }}
      >
        {/* FRONT */}
        <div
          role="button"
          tabIndex={flipped ? -1 : 0}
          aria-pressed={flipped}
          aria-label={`${activity.title}. Tocá para ver más.`}
          onClick={toggle}
          onKeyDown={onKey}
          className="flip-face absolute inset-0 flex cursor-pointer flex-col overflow-hidden rounded-3xl border-2 border-foreground/15 bg-card shadow-[5px_5px_0_oklch(0.26_0.02_60_/_15%)] focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          <div className="relative h-40 w-full overflow-hidden">
            <Image
              src={activity.image || '/placeholder.svg'}
              alt={activity.title}
              fill
              sizes="(max-width: 768px) 100vw, 25vw"
              className="object-cover"
            />
          </div>
          <div className="flex flex-1 flex-col items-start gap-2 p-5">
            <Icon className={cn('size-7', ICON_TINT[activity.color])} aria-hidden />
            <h3 className="font-display text-2xl leading-none text-foreground">{activity.title}</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">{activity.short}</p>
            <span className="mt-auto text-xs font-bold uppercase tracking-wider text-primary">Tocá para girar →</span>
          </div>
        </div>

        {/* BACK */}
        <div
          role="button"
          tabIndex={flipped ? 0 : -1}
          aria-label={`${activity.title}: ${activity.back}`}
          onClick={toggle}
          onKeyDown={onKey}
          className={cn(
            'flip-face flip-back absolute inset-0 flex cursor-pointer flex-col justify-between gap-4 rounded-3xl border-2 border-foreground/15 p-6 shadow-[5px_5px_0_oklch(0.26_0.02_60_/_15%)] focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50',
            BACK_STYLES[activity.color],
          )}
        >
          <div className="space-y-2">
            <h3 className="font-display text-3xl leading-none">{activity.title}</h3>
            <p className="text-sm leading-relaxed opacity-90">{activity.back}</p>
          </div>
          <div className="flex items-center justify-between">
            <Link
              href={`/${activity.slug}`}
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-2 rounded-full border-2 border-current/50 bg-card/90 px-4 py-2 text-sm font-extrabold uppercase tracking-wide text-foreground transition-transform hover:-translate-y-0.5"
            >
              Ver más
              <ArrowRight className="size-4" />
            </Link>
            <span className="inline-flex items-center gap-1 text-xs font-semibold opacity-80">
              <RotateCcw className="size-3.5" /> Volver
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
