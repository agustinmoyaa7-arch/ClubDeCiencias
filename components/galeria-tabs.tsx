'use client'

import { useState } from 'react'
import { GalleryGrid, type Photo } from '@/components/gallery-grid'

type Category = { label: string; photos: Photo[] }

const CATEGORIES: Category[] = [
  {
    label: 'Eventos',
    photos: [
      { src: '/images/recaudacion-mesas-2.jpeg', caption: 'El equipo en el stand con los carteles del club', tall: true },
      { src: '/images/recaudacion-mesas-1.jpeg', caption: 'Mesa de dulces con galletas de miel-avena, budines y tortas' },
      { src: '/images/recaudacion-mesas-3.jpeg', caption: 'La tarta de membrillo fue el hit de la jornada', tall: true },
      { src: '/images/recaudacion-mesas-4.jpeg', caption: 'El equipo atendiendo a los primeros clientes' },
      { src: '/images/recaudacion-mesas-5.jpeg', caption: 'Stand al aire libre con toda la variedad de productos' },
      { src: '/images/recaudacion-mesas-6.jpeg', caption: 'Mesa completa: tortas, bizcochuelos y cupcakes' },
      { src: '/images/recaudacion-mesas-7.jpeg', caption: 'Armando la carpa para el evento', tall: true },
      { src: '/images/recaudacion-mesas-8.jpeg', caption: 'Cupcakes, bizcochuelo de naranja y postres con frutos' },
      { src: '/images/semana-miel-2.jpeg',       caption: 'Stand del club en la Semana Nacional de la Miel', tall: true },
      { src: '/images/semana-miel-3.jpeg',       caption: 'Vista completa del stand con toda la exposición' },
      { src: '/images/semana-miel-1.jpeg',       caption: 'Mesa de productos de miel' },
      { src: '/images/semana-miel-4.jpeg',       caption: 'Flyer oficial — Semana Nacional de la Miel' },
      { src: '/images/visita-jeronimo-1.jpg',    caption: 'El club compartiendo experiencias en Jerónimo del Barco', tall: true },
      { src: '/images/visita-jeronimo-2.jpg',    caption: 'Entrega de pins del club a los más chicos' },
      { src: '/images/visita-jeronimo-3.jpg',    caption: 'Presentación de proyectos en la escuela primaria' },
      { src: '/images/visita-jeronimo-4.jpg',    caption: 'Los alumnos atentos a la explicación', tall: true },
      { src: '/images/visita-jeronimo-5.jpg',    caption: 'Reconocimiento recibido por el club' },
    ],
  },
  {
    label: 'Proyectos',
    photos: [
      { src: '/images/muralclub.jpg',             caption: 'Mural del Club de Ciencia ConCiencia', tall: true },
      { src: '/images/muralclub1.jpg',           caption: 'Proceso de pintura del mural' },
      { src: '/images/muralclub2.jpg',           caption: 'Detalle final del mural', tall: true },
      { src: '/images/charlasanamente.jpg',      caption: 'SanaMente — charla de salud mental', tall: true },
      { src: '/images/charlasanamente1.jpg',     caption: 'SanaMente — presentación a estudiantes' },
      { src: '/images/charlasanamente2.jpg',     caption: 'SanaMente — dinámica grupal' },
      { src: '/images/charlasanamente3.jpg',     caption: 'SanaMente — materiales de la charla' },
      { src: '/images/plasticos3d.jpeg',         caption: 'Plásticos 3D — prototipo impreso', tall: true },
      { src: '/images/plasticos3d1.jpeg',        caption: 'Plásticos 3D — proceso de impresión' },
      { src: '/images/plasticos3d2.jpeg',        caption: 'Plásticos 3D — piezas terminadas' },
      { src: '/images/plasticos3d3.jpeg',        caption: 'Plásticos 3D — diseño del modelo' },
      { src: '/images/plasticos3d4.jpg',         caption: 'Plásticos 3D — presentación del proyecto' },
      { src: '/images/movimientoinfinito.jpeg',  caption: 'Movimiento Infinito — el mecanismo en acción', tall: true },
      { src: '/images/movimientoinfinito1.jpeg', caption: 'Movimiento Infinito — construcción' },
      { src: '/images/movimientoinfinito2.jpeg', caption: 'Movimiento Infinito — soldadura' },
      { src: '/images/movimientoinfinito3.jpeg', caption: 'Movimiento Infinito — prueba final' },
      { src: '/images/giraSol.jpeg',             caption: 'Girasol — panel solar seguidor del sol' },
      { src: '/images/giraSol1.jpeg',            caption: 'Girasol — mecanismo de orientación', tall: true },
      { src: '/images/giraSol2.jpg',             caption: 'Girasol — prueba de rendimiento' },
      { src: '/images/galeria-2.jpg',            caption: 'Girasol — en funcionamiento al aire libre' },
      { src: '/images/comedog.jpg',              caption: 'ComeDog — comedero automático' },
      { src: '/images/comedog1.jpg',             caption: 'ComeDog — prototipo del dispensador', tall: true },
      { src: '/images/comedog2.jpg',             caption: 'ComeDog — sistema de monitoreo' },
      { src: '/images/comedog3.jpg',             caption: 'ComeDog — prueba con mascotas' },
      { src: '/images/comedog4.jpg',             caption: 'ComeDog — componentes electrónicos' },
      { src: '/images/galeria-3.jpg',            caption: 'ComeDog — presentación del proyecto', tall: true },
    ],
  },
  {
    label: 'Viaje CONAE',
    photos: [
      { src: '/images/viajes.jpg',       caption: 'Llegada a la Estación Astrofísica Bosque Alegre', tall: true },
      { src: '/images/viaje-conae.jpg',  caption: 'Recorrido por las instalaciones' },
      { src: '/images/viaje-conae1.jpg', caption: 'Telescopios de la estación astrofísica' },
      { src: '/images/viaje-conae2.jpg', caption: 'El equipo explorando la estación' },
      { src: '/images/viaje-conae3.jpg', caption: 'Explicación sobre astronomía', tall: true },
      { src: '/images/viaje-conae4.jpg', caption: 'Observando los equipos científicos' },
      { src: '/images/viaje-conae5.jpg', caption: 'Charla con investigadores del CONAE' },
      { src: '/images/viaje-conae6.jpg', caption: 'Recorrido por el observatorio' },
      { src: '/images/viaje-conae7.jpg', caption: 'Cierre de la jornada en Bosque Alegre', tall: true },
    ],
  },
  {
    label: 'Viaje Pilar',
    photos: [
      { src: '/images/viaje-pilar-1.jpeg',  caption: 'Recorrido por los jardines del centro de investigación', tall: true },
      { src: '/images/viaje-pilar-2.jpeg',  caption: 'Charla de bienvenida con todo el grupo' },
      { src: '/images/viaje-pilar-3.jpeg',  caption: '¡Cascos puestos y listos para recorrer la planta!' },
      { src: '/images/viaje-pilar-4.jpeg',  caption: 'En la sala de control de la central eléctrica', tall: true },
      { src: '/images/viaje-pilar-5.jpeg',  caption: 'Inspeccionando las instalaciones técnicas' },
      { src: '/images/viaje-pilar-6.jpeg',  caption: 'Recorrido por la sala de turbinas' },
      { src: '/images/viaje-pilar-7.jpeg',  caption: 'Red de tuberías de la planta termoeléctrica' },
      { src: '/images/viaje-pilar-8.jpeg',  caption: 'Laboratorio de óptica láser', tall: true },
      { src: '/images/viaje-pilar-9.jpeg',  caption: 'Estación meteorológica automática' },
      { src: '/images/viaje-pilar-10.jpeg', caption: 'Heliógrafo Campbell-Stokes' },
      { src: '/images/viaje-pilar-11.jpeg', caption: 'Torre de la central termoeléctrica' },
      { src: '/images/viaje-pilar-12.jpeg', caption: 'Foto grupal al pie de las torres', tall: true },
    ],
  },
]

export function GaleriaTabs() {
  const [active, setActive] = useState(0)

  return (
    <>
      <div className="mx-auto max-w-6xl px-4 pt-8 pb-4">
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat, i) => (
            <button
              key={cat.label}
              onClick={() => setActive(i)}
              className={`rounded-full border-2 px-5 py-2 text-sm font-bold transition-all ${
                active === i
                  ? 'border-green bg-green text-white shadow-[3px_3px_0_oklch(0.26_0.02_60_/_15%)]'
                  : 'border-foreground/20 bg-card text-foreground hover:border-green hover:text-green'
              }`}
            >
              {cat.label}
              <span className="ml-1.5 text-xs opacity-60">({cat.photos.length})</span>
            </button>
          ))}
        </div>
      </div>

      <section className="mx-auto max-w-6xl px-4 py-8">
        <GalleryGrid photos={CATEGORIES[active].photos} />
      </section>
    </>
  )
}
