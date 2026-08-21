import Image from 'next/image'
import { cn } from '@/lib/utils'

export function PageHero({
  eyebrow,
  title,
  description,
  image,
  imageAlt,
  children,
  compact = false,
}: {
  eyebrow?: string
  title: string
  description?: string
  image?: string
  imageAlt?: string
  children?: React.ReactNode
  compact?: boolean
}) {
  return (
    <section
      className={cn(
        'relative flex items-end overflow-hidden bg-industrial',
        compact ? 'min-h-[52vh] pt-24' : 'min-h-[68vh] pt-24',
      )}
    >
      {image && (
        <>
          <Image src={image || '/placeholder.svg'} alt={imageAlt || ''} fill priority className="object-cover opacity-55" />
          <div className="absolute inset-0 bg-gradient-to-t from-industrial via-industrial/70 to-industrial/40" />
        </>
      )}
      {!image && <div className="absolute inset-0 bg-gradient-to-br from-industrial to-industrial-muted" />}

      <div className="relative mx-auto w-full max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          {eyebrow && (
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-nt-green">{eyebrow}</span>
          )}
          <h1 className="mt-4 text-balance font-display text-4xl font-extrabold leading-[1.05] text-industrial-foreground sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          {description && (
            <p className="mt-5 max-w-2xl text-pretty text-base leading-relaxed text-industrial-foreground/75 sm:text-lg">
              {description}
            </p>
          )}
          {children && <div className="mt-8">{children}</div>}
        </div>
      </div>
    </section>
  )
}
