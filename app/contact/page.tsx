import type { Metadata } from 'next'
import type { ComponentType } from 'react'
import { ArrowRight, Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import { PageHero } from '@/components/page-hero'
import { QuoteCta } from '@/components/quote-cta'
import { ContactForm } from '@/components/contact/contact-form'
import { site } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Talk to NT Plastic Industries about products, quotes, partnerships, distribution and custom manufacturing.',
}

export default function ContactPage({
  searchParams,
}: {
  searchParams?: { product?: string | string[]; inquiry?: string | string[] }
}) {
  const product = typeof searchParams?.product === 'string' ? searchParams.product : undefined
  const inquiry = typeof searchParams?.inquiry === 'string' ? searchParams.inquiry : undefined

  return (
    <>
      <PageHero
        eyebrow="Contact Us"
        title="Let's talk about your next project."
        description="Whether you need a product, a large-scale supply, a distribution partnership or a custom solution, our team is ready to help."
      />

      <section className="border-b border-border bg-background">
        <div className="mx-auto max-w-7xl px-4 py-14 md:px-6">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <ContactAction
              label="Call"
              value={site.contact.phone}
              href={`tel:${site.contact.phone.replace(/\s+/g, '')}`}
              icon={Phone}
            />
            <ContactAction label="Email" value={site.contact.email} href={`mailto:${site.contact.email}`} icon={Mail} />
            <ContactAction
              label="WhatsApp"
              value={site.contact.whatsapp}
              href={`https://wa.me/${site.contact.whatsapp.replace(/\D/g, '')}`}
              icon={MessageCircle}
            />
            <ContactAction
              label="Visit"
              value={site.contact.address}
              href={site.contact.mapsUrl}
              icon={MapPin}
              external
            />
          </div>

          <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
            For quotes or product-specific requests, include the product name or code in the form below so we can route it faster.
          </p>
        </div>
      </section>

      <ContactForm initialProduct={product} initialInquiry={inquiry} />

      <QuoteCta
        title="Have a challenge? Let's find the right solution."
        description="Start with a quote, product inquiry or partnership request and we will direct it to the right team."
        primaryLabel="Jump to Form"
        primaryHref="#contact-form"
        secondaryLabel="Browse Products"
        secondaryHref="/products"
      />
    </>
  )
}

function ContactAction({
  label,
  value,
  href,
  icon: Icon,
  external = false,
}: {
  label: string
  value: string
  href: string
  icon: ComponentType<{ className?: string }>
  external?: boolean
}) {
  const content = (
    <>
      <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-nt-blue/10 text-nt-blue">
        <Icon className="h-5 w-5" />
      </span>
      <span className="min-w-0">
        <span className="block text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">{label}</span>
        <span className="mt-2 block truncate text-sm font-medium text-foreground">{value}</span>
        <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-nt-blue">
          Open
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </span>
      </span>
    </>
  )

  const classes =
    'group flex h-full items-start gap-4 rounded-2xl border border-border bg-card p-5 transition-colors hover:border-nt-blue/30 hover:bg-secondary/30'

  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={classes}>
        {content}
      </a>
    )
  }

  return (
    <a href={href} className={classes}>
      {content}
    </a>
  )
}
