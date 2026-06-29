'use client'

import { useState } from 'react'
import { Send, CheckCircle2 } from 'lucide-react'

export function ContactForm() {
  const [sent, setSent] = useState(false)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSent(true)
  }

  const fieldClass =
    'w-full rounded-2xl border-2 border-foreground/15 bg-card px-4 py-3 text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-blue'

  if (sent) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-3xl border-2 border-foreground/15 bg-secondary/60 p-10 text-center shadow-[6px_6px_0_oklch(0.26_0.02_60_/_12%)]">
        <CheckCircle2 className="size-12 text-green" aria-hidden />
        <h3 className="font-display text-3xl text-foreground">¡Mensaje enviado!</h3>
        <p className="max-w-sm text-muted-foreground">
          Gracias por escribirnos. Te vamos a responder muy pronto para contarte cómo sumarte al club.
        </p>
        <button
          type="button"
          onClick={() => setSent(false)}
          className="mt-2 font-display text-lg text-blue underline-offset-4 hover:underline"
        >
          Enviar otro mensaje
        </button>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-3xl border-2 border-foreground/15 bg-card p-6 shadow-[6px_6px_0_oklch(0.26_0.02_60_/_12%)] sm:p-8"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <label htmlFor="nombre" className="font-display text-lg text-foreground">
            Nombre
          </label>
          <input id="nombre" name="nombre" required placeholder="Tu nombre" className={fieldClass} />
        </div>
        <div className="space-y-1.5">
          <label htmlFor="email" className="font-display text-lg text-foreground">
            Email
          </label>
          <input id="email" name="email" type="email" required placeholder="tu@email.com" className={fieldClass} />
        </div>
      </div>
      <div className="space-y-1.5">
        <label htmlFor="asunto" className="font-display text-lg text-foreground">
          Asunto
        </label>
        <input id="asunto" name="asunto" required placeholder="Quiero sumarme al club" className={fieldClass} />
      </div>
      <div className="space-y-1.5">
        <label htmlFor="mensaje" className="font-display text-lg text-foreground">
          Mensaje
        </label>
        <textarea
          id="mensaje"
          name="mensaje"
          required
          rows={5}
          placeholder="Contanos qué te interesa de la ciencia..."
          className={fieldClass + ' resize-none'}
        />
      </div>
      <button
        type="submit"
        className="inline-flex items-center gap-2 rounded-2xl border-2 border-foreground/80 bg-primary px-6 py-3 font-display text-lg text-primary-foreground shadow-[3px_3px_0_oklch(0.26_0.02_60)] transition-transform hover:-translate-y-0.5 active:translate-y-0"
      >
        Enviar mensaje
        <Send className="size-4" aria-hidden />
      </button>
    </form>
  )
}
