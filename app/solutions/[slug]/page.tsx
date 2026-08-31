import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowRight } from 'lucide-react'
import { getContent } from '@/lib/cms'
import { PageHero } from '@/components/page-hero'
import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'
import { ProductCard } from '@/components/product-card'
import { CtaLink } from '@/components/cta-link'
import { QuoteCta } from '@/components/quote-cta'

export async function generateStaticParams() {
  const { solutions } = await getContent()
  return solutions.map((solution) => ({ slug: solution.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const { solutions } = await getContent()
  const solution = solutions.find((item) => item.slug === slug)
  if (!solution) return {}

  return {
    title: solution.name,
    description: solution.problem,
  }
}

export default async function SolutionDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const { categories, products, solutions } = await getContent()
  const solution = solutions.find((item) => item.slug === slug)
  if (!solution) notFound()

  const relatedProducts = products.filter((product) => solution.categories.includes(product.category))
  const relatedCategories = categories.filter((category) => solution.categories.includes(category.slug))

  return (
    <>
      <PageHero
        eyebrow="Solutions"
        title={solution.name}
        description={solution.problem}
        image={solution.image}
        imageAlt={solution.name}
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <CtaLink href={`/contact?inquiry=request-quote&product=${encodeURIComponent(solution.name)}`} variant="green">
            Request a Quote
          </CtaLink>
          <CtaLink href="/products" variant="light" arrow={false}>
            Explore Products
          </CtaLink>
        </div>
      </PageHero>

      <section className="border-b border-border bg-background">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 md:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:py-28">
          <Reveal>
            <div>
              <SectionHeading
                eyebrow="The Challenge"
                title="What this solution is built to solve."
                description={solution.problem}
                align="left"
              />
              <p className="mt-6 max-w-2xl leading-relaxed text-muted-foreground">
                {solution.solution}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                {solution.benefits.map((benefit) => (
                  <span key={benefit} className="rounded-full border border-border bg-card px-4 py-2 text-sm font-medium">
                    {benefit}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="overflow-hidden rounded-2xl border border-border bg-card">
              <div className="relative aspect-[4/3]">
                <Image src={solution.image || '/placeholder.svg'} alt={solution.name} fill className="object-cover" />
              </div>
              <div className="grid gap-px bg-border sm:grid-cols-2">
                {relatedCategories.map((category) => (
                  <Link
                    key={category.slug}
                    href={`/products/${category.slug}`}
                    className="bg-card p-5 transition-colors hover:bg-secondary/40"
                  >
                    <p className="font-mono text-xs uppercase tracking-[0.18em] text-primary">Related category</p>
                    <p className="mt-2 font-display text-xl font-semibold text-foreground">{category.name}</p>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{category.short}</p>
                    <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-nt-blue">
                      View products <ArrowRight className="h-4 w-4" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-b border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 py-20 md:px-6 md:py-28">
          <SectionHeading
            eyebrow="Applications"
            title="Where this solution is typically used."
            description="The same solution can support multiple sectors depending on scale, environment and project needs."
          />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {solution.categories.map((categorySlug, index) => {
              const category = categories.find((item) => item.slug === categorySlug)
              if (!category) return null
              return (
                <Reveal key={category.slug} delay={index * 50}>
                  <Link
                    href={`/products/${category.slug}`}
                    className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-background transition-colors hover:border-nt-blue/40"
                  >
                    <div className="relative aspect-[4/3]">
                      <Image src={category.image || '/placeholder.svg'} alt={category.name} fill className="object-cover" />
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <p className="font-display text-xl font-semibold text-foreground">{category.name}</p>
                      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{category.description}</p>
                      <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-nt-blue">
                        View products
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                      </span>
                    </div>
                  </Link>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {relatedProducts.length > 0 && (
        <section className="border-b border-border bg-background">
          <div className="mx-auto max-w-7xl px-4 py-20 md:px-6 md:py-28">
            <SectionHeading
              eyebrow="Relevant Products"
              title="Products that fit this solution."
              description="These are the products most closely aligned with the needs of this use case."
            />
            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {relatedProducts.map((product, index) => (
                <Reveal key={product.slug} delay={index * 50}>
                  <ProductCard product={product} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="bg-industrial py-20 text-industrial-foreground sm:py-24">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-nt-green">Need help choosing?</p>
          <h2 className="mt-4 font-display text-3xl font-bold sm:text-4xl">
            Tell us about the challenge and we will match the right products.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-industrial-foreground/75">
            We can help you identify the right product, the right configuration and the right supply approach for your project.
          </p>
          <div className="mt-8 flex justify-center">
            <CtaLink href={`/contact?inquiry=product-inquiry&product=${encodeURIComponent(solution.name)}`} variant="green">
              Talk to Our Team
            </CtaLink>
          </div>
        </div>
      </section>

      <QuoteCta />
    </>
  )
}
