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
        'max-w-2xl',
        align === 'center' && 'mx-auto text-center',
        className,
      )}
    >
      {eyebrow && (
        <span className="text-xs font-semibold uppercase tracking-[0.22em] text-nt-green">{eyebrow}</span>
      )}
      <h2
        className={cn(
          'mt-4 text-balance font-display text-3xl font-bold sm:text-4xl',
          invert ? 'text-industrial-foreground' : 'text-foreground',
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            'mt-4 text-pretty leading-relaxed',
            invert ? 'text-industrial-foreground/70' : 'text-muted-foreground',
          )}
        >
          {description}
        </p>
      )}
    </Reveal>
  )
}
