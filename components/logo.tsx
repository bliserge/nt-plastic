import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'

export function Logo({ className, invert = false }: { className?: string; invert?: boolean }) {
  return (
    <Link href="/" className={cn('inline-flex items-center gap-2.5', className)} aria-label="NT Plastic Industries home">
      <span className="grid h-9 w-9 shrink-0 place-items-center overflow-hidden rounded-sm">
        <Image
          src="/logo.png"
          alt=""
          width={36}
          height={36}
          className="h-9 w-9 object-contain"
          priority
        />
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
