import Image from 'next/image'
import Link from 'next/link'
import { FlaskConical, Lightbulb, Recycle, MapPin, ArrowRight } from 'lucide-react'
import { ActivityPage } from '@/components/activity-page'
import { Reveal, StaggerGroup, StaggerItem } from '@/components/reveal'

export const metadata = {
  title: 'Proyectos · ConCiencia',
  description: 'Proyectos, experimentos y soluciones a problemas reales del Club de Ciencia.',
}

const PROJECTS = [
  {
    title: 'Mural',
    tag: 'Arte & Identidad',
    description: 'El mural del Club de Ciencia ConCiencia, pintado por los propios miembros como expresión de identidad y pertenencia a la comunidad educativa.',
    image: '/images/galeria-1.jpg',
    href: '/proyectos/mural',
  },
  {
    title: 'SanaMente',
    tag: 'Salud & Bienestar',
    description: 'Charlas sobre salud mental en la escuela: TCA, bullying y ansiedad, con apoyo profesional y formularios anónimos para planificar futuras charlas.',
    image: '/images/revista.jpg',
    href: '/proyectos/saneamente',
  },
  {
    title: 'Plásticos 3D',
    tag: 'Reciclaje & Tecnología',
    description: 'Transformamos residuos plásticos en filamento para impresoras 3D, combinando reciclaje consciente con fabricación aditiva.',
    image: '/images/proyectos.jpg',
    href: '/proyectos/plasticos3d',
  },
  {
    title: 'Movimiento Infinito',
    tag: 'Física & Mecánica',
    description: 'Un hombrecito con caña de pescar construido y soldado por alumnos que demuestra energía mecánica mediante un movimiento oscilante continuo.',
    image: '/images/viaje-pilar.jpg',
    href: '/proyectos/movimientoinfinito',
  },
  {
    title: 'Girasol',
    tag: 'Energía Solar',
    description: 'Panel solar que imita el comportamiento del girasol siguiendo el movimiento del sol, maximizando el rendimiento energético a lo largo del día.',
    image: '/images/galeria-2.jpg',
    href: '/proyectos/girasol',
  },
  {
    title: 'ComeDog',
    tag: 'Automatización & Mascotas',
    description: 'Comedero automático con monitoreo para el bienestar de mascotas cuando están solas, combinando automatización, sensores y amor por los animales.',
    image: '/images/galeria-3.jpg',
    href: '/proyectos/comedog',
  },
]

function ProjectCards() {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-12">
      <Reveal className="mb-8 text-center">
        <h2 className="font-display text-4xl text-foreground">Nuestros proyectos</h2>
      </Reveal>
      <StaggerGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {PROJECTS.map((p) => (
          <StaggerItem key={p.title}>
            <Link href={p.href} className="group block overflow-hidden rounded-3xl border-2 border-foreground/15 bg-card shadow-[4px_4px_0_oklch(0.26_0.02_60_/_12%)] transition-transform hover:-translate-y-1">
              <div className="relative aspect-[16/9] w-full overflow-hidden">
                <Image
                  src={p.image}
                  alt={p.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-5 space-y-2">
                <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-yellow-600">
                  <MapPin className="size-3" aria-hidden />
                  {p.tag}
                </p>
                <h3 className="font-display text-2xl text-foreground">{p.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{p.description}</p>
                <p className="flex items-center gap-1 pt-1 text-sm font-bold text-primary">
                  Ver proyecto <ArrowRight className="size-3.5" />
                </p>
              </div>
            </Link>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </section>
  )
}

export default function ProyectosPage() {
  return (
    <ActivityPage
      color="yellow"
      title="Proyectos"
      description="Ideas que se convierten en soluciones."
      image="/images/proyectos.jpg"
      intro={[
        'En el club no solo estudiamos ciencia: la ponemos en práctica. Investigamos problemas reales de nuestra comunidad y diseñamos soluciones.',
        'Trabajamos con el método científico, desde la pregunta inicial hasta el prototipo y la presentación de resultados.',
        'Cada proyecto es una excusa para aprender a investigar, equivocarnos, mejorar y volver a intentar en equipo.',
      ]}
      highlights={[
        { icon: Lightbulb, title: 'Ideas', text: 'Detectamos problemas y proponemos hipótesis para resolverlos.' },
        { icon: FlaskConical, title: 'Experimentos', text: 'Diseñamos y realizamos experimentos para probar nuestras ideas.' },
        { icon: Recycle, title: 'Impacto', text: 'Buscamos soluciones útiles y sostenibles para la comunidad.' },
      ]}
      extra={<ProjectCards />}
    />
  )
}
