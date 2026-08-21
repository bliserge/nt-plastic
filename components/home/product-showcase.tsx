'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { categories } from '@/lib/content'
import { cn } from '@/lib/utils'

export function ProductShowcase() {
  const [active, setActive] = useState(0)
  const current = categories[active]

  return (
    <section className="bg-industrial py-20 text-industrial-foreground sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-[0.22em] text-nt-green">Products in Motion</span>
          <h2 className="mt-4 text-balance font-display text-3xl font-bold sm:text-4xl">
            One portfolio. Built for every need.
          </h2>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_1.15fr] lg:items-center">
          {/* Category selector */}
          <div className="flex flex-col">
            {categories.map((c, i) => (
              <button
                key={c.slug}
                type="button"
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
                className={cn(
                  'group flex items-baseline gap-4 border-b border-white/10 py-5 text-left transition-colors',
                  i === active ? 'text-industrial-foreground' : 'text-industrial-foreground/45 hover:text-industrial-foreground/80',
                )}
              >
                <span className="font-mono text-xs tabular-nums text-nt-green">0{i + 1}</span>
                <span className="font-display text-2xl font-bold sm:text-3xl">{c.name}</span>
              </button>
            ))}
          </div>

          {/* Preview */}
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-industrial-muted">
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
            <div className="absolute inset-0 bg-gradient-to-t from-industrial/90 via-transparent to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6">
              <p className="max-w-md text-sm leading-relaxed text-industrial-foreground/80">{current.description}</p>
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
    </section>
  )
}
