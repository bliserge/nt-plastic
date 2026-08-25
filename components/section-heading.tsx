import { cn } from '@/lib/utils'
import { Reveal } from '@/components/reveal'

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  invert = false,
  className,
}: {
  eyebrow?: string
  title: string
  description?: string
  align?: 'left' | 'center'
  invert?: boolean
  className?: string
}) {
  return (
    <Reveal
      className={cn(
        'max-w-3xl',
        align === 'center' && 'mx-auto text-center',
        className,
      )}
    >
      {eyebrow && (
        <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-nt-green/90">{eyebrow}</span>
      )}
      <h2
        className={cn(
          'mt-4 text-balance font-display text-3xl font-bold leading-[1.05] sm:text-4xl lg:text-5xl',
          invert ? 'text-industrial-foreground' : 'text-foreground',
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            'mt-5 max-w-2xl text-pretty text-base leading-relaxed sm:text-lg',
            invert ? 'text-industrial-foreground/70' : 'text-muted-foreground',
          )}
        >
          {description}
        </p>
      )}
    </Reveal>
  )
}
