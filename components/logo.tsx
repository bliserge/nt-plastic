import Link from 'next/link'
import { cn } from '@/lib/utils'

export function Logo({ className, invert = false }: { className?: string; invert?: boolean }) {
  return (
    <Link href="/" className={cn('inline-flex items-center gap-2.5', className)} aria-label="NT Plastic Industries home">
      <span className="grid h-9 w-9 place-items-center rounded-sm bg-nt-blue">
        <span className="font-display text-sm font-extrabold tracking-tight text-nt-blue-foreground">NT</span>
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            'font-display text-[15px] font-extrabold tracking-tight',
            invert ? 'text-industrial-foreground' : 'text-foreground',
          )}
        >
          NT PLASTIC
        </span>
        <span
          className={cn(
            'text-[10px] font-semibold uppercase tracking-[0.22em]',
            invert ? 'text-nt-green' : 'text-nt-green',
          )}
        >
          Industries Ltd
        </span>
      </span>
    </Link>
  )
}
