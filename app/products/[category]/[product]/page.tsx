import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowRight, Download, Check, FileText } from 'lucide-react'
import { getContent } from '@/lib/cms'
import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'
import { ProductCard } from '@/components/product-card'
import { CtaLink } from '@/components/cta-link'

export async function generateStaticParams() {
  const { products } = await getContent()
  return products.map((p) => ({ category: p.category, product: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ product: string }>
}): Promise<Metadata> {
  const { product } = await params
  const { products } = await getContent()
  const p = products.find((item) => item.slug === product)
  if (!p) return {}
  return { title: p.name, description: p.short }
}

const downloads = [
  'Product Datasheet',
  'Installation Guide',
  'Technical Drawing',
  'Warranty Information',
  'Certification',
]

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ product: string }>
}) {
  const { product } = await params
  const { products } = await getContent()
  const p = products.find((item) => item.slug === product)
  if (!p) notFound()
  const related = products.filter((item) => item.category === p.category && item.slug !== p.slug).slice(0, 3)
  const quoteHref = `/contact?product=${encodeURIComponent(p.name)}`
  const gallery = p.gallery?.length ? p.gallery : [p.image, '/images/factory-floor.png', '/images/quality-control.png']

  return (
    <>
      {/* SECTION 01 — Hero */}
      <section className="bg-industrial pt-24 text-industrial-foreground">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8">
          <div className="relative aspect-square overflow-hidden rounded-lg bg-industrial-muted">
            <Image src={p.image || '/placeholder.svg'} alt={p.name} fill priority className="object-cover" />
          </div>
          <div>
            <nav className="flex items-center gap-2 text-xs text-industrial-foreground/60">
              <Link href="/products" className="hover:text-industrial-foreground">
                Products
              </Link>
              <span>/</span>
              <Link href={`/products/${p.category}`} className="hover:text-industrial-foreground">
                {p.categoryName}
              </Link>
            </nav>
            <span className="mt-4 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-nt-green">
              {p.categoryName}
            </span>
            <h1 className="mt-3 font-display text-4xl font-extrabold leading-tight sm:text-5xl">{p.name}</h1>
            <p className="mt-4 max-w-lg leading-relaxed text-industrial-foreground/75">{p.short}</p>
            <p className="mt-5 inline-block rounded-sm bg-white/10 px-3 py-1.5 text-sm font-semibold text-nt-green">
              {p.keySpec}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <CtaLink href={quoteHref} variant="green">
                Request a Quote
              </CtaLink>
              <CtaLink href="#downloads" variant="light" arrow={false}>
                <Download className="mr-1 h-4 w-4" />
                Download Datasheet
              </CtaLink>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 02 — Overview */}
      <section className="bg-background py-20 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Product Overview" title="What it is and what it's for." />
          <p className="mt-6 text-pretty leading-relaxed text-muted-foreground">{p.overview}</p>
        </div>
      </section>

      {/* SECTION 03 + 04 — Specs + Features */}
      <section className="border-y border-border bg-secondary py-20 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <h2 className="font-display text-2xl font-bold text-foreground">Key Specifications</h2>
            <dl className="mt-6 overflow-hidden rounded-lg border border-border bg-card">
              {p.specs.map((s, i) => (
                <div
                  key={s.label}
                  className={`flex items-center justify-between px-5 py-3.5 text-sm ${i % 2 ? 'bg-secondary/40' : ''}`}
                >
                  <dt className="text-muted-foreground">{s.label}</dt>
                  <dd className="font-semibold text-foreground">{s.value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div>
            <h2 className="font-display text-2xl font-bold text-foreground">Features</h2>
            <div className="mt-6 grid gap-3">
              {p.features.map((f) => (
                <div key={f.title} className="flex gap-3 rounded-lg border border-border bg-card p-4">
                  <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-nt-green/15 text-nt-green">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  <div>
                    <h3 className="text-sm font-semibold text-foreground">{f.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{f.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 05 — Applications */}
      <section className="bg-background py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Applications" title="Where this product is used." />
          <div className="mt-8 flex flex-wrap gap-3">
            {p.applications.map((a) => (
              <span
                key={a}
                className="rounded-full border border-border bg-card px-5 py-2.5 text-sm font-medium text-foreground"
              >
                {a}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 06 — Gallery */}
      <section className="border-t border-border bg-card py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Product Gallery" title="See the product from different angles." />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {gallery.map((image, index) => (
              <Reveal key={`${image}-${index}`} delay={index * 40}>
                <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-border bg-secondary">
                  <Image src={image} alt={`${p.name} gallery ${index + 1}`} fill className="object-cover" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 07 — Downloads */}
      <section id="downloads" className="border-t border-border bg-secondary py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Downloads" title="Technical resources." />
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {downloads.map((d) => (
              <Link
                key={d}
                href={quoteHref}
                className="group flex items-center justify-between rounded-lg border border-border bg-card p-4 text-left transition-colors hover:border-nt-blue/40"
              >
                <span className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-nt-blue" />
                  <span>
                    <span className="block text-sm font-medium text-foreground">{d}</span>
                    <span className="block text-xs text-muted-foreground">Request this resource from the team</span>
                  </span>
                </span>
                <Download className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-nt-blue" />
              </Link>
            ))}
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            Technical files are represented here for now and can be wired to real CMS assets later.
          </p>
        </div>
      </section>

      {/* SECTION 08 — Related products */}
      {related.length > 0 && (
        <section className="bg-background py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading eyebrow="Related Products" title="You may also need." />
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => (
                <ProductCard key={r.slug} product={r} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* SECTION 09 — Request this product */}
      <section className="bg-nt-blue py-20 text-nt-blue-foreground sm:py-24">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-extrabold sm:text-4xl">Ready to order?</h2>
          <p className="mt-4 text-nt-blue-foreground/80">
            Request a quote for the {p.name} and our team will get back to you.
          </p>
          <div className="mt-8 flex justify-center">
            <Link
              href={quoteHref}
              className="group inline-flex items-center gap-2 rounded-sm bg-nt-green px-6 py-3.5 text-sm font-semibold text-nt-green-foreground transition-colors hover:bg-nt-green/90"
            >
              Request a Quote
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
