import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  Cpu,
  Factory,
  HeartHandshake,
  Layers3,
  Lightbulb,
  MapPinned,
  PackageSearch,
  ShieldCheck,
  Sparkles,
  Truck,
  Wrench,
} from 'lucide-react'
import type { Category, Product, Solution } from '@/lib/content'
import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'
import { StatCounter } from '@/components/stat-counter'
import { ProductCard } from '@/components/product-card'
import { ProcessSteps } from '@/components/process-steps'
import { CtaLink } from '@/components/cta-link'

// SECTION 02 - Brand statement
export function ManufacturingStatement() {
  return (
    <section className="border-b border-border bg-background py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-start lg:px-8">
        <Reveal className="max-w-3xl">
          <p className="font-display text-4xl font-extrabold leading-[1.02] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            We make plastic products that are built to perform.
          </p>
          <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground sm:text-xl">
            We manufacture products and systems that hold water, move resources, protect goods and support the
            industries that keep communities running.
          </p>
        </Reveal>

        <Reveal className="rounded-3xl border border-border bg-secondary p-6 sm:p-8">
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                icon: ShieldCheck,
                title: 'Trust first',
                text: 'Consistent specifications and dependable output support every order.',
              },
              {
                icon: Factory,
                title: 'Built at scale',
                text: 'Established production capability supports both regular supply and larger requirements.',
              },
              {
                icon: Sparkles,
                title: 'Premium through clarity',
                text: 'Thoughtful product design, reliable materials and careful finishing define the range.',
              },
              {
                icon: Truck,
                title: 'Ready for business',
                text: 'Clear product information helps customers specify, source and order with confidence.',
              },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl border border-border bg-background p-4">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-nt-blue/10 text-nt-blue">
                  <item.icon className="h-4 w-4" />
                </span>
                <p className="mt-3 font-display text-base font-bold text-foreground">{item.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

// SECTION 03 - Product universe
export function ProductUniverse({ categories }: { categories: Category[] }) {
  return (
    <section className="bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <SectionHeading
            eyebrow="Our Product Universe"
            title="A focused portfolio with room to scale."
            description="Our product range brings essential plastic solutions together in one organised portfolio, supported by consistent manufacturing capability."
          />
          <div className="rounded-3xl border border-border bg-secondary p-6 sm:p-8">
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { icon: BadgeCheck, label: 'Quality control', text: 'Products are made to consistent specifications across each product family.' },
                { icon: Layers3, label: 'Category depth', text: 'Solutions cover water storage, piping, packaging and everyday handling needs.' },
                { icon: PackageSearch, label: 'Product clarity', text: 'Practical specifications make it easier to select the right product for the job.' },
                { icon: MapPinned, label: 'Regional reach', text: 'A dependable supply network supports customers across the region.' },
              ].map((item) => (
                <div key={item.label} className="rounded-2xl border border-border bg-background p-4">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-nt-green/15 text-nt-green">
                    <item.icon className="h-4 w-4" />
                  </span>
                  <p className="mt-3 font-display text-base font-bold text-foreground">{item.label}</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((c, i) => (
            <Reveal key={c.slug} delay={i * 60}>
              <Link
                href={`/products/${c.slug}`}
                className="group relative flex aspect-[4/5] flex-col justify-end overflow-hidden rounded-3xl border border-border bg-industrial shadow-[0_20px_60px_rgba(15,23,42,0.06)]"
              >
                <Image
                  src={c.image || '/placeholder.svg'}
                  alt={c.name}
                  fill
                  className="object-cover opacity-[0.85] transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-industrial via-industrial/55 to-transparent" />
                <div className="relative p-6 text-industrial-foreground">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-nt-green">Category {i + 1}</p>
                  <h3 className="mt-3 font-display text-2xl font-bold">{c.name}</h3>
                  <p className="mt-2 max-w-sm text-sm leading-relaxed text-industrial-foreground/72">{c.short}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-nt-green">
                    View category
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-4">
          <Link
            href="/products"
            className="group flex items-center justify-between rounded-3xl border border-dashed border-border bg-secondary px-6 py-5 transition-colors hover:border-nt-green/50"
          >
            <div>
              <p className="font-display text-xl font-bold text-foreground">Explore the full product catalogue</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Explore product specifications, applications and ordering information in one place.
              </p>
            </div>
            <span className="grid h-12 w-12 place-items-center rounded-full bg-nt-green text-nt-green-foreground">
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
            </span>
          </Link>
        </Reveal>
      </div>
    </section>
  )
}

// SECTION 04 - Manufacturing scale
export function ManufacturingScale({ manufacturingSteps }: { manufacturingSteps: { no: string; title: string; description: string }[] }) {
  return (
    <section className="bg-secondary py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:items-start">
          <div>
            <SectionHeading
              eyebrow="Manufacturing at scale"
              title="A controlled process, from material to delivery."
              description="NT Plastic Industries runs a disciplined production flow, from materials intake and processing through quality control, finishing and distribution."
            />
            <div className="mt-10">
              <ProcessSteps manufacturingSteps={manufacturingSteps} />
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 rounded-3xl border border-border bg-background p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-nt-green">Operational assurance</p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
              Our manufacturing approach is built around consistency, traceability and quality control, giving customers
              confidence that each product is produced with the same level of care.
            </p>
          </div>
          <CtaLink href="/manufacturing" variant="green">
            Explore manufacturing
          </CtaLink>
        </div>
      </div>
    </section>
  )
}

// SECTION 05 - The numbers
export function Numbers({ stats }: { stats: { value: number; suffix: string; label: string }[] }) {
  return (
    <section className="bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
          <SectionHeading
            eyebrow="The numbers behind NT Plastic"
            title="Scale, capability and reach."
            description="Our footprint, production capability and product range reflect a manufacturing partner equipped to support customers at every stage of growth."
          />
          <div className="rounded-3xl border border-border bg-secondary p-6 text-sm leading-relaxed text-muted-foreground sm:p-8">
            From essential everyday products to larger commercial requirements, our capabilities are built to support
            dependable supply as customer needs grow.
          </div>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-border bg-border lg:grid-cols-5">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 60} className="bg-card p-8">
              <p className="font-display text-4xl font-extrabold tracking-tight text-nt-blue sm:text-5xl">
                <StatCounter value={s.value} suffix={s.suffix} />
              </p>
              <p className="mt-3 text-sm font-medium text-muted-foreground">{s.label}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

// SECTION 06 - Why NT Plastic
const pillars = [
  { icon: ShieldCheck, title: 'Quality', description: 'Products manufactured to consistent quality standards.' },
  { icon: Wrench, title: 'Reliability', description: 'Solutions designed for demanding real-world environments.' },
  { icon: Factory, title: 'Manufacturing capability', description: 'Modern production infrastructure and technical expertise.' },
  { icon: Lightbulb, title: 'Innovation', description: 'Continuous improvement in products and processes.' },
  { icon: HeartHandshake, title: 'Customer focus', description: 'Solutions designed around actual customer needs.' },
  { icon: Cpu, title: 'Scale', description: 'Capability to serve individual, commercial and industrial requirements.' },
]

export function WhyNtPlastic() {
  return (
    <section className="bg-secondary py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
          <SectionHeading
            eyebrow="Why NT Plastic"
            title="Built on capability, trust and repeatable delivery."
            description="Customers choose NT Plastic for dependable products, consistent quality and a manufacturing partner committed to long-term relationships."
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {pillars.map((p, i) => (
              <Reveal key={p.title} delay={i * 60}>
                <div className="flex h-full flex-col rounded-3xl border border-border bg-background p-6 transition-transform duration-300 hover:-translate-y-0.5">
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-nt-blue/10 text-nt-blue">
                    <p.icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 font-display text-xl font-bold text-foreground">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// SECTION 07 - Inside NT Plastic
export function InsideNtPlastic() {
  return (
    <section className="relative overflow-hidden bg-industrial py-28 sm:py-36">
      <Image
        src="/images/factory-floor.png"
        alt="NT Plastic Industries production floor"
        fill
        className="object-cover opacity-40"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-industrial via-industrial/72 to-industrial/28" />
      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:px-8">
        <Reveal className="max-w-xl">
          <span className="text-[11px] font-semibold uppercase tracking-[0.26em] text-nt-green">Inside NT Plastic</span>
          <h2 className="mt-4 text-balance font-display text-4xl font-extrabold leading-[1.02] text-industrial-foreground sm:text-5xl lg:text-6xl">
            Manufacturing discipline you can see in every detail.
          </h2>
          <p className="mt-5 text-pretty leading-relaxed text-industrial-foreground/76">
            Skilled teams, clear systems and disciplined process control come together on the production floor to make
            products customers can rely on in demanding environments.
          </p>
          <div className="mt-8">
            <CtaLink href="/manufacturing" variant="green">
              Take a tour of manufacturing
            </CtaLink>
          </div>
        </Reveal>

        <Reveal className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-6 backdrop-blur-sm">
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              'Production floors and dedicated lines',
              'Quality control at each critical step',
              'Equipment, capacity and workflow built for dependable output',
              'Distribution readiness for customers across the region',
            ].map((item) => (
              <div key={item} className="rounded-2xl border border-white/10 bg-black/10 p-4 text-industrial-foreground">
                <CheckCircle2 className="h-5 w-5 text-nt-green" />
                <p className="mt-3 text-sm leading-relaxed text-industrial-foreground/78">{item}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

// SECTION 08 - Solutions
export function SolutionsPreview({ solutions }: { solutions: Solution[] }) {
  return (
    <section className="bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <SectionHeading
            eyebrow="Solutions for real-world needs"
            title="The right product, mapped to the right use case."
            description="From water and sanitation to construction, agriculture and industrial supply, our product families are developed around practical operating needs."
          />
          <div className="rounded-3xl border border-border bg-secondary p-6 sm:p-8">
            <div className="grid gap-3 sm:grid-cols-2">
              {['Water & sanitation', 'Construction', 'Agriculture', 'Residential', 'Commercial', 'Industrial'].map((item) => (
                <div key={item} className="rounded-2xl border border-border bg-background px-4 py-3 text-sm font-medium text-foreground">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {solutions.map((s, i) => (
            <Reveal key={s.slug} delay={i * 50}>
              <Link
                href={`/solutions/${s.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card transition-transform duration-300 hover:-translate-y-0.5"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-industrial">
                  <Image
                    src={s.image || '/placeholder.svg'}
                    alt={s.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-industrial via-industrial/40 to-transparent" />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-display text-xl font-bold text-foreground">{s.name}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{s.tagline}</p>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-nt-blue">
                    Explore solution
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

// SECTION 09 - Sustainability
export function SustainabilityPreview() {
  return (
    <section className="bg-secondary py-20 sm:py-28">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_0.95fr] lg:items-center lg:px-8">
        <Reveal className="relative aspect-[4/3] overflow-hidden rounded-[2rem] border border-border bg-industrial">
          <Image src="/images/sustainability.png" alt="Recycled plastic material" fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-industrial via-industrial/35 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-6 text-industrial-foreground">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-nt-green">Sustainability</p>
            <p className="mt-2 max-w-sm text-sm leading-relaxed text-industrial-foreground/75">
              Responsibility means using materials efficiently, reducing waste and building products that last longer.
            </p>
          </div>
        </Reveal>
        <div>
          <SectionHeading
            eyebrow="Sustainability"
            title="Practical responsibility, built into how we operate."
            description="Responsible manufacturing is part of the value proposition, supported by material efficiency, waste reduction, recycling and longer product life cycles."
          />
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {['Waste reduction', 'Resource efficiency', 'Product longevity'].map((item) => (
              <div key={item} className="rounded-2xl border border-border bg-background px-4 py-3 text-sm font-medium text-foreground">
                {item}
              </div>
            ))}
          </div>
          <div className="mt-8">
            <CtaLink href="/sustainability" variant="primary">
              Our sustainability approach
            </CtaLink>
          </div>
        </div>
      </div>
    </section>
  )
}

// SECTION 10 - Featured products
export function FeaturedProducts({ featuredProducts }: { featuredProducts: Product[] }) {
  return (
    <section className="bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading eyebrow="Featured products" title="A closer look at what we make." className="max-w-xl" />
          <CtaLink href="/products" variant="ghost">
            View all products
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
