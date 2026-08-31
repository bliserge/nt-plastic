import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { getContent } from '@/lib/cms'
import { PageHero } from '@/components/page-hero'
import { SectionHeading } from '@/components/section-heading'
import { Reveal } from '@/components/reveal'
import { Catalogue } from '@/components/products/catalogue'
import { CtaLink } from '@/components/cta-link'

export const metadata: Metadata = {
  title: 'Our Products',
  description:
    'Explore plastic products manufactured for homes, businesses, infrastructure and industry — water storage, piping, packaging, household and industrial products.',
}

export default async function ProductsPage() {
  const { categories, products } = await getContent()
  return (
    <>
      <PageHero
        eyebrow="Our Products"
        title="Products manufactured for the real world."
        description="Explore plastic products manufactured for homes, businesses, infrastructure and industry."
        image="/images/product-water-tank.png"
        imageAlt="NT Plastic Industries products"
        compact
      >
        <CtaLink href="/contact" variant="green">
          Request a Quote
        </CtaLink>
      </PageHero>

      {/* Categories */}
      <section className="bg-background py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Product Categories"
            title="Find the category that fits your project."
          />
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {categories.map((c, i) => (
              <Reveal key={c.slug} delay={i * 60}>
                <Link
                  href={`/products/${c.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-lg border border-border bg-card transition-colors hover:border-nt-blue/40"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-secondary">
                    <Image
                      src={c.image || '/placeholder.svg'}
                      alt={c.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex items-center justify-between">
                      <h3 className="font-display text-xl font-bold text-foreground">{c.name}</h3>
                      <span className="rounded-sm bg-secondary px-2 py-1 text-xs font-semibold text-muted-foreground">
                        {c.count} products
                      </span>
                    </div>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{c.short}</p>
                    <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-nt-blue">
                      Explore
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Catalogue + search + filters */}
      <div className="border-t border-border bg-secondary/50">
        <Catalogue products={products} categories={categories} />
      </div>

      {/* Need help choosing */}
      <section className="bg-industrial py-20 text-industrial-foreground sm:py-24">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-balance font-display text-3xl font-bold sm:text-4xl">
            Not sure which product is right for you?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-industrial-foreground/70">
            Tell us about your project and our team will help you identify the right product or solution.
          </p>
          <div className="mt-8 flex justify-center">
            <CtaLink href="/contact" variant="green">
              Talk to Our Team
            </CtaLink>
          </div>
        </div>
      </section>
    </>
  )
}
