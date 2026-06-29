import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export function BackButton({ href, label }: { href: string; label: string }) {
  return (
    <div className="mx-auto max-w-6xl px-4 pt-4 pb-2">
      <Link
        href={href}
        className="group inline-flex items-center gap-2 rounded-full border-2 border-foreground/20 bg-card px-5 py-2.5 text-sm font-bold text-foreground shadow-[3px_3px_0_oklch(0.26_0.02_60_/_12%)] transition-all hover:-translate-y-0.5 hover:border-primary hover:text-primary hover:shadow-[3px_3px_0_oklch(0.26_0.02_60_/_20%)]"
      >
        <ArrowLeft className="size-4 transition-transform duration-200 group-hover:-translate-x-1" />
        {label}
      </Link>
    </div>
  )
}
