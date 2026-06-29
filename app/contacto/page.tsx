import { Mail, MapPin, School } from 'lucide-react'
import { PageHeader } from '@/components/page-header'
import { Reveal } from '@/components/reveal'
import { CLUB_INFO } from '@/lib/site'

export const metadata = {
  title: 'Contacto · ConCiencia',
  description: 'Contactá al Club de Ciencia ConCiencia y sumate a explorar la ciencia con nosotros.',
}

const DETAILS = [
  { icon: Mail, label: 'Email', value: CLUB_INFO.email },
  { icon: School, label: 'Escuela', value: CLUB_INFO.school },
  { icon: MapPin, label: 'Ubicación', value: CLUB_INFO.city },
]

export default function ContactoPage() {
  return (
    <>
      <PageHeader
        eyebrow="Hablemos"
        title="Contacto"
        description="¿Te gusta la ciencia? Escribinos y sumate al club."
        titleClassName="text-red"
      />

      <section className="mx-auto max-w-6xl px-4 py-16">
        <Reveal className="space-y-6">
          <h2 className="font-display text-3xl text-foreground">Dónde encontrarnos</h2>
          <p className="text-pretty leading-relaxed text-muted-foreground">
            Nos reunimos en el {CLUB_INFO.school}. Si querés participar de los proyectos, viajes, eventos o de la revista,
            escribinos por alguno de estos medios.
          </p>
          <ul className="grid gap-4 sm:grid-cols-2">
            {DETAILS.map((d) => (
              <li
                key={d.label}
                className="flex items-center gap-4 rounded-2xl border-2 border-foreground/15 bg-card p-4 shadow-[3px_3px_0_oklch(0.26_0.02_60_/_10%)]"
              >
                <span className="inline-flex rounded-xl bg-blue/15 p-2.5 text-blue">
                  <d.icon className="size-5" aria-hidden />
                </span>
                <div>
                  <p className="font-display text-sm text-muted-foreground">{d.label}</p>
                  <p className="font-medium text-foreground">{d.value}</p>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-20">
        <Reveal className="space-y-4">
          <h2 className="font-display text-3xl text-foreground">Dónde encontrarnos</h2>
          <div className="overflow-hidden rounded-3xl border-2 border-foreground/15 shadow-[6px_6px_0_oklch(0.26_0.02_60_/_12%)]">
            <iframe
              title="Mapa del Club de Ciencia ConCiencia"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3406.9236715364527!2d-64.58880007266997!3d-31.36108545555513!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x942d6e5a90ae85e9%3A0x96e0684b8008c009!2sIPETyM%2084!5e0!3m2!1ses-419!2sar!4v1782761635250!5m2!1ses-419!2sar"
              className="h-[360px] w-full border-0"
              loading="lazy"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>
        </Reveal>
      </section>
    </>
  )
}
