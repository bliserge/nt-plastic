import type { Metadata } from 'next'
import Image from 'next/image'
import { PageHero } from '@/components/page-hero'
import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'
import { ProcessSteps } from '@/components/process-steps'
import { StatCounter } from '@/components/stat-counter'
import { QuoteCta } from '@/components/quote-cta'
import { equipment, qualityChecks, capacityStats } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Manufacturing',
  description:
    'Inside NT Plastic Industries — our production process, machinery, quality control and manufacturing capacity.',
}

export default function ManufacturingPage() {
  return (
    <>
      <PageHero
        eyebrow="Manufacturing"
        title="Where raw material becomes reliable product"
        description="From resin to finished goods, every product moves through a controlled process built for consistency, precision and scale."
        image="/images/factory-floor.png"
      />

      {/* Capacity stats */}
      <section className="border-b border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 py-14 md:px-6">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {capacityStats.map((s) => (
              <div key={s.label} className="text-center md:text-left">
                <StatCounter
                  value={s.value}
                  suffix={s.suffix}
                  className="font-sans text-3xl font-semibold tracking-tight text-foreground md:text-4xl"
                />
                <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="border-b border-border bg-background">
        <div className="mx-auto max-w-7xl px-4 py-20 md:px-6 md:py-28">
          <SectionHeading
            eyebrow="The Process"
            title="Seven steps, start to finish"
            description="A repeatable production flow that turns polymer into products ready for market."
          />
          <div className="mt-14">
            <ProcessSteps />
          </div>
        </div>
      </section>

      {/* Equipment */}
      <section className="border-b border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 py-20 md:px-6 md:py-28">
          <SectionHeading
            eyebrow="Machinery"
            title="Built for volume and precision"
            description="Our production lines combine established moulding and extrusion technologies to serve a broad product range."
          />
          <div className="mt-12 grid gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-2">
            {equipment.map((e) => (
              <Reveal key={e.name}>
                <div className="flex h-full flex-col bg-card p-7">
                  <h3 className="font-sans text-lg font-semibold text-foreground">{e.name}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{e.function}</p>
                  <p className="mt-4 border-t border-border pt-4 text-sm text-foreground">
                    <span className="font-mono text-xs uppercase tracking-wider text-primary">Capability · </span>
                    {e.capability}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Quality control */}
      <section className="border-b border-border bg-background">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 md:grid-cols-2 md:px-6 md:py-28">
          <Reveal>
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-border">
              <Image
                src="/images/quality-control.png"
                alt="Quality control inspection at NT Plastic Industries"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </Reveal>
          <div>
            <SectionHeading
              eyebrow="Quality Control"
              title="Checked at every stage"
              description="Quality is not a final gate — it is verified throughout production, so problems are caught early and every batch ships to standard."
              align="left"
            />
            <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {qualityChecks.map((q, i) => (
                <li
                  key={q}
                  className="flex items-center gap-3 rounded-md border border-border bg-card px-4 py-3 text-sm text-foreground"
                >
                  <span className="font-mono text-xs text-primary">{`0${i + 1}`}</span>
                  {q}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <QuoteCta />
    </>
  )
}
