import { PageHeader } from '@/components/page-header'
import { GalleryGrid } from '@/components/gallery-grid'
import { BackButton } from '@/components/back-button'

export const metadata = {
  title: 'Feria de Ciencias · ConCiencia',
  description: 'Galería de fotos de la Feria de Ciencias del Club ConCiencia.',
}

const PHOTOS = [
  { src: '/images/eventos.jpg', caption: 'Feria de Ciencias — stand del club', tall: true },
  { src: '/images/galeria-1.jpg', caption: 'Presentación de proyectos' },
  { src: '/images/proyectos.jpg', caption: 'El equipo en acción' },
]

export default function FeriaPage() {
  return (
    <>
      <PageHeader
        eyebrow="Eventos"
        title="Feria de Ciencias"
        description="Un espacio para mostrar nuestros proyectos y compartir el conocimiento con toda la comunidad."
        titleClassName="text-pink"
      />
      <BackButton href="/eventos" label="Volver a Eventos" />
      <section className="mx-auto max-w-6xl px-4 pb-20">
        <GalleryGrid photos={PHOTOS} />
      </section>
    </>
  )
}
