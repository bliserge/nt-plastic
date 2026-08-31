'use client'

import { useEffect, useMemo, useState } from 'react'
import type { ComponentType, FormEvent, InputHTMLAttributes } from 'react'
import { CheckCircle2, Clock3, Loader2, Mail, MapPin, MessageCircle, Phone, Send } from 'lucide-react'
import type { Category } from '@/lib/content'
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

export function ContactForm({
  initialProduct,
  initialInquiry,
  categories,
  site,
}: {
  initialProduct?: string
  initialInquiry?: string
  categories: Category[]
  site: typeof import('@/lib/content').site
}) {
  const [intent, setIntent] = useState<InquiryType>(
    initialInquiry && inquiryOptions.some((option) => option.value === initialInquiry)
      ? (initialInquiry as InquiryType)
      : 'request-quote',
  )
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [error, setError] = useState('')
  const [productHint, setProductHint] = useState(initialProduct ?? '')

  useEffect(() => {
    if (initialProduct) setProductHint(initialProduct)
  }, [initialProduct])

  useEffect(() => {
    if (initialInquiry && inquiryOptions.some((option) => option.value === initialInquiry)) {
      setIntent(initialInquiry as InquiryType)
    }
  }, [initialInquiry])

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

  const selectedOption = inquiryOptions.find((option) => option.value === intent)

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
                      ? 'border-nt-blue bg-nt-blue/5 shadow-sm shadow-nt-blue/5'
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

          <div className="mt-6 rounded-xl border border-border bg-secondary/30 px-4 py-3 text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">Selected:</span>{' '}
            {selectedOption?.title ?? 'Request a Quote'}. The form below will be sent with that inquiry type.
          </div>

          <form onSubmit={handleSubmit} className="mt-10 space-y-5">
            <input type="hidden" name="inquiryType" value={intent} />

            <div className="grid gap-5 md:grid-cols-2">
              <Field label="Full Name" name="fullName" required placeholder="Your name" autoComplete="name" />
              <Field label="Company" name="company" placeholder="Company name" autoComplete="organization" />
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <Field
                label="Email"
                name="email"
                type="email"
                required
                placeholder="name@company.com"
                autoComplete="email"
              />
              <Field label="Phone" name="phone" placeholder="+250 ..." autoComplete="tel" inputMode="tel" />
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <Field label="Country" name="country" placeholder="Country" autoComplete="country-name" />
              <Field
                label="Expected Delivery Location"
                name="deliveryLocation"
                placeholder="Delivery location"
                autoComplete="shipping address-level2"
              />
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
              <Field label="Quantity" name="quantity" placeholder="Estimated quantity" inputMode="numeric" />
            </div>

            <Field
              label="Project Type"
              name="projectType"
              placeholder="For example: quote, supply, partnership"
            />

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

            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <p className="text-sm leading-relaxed text-muted-foreground">
                No attachments here yet. If you have drawings or specs, mention them in the message and we will follow up directly.
              </p>

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
              <div
                role="status"
                aria-live="polite"
                className="flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900"
              >
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
                <p>Thanks. Your inquiry has been sent. We will review it and get back to you soon.</p>
              </div>
            )}

            {status === 'error' && (
              <div role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-900">
                {error}
              </div>
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

          <div className="rounded-2xl border border-border bg-card p-6">
            <h3 className="font-display text-2xl font-bold text-foreground">Direct Contact</h3>
            <div className="mt-5 space-y-4">
              <ContactLine label="Phone" value={site.contact.phone} href={`tel:${site.contact.phone.replace(/\s+/g, '')}`} icon={Phone} />
              <ContactLine label="Alt. Phone" value={site.contact.phoneAlt} href={`tel:${site.contact.phoneAlt.replace(/\s+/g, '')}`} icon={Phone} />
              <ContactLine label="Email" value={site.contact.email} href={`mailto:${site.contact.email}`} icon={Mail} />
              <ContactLine
                label="WhatsApp"
                value={site.contact.whatsapp}
                href={`https://wa.me/${site.contact.whatsapp.replace(/\D/g, '')}`}
                icon={MessageCircle}
                external
              />
              <ContactLine
                label="Address"
                value={site.contact.address}
                href={site.contact.mapsUrl}
                icon={MapPin}
                external
              />
              <ContactLine label="Hours" value={site.contact.hours} icon={Clock3} staticIcon />
            </div>
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
  autoComplete,
  inputMode,
}: {
  label: string
  name: string
  placeholder?: string
  type?: string
  required?: boolean
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  autoComplete?: string
  inputMode?: InputHTMLAttributes<HTMLInputElement>['inputMode']
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-foreground">
        {label}
        {required ? <span className="ml-1 text-red-500">*</span> : null}
      </span>
      <input
        type={type}
        name={name}
        autoComplete={autoComplete}
        inputMode={inputMode}
        {...(value !== undefined ? { value } : { defaultValue })}
        onChange={onChange ? (event) => onChange(event.target.value) : undefined}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-nt-blue focus:ring-2 focus:ring-nt-blue/20"
      />
    </label>
  )
}

function ContactLine({
  label,
  value,
  href,
  icon: Icon,
  external = false,
  staticIcon = false,
}: {
  label: string
  value: string
  href?: string
  icon: ComponentType<{ className?: string }>
  external?: boolean
  staticIcon?: boolean
}) {
  const row = (
    <>
      <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-nt-blue/10 text-nt-blue">
        <Icon className="h-4 w-4" />
      </span>
      <span className="min-w-0">
        <span className="block text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">{label}</span>
        <span className="mt-1 block text-sm font-medium text-foreground">{value}</span>
      </span>
    </>
  )

  const classes = 'flex items-start gap-3 rounded-xl border border-border px-4 py-3 transition-colors hover:bg-secondary/30'

  if (href && !staticIcon) {
    return external ? (
      <a href={href} target="_blank" rel="noreferrer" className={classes}>
        {row}
      </a>
    ) : (
      <a href={href} className={classes}>
        {row}
      </a>
    )
  }

  return <div className={classes}>{row}</div>
}
