import Image from 'next/image'
import Link from 'next/link'
import { Mountain, Building2, Microscope, MapPin, ArrowRight } from 'lucide-react'
import { ActivityPage } from '@/components/activity-page'
import { Reveal, StaggerGroup, StaggerItem } from '@/components/reveal'

export const metadata = {
  title: 'Viajes · ConCiencia',
  description: 'Salidas y viajes educativos del Club de Ciencia para descubrir el mundo desde la ciencia.',
}

const TRIPS = [
  {
    title: 'Viaje a CONAE',
    location: 'Estación Astrofísica Bosque Alegre, Córdoba',
    description: 'Visitamos la Estación Astrofísica Bosque Alegre del CONAE en Córdoba para conocer de cerca la exploración espacial argentina, sus telescopios y los proyectos científicos en curso.',
    image: '/images/viaje-conae3.jpg',
    href: '/viajes/conae',
  },
  {
    title: 'Viaje a Pilar',
    location: 'Pilar, Córdoba',
    description: 'Una salida educativa para investigar fenómenos físicos en el campo, tomar muestras y compartir el trabajo científico con estudiantes de otras instituciones.',
    image: '/images/viaje-pilar-11.jpeg',
    href: '/viajes/pilar',
  },
]

function TripCards() {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-12">
      <Reveal className="mb-8 text-center">
        <h2 className="font-display text-4xl text-foreground">Nuestros viajes</h2>
      </Reveal>
      <StaggerGroup className="grid gap-6 sm:grid-cols-2">
        {TRIPS.map((trip) => (
          <StaggerItem key={trip.title}>
            <Link href={trip.href} className="group block overflow-hidden rounded-3xl border-2 border-foreground/15 bg-card shadow-[4px_4px_0_oklch(0.26_0.02_60_/_12%)] transition-transform hover:-translate-y-1">
              <div className="relative aspect-[16/9] w-full overflow-hidden">
                <Image
                  src={trip.image}
                  alt={trip.title}
                  fill
                  sizes="(max-width: 640px) 100vw, 50vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-5 space-y-2">
                <h3 className="font-display text-2xl text-foreground">{trip.title}</h3>
                <p className="flex items-center gap-1.5 text-sm font-semibold text-green">
                  <MapPin className="size-3.5" aria-hidden />
                  {trip.location}
                </p>
                <p className="text-sm leading-relaxed text-muted-foreground">{trip.description}</p>
                <p className="flex items-center gap-1 pt-1 text-sm font-bold text-green">
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

export default function ViajesPage() {
  return (
    <ActivityPage
      color="green"
      title="Viajes"
      description="Aprender haciendo, fuera del aula."
      image="/images/viajes.jpg"
      intro={[
        'Creemos que la ciencia se vive mejor en movimiento. Por eso organizamos salidas y viajes educativos durante el año.',
        'Visitamos museos, universidades, observatorios y paisajes naturales de Córdoba y del país para conectar lo que estudiamos con el mundo real.',
        'Cada viaje es una oportunidad para observar, preguntar y trabajar en equipo mientras conocemos nuevos lugares.',
      ]}
      highlights={[
        { icon: Mountain, title: 'Naturaleza', text: 'Salidas de campo para estudiar ecosistemas, geología y biodiversidad.' },
        { icon: Building2, title: 'Universidades', text: 'Visitas a laboratorios y facultades para conocer carreras científicas.' },
        { icon: Microscope, title: 'Museos', text: 'Recorridos por museos de ciencia y centros de divulgación.' },
      ]}
      extra={<TripCards />}
    />
  )
}
