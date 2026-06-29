'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
import { Menu, X, ChevronDown } from 'lucide-react'
import { ClubLogo } from '@/components/club-logo'
import { ACTIVITIES } from '@/lib/site'
import { cn } from '@/lib/utils'

const SIMPLE_LINKS = [
  { href: '/', label: 'Inicio' },
  { href: '/sobre-nosotros', label: 'Sobre Nosotros' },
]
const TAIL_LINKS = [
  { href: '/galeria', label: 'Galería' },
  { href: '/contacto', label: 'Contacto' },
  { href: '/arcade', label: '🍎' },
]

export function SiteNavbar() {
  const pathname = usePathname()
  const reduce = useReducedMotion()
  const [open, setOpen] = useState(false)
  const [actsOpen, setActsOpen] = useState(false)

  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href))
  const activitiesActive = ACTIVITIES.some((a) => pathname.startsWith(`/${a.slug}`))

  return (
    <motion.header
      initial={reduce ? { opacity: 0 } : { y: -64, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="sticky top-0 z-50 border-b-2 border-foreground/10 bg-background/85 backdrop-blur-md"
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link
          href="/"
          className="flex items-center gap-2"
          aria-label="Inicio - Club de Ciencia ConCiencia"
        >
          <span className="font-display text-2xl font-bold leading-none text-violet sm:text-3xl">
            ConCiencia
          </span>
          <ClubLogo />
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 lg:flex">
          {SIMPLE_LINKS.map((l) => (
            <NavLink key={l.href} href={l.href} active={isActive(l.href)}>
              {l.label}
            </NavLink>
          ))}

          {/* Actividades dropdown */}
          <li
            className="relative"
            onMouseEnter={() => setActsOpen(true)}
            onMouseLeave={() => setActsOpen(false)}
          >
            <button
              type="button"
              onClick={() => setActsOpen((v) => !v)}
              aria-expanded={actsOpen}
              aria-haspopup="true"
              className={cn(
                'flex items-center gap-1 rounded-full px-3 py-2 text-sm font-bold uppercase tracking-wide transition-colors',
                activitiesActive ? 'text-primary' : 'text-foreground/80 hover:text-primary',
              )}
            >
              Actividades
              <ChevronDown className="size-3.5" />
            </button>
            <AnimatePresence>
              {actsOpen && (
                <motion.ul
                  initial={reduce ? { opacity: 0 } : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? { opacity: 0 } : { opacity: 0, y: 8 }}
                  transition={{ duration: 0.18, ease: 'easeOut' }}
                  className="absolute left-0 top-full mt-2 w-52 rounded-2xl border-2 border-foreground/15 bg-card p-2 shadow-[4px_4px_0_oklch(0.26_0.02_60_/_18%)]"
                >
                  {ACTIVITIES.map((a) => (
                    <li key={a.slug}>
                      <Link
                        href={`/${a.slug}`}
                        className="block rounded-xl px-3 py-2 text-sm font-semibold text-foreground/80 transition-colors hover:bg-secondary hover:text-primary"
                      >
                        {a.title}
                      </Link>
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </li>

          {TAIL_LINKS.map((l) => (
            <NavLink key={l.href} href={l.href} active={isActive(l.href)}>
              {l.label}
            </NavLink>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <Link
            href="/contacto"
            className="hidden rounded-full border-2 border-foreground/20 bg-primary px-5 py-2 text-sm font-extrabold uppercase tracking-wide text-primary-foreground shadow-[3px_3px_0_oklch(0.26_0.02_60_/_30%)] transition-transform hover:-translate-y-0.5 sm:inline-flex"
          >
            Sumate
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={open}
            className="rounded-xl border-2 border-foreground/20 bg-card p-2 lg:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="overflow-hidden border-t-2 border-foreground/10 bg-background lg:hidden"
          >
            <ul className="flex flex-col gap-1 px-4 py-4">
              {SIMPLE_LINKS.map((l) => (
                <MobileLink key={l.href} href={l.href} active={isActive(l.href)} onClick={() => setOpen(false)}>
                  {l.label}
                </MobileLink>
              ))}
              <li className="pt-1">
                <span className="px-3 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  Actividades
                </span>
                <ul className="mt-1 flex flex-col gap-1 border-l-2 border-foreground/10 pl-3">
                  {ACTIVITIES.map((a) => (
                    <MobileLink
                      key={a.slug}
                      href={`/${a.slug}`}
                      active={isActive(`/${a.slug}`)}
                      onClick={() => setOpen(false)}
                    >
                      {a.title}
                    </MobileLink>
                  ))}
                </ul>
              </li>
              {TAIL_LINKS.map((l) => (
                <MobileLink key={l.href} href={l.href} active={isActive(l.href)} onClick={() => setOpen(false)}>
                  {l.label}
                </MobileLink>
              ))}
              <li className="pt-2">
                <Link
                  href="/contacto"
                  onClick={() => setOpen(false)}
                  className="block rounded-full border-2 border-foreground/20 bg-primary px-5 py-3 text-center text-sm font-extrabold uppercase tracking-wide text-primary-foreground"
                >
                  Sumate
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

function NavLink({ href, active, children }: { href: string; active: boolean; children: React.ReactNode }) {
  return (
    <li>
      <Link
        href={href}
        className={cn(
          'relative rounded-full px-3 py-2 text-sm font-bold uppercase tracking-wide transition-colors',
          active ? 'text-primary' : 'text-foreground/80 hover:text-primary',
        )}
      >
        {children}
        {active && (
          <motion.span
            layoutId="nav-underline"
            className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-primary"
          />
        )}
      </Link>
    </li>
  )
}

function MobileLink({
  href,
  active,
  onClick,
  children,
}: {
  href: string
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <li>
      <Link
        href={href}
        onClick={onClick}
        className={cn(
          'block rounded-xl px-3 py-2.5 text-base font-bold transition-colors',
          active ? 'bg-secondary text-primary' : 'text-foreground/80 hover:bg-secondary',
        )}
      >
        {children}
      </Link>
    </li>
  )
}
