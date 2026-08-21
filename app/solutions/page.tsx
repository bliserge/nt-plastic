import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { PageHero } from '@/components/page-hero'
import { Reveal } from '@/components/reveal'
import { QuoteCta } from '@/components/quote-cta'
import { solutions } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Solutions',
  description:
    'Plastic solutions engineered for water & sanitation, construction, agriculture, residential, commercial and industrial applications.',
}

export default function SolutionsPage() {
  return (
    <>
      <PageHero
        eyebrow="Solutions"
        title="Engineered for how the world actually uses plastic"
        description="We do not just make products — we solve problems across the sectors that depend on durable, dependable plastic. Explore the solutions built around your industry."
        image="/images/solutions-hero.png"
      />

      <section className="border-b border-border bg-background">
        <div className="mx-auto max-w-7xl px-4 py-20 md:px-6 md:py-28">
          <div className="flex flex-col gap-16 md:gap-24">
            {solutions.map((solution, i) => (
              <Reveal key={solution.slug}>
                <article
                  id={solution.slug}
                  className="grid scroll-mt-28 items-center gap-8 md:grid-cols-2 md:gap-14"
                >
                  <div className={i % 2 === 1 ? 'md:order-2' : ''}>
                    <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-border">
                      <Image
                        src={solution.image || '/placeholder.svg'}
                        alt={solution.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                  </div>
                  <div className={i % 2 === 1 ? 'md:order-1' : ''}>
                    <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">
                      {`0${i + 1}`} — {solution.tagline}
                    </p>
                    <h2 className="mt-4 text-pretty font-sans text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
                      {solution.name}
                    </h2>
                    <p className="mt-4 leading-relaxed text-muted-foreground">{solution.problem}</p>
                    <p className="mt-3 leading-relaxed text-foreground">{solution.solution}</p>
                    <ul className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-2">
                      {solution.benefits.map((b) => (
                        <li key={b} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden />
                          {b}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-7 flex flex-wrap gap-2">
                      <Link
                        href={`/solutions/${solution.slug}`}
                        className="inline-flex items-center gap-2 rounded-sm bg-nt-blue px-4 py-2 text-sm font-semibold text-nt-blue-foreground transition-colors hover:bg-nt-blue/90"
                      >
                        View solution
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                      {solution.categories.map((c) => (
                        <Link
                          key={c}
                          href={`/products/${c}`}
                          className="rounded-full border border-border px-4 py-1.5 text-xs font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
                        >
                          View related products
                        </Link>
                      ))}
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <QuoteCta />
    </>
  )
}
