import { PageHeader } from '@/components/page-header'
import { GalleryGrid } from '@/components/gallery-grid'
import { BackButton } from '@/components/back-button'

export const metadata = {
  title: 'Plásticos 3D · ConCiencia',
  description: 'Proyecto de reciclaje de plásticos en filamento para impresoras 3D.',
}

const PHOTOS = [
  { src: '/images/proyectos.jpg',    caption: 'Proceso de reciclaje plástico', tall: true },
  { src: '/images/plasticos3d1.jpeg', caption: 'Extrusión del filamento' },
  { src: '/images/plasticos3d2.jpeg', caption: 'Experimentos con distintos materiales' },
  { src: '/images/plasticos3d4.jpg',  caption: 'Resultado del filamento reciclado' },
  { src: '/images/plasticos3d.jpeg',  caption: 'Equipo trabajando en el proyecto', tall: true },
  { src: '/images/proyectos.jpg',     caption: 'Presentación a la comunidad educativa' },
]

export default function Plasticos3DPage() {
  return (
    <>
      <PageHeader
        eyebrow="Proyectos"
        title="Plásticos 3D"
        description="Transformamos residuos plásticos en filamento para impresoras 3D, combinando reciclaje consciente con fabricación aditiva."
        titleClassName="text-yellow"
      />
      <BackButton href="/proyectos" label="Volver a Proyectos" />
      <section className="mx-auto max-w-6xl px-4 pb-20">
        <GalleryGrid photos={PHOTOS} />
      </section>
    </>
  )
}
