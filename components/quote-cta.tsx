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
    <section className="bg-nt-blue py-20 text-nt-blue-foreground sm:py-28">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <Reveal>
          <h2 className="text-balance font-display text-3xl font-extrabold sm:text-5xl">{title}</h2>
          <p className="mx-auto mt-5 max-w-xl text-pretty leading-relaxed text-nt-blue-foreground/80">
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
