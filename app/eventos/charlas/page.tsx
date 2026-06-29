import { PageHeader } from '@/components/page-header'
import { GalleryGrid } from '@/components/gallery-grid'
import { BackButton } from '@/components/back-button'

export const metadata = {
  title: 'Charlas Abiertas · ConCiencia',
  description: 'Galería de fotos de las Charlas Abiertas del Club ConCiencia.',
}

const PHOTOS = [
  { src: '/images/charlasanamente.jpg', caption: 'Charla abierta a la comunidad', tall: true },
  { src: '/images/charlasanamente1.jpg', caption: 'Presentación de los estudiantes' },
  { src: '/images/charlasanamente2.jpg', caption: 'Intercambio con el público' },
]

export default function CharlasPage() {
  return (
    <>
      <PageHeader
        eyebrow="Eventos"
        title="Charlas Abiertas"
        description="Espacios de diálogo donde compartimos lo que aprendemos con estudiantes, docentes y familias."
        titleClassName="text-pink"
      />
      <BackButton href="/eventos" label="Volver a Eventos" />
      <section className="mx-auto max-w-6xl px-4 pb-20">
        <GalleryGrid photos={PHOTOS} />
      </section>
    </>
  )
}
