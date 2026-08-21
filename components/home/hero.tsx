import Image from 'next/image'
import { CtaLink } from '@/components/cta-link'

export function Hero() {
  return (
    <section className="relative flex min-h-[100svh] items-end overflow-hidden bg-industrial">
      <Image
        src="/images/hero-factory.png"
        alt="Inside an NT Plastic Industries manufacturing facility"
        fill
        priority
        className="object-cover opacity-70"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-industrial via-industrial/70 to-industrial/30" />
      <div className="absolute inset-0 bg-gradient-to-r from-industrial/80 to-transparent" />

      <div className="relative mx-auto w-full max-w-7xl px-4 pb-20 pt-32 sm:px-6 lg:px-8 lg:pb-28">
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-nt-green">
            <span className="h-1.5 w-1.5 rounded-full bg-nt-green" />
            Manufacturing of Plastic Products
          </span>
          <h1 className="mt-6 text-balance font-display text-4xl font-extrabold leading-[1.02] text-industrial-foreground sm:text-6xl lg:text-7xl">
            Engineering plastic solutions for a better tomorrow.
          </h1>
          <p className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-industrial-foreground/75 sm:text-lg">
            From water storage and piping to packaging and industrial products, NT Plastic Industries manufactures
            solutions designed for everyday life and the industries that move our communities forward.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <CtaLink href="/products" variant="green">
              Explore Products
            </CtaLink>
            <CtaLink href="/about" variant="light">
              Discover NT Plastic
            </CtaLink>
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 lg:flex">
        <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-industrial-foreground/50">
          Scroll
        </span>
        <span className="h-10 w-px animate-pulse bg-gradient-to-b from-nt-green to-transparent" />
      </div>
    </section>
  )
}
