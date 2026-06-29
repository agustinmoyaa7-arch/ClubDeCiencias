import { PageHeader } from '@/components/page-header'
import { GalleryGrid } from '@/components/gallery-grid'
import { BackButton } from '@/components/back-button'

export const metadata = {
  title: 'SanaMente · ConCiencia',
  description: 'Proyecto de salud mental del Club de Ciencia ConCiencia.',
}

const PHOTOS = [
  { src: '/images/revista.jpg',         caption: 'Charla sobre salud mental', tall: true },
  { src: '/images/charlasanamente1.jpg', caption: 'Presentación del proyecto SanaMente' },
  { src: '/images/charlasanamente2.jpg', caption: 'Actividad grupal sobre bienestar' },
  { src: '/images/charlasanamente3.jpg', caption: 'Equipo del club en la charla' },
  { src: '/images/revista.jpg',          caption: 'Formularios anónimos con los estudiantes' },
  { src: '/images/charlasanamente1.jpg', caption: 'Dinámica sobre ansiedad y TCA' },
]

export default function SanaMentePage() {
  return (
    <>
      <PageHeader
        eyebrow="Proyectos"
        title="SanaMente"
        description="Charlas sobre salud mental en la escuela: TCA, bullying y ansiedad, con apoyo de la Lic. en Psicología Mara López Blanco."
        titleClassName="text-yellow"
      />
      <BackButton href="/proyectos" label="Volver a Proyectos" />
      <section className="mx-auto max-w-6xl px-4 pb-20">
        <GalleryGrid photos={PHOTOS} />
      </section>
    </>
  )
}
