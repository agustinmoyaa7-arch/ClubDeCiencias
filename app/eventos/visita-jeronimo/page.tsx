import { PageHeader } from '@/components/page-header'
import { GalleryGrid } from '@/components/gallery-grid'
import { BackButton } from '@/components/back-button'

export const metadata = {
  title: 'Visita a Jerónimo del Barco · ConCiencia',
  description: 'Galería de fotos de la visita del club a la escuela primaria Jerónimo del Barco para compartir proyectos e inspirar a los más chicos.',
}

const PHOTOS = [
  { src: '/images/visita-jeronimo-1.jpg', caption: 'El club compartiendo experiencias con los alumnos de la escuela', tall: true },
  { src: '/images/visita-jeronimo-2.jpg', caption: 'Entrega de pins del club a los más chicos' },
  { src: '/images/visita-jeronimo-3.jpg', caption: 'Presentación de proyectos desarrollados durante el año' },
  { src: '/images/visita-jeronimo-4.jpg', caption: 'Los alumnos atentos a la explicación de los proyectos', tall: true },
  { src: '/images/visita-jeronimo-5.jpg', caption: 'Reconocimiento recibido por el club durante la visita' },
]

export default function VisitaJeronimoPage() {
  return (
    <>
      <PageHeader
        eyebrow="Eventos"
        title="Visita a Jerónimo del Barco"
        description="Fuimos a la escuela primaria Jerónimo del Barco a compartir nuestros proyectos. Los alumnos quedaron tan entusiasmados que decidieron formar su propio club de ciencias."
        titleClassName="text-pink"
      />
      <BackButton href="/eventos" label="Volver a Eventos" />
      <section className="mx-auto max-w-6xl px-4 pb-20">
        <GalleryGrid photos={PHOTOS} />
      </section>
    </>
  )
}
