import { PageHeader } from '@/components/page-header'
import { GalleryGrid } from '@/components/gallery-grid'
import { BackButton } from '@/components/back-button'

export const metadata = {
  title: 'Recaudación Solidaria · ConCiencia',
  description: 'Galería de fotos de la Recaudación Solidaria del Club ConCiencia.',
}

const PHOTOS = [
  { src: '/images/recaudacion-mesas-2.jpeg', caption: 'El equipo en el stand con los carteles del club', tall: true },
  { src: '/images/recaudacion-mesas-1.jpeg', caption: 'Mesa de dulces con galletas de miel-avena, budines y tortas' },
  { src: '/images/recaudacion-mesas-5.jpeg', caption: 'Stand al aire libre con toda la variedad de productos' },
  { src: '/images/recaudacion-mesas-8.jpeg', caption: 'Cupcakes, bizcochuelo de naranja y postres con frutos' },
  { src: '/images/recaudacion-mesas-3.jpeg', caption: 'La tarta de membrillo fue el hit de la jornada', tall: true },
  { src: '/images/recaudacion-mesas-6.jpeg', caption: 'Mesa completa: tortas, bizcochuelos y cupcakes' },
  { src: '/images/recaudacion-mesas-4.jpeg', caption: 'El equipo atendiendo a los primeros clientes' },
  { src: '/images/recaudacion-mesas-7.jpeg', caption: 'Armando la carpa para el evento', tall: true },
  { src: '/images/recaudacion-club-1.jpg',   caption: 'Evaluación interna de productos con el club' },
]

export default function RecaudacionPage() {
  return (
    <>
      <PageHeader
        eyebrow="Eventos"
        title="Recaudación Solidaria"
        description="Jornadas de recaudación donde la comunidad acompaña los proyectos del club."
        titleClassName="text-pink"
      />
      <BackButton href="/eventos" label="Volver a Eventos" />
      <section className="mx-auto max-w-6xl px-4 pb-20">
        <GalleryGrid photos={PHOTOS} />
      </section>
    </>
  )
}
