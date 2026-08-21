'use client'

import { useEffect, useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import { Paperclip, Send, CheckCircle2, Loader2 } from 'lucide-react'
import { categories, site } from '@/lib/content'
import { cn } from '@/lib/utils'

type InquiryType =
  | 'request-quote'
  | 'product-inquiry'
  | 'business-partnership'
  | 'distribution'
  | 'custom-manufacturing'
  | 'general-inquiry'

const inquiryOptions: { value: InquiryType; title: string; description: string }[] = [
  {
    value: 'request-quote',
    title: 'Request a Quote',
    description: 'For pricing, quantities, lead times and project-specific supply.',
  },
  {
    value: 'product-inquiry',
    title: 'Product Inquiry',
    description: 'For specs, sizing, compatibility and product selection help.',
  },
  {
    value: 'business-partnership',
    title: 'Business Partnership',
    description: 'For strategic partnerships, B2B supply and institutional work.',
  },
  {
    value: 'distribution',
    title: 'Distribution',
    description: 'For resellers, channel partners and regional distribution.',
  },
  {
    value: 'custom-manufacturing',
    title: 'Custom Manufacturing',
    description: 'For specialized requirements or made-to-order products.',
  },
  {
    value: 'general-inquiry',
    title: 'General Inquiry',
    description: 'For anything else you would like to discuss with the team.',
  },
]

export function ContactForm() {
  const [intent, setIntent] = useState<InquiryType>('request-quote')
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [error, setError] = useState('')
  const [productHint, setProductHint] = useState('')

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const product = params.get('product')
    const inquiry = params.get('inquiry') as InquiryType | null

    if (product) setProductHint(product)
    if (inquiry && inquiryOptions.some((option) => option.value === inquiry)) {
      setIntent(inquiry)
    }
  }, [])

  const helper = useMemo(() => {
    switch (intent) {
      case 'product-inquiry':
        return 'Tell us what product you are considering and we will help with specifications and fit.'
      case 'business-partnership':
        return 'Share the scope and we will route it to the commercial team.'
      case 'distribution':
        return 'Let us know your territory and channel setup.'
      case 'custom-manufacturing':
        return 'Include drawings, quantities or performance requirements if you have them.'
      case 'general-inquiry':
        return 'Share whatever context you have and we will direct it internally.'
      default:
        return 'We will review your request and help with pricing, availability and next steps.'
    }
  }, [intent])

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus('submitting')
    setError('')

    const form = event.currentTarget
    const formData = new FormData(form)
    formData.set('inquiryType', intent)
    if (productHint && !formData.get('product')) {
      formData.set('product', productHint)
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        const payload = (await response.json().catch(() => null)) as { error?: string } | null
        throw new Error(payload?.error || 'Something went wrong. Please try again.')
      }

      form.reset()
      setIntent('request-quote')
      setProductHint('')
      setStatus('success')
    } catch (error) {
      setStatus('error')
      setError(error instanceof Error ? error.message : 'Something went wrong.')
    }
  }

  return (
    <section id="contact-form" className="border-b border-border bg-background">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 md:px-6 lg:grid-cols-[1.4fr_0.9fr] lg:py-28">
        <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
          <div className="max-w-2xl">
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-primary">Choose what you need</p>
            <h2 className="mt-4 font-display text-3xl font-bold text-foreground sm:text-4xl">
              Start with the right inquiry type.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{helper}</p>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {inquiryOptions.map((option) => {
              const active = option.value === intent
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setIntent(option.value)}
                  aria-pressed={active}
                  className={cn(
                    'rounded-xl border p-4 text-left transition-colors',
                    active
                      ? 'border-nt-blue bg-nt-blue/5'
                      : 'border-border bg-background hover:border-nt-blue/30 hover:bg-secondary/30',
                  )}
                >
                  <span className={cn('font-display text-lg font-semibold', active ? 'text-nt-blue' : 'text-foreground')}>
                    {option.title}
                  </span>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{option.description}</p>
                </button>
              )
            })}
          </div>

          <form onSubmit={handleSubmit} className="mt-10 space-y-5">
            <input type="hidden" name="inquiryType" value={intent} />

            <div className="grid gap-5 md:grid-cols-2">
              <Field label="Full Name" name="fullName" required placeholder="Your name" />
              <Field label="Company" name="company" placeholder="Company name" />
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <Field label="Email" name="email" type="email" required placeholder="name@company.com" />
              <Field label="Phone" name="phone" placeholder="+250 ..." />
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <Field label="Country" name="country" placeholder="Country" />
              <Field label="Expected Delivery Location" name="deliveryLocation" placeholder="Delivery location" />
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-foreground">Product Category</span>
                <select
                  name="productCategory"
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-nt-blue focus:ring-2 focus:ring-nt-blue/20"
                  defaultValue=""
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category.slug} value={category.slug}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </label>
              <Field
                label="Product"
                name="product"
                placeholder="Product name or code"
                value={productHint}
                onChange={(value) => setProductHint(value)}
              />
              <Field label="Quantity" name="quantity" placeholder="Estimated quantity" />
            </div>

            <Field label="Project Type" name="projectType" placeholder="For example: quote, supply, partnership" />

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-foreground">Project Details</span>
              <textarea
                name="additionalRequirements"
                required
                rows={6}
                placeholder="Tell us about your project, requirements, deadlines and any technical details."
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-nt-blue focus:ring-2 focus:ring-nt-blue/20"
              />
            </label>

            <div className="grid gap-4 md:grid-cols-[1fr_auto] md:items-end">
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-foreground">Attachments</span>
                <div className="flex items-center gap-3 rounded-xl border border-dashed border-border bg-secondary/40 px-4 py-3">
                  <Paperclip className="h-4 w-4 text-muted-foreground" />
                  <input
                    type="file"
                    name="attachments"
                    multiple
                    className="block w-full text-sm text-muted-foreground file:mr-4 file:rounded-md file:border-0 file:bg-nt-blue file:px-4 file:py-2 file:text-sm file:font-semibold file:text-nt-blue-foreground hover:file:bg-nt-blue/90"
                  />
                </div>
              </label>

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="inline-flex h-[48px] items-center justify-center gap-2 rounded-xl bg-nt-blue px-6 text-sm font-semibold text-nt-blue-foreground transition-colors hover:bg-nt-blue/90 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {status === 'submitting' ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                Send Inquiry
              </button>
            </div>

            {status === 'success' && (
              <div className="flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
                <p>Thanks. Your inquiry has been sent. We will review it and get back to you soon.</p>
              </div>
            )}

            {status === 'error' && (
              <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-900">{error}</div>
            )}
          </form>
        </div>

        <aside className="space-y-6">
          <div className="rounded-2xl border border-border bg-industrial p-6 text-industrial-foreground">
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-nt-green">What happens next</p>
            <h3 className="mt-4 font-display text-2xl font-bold">A real person reviews your request.</h3>
            <ul className="mt-6 space-y-4 text-sm leading-relaxed text-industrial-foreground/75">
              <li>We review your details and route the inquiry to the right team.</li>
              <li>We confirm product fit, availability or custom requirements.</li>
              <li>We respond with the next step, whether that is a quote, call or follow-up.</li>
            </ul>
          </div>

          <div className="grid gap-4 rounded-2xl border border-border bg-card p-6">
            <h3 className="font-display text-2xl font-bold text-foreground">Direct Contact</h3>
            <ContactLine label="Phone" value={site.contact.phone} />
            <ContactLine label="Alt. Phone" value={site.contact.phoneAlt} />
            <ContactLine label="Email" value={site.contact.email} />
            <ContactLine label="WhatsApp" value={site.contact.whatsapp} />
            <ContactLine label="Address" value={site.contact.address} />
            <ContactLine label="Hours" value={site.contact.hours} />
          </div>

          <div className="overflow-hidden rounded-2xl border border-border bg-card">
            <iframe
              title="NT Plastic Industries location map"
              src={site.contact.mapsUrl}
              className="h-80 w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="border-t border-border p-4">
              <a
                href={site.contact.mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="text-sm font-semibold text-nt-blue hover:underline"
              >
                Open in Google Maps
              </a>
            </div>
          </div>
        </aside>
      </div>
    </section>
  )
}

function Field({
  label,
  name,
  placeholder,
  type = 'text',
  required = false,
  value,
  defaultValue,
  onChange,
}: {
  label: string
  name: string
  placeholder?: string
  type?: string
  required?: boolean
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-foreground">{label}</span>
      <input
        type={type}
        name={name}
        {...(value !== undefined ? { value } : { defaultValue })}
        onChange={onChange ? (event) => onChange(event.target.value) : undefined}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-nt-blue focus:ring-2 focus:ring-nt-blue/20"
      />
    </label>
  )
}

function ContactLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-border pb-3 last:border-b-0 last:pb-0">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="text-right text-sm font-medium text-foreground">{value}</span>
    </div>
  )
}
