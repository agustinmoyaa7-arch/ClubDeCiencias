import { PageHeader } from '@/components/page-header'
import { Reveal } from '@/components/reveal'
import { ArkaNeitonGame } from '@/components/arkanewton-game'

export const metadata = {
  title: 'Arcade · ConCiencia',
  description: 'Jugá a Arka-Newton, el juego del Club de Ciencia ConCiencia.',
}

export default function ArcadePage() {
  return (
    <>
      <PageHeader
        eyebrow="Diversión científica"
        title="Arka-Newton"
        description="Rompé todos los bloques con la manzana de Newton. ¡Que caiga la gravedad sobre tus enemigos!"
        titleClassName="text-violet"
      />
      <section className="mx-auto flex max-w-4xl flex-col items-center gap-4 px-4 pb-20">
        <Reveal className="w-full flex justify-center">
          <ArkaNeitonGame />
        </Reveal>
        <Reveal delay={0.15}>
          <p className="text-sm text-muted-foreground text-center">
            Mové el mouse o el dedo para mover a Newton · Clic para lanzar
          </p>
        </Reveal>
      </section>
    </>
  )
}
