import Link from 'next/link'
import { Mail, AtSign, MapPin } from 'lucide-react'
import { ClubLogo } from '@/components/club-logo'
import { ACTIVITIES, CLUB_INFO } from '@/lib/site'

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t-2 border-foreground/10 bg-secondary/60">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-3">
          <ClubLogo />
          <p className="font-display text-2xl leading-none text-primary">ConCiencia</p>
          <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">{CLUB_INFO.motto}</p>
        </div>

        <div>
          <h3 className="font-display text-2xl text-foreground">Actividades</h3>
          <ul className="mt-3 space-y-2 text-sm">
            {ACTIVITIES.map((a) => (
              <li key={a.slug}>
                <Link href={`/${a.slug}`} className="text-foreground/80 transition-colors hover:text-primary">
                  {a.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-2xl text-foreground">Navegá</h3>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link href="/sobre-nosotros" className="text-foreground/80 transition-colors hover:text-primary">Sobre Nosotros</Link></li>
            <li><Link href="/galeria" className="text-foreground/80 transition-colors hover:text-primary">Galería</Link></li>
            <li><Link href="/contacto" className="text-foreground/80 transition-colors hover:text-primary">Contacto</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-display text-2xl text-foreground">Encontranos</h3>
          <ul className="mt-3 space-y-2 text-sm text-foreground/80">
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 size-4 shrink-0 text-primary" />
              <span>{CLUB_INFO.school} — {CLUB_INFO.city}</span>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="size-4 shrink-0 text-primary" />
              <a href={`mailto:${CLUB_INFO.email}`} className="hover:text-primary">{CLUB_INFO.email}</a>
            </li>
            <li className="flex items-center gap-2">
              <AtSign className="size-4 shrink-0 text-primary" />
              <span>{CLUB_INFO.instagram}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t-2 border-foreground/10 py-4">
        <p className="text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} {CLUB_INFO.name} · {CLUB_INFO.school}, {CLUB_INFO.city}
        </p>
      </div>
    </footer>
  )
}
