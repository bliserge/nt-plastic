import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { categories, getCategory, productsByCategory } from '@/lib/content'
import { PageHero } from '@/components/page-hero'
import { ProductCard } from '@/components/product-card'
import { Reveal } from '@/components/reveal'
import { QuoteCta } from '@/components/quote-cta'
import { CtaLink } from '@/components/cta-link'

export function generateStaticParams() {
  return categories.map((c) => ({ category: c.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>
}): Promise<Metadata> {
  const { category } = await params
  const c = getCategory(category)
  if (!c) return {}
  return { title: c.name, description: c.description }
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>
}) {
  const { category } = await params
  const c = getCategory(category)
  if (!c) notFound()
  const items = productsByCategory(category)

  return (
    <>
      <PageHero
        eyebrow="Product Category"
        title={c.name}
        description={c.description}
        image={c.image}
        imageAlt={c.name}
        compact
      >
        <CtaLink href="/contact" variant="green">
          Request a Quote
        </CtaLink>
      </PageHero>

      <section className="bg-background py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {items.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {items.map((p, i) => (
                <Reveal key={p.slug} delay={i * 50}>
                  <ProductCard product={p} />
                </Reveal>
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground">Products in this category are coming soon.</p>
          )}
        </div>
      </section>

      <QuoteCta
        title="Need help choosing?"
        description="Our team can help you match the right product to your project requirements."
        primaryLabel="Talk to Our Team"
      />
    </>
  )
}
