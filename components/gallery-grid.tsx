'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'motion/react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

export type Photo = { src: string; caption: string; tall?: boolean }

export function GalleryGrid({ photos }: { photos: Photo[] }) {
  const [index, setIndex] = useState<number | null>(null)

  const close  = useCallback(() => setIndex(null), [])
  const prev   = useCallback(() => setIndex(i => (i !== null ? (i - 1 + photos.length) % photos.length : null)), [photos.length])
  const next   = useCallback(() => setIndex(i => (i !== null ? (i + 1) % photos.length : null)), [photos.length])

  useEffect(() => {
    if (index === null) return
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape')     close()
      if (e.key === 'ArrowLeft')  prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [index, close, prev, next])

  // Prevent body scroll while open
  useEffect(() => {
    document.body.style.overflow = index !== null ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [index])

  // Distribute photos round-robin across 3 columns so each column stays roughly the same height
  const cols = [0, 1, 2].map(c => photos.map((p, i) => ({ ...p, globalIndex: i })).filter((_, i) => i % 3 === c))

  function PhotoCard({ p, globalIndex }: { p: Photo; globalIndex: number }) {
    return (
      <figure
        className="group mb-5 break-inside-avoid overflow-hidden rounded-3xl border-2 border-foreground/15 bg-card shadow-[4px_4px_0_oklch(0.26_0.02_60_/_12%)] cursor-zoom-in"
        onClick={() => setIndex(globalIndex)}
      >
        <div className={p.tall ? 'relative aspect-[3/4]' : 'relative aspect-[4/3]'}>
          <Image
            src={p.src}
            alt={p.caption}
            fill
            loading="lazy"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <figcaption className="px-4 py-3 text-sm font-medium text-muted-foreground">
          {p.caption}
        </figcaption>
      </figure>
    )
  }

  return (
    <>
      {/* Mobile: single column */}
      <div className="sm:hidden">
        {photos.map((p, i) => <PhotoCard key={i} p={p} globalIndex={i} />)}
      </div>

      {/* Tablet: 2 columns */}
      <div className="hidden sm:grid lg:hidden grid-cols-2 gap-5">
        {[0, 1].map(c => (
          <div key={c}>
            {photos.map((p, i) => i % 2 === c ? <PhotoCard key={i} p={p} globalIndex={i} /> : null)}
          </div>
        ))}
      </div>

      {/* Desktop: 3 columns distributed evenly */}
      <div className="hidden lg:grid grid-cols-3 gap-5">
        {cols.map((col, c) => (
          <div key={c}>
            {col.map(({ globalIndex, ...p }) => <PhotoCard key={globalIndex} p={p} globalIndex={globalIndex} />)}
          </div>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {index !== null && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4"
            onClick={close}
          >
            {/* Close */}
            <button
              onClick={close}
              aria-label="Cerrar"
              className="absolute top-4 right-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20 transition-colors"
            >
              <X className="size-5" />
            </button>

            {/* Prev */}
            <button
              onClick={e => { e.stopPropagation(); prev() }}
              aria-label="Anterior"
              className="absolute left-3 rounded-full bg-white/10 p-3 text-white hover:bg-white/20 transition-colors sm:left-6"
            >
              <ChevronLeft className="size-6" />
            </button>

            {/* Image */}
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.2 }}
              className="relative max-h-[85vh] max-w-4xl w-full"
              onClick={e => e.stopPropagation()}
            >
              <div className="relative w-full" style={{ aspectRatio: photos[index].tall ? '3/4' : '4/3' }}>
                <Image
                  src={photos[index].src}
                  alt={photos[index].caption}
                  fill
                  sizes="100vw"
                  className="rounded-2xl object-contain"
                  priority
                />
              </div>
              <p className="mt-3 text-center text-sm font-medium text-white/80">
                {photos[index].caption}
                <span className="ml-2 text-white/40">{index + 1} / {photos.length}</span>
              </p>
            </motion.div>

            {/* Next */}
            <button
              onClick={e => { e.stopPropagation(); next() }}
              aria-label="Siguiente"
              className="absolute right-3 rounded-full bg-white/10 p-3 text-white hover:bg-white/20 transition-colors sm:right-6"
            >
              <ChevronRight className="size-6" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
