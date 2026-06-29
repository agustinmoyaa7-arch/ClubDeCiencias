'use client'

import Link from 'next/link'
import { motion, useReducedMotion } from 'motion/react'
import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

const base =
  'inline-flex items-center justify-center gap-2 rounded-full border-2 px-5 py-2.5 font-sans text-sm font-extrabold tracking-wide uppercase shadow-[3px_3px_0_oklch(0.26_0.02_60_/_30%)] transition-colors focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50'

const variants = {
  violet: 'bg-primary text-primary-foreground border-foreground/20 hover:bg-primary/90',
  outline: 'bg-card text-foreground border-foreground/30 hover:bg-secondary',
  red: 'bg-red text-primary-foreground border-foreground/20 hover:opacity-90',
}

export function HandButton({
  href,
  children,
  variant = 'violet',
  className,
}: {
  href: string
  children: ReactNode
  variant?: keyof typeof variants
  className?: string
}) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className="inline-block"
      whileHover={reduce ? undefined : { scale: 1.04 }}
      whileTap={reduce ? undefined : { scale: 0.97 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
    >
      <Link href={href} className={cn(base, variants[variant], className)}>
        {children}
      </Link>
    </motion.div>
  )
}
