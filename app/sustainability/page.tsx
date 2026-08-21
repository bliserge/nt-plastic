import type { Metadata } from 'next'
import Image from 'next/image'
import { PageHero } from '@/components/page-hero'
import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'
import { StatCounter } from '@/components/stat-counter'
import { QuoteCta } from '@/components/quote-cta'
import { sustainabilityInitiatives, sustainabilityMetrics } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Sustainability',
  description:
    'How NT Plastic Industries manufactures responsibly — waste reduction, resource efficiency, recycling and product longevity.',
}

export default function SustainabilityPage() {
  return (
    <>
      <PageHero
        eyebrow="Sustainability"
        title="Manufacturing responsibly, product by product"
        description="Plastic done right is durable, efficient and recoverable. We focus on making products that last and running a process that wastes less."
        image="/images/sustainability.png"
      />

      {/* Statement */}
      <section className="border-b border-border bg-background">
        <div className="mx-auto max-w-3xl px-4 py-20 text-center md:px-6 md:py-28">
          <Reveal>
            <p className="text-balance font-sans text-2xl font-medium leading-relaxed text-foreground md:text-3xl">
              We believe responsible manufacturing and good business go together. Making products that last longer, using
              materials more efficiently, and recovering what we can are simply better ways to operate.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Metrics */}
      <section className="border-b border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 py-14 md:px-6">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            {sustainabilityMetrics.map((m) => (
              <div key={m.label} className="text-center">
                <StatCounter
                  value={m.value}
                  suffix={m.suffix}
                  className="font-sans text-4xl font-semibold tracking-tight text-primary md:text-5xl"
                />
                <p className="mt-2 text-sm text-muted-foreground">{m.label}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-center font-mono text-xs uppercase tracking-wider text-muted-foreground">
            Sample figures — to be replaced with verified company data.
          </p>
        </div>
      </section>

      {/* Initiatives */}
      <section className="border-b border-border bg-background">
        <div className="mx-auto max-w-7xl px-4 py-20 md:px-6 md:py-28">
          <SectionHeading
            eyebrow="Our Commitments"
            title="Where we focus our efforts"
            description="Practical initiatives across our operations that reduce impact and improve efficiency."
          />
          <div className="mt-12 grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {sustainabilityInitiatives.map((item, i) => (
              <Reveal key={item.title}>
                <div className="flex h-full flex-col bg-card p-7">
                  <span className="font-mono text-xs text-primary">{`0${i + 1}`}</span>
                  <h3 className="mt-3 font-sans text-lg font-semibold text-foreground">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Closing image band */}
      <section className="border-b border-border bg-card">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 md:grid-cols-2 md:px-6 md:py-28">
          <Reveal>
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-border">
              <Image
                src="/images/sustainability.png"
                alt="Recovered and reprocessed plastic material"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </Reveal>
          <div>
            <SectionHeading
              eyebrow="Circularity"
              title="Recovering material, not discarding it"
              description="Suitable production offcuts and recovered plastic are reprocessed back into our manufacturing where quality allows — reducing waste and getting more from every kilogram of material."
              align="left"
            />
          </div>
        </div>
      </section>

      <QuoteCta />
    </>
  )
}
