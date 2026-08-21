import type { Metadata } from 'next'
import { PageHero } from '@/components/page-hero'
import { QuoteCta } from '@/components/quote-cta'
import { ContactForm } from '@/components/contact/contact-form'
import { site } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Talk to NT Plastic Industries about products, quotes, partnerships, distribution and custom manufacturing.',
}

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact Us"
        title="Let's talk about your next project."
        description="Whether you need a product, a large-scale supply, a distribution partnership or a custom solution, our team is ready to help."
      />

      <section className="border-b border-border bg-background">
        <div className="mx-auto max-w-7xl px-4 py-14 md:px-6">
          <div className="grid gap-4 md:grid-cols-3">
            <ContactStat label="Phone" value={site.contact.phone} />
            <ContactStat label="Email" value={site.contact.email} />
            <ContactStat label="Location" value={site.contact.address} />
          </div>
        </div>
      </section>

      <ContactForm />

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

function ContactStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">{label}</p>
      <p className="mt-3 text-sm leading-relaxed text-foreground">{value}</p>
    </div>
  )
}
