import { CtaLink } from '@/components/cta-link'
import { Reveal } from '@/components/reveal'

export function QuoteCta({
  title = 'Have a project in mind?',
  description = 'Tell us what you need. Our team will help you identify the right product or solution.',
  primaryLabel = 'Request a Quote',
  primaryHref = '/contact',
  secondaryLabel = 'Contact Our Team',
  secondaryHref = '/contact',
}: {
  title?: string
  description?: string
  primaryLabel?: string
  primaryHref?: string
  secondaryLabel?: string
  secondaryHref?: string
}) {
  return (
    <section className="bg-industrial py-20 text-industrial-foreground sm:py-28">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <Reveal className="overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-nt-blue to-industrial p-8 text-center shadow-[0_24px_80px_rgba(0,0,0,0.18)] sm:p-12 lg:p-16">
          <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-nt-green">Start the conversation</p>
          <h2 className="mt-4 text-balance font-display text-3xl font-extrabold leading-[1.02] sm:text-5xl">
            {title}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-pretty text-base leading-relaxed text-industrial-foreground/78 sm:text-lg">
            {description}
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <CtaLink href={primaryHref} variant="green">
              {primaryLabel}
            </CtaLink>
            <CtaLink href={secondaryHref} variant="light">
              {secondaryLabel}
            </CtaLink>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
