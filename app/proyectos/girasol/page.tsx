import { PageHeader } from '@/components/page-header'
import { GalleryGrid } from '@/components/gallery-grid'
import { BackButton } from '@/components/back-button'

export const metadata = {
  title: 'Girasol · ConCiencia',
  description: 'Panel solar seguidor del sol inspirado en el comportamiento del girasol.',
}

const PHOTOS = [
  { src: '/images/galeria-2.jpg',  caption: 'Panel solar Girasol en funcionamiento', tall: true },
  { src: '/images/giraSol.jpeg',   caption: 'Sistema de seguimiento solar' },
  { src: '/images/giraSol1.jpeg',  caption: 'Mecanismo de orientación' },
  { src: '/images/galeria-2.jpg',  caption: 'Pruebas de rendimiento energético' },
  { src: '/images/giraSol.jpeg',   caption: 'Comparación con panel estático', tall: true },
  { src: '/images/giraSol1.jpeg',  caption: 'Presentación del proyecto Girasol' },
]

export default function GirasolPage() {
  return (
    <>
      <PageHeader
        eyebrow="Proyectos"
        title="Girasol"
        description="Panel solar que imita el comportamiento del girasol siguiendo el sol a lo largo del día para maximizar el rendimiento energético."
        titleClassName="text-yellow"
      />
      <BackButton href="/proyectos" label="Volver a Proyectos" />
      <section className="mx-auto max-w-6xl px-4 pb-20">
        <GalleryGrid photos={PHOTOS} />
      </section>
    </>
  )
}
