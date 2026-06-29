import Image from 'next/image'
import Link from 'next/link'
import { CalendarDays, Mic, PartyPopper, MapPin, ArrowRight } from 'lucide-react'
import { ActivityPage } from '@/components/activity-page'
import { Reveal, StaggerGroup, StaggerItem } from '@/components/reveal'

export const metadata = {
  title: 'Eventos · ConCiencia',
  description: 'Charlas, ferias y jornadas del Club de Ciencia para compartir y aprender en comunidad.',
}

const EVENTS = [
  {
    title: 'Recaudación Solidaria',
    location: 'Tanti, Córdoba',
    description: 'Jornadas solidarias para financiar los materiales y viajes del club con el apoyo de toda la comunidad.',
    image: '/images/recaudacion-mesas-2.jpeg',
    href: '/eventos/recaudacion',
  },
  {
    title: 'Semana de la Miel',
    location: 'Tanti, Córdoba',
    description: 'Montamos un stand en la Semana Nacional de la Miel de Tanti con exposición y venta de productos elaborados con miel.',
    image: '/images/semana-miel-2.jpeg',
    href: '/eventos/semana-miel',
  },
  {
    title: 'Visita a Jerónimo del Barco',
    location: 'Tanti, Córdoba',
    description: 'Visitamos la escuela primaria Jerónimo del Barco para compartir nuestros proyectos. Los alumnos quedaron tan inspirados que formaron su propio club de ciencias.',
    image: '/images/visita-jeronimo-1.jpg',
    href: '/eventos/visita-jeronimo',
  },
  {
    title: 'Charlas Abiertas',
    location: 'IPETyM N°84, Tanti',
    description: 'Invitamos a especialistas y compartimos nuestras investigaciones en charlas abiertas para toda la comunidad.',
    image: '/images/charlasanamente.jpg',
    href: '/eventos/charlas',
  },
]

function EventCards() {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-12">
      <Reveal className="mb-8 text-center">
        <h2 className="font-display text-4xl text-foreground">Nuestros eventos</h2>
      </Reveal>
      <StaggerGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {EVENTS.map((event) => (
          <StaggerItem key={event.title}>
            <Link href={event.href} className="group block overflow-hidden rounded-3xl border-2 border-foreground/15 bg-card shadow-[4px_4px_0_oklch(0.26_0.02_60_/_12%)] transition-transform hover:-translate-y-1">
              <div className="relative aspect-[16/9] w-full overflow-hidden">
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-5 space-y-2">
                <h3 className="font-display text-2xl text-foreground">{event.title}</h3>
                <p className="flex items-center gap-1.5 text-sm font-semibold text-red">
                  <MapPin className="size-3.5" aria-hidden />
                  {event.location}
                </p>
                <p className="text-sm leading-relaxed text-muted-foreground">{event.description}</p>
                <p className="flex items-center gap-1 pt-1 text-sm font-bold text-red">
                  Ver fotos <ArrowRight className="size-3.5" />
                </p>
              </div>
            </Link>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </section>
  )
}

export default function EventosPage() {
  return (
    <ActivityPage
      color="pink"
      title="Eventos"
      description="Compartir lo que aprendemos con la comunidad."
      image="/images/recaudacion-mesas-6.jpeg"
      intro={[
        'Organizamos y participamos en eventos que abren las puertas del club a toda la comunidad educativa.',
        'Desde ferias de ciencia hasta charlas y jornadas temáticas, buscamos espacios donde la curiosidad se contagie.',
        'Son encuentros para presentar proyectos, debatir ideas y celebrar el trabajo colectivo.',
      ]}
      highlights={[
        { icon: PartyPopper, title: 'Ferias', text: 'Mostramos nuestros proyectos y experimentos al público.' },
        { icon: Mic, title: 'Charlas', text: 'Invitamos a especialistas y compartimos nuestras investigaciones.' },
        { icon: CalendarDays, title: 'Jornadas', text: 'Días temáticos con talleres y actividades para todas las edades.' },
      ]}
      extra={<EventCards />}
    />
  )
}
