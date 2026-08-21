import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ShieldCheck, Wrench, Cpu, Lightbulb, HeartHandshake, Factory } from 'lucide-react'
import {
  categories,
  stats,
  values,
  solutions,
  featuredProducts,
} from '@/lib/content'
import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'
import { StatCounter } from '@/components/stat-counter'
import { ProductCard } from '@/components/product-card'
import { ProcessSteps } from '@/components/process-steps'
import { CtaLink } from '@/components/cta-link'

// SECTION 02 — Manufacturing statement
export function ManufacturingStatement() {
  return (
    <section className="border-b border-border bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <p className="font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-foreground sm:text-6xl">
            We don&apos;t just make plastic.
          </p>
          <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
            We manufacture products and solutions that store water, move resources, protect goods, support businesses
            and improve everyday life.
          </p>
          <div className="mt-8 h-px w-40 bg-gradient-to-r from-nt-green to-transparent" />
        </Reveal>
      </div>
    </section>
  )
}

// SECTION 03 — Product universe
export function ProductUniverse() {
  return (
    <section className="bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Our Product Universe"
          title="Built for everyday life. Engineered for more."
          description="Explore the major product categories we manufacture across homes, businesses, infrastructure and industry."
        />
        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((c, i) => (
            <Reveal key={c.slug} delay={i * 60}>
              <Link
                href={`/products/${c.slug}`}
                className="group relative flex aspect-[4/5] flex-col justify-end overflow-hidden rounded-lg bg-industrial"
              >
                <Image
                  src={c.image || '/placeholder.svg'}
                  alt={c.name}
                  fill
                  className="object-cover opacity-80 transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-industrial via-industrial/40 to-transparent" />
                <div className="relative p-6 text-industrial-foreground">
                  <h3 className="font-display text-2xl font-bold">{c.name}</h3>
                  <p className="mt-2 text-sm text-industrial-foreground/75">{c.short}</p>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-nt-green">
                    View Category
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
          <Reveal delay={categories.length * 60}>
            <Link
              href="/products"
              className="flex aspect-[4/5] flex-col items-center justify-center gap-4 rounded-lg border border-dashed border-border bg-secondary text-center transition-colors hover:border-nt-blue/50"
            >
              <span className="font-display text-2xl font-bold text-foreground">Explore All Products</span>
              <span className="grid h-12 w-12 place-items-center rounded-full bg-nt-blue text-nt-blue-foreground">
                <ArrowRight className="h-5 w-5" />
              </span>
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

// SECTION 05 — Manufacturing at scale
export function ManufacturingScale() {
  return (
    <section className="bg-secondary py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Manufacturing at Scale"
          title="From raw material to real-world solutions."
          description="Every product moves through a controlled process — from material to distribution — designed for consistency and quality."
        />
        <div className="mt-12">
          <ProcessSteps />
        </div>
        <div className="mt-10">
          <CtaLink href="/manufacturing" variant="primary">
            Explore Our Manufacturing
          </CtaLink>
        </div>
      </div>
    </section>
  )
}

// SECTION 06 — The numbers
export function Numbers() {
  return (
    <section className="bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="The Numbers Behind NT Plastic" title="Scale you can rely on." />
        <div className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-border lg:grid-cols-5">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 60} className="bg-card p-8">
              <p className="font-display text-4xl font-extrabold text-nt-blue sm:text-5xl">
                <StatCounter value={s.value} suffix={s.suffix} />
              </p>
              <p className="mt-3 text-sm font-medium text-muted-foreground">{s.label}</p>
            </Reveal>
          ))}
        </div>
        <p className="mt-4 text-xs text-muted-foreground">
          Figures shown are illustrative samples and should be replaced with verified company statistics.
        </p>
      </div>
    </section>
  )
}

// SECTION 07 — Why NT Plastic
const pillars = [
  { icon: ShieldCheck, title: 'Quality', description: 'Products manufactured to consistent quality standards.' },
  { icon: Wrench, title: 'Reliability', description: 'Solutions designed for demanding real-world environments.' },
  { icon: Factory, title: 'Manufacturing Capability', description: 'Modern production infrastructure and technical expertise.' },
  { icon: Lightbulb, title: 'Innovation', description: 'Continuous improvement in products and processes.' },
  { icon: HeartHandshake, title: 'Customer Focus', description: 'Solutions designed around actual customer needs.' },
  { icon: Cpu, title: 'Scale', description: 'Capability to serve individual, commercial and industrial requirements.' },
]

export function WhyNtPlastic() {
  return (
    <section className="bg-secondary py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Why NT Plastic" title="Built on capability and trust." />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {pillars.map((p, i) => (
            <Reveal key={p.title} delay={i * 60}>
              <div className="flex h-full flex-col rounded-lg border border-border bg-card p-6">
                <span className="grid h-11 w-11 place-items-center rounded-sm bg-nt-blue/10 text-nt-blue">
                  <p.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-display text-xl font-bold text-foreground">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

// SECTION 08 — Inside NT Plastic
export function InsideNtPlastic() {
  return (
    <section className="relative overflow-hidden bg-industrial py-28 sm:py-36">
      <Image
        src="/images/factory-floor.png"
        alt="NT Plastic Industries production floor"
        fill
        className="object-cover opacity-40"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-industrial via-industrial/70 to-industrial/30" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="max-w-xl">
          <span className="text-xs font-semibold uppercase tracking-[0.22em] text-nt-green">Inside NT Plastic</span>
          <h2 className="mt-4 text-balance font-display text-4xl font-extrabold text-industrial-foreground sm:text-5xl">
            Where ideas become products.
          </h2>
          <p className="mt-5 text-pretty leading-relaxed text-industrial-foreground/75">
            Behind every product is a real organisation — production floors, machines, skilled workers, quality control
            and the systems that turn raw material into dependable solutions.
          </p>
          <div className="mt-8">
            <CtaLink href="/manufacturing" variant="green">
              Take a Tour of Our Manufacturing
            </CtaLink>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

// SECTION 09 — Solutions
export function SolutionsPreview() {
  return (
    <section className="bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Solutions for Real-World Needs"
          title="Know your problem? We'll help with the product."
          description="Sometimes customers know the challenge but not the exact product. Our solutions map real needs to the right manufacturing answer."
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {solutions.map((s, i) => (
            <Reveal key={s.slug} delay={i * 50}>
              <Link
                href={`/solutions/${s.slug}`}
                className="group flex h-full flex-col rounded-lg border border-border bg-card p-6 transition-colors hover:border-nt-green/50"
              >
                <h3 className="font-display text-xl font-bold text-foreground">{s.name}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{s.tagline}</p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-nt-blue">
                  Explore Solution
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

// SECTION 10 — Sustainability
export function SustainabilityPreview() {
  return (
    <section className="bg-secondary py-20 sm:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8">
        <Reveal className="relative aspect-[4/3] overflow-hidden rounded-lg">
          <Image src="/images/sustainability.png" alt="Recycled plastic material" fill className="object-cover" />
        </Reveal>
        <div>
          <SectionHeading
            eyebrow="Sustainability"
            title="Building a more responsible plastic future."
            description="Our approach focuses on measurable responsibility — material efficiency, waste reduction, recycling and building products that last longer."
          />
          <div className="mt-8">
            <CtaLink href="/sustainability" variant="primary">
              Our Approach to Sustainability
            </CtaLink>
          </div>
        </div>
      </div>
    </section>
  )
}

// SECTION 11 — Featured products
export function FeaturedProducts() {
  return (
    <section className="bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading eyebrow="Featured Products" title="A closer look at what we make." className="max-w-lg" />
          <CtaLink href="/products" variant="ghost">
            View All Products
          </CtaLink>
        </div>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {featuredProducts.map((p, i) => (
            <Reveal key={p.slug} delay={i * 50}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
