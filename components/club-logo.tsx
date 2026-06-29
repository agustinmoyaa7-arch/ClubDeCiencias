import { cn } from '@/lib/utils'

type Tile = {
  num: string
  mass: string
  symbol: string
  name: string
  className: string
}

const TILES: Tile[] = [
  { num: '6', mass: '12.011', symbol: 'C', name: 'Carbono', className: 'bg-violet/20 border-violet/60 text-violet' },
  { num: '71', mass: '174.97', symbol: 'Lu', name: 'Lutecio', className: 'bg-yellow border-foreground/40 text-foreground' },
  { num: '5', mass: '10.811', symbol: 'B', name: 'Boro', className: 'bg-green/25 border-green/70 text-green' },
]

export function ClubLogo({ className }: { className?: string }) {
  return (
    <span className={cn('flex items-end gap-1', className)} aria-label="Club de Ciencia ConCiencia">
      {TILES.map((t) => (
        <span
          key={t.symbol}
          className={cn(
            'relative flex aspect-square w-9 flex-col justify-between rounded-md border-2 p-1 leading-none shadow-[2px_2px_0_oklch(0.26_0.02_60_/_25%)] sm:w-10',
            t.className,
          )}
        >
          <span className="flex items-center justify-between text-[6px] font-bold opacity-80">
            <span>{t.num}</span>
            <span>{t.mass}</span>
          </span>
          <span className="font-display text-xl font-bold sm:text-2xl">{t.symbol}</span>
          <span className="text-[5px] font-semibold uppercase tracking-wide opacity-80">{t.name}</span>
        </span>
      ))}
    </span>
  )
}
