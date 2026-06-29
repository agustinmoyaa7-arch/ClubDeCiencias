import { PageHeader } from '@/components/page-header'
import { GaleriaTabs } from '@/components/galeria-tabs'

export const metadata = {
  title: 'Galería · ConCiencia',
  description: 'Galería de fotos del Club de Ciencia ConCiencia: experimentos, salidas y eventos.',
}

export default function GaleriaPage() {
  return (
    <>
      <PageHeader
        eyebrow="Momentos"
        title="Galería"
        description="Un recorrido por nuestros experimentos, salidas y eventos."
        titleClassName="text-green"
      />
      <GaleriaTabs />
    </>
  )
}
