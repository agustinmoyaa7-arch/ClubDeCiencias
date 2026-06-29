import { PageHeader } from '@/components/page-header'
import { GalleryGrid } from '@/components/gallery-grid'
import { BackButton } from '@/components/back-button'

export const metadata = {
  title: 'Movimiento Infinito · ConCiencia',
  description: 'Demostración de energía mecánica con un mecanismo oscilante construido por alumnos.',
}

const PHOTOS = [
  { src: '/images/viaje-pilar.jpg',          caption: 'El mecanismo terminado', tall: true },
  { src: '/images/movimientoinfinito1.jpeg',  caption: 'Construcción del hombrecito' },
  { src: '/images/movimientoinfinito2.jpeg',  caption: 'Proceso de soldadura' },
  { src: '/images/movimientoinfinito.jpeg',   caption: 'Prueba del movimiento oscilante' },
  { src: '/images/viaje-pilar.jpg',           caption: 'Explicando el principio físico', tall: true },
  { src: '/images/movimientoinfinito1.jpeg',  caption: 'Presentación final del proyecto' },
]

export default function MovimientoInfinitoPage() {
  return (
    <>
      <PageHeader
        eyebrow="Proyectos"
        title="Movimiento Infinito"
        description="Un hombrecito con caña de pescar construido y soldado por alumnos que demuestra energía mecánica mediante un movimiento oscilante continuo."
        titleClassName="text-yellow"
      />
      <BackButton href="/proyectos" label="Volver a Proyectos" />
      <section className="mx-auto max-w-6xl px-4 pb-20">
        <GalleryGrid photos={PHOTOS} />
      </section>
    </>
  )
}
