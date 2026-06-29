import { PageHeader } from '@/components/page-header'
import { GalleryGrid } from '@/components/gallery-grid'
import { BackButton } from '@/components/back-button'

export const metadata = {
  title: 'Viaje a CONAE · ConCiencia',
  description: 'Galería de fotos del viaje a la Comisión Nacional de Actividades Espaciales.',
}

const PHOTOS = [
  { src: '/images/viajes.jpg',       caption: 'Llegada a la Estación Astrofísica Bosque Alegre', tall: true },
  { src: '/images/viaje-conae.jpg',  caption: 'Recorrido por las instalaciones' },
  { src: '/images/viaje-conae1.jpg', caption: 'Telescopios del CONAE' },
  { src: '/images/viaje-conae2.jpg', caption: 'El equipo explorando la estación' },
  { src: '/images/viaje-conae3.jpg', caption: 'Explicación sobre astronomía', tall: true },
  { src: '/images/viaje-conae4.jpg', caption: 'Observando los equipos científicos' },
  { src: '/images/viaje-conae5.jpg', caption: 'Charla con investigadores del CONAE' },
  { src: '/images/viaje-conae6.jpg', caption: 'Recorrido por el observatorio', tall: true },
  { src: '/images/viaje-conae7.jpg', caption: 'Cierre de la jornada en Bosque Alegre' },
]

export default function ConaePage() {
  return (
    <>
      <PageHeader
        eyebrow="Viajes"
        title="Viaje a CONAE"
        description="Estación Astrofísica Bosque Alegre · CONAE · Córdoba, Argentina"
        titleClassName="text-green"
      />
      <BackButton href="/viajes" label="Volver a Viajes" />
      <section className="mx-auto max-w-6xl px-4 pb-20">
        <GalleryGrid photos={PHOTOS} />
      </section>
    </>
  )
}
