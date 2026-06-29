import { PageHeader } from '@/components/page-header'
import { GalleryGrid } from '@/components/gallery-grid'
import { BackButton } from '@/components/back-button'

export const metadata = {
  title: 'ComeDog · ConCiencia',
  description: 'Comedero automático con monitoreo para el bienestar de mascotas.',
}

const PHOTOS = [
  { src: '/images/galeria-3.jpg', caption: 'ComeDog — comedero automático', tall: true },
  { src: '/images/comedog1.jpg',  caption: 'Prototipo del dispensador' },
  { src: '/images/comedog2.jpg',  caption: 'Sistema de monitoreo' },
  { src: '/images/comedog3.jpg',  caption: 'Prueba con mascotas reales' },
  { src: '/images/comedog4.jpg',  caption: 'Componentes electrónicos', tall: true },
  { src: '/images/galeria-3.jpg', caption: 'Presentación del ComeDog' },
]

export default function ComeDogPage() {
  return (
    <>
      <PageHeader
        eyebrow="Proyectos"
        title="ComeDog"
        description="Comedero automático con monitoreo para el bienestar de mascotas cuando están solas, combinando automatización, sensores y amor por los animales."
        titleClassName="text-yellow"
      />
      <BackButton href="/proyectos" label="Volver a Proyectos" />
      <section className="mx-auto max-w-6xl px-4 pb-20">
        <GalleryGrid photos={PHOTOS} />
      </section>
    </>
  )
}
