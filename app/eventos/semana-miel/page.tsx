import { PageHeader } from '@/components/page-header'
import { GalleryGrid } from '@/components/gallery-grid'
import { BackButton } from '@/components/back-button'

export const metadata = {
  title: 'Semana de la Miel · ConCiencia',
  description: 'Galería de fotos de la participación del club en la Semana Nacional de la Miel en Tanti.',
}

const PHOTOS = [
  { src: '/images/semana-miel-2.jpeg', caption: 'Stand del club con banner "Semana de la Miel" y mesa de productos', tall: true },
  { src: '/images/semana-miel-3.jpeg', caption: 'Vista completa del stand con toda la exposición' },
  { src: '/images/semana-miel-1.jpeg', caption: 'Mesa de productos con galletas de miel-avena, budines y tortas' },
  { src: '/images/semana-miel-4.jpeg', caption: 'Flyer oficial — Semana Nacional de la Miel en Tanti, 15 y 16 de mayo', tall: true },
]

export default function SemanaMielPage() {
  return (
    <>
      <PageHeader
        eyebrow="Eventos"
        title="Semana de la Miel"
        description="Participamos en la Semana Nacional de la Miel en Tanti con un stand propio, exposición y venta de productos elaborados con miel."
        titleClassName="text-pink"
      />
      <BackButton href="/eventos" label="Volver a Eventos" />
      <section className="mx-auto max-w-6xl px-4 pb-20">
        <GalleryGrid photos={PHOTOS} />
      </section>
    </>
  )
}
