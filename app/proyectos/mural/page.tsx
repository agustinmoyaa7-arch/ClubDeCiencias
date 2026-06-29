import { PageHeader } from '@/components/page-header'
import { GalleryGrid } from '@/components/gallery-grid'
import { BackButton } from '@/components/back-button'

export const metadata = {
  title: 'Mural · ConCiencia',
  description: 'El mural del Club de Ciencia ConCiencia pintado por los miembros del club.',
}

const PHOTOS = [
  { src: '/images/muralclub.jpg',  caption: 'Mural del Club de Ciencia ConCiencia', tall: true },
  { src: '/images/muralclub1.jpg', caption: 'Proceso de pintura del mural' },
  { src: '/images/muralclub2.jpg', caption: 'Detalle final del mural', tall: true },
]

export default function MuralPage() {
  return (
    <>
      <PageHeader
        eyebrow="Proyectos"
        title="Mural"
        description="El mural del Club de Ciencia ConCiencia, pintado por los propios miembros del club como expresión de identidad y pertenencia."
        titleClassName="text-yellow"
      />
      <BackButton href="/proyectos" label="Volver a Proyectos" />
      <section className="mx-auto max-w-6xl px-4 pb-20">
        <GalleryGrid photos={PHOTOS} />
      </section>
    </>
  )
}
