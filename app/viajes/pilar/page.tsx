import { PageHeader } from '@/components/page-header'
import { GalleryGrid } from '@/components/gallery-grid'
import { BackButton } from '@/components/back-button'

export const metadata = {
  title: 'Viaje a Pilar · ConCiencia',
  description: 'Galería de fotos del viaje a Pilar, Córdoba: central termoeléctrica, laboratorio láser y estación meteorológica.',
}

const PHOTOS = [
  { src: '/images/viaje-pilar-1.jpeg',  caption: 'Recorrido por los jardines del centro de investigación — un heliógrafo en primer plano', tall: true },
  { src: '/images/viaje-pilar-2.jpeg',  caption: 'Charla de bienvenida con todo el grupo en el salón del centro' },
  { src: '/images/viaje-pilar-3.jpeg',  caption: '¡Cascos puestos y listos para recorrer la planta!' },
  { src: '/images/viaje-pilar-4.jpeg',  caption: 'En la sala de control de la central eléctrica — ¡todo verde!', tall: true },
  { src: '/images/viaje-pilar-5.jpeg',  caption: 'Inspeccionando las instalaciones técnicas subterráneas' },
  { src: '/images/viaje-pilar-6.jpeg',  caption: 'Recorrido por la sala de turbinas y maquinaria industrial' },
  { src: '/images/viaje-pilar-7.jpeg',  caption: 'La imponente red de tuberías de la planta termoeléctrica' },
  { src: '/images/viaje-pilar-8.jpeg',  caption: 'Laboratorio de óptica láser: equipos de alta precisión para investigación atmosférica', tall: true },
  { src: '/images/viaje-pilar-9.jpeg',  caption: 'Demostración de la estación meteorológica automática en el campo' },
  { src: '/images/viaje-pilar-10.jpeg', caption: 'Heliógrafo Campbell-Stokes: el instrumento que registra las horas de sol' },
  { src: '/images/viaje-pilar-11.jpeg', caption: 'Torre de la central termoeléctrica vista desde abajo', tall: true },
  { src: '/images/viaje-pilar-12.jpeg', caption: 'Foto grupal del club al pie de las torres — ¡una jornada para recordar!' },
  { src: '/images/viaje-pilar-13.jpeg', caption: 'Foto grupal frente al colectivo antes de partir', tall: true },
  { src: '/images/viaje-pilar-14.jpeg', caption: 'Subiendo al colectivo con toda la energía' },
  { src: '/images/viaje-pilar-15.jpeg', caption: 'Charla técnica en el taller de otra institución educativa' },
  { src: '/images/viaje-pilar-16.jpeg', caption: 'Los docentes explicando el funcionamiento del taller', tall: true },
  { src: '/images/viaje-pilar-17.jpeg', caption: 'El grupo atento a la presentación en el taller técnico' },
]

export default function PilarPage() {
  return (
    <>
      <PageHeader
        eyebrow="Viajes"
        title="Viaje a Pilar"
        description="Pilar, Córdoba · Central termoeléctrica · Laboratorio láser · Estación meteorológica"
        titleClassName="text-green"
      />
      <BackButton href="/viajes" label="Volver a Viajes" />
      <section className="mx-auto max-w-6xl px-4 pb-20">
        <GalleryGrid photos={PHOTOS} />
      </section>
    </>
  )
}
