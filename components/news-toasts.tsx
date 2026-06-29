'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'motion/react'
import { X, ArrowRight } from 'lucide-react'

export const NOVEDADES = [
  {
    title: 'Nueva revista disponible',
    date: 'Junio 2026',
    text: 'Ya salió la edición #8 de ConCiencia.',
    href: '/revista',
    color: '#3b82f6',
  },
  {
    title: 'Feria de Ciencias 2025',
    date: '7 de junio',
    text: 'Presentamos nuestros proyectos en la feria.',
    href: '/eventos',
    color: '#ec4899',
  },
  {
    title: 'Salida educativa al CONAE',
    date: 'Mayo 2026',
    text: 'Nueva crónica y fotos en Viajes.',
    href: '/viajes',
    color: '#22c55e',
  },
]

const SCROLL_TRIGGERS = [250, 600, 1000]
const AUTO_DISMISS_MS = 7000

export function NewsToasts() {
  const [visible, setVisible] = useState<number[]>([])
  const shownRef = useRef<Set<number>>(new Set())

  useEffect(() => {
    function onScroll() {
      const y = window.scrollY
      SCROLL_TRIGGERS.forEach((threshold, i) => {
        if (y >= threshold && !shownRef.current.has(i)) {
          shownRef.current.add(i)
          // stagger each one slightly
          setTimeout(() => {
            setVisible(prev => [...prev, i])
            setTimeout(() => dismiss(i), AUTO_DISMISS_MS)
          }, i * 400)
        }
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  function dismiss(i: number) {
    setVisible(prev => prev.filter(n => n !== i))
  }

  return (
    <div className="fixed bottom-24 left-4 z-40 flex flex-col-reverse gap-2 pointer-events-none">
      <AnimatePresence>
        {visible.map(i => {
          const n = NOVEDADES[i]
          return (
            <motion.div
              key={i}
              initial={{ x: -280, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -280, opacity: 0 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="pointer-events-auto w-64 overflow-hidden rounded-2xl border-2 border-foreground/15 bg-background shadow-[4px_4px_0_oklch(0.26_0.02_60_/_18%)]"
            >
              {/* color bar top */}
              <div className="h-1 w-full" style={{ backgroundColor: n.color }} />

              <div className="p-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="mt-0.5 size-2 shrink-0 rounded-full" style={{ backgroundColor: n.color }} />
                    <p className="truncate text-sm font-extrabold text-foreground leading-tight">{n.title}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => dismiss(i)}
                    aria-label="Cerrar"
                    className="shrink-0 rounded-full p-0.5 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <X className="size-3.5" />
                  </button>
                </div>

                <p className="mt-0.5 pl-4 text-xs text-muted-foreground">{n.date}</p>
                <p className="mt-1 pl-4 text-xs leading-relaxed text-foreground/80">{n.text}</p>

                <Link
                  href={n.href}
                  className="mt-2 inline-flex items-center gap-1 pl-4 text-xs font-bold transition-colors hover:underline"
                  style={{ color: n.color }}
                >
                  Ver más <ArrowRight className="size-3" />
                </Link>
              </div>

              {/* countdown bar */}
              <motion.div
                className="h-0.5"
                style={{ backgroundColor: n.color + '60' }}
                initial={{ scaleX: 1, originX: 0 }}
                animate={{ scaleX: 0 }}
                transition={{ duration: AUTO_DISMISS_MS / 1000, ease: 'linear' }}
              />
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
}
