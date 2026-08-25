import Image from 'next/image'
import { BadgeCheck, ShieldCheck, Truck } from 'lucide-react'
import { CtaLink } from '@/components/cta-link'

export function Hero() {
  return (
    <section className="relative isolate flex min-h-[100svh] items-end overflow-hidden bg-industrial">
      <Image
        src="/images/hero-factory.png"
        alt="Inside an NT Plastic Industries manufacturing facility"
        fill
        priority
        className="object-cover opacity-60"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-industrial via-industrial/72 to-industrial/25" />
      <div className="absolute inset-0 bg-gradient-to-r from-industrial/85 via-industrial/45 to-transparent" />
      <div className="absolute left-[-8rem] top-[-6rem] h-80 w-80 rounded-full bg-nt-green/10 blur-3xl" />
      <div className="absolute bottom-[-8rem] right-[-6rem] h-96 w-96 rounded-full bg-nt-blue/15 blur-3xl" />

      <div className="relative mx-auto w-full max-w-7xl px-4 pb-16 pt-32 sm:px-6 lg:px-8 lg:pb-24">
        <div className="max-w-4xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.24em] text-nt-green backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-nt-green" />
            Industrial plastic manufacturing
          </span>
          <h1 className="mt-6 text-balance font-display text-4xl font-extrabold leading-[0.98] tracking-tight text-industrial-foreground sm:text-6xl lg:text-[5rem]">
            Precision plastic manufacturing for infrastructure, commerce and everyday life.
          </h1>
          <p className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-industrial-foreground/76 sm:text-lg lg:text-xl">
            From water storage and piping to packaging and industrial products, NT Plastic Industries builds durable
            solutions with the consistency, scale and credibility that serious buyers expect.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <CtaLink href="/products" variant="green">
              Explore Products
            </CtaLink>
            <CtaLink href="/about" variant="light" className="border-white/15 bg-white/[0.06]">
              Discover the Company
            </CtaLink>
          </div>

          <div className="mt-10 grid gap-3 sm:grid-cols-3">
            {[
              {
                icon: BadgeCheck,
                title: 'Quality-led production',
                text: 'Control points at every stage of manufacture.',
              },
              {
                icon: ShieldCheck,
                title: 'Built for trust',
                text: 'Products and processes designed for long service life.',
              },
              {
                icon: Truck,
                title: 'Ready to distribute',
                text: 'Structured for commercial supply and regional delivery.',
              },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl border border-white/10 bg-white/[0.06] p-4 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-nt-green/15 text-nt-green">
                    <item.icon className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="font-display text-base font-bold text-industrial-foreground">{item.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-industrial-foreground/65">{item.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 lg:flex">
        <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-industrial-foreground/50">
          Scroll
        </span>
        <span className="h-10 w-px bg-gradient-to-b from-nt-green to-transparent" />
      </div>
    </section>
  )
}
