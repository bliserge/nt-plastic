import type { Metadata } from 'next'
import Image from 'next/image'
import { PageHero } from '@/components/page-hero'
import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'
import { StatCounter } from '@/components/stat-counter'
import { QuoteCta } from '@/components/quote-cta'
import { milestones, values, leadership, mission, vision, stats } from '@/lib/content'

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'The story, mission, values and leadership structure behind NT Plastic Industries Ltd, a modern plastic manufacturing company.',
}

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="A manufacturing company built on precision and trust"
        description="For nearly two decades, NT Plastic Industries has manufactured plastic products that homes, businesses and infrastructure depend on every day, while continuing to invest in better processes and stronger service."
        image="/images/about-facility.png"
      />

      <section className="border-b border-border bg-background">
        <div className="mx-auto grid max-w-7xl gap-px overflow-hidden rounded-none px-0 md:grid-cols-2">
          <Reveal>
            <div className="flex h-full flex-col justify-center border-b border-border px-4 py-16 md:border-b-0 md:border-r md:px-12 md:py-24">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">Our Mission</p>
              <p className="mt-5 text-pretty font-sans text-xl font-medium leading-relaxed text-foreground md:text-2xl">
                {mission}
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="flex h-full flex-col justify-center px-4 py-16 md:px-12 md:py-24">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">Our Vision</p>
              <p className="mt-5 text-pretty font-sans text-xl font-medium leading-relaxed text-foreground md:text-2xl">
                {vision}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-b border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 py-14 md:px-6">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-5">
            {stats.map((s) => (
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

      <section className="border-b border-border bg-background">
        <div className="mx-auto max-w-7xl px-4 py-20 md:px-6 md:py-28">
          <SectionHeading
            eyebrow="Our Journey"
            title="From a focused manufacturer to a regional supplier"
            description="NT Plastic Industries has grown by building capability steadily, expanding product range carefully and keeping customer trust at the center of the business."
          />
          <ol className="mt-14 space-y-0">
            {milestones.map((m, i) => (
              <Reveal key={m.year}>
                <li className="grid grid-cols-[auto_1fr] gap-x-6 md:grid-cols-[120px_auto_1fr] md:gap-x-8">
                  <div className="hidden font-mono text-sm font-medium text-primary md:block">{m.year}</div>
                  <div className="relative flex flex-col items-center">
                    <span className="mt-1.5 h-3 w-3 shrink-0 rounded-full border-2 border-primary bg-background" aria-hidden />
                    {i < milestones.length - 1 && <span className="w-px flex-1 bg-border" aria-hidden />}
                  </div>
                  <div className="pb-10">
                    <p className="font-mono text-xs font-medium text-primary md:hidden">{m.year}</p>
                    <h3 className="font-sans text-lg font-semibold text-foreground">{m.title}</h3>
                    <p className="mt-1.5 leading-relaxed text-muted-foreground">{m.description}</p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-b border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 py-20 md:px-6 md:py-28">
          <SectionHeading eyebrow="What We Stand For" title="Our values" />
          <div className="mt-12 grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {values.map((v) => (
              <div key={v.title} className="bg-card p-7">
                <h3 className="font-sans text-base font-semibold text-foreground">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-background">
        <div className="mx-auto max-w-7xl px-4 py-20 md:px-6 md:py-28">
          <SectionHeading
            eyebrow="Leadership"
            title="The team guiding the business"
            description="Leadership at NT Plastic Industries is focused on strategy, operations and commercial relationships, all aligned around product quality and reliable delivery."
          />
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {leadership.map((l, i) => (
              <Reveal key={i}>
                <div className="rounded-lg border border-border bg-card p-6">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 font-mono text-lg font-semibold text-primary">
                    {l.position
                      .split(' ')
                      .slice(0, 2)
                      .map((w) => w[0])
                      .join('')}
                  </div>
                  <h3 className="mt-5 font-sans text-lg font-semibold text-foreground">{l.name}</h3>
                  <p className="mt-1 text-sm font-medium text-primary">{l.position}</p>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{l.bio}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <QuoteCta />
    </>
  )
}
