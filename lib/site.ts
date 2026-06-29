export const NAV_LINKS = [
  { href: '/', label: 'Inicio' },
  { href: '/sobre-nosotros', label: 'Sobre Nosotros' },
  { href: '/revista', label: 'Actividades', activitiesGroup: true },
  { href: '/galeria', label: 'Galería' },
  { href: '/contacto', label: 'Contacto' },
] as const

export const ACTIVITIES = [
  {
    slug: 'revista',
    title: 'Revista Científica',
    color: 'blue',
    image: '/images/revista.jpg',
    short: 'Publicaciones hechas por estudiantes sobre ciencia, tecnología y sociedad.',
    back: 'ConCiencia es nuestra revista escrita y diseñada por estudiantes: artículos, entrevistas y experimentos para acercar la ciencia a todos.',
  },
  {
    slug: 'viajes',
    title: 'Viajes',
    color: 'green',
    image: '/images/viajes.jpg',
    short: 'Salidas y viajes educativos para descubrir el mundo desde la ciencia.',
    back: 'Recorremos museos, universidades y paisajes naturales de Córdoba y el país para aprender haciendo y vivir la ciencia fuera del aula.',
  },
  {
    slug: 'eventos',
    title: 'Eventos',
    color: 'pink',
    image: '/images/eventos.jpg',
    short: 'Charlas, ferias y jornadas para compartir y aprender en comunidad.',
    back: 'Organizamos y participamos en ferias de ciencia, charlas y jornadas abiertas donde compartimos lo que aprendemos con la comunidad.',
  },
  {
    slug: 'proyectos',
    title: 'Proyectos',
    color: 'yellow',
    image: '/images/proyectos.jpg',
    short: 'Desarrollamos ideas, experimentos y soluciones a problemas reales.',
    back: 'Investigamos problemas reales de nuestra comunidad y diseñamos experimentos y prototipos para proponer soluciones con base científica.',
  },
] as const

export type Activity = (typeof ACTIVITIES)[number]

export const CLUB_INFO = {
  name: 'Club de Ciencia ConCiencia',
  school: 'IPETyM N°84',
  city: 'Tanti, Córdoba, Argentina',
  email: 'clubdeciencias@ipetym84.com.ar',
  motto: 'Exploramos el presente para transformar el futuro.',
}
