'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { Category } from '@/lib/content'
import { cn } from '@/lib/utils'

export function ProductShowcase({ categories }: { categories: Category[] }) {
  const [active, setActive] = useState(0)
  const current = categories[active]

  return (
    <section className="bg-industrial py-20 text-industrial-foreground sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div className="max-w-2xl">
            <span className="text-[11px] font-semibold uppercase tracking-[0.26em] text-nt-green">Products in motion</span>
            <h2 className="mt-4 text-balance font-display text-3xl font-bold leading-[1.02] sm:text-4xl lg:text-5xl">
              One portfolio, built for the demands of real work.
            </h2>
            <p className="mt-5 text-pretty text-base leading-relaxed text-industrial-foreground/72 sm:text-lg">
              From water storage and piping to packaging and handling products, the range is built around dependable
              performance in everyday and industrial applications.
            </p>
            <div className="mt-8">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 rounded-full bg-nt-green px-6 py-3.5 text-sm font-semibold text-nt-green-foreground transition-all hover:-translate-y-0.5 hover:bg-nt-green/90"
              >
                Browse the catalogue
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="border-y border-white/15 py-5 sm:py-6">
            <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-stretch lg:gap-8">
              {/* Category selector */}
              <div className="flex flex-col justify-center lg:pr-2">
                <p className="pb-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-industrial-foreground/45">
                  Product families
                </p>
                {categories.map((c, i) => (
                  <button
                    key={c.slug}
                    type="button"
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    onClick={() => setActive(i)}
                    className={cn(
                      'group flex items-baseline gap-4 border-b border-white/10 py-3.5 text-left transition-colors first:border-t first:border-white/10',
                      i === active
                        ? 'text-industrial-foreground'
                        : 'text-industrial-foreground/45 hover:text-industrial-foreground/80',
                    )}
                  >
                    <span className="font-mono text-xs tabular-nums text-nt-green">0{i + 1}</span>
                    <span className="font-display text-xl font-bold sm:text-2xl">{c.name}</span>
                  </button>
                ))}
              </div>

              {/* Preview */}
              <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] bg-industrial-muted shadow-[0_24px_70px_rgba(0,0,0,0.28)] lg:aspect-[5/4]">
                {categories.map((c, i) => (
                  <Image
                    key={c.slug}
                    src={c.image || '/placeholder.svg'}
                    alt={c.name}
                    fill
                    className={cn(
                      'object-cover transition-all duration-700 ease-out',
                      i === active ? 'scale-100 opacity-100' : 'scale-105 opacity-0',
                    )}
                  />
                ))}
                <div className="absolute inset-0 bg-gradient-to-t from-industrial/92 via-transparent to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-nt-green">Selected category</p>
                  <h3 className="mt-2 font-display text-2xl font-bold text-industrial-foreground">{current.name}</h3>
                  <p className="mt-2 max-w-md text-sm leading-relaxed text-industrial-foreground/76">
                    {current.description}
                  </p>
                  <Link
                    href={`/products/${current.slug}`}
                    className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-nt-green hover:underline"
                  >
                    Explore {current.name}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
