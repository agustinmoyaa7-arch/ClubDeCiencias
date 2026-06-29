'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
import { X, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

const FAQS = [
  {
    q: '¿Cómo me sumo al club?',
    a: 'Escribinos por Sumate o pasá por la escuela. Recibimos a cualquier estudiante con ganas, no hace falta saber nada antes.',
  },
  {
    q: '¿Dónde los encuentro?',
    a: 'En el IPETyM N°84, San Francisco 33, B° La Estancia, Tanti, Córdoba. El mapa está en Contacto.',
  },
  {
    q: '¿Qué actividades hacen?',
    a: 'Revista, viajes, eventos y proyectos. Cada una tiene su página.',
  },
  {
    q: '¿Tiene algún costo?',
    a: 'Sumarte es gratis. Algunas salidas pueden tener costo, siempre se avisa con tiempo.',
  },
  {
    q: '¿Quiénes pueden participar?',
    a: 'Cualquier estudiante interesado en la ciencia. Importa la curiosidad, no el promedio.',
  },
]

const MESSAGES = [
  '¡Hola! Soy Marie Curie. ¿Querés saber más del club?',
  '¿Sabías que visitamos la central termoeléctrica de Pilar?',
  '¿Te interesa unirte al Club ConCiencia?',
  'Tuvimos un stand en la Semana Nacional de la Miel 🍯',
  '¿Sabías que los alumnos de Jerónimo del Barco formaron su propio club después de vernos?',
  'Tenemos proyectos de energía solar, reciclaje y salud mental.',
  '¡Visitamos la Estación Astrofísica Bosque Alegre con el CONAE!',
  '¿Sabías que la ciencia también se expresa en murales?',
  'Recaudamos fondos con mesas de dulces hechos por los miembros.',
  '¿Curiosidad científica? ¡Este es tu lugar!',
  'Publicamos una revista científica con nuestras investigaciones.',
  '¿Sabías que cualquier estudiante puede sumarse al club?',
]

export function FaqWidget() {
  const reduce = useReducedMotion()
  const [open, setOpen] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [msgIndex, setMsgIndex] = useState(0)
  const [bubbleVisible, setBubbleVisible] = useState(false)

  // Show bubble after 2s, then cycle every 5s
  useEffect(() => {
    const initial = setTimeout(() => setBubbleVisible(true), 2000)
    return () => clearTimeout(initial)
  }, [])

  useEffect(() => {
    if (!bubbleVisible) return
    const interval = setInterval(() => {
      setBubbleVisible(false)
      setTimeout(() => {
        setMsgIndex(i => (i + 1) % MESSAGES.length)
        setBubbleVisible(true)
      }, 400)
    }, 5000)
    return () => clearInterval(interval)
  }, [bubbleVisible])

  function handleOpen() {
    setBubbleVisible(false)
    setOpen(v => !v)
  }

  return (
    <div className="fixed bottom-4 right-4 z-[60] flex flex-col items-end gap-3">

      {/* FAQ panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="panel"
            role="dialog"
            aria-label="Preguntas frecuentes"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="flex max-h-[70vh] w-[320px] max-w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-3xl border-2 border-foreground/15 bg-background shadow-[6px_6px_0_oklch(0.26_0.02_60_/_22%)]"
          >
            {/* Header */}
            <div className="flex items-center gap-2 bg-gradient-to-br from-purple-600 to-purple-400 px-4 py-3 text-white">
              <span className="flex size-8 shrink-0 overflow-hidden rounded-full ring-2 ring-white/40">
                <Image src="/images/Marie.png" alt="Marie Curie" width={32} height={32} className="object-cover" />
              </span>
              <div>
                <p className="font-display text-base font-bold leading-tight">ConCiencia</p>
                <p className="text-[11px] text-white/70">Preguntas frecuentes</p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Cerrar"
                className="ml-auto rounded-full p-1.5 hover:bg-white/20 transition-colors"
              >
                <X className="size-4" />
              </button>
            </div>

            {/* FAQ list */}
            <div className="min-h-0 flex-1 overflow-y-auto p-3 flex flex-col gap-2">
              {FAQS.map((f, i) => {
                const isOpen = openFaq === i
                return (
                  <div key={i} className="overflow-hidden rounded-2xl border-2 border-foreground/10 bg-card">
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      className="flex w-full items-center justify-between gap-2 px-3 py-2.5 text-left text-sm font-bold text-foreground transition-colors hover:bg-secondary"
                    >
                      {f.q}
                      <ChevronDown className={cn('size-4 shrink-0 transition-transform duration-200', isOpen && 'rotate-180')} />
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2, ease: 'easeOut' }}
                          className="overflow-hidden"
                        >
                          <p className="px-3 pb-3 pt-0.5 text-sm leading-relaxed text-foreground/75">{f.a}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Row: speech bubble + button */}
      <div className="flex items-center gap-2">

        {/* Speech bubble */}
        <AnimatePresence mode="wait">
          {bubbleVisible && !open && (
            <motion.div
              key={msgIndex}
              initial={{ opacity: 0, x: 12, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 12, scale: 0.9 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="relative max-w-[220px] rounded-2xl bg-white px-3 py-2 shadow-[3px_3px_0_oklch(0.26_0.02_60_/_18%)] border border-foreground/10"
            >
              <p className="text-sm font-bold text-foreground leading-snug">{MESSAGES[msgIndex]}</p>
              <span className="absolute right-[-7px] top-1/2 -translate-y-1/2 h-0 w-0 border-y-[6px] border-y-transparent border-l-[8px] border-l-white" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Marie Curie button */}
        <motion.button
          type="button"
          onClick={handleOpen}
          aria-label={open ? 'Cerrar ayuda' : 'Abrir ayuda'}
          aria-expanded={open}
          initial={reduce ? { opacity: 0 } : { opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.3 }}
          whileHover={reduce ? undefined : { scale: 1.08 }}
          whileTap={reduce ? undefined : { scale: 0.94 }}
          className="relative flex size-14 overflow-hidden rounded-full shadow-[3px_4px_0_oklch(0.26_0.02_60_/_30%)] ring-4 ring-background"
        >
          <Image src="/images/Marie.png" alt="Marie Curie" fill className="object-cover" />
          <AnimatePresence>
            {open && (
              <motion.span
                key="x"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="absolute inset-0 flex items-center justify-center bg-black/50 text-white"
              >
                <X className="size-6" />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>

      </div>
    </div>
  )
}
