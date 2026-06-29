import { PenLine, Users, Lightbulb } from 'lucide-react'
import { ActivityPage } from '@/components/activity-page'

export const metadata = {
  title: 'Revista Científica · ConCiencia',
  description: 'ConCiencia, la revista científica escrita y diseñada por estudiantes del Club de Ciencia.',
}

export default function RevistaPage() {
  return (
    <ActivityPage
      color="blue"
      title="Revista Científica"
      description="ConCiencia: ciencia contada por estudiantes, para todos."
      image="/images/revista.jpg"
      intro={[
        'ConCiencia es nuestra revista científica: cada edición está escrita, ilustrada y diseñada por los propios estudiantes del club.',
        'Publicamos artículos de divulgación, entrevistas a científicos, reseñas de experimentos y notas sobre ciencia, tecnología y sociedad.',
        'Es nuestra forma de practicar la comunicación científica y de acercar la curiosidad a toda la comunidad educativa.',
      ]}
      highlights={[
        { icon: PenLine, title: 'Artículos', text: 'Notas de divulgación sobre temas que nos apasionan, redactadas por estudiantes.' },
        { icon: Users, title: 'Entrevistas', text: 'Conversaciones con científicos, docentes y referentes de la comunidad.' },
        { icon: Lightbulb, title: 'Experimentos', text: 'Reseñas y resultados de los experimentos que hacemos en el club.' },
      ]}
    />
  )
}
