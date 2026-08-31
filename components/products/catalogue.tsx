'use client'

import { useMemo, useState } from 'react'
import { Search } from 'lucide-react'
import type { Category, Product } from '@/lib/content'
import { ProductCard } from '@/components/product-card'
import { cn } from '@/lib/utils'

export function Catalogue({ products, categories }: { products: Product[]; categories: Category[] }) {
  const [query, setQuery] = useState('')
  const [active, setActive] = useState<string>('all')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return products.filter((p) => {
      const matchesCategory = active === 'all' || p.category === active
      const matchesQuery =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.categoryName.toLowerCase().includes(q) ||
        p.short.toLowerCase().includes(q) ||
        p.specs.some((s) => s.value.toLowerCase().includes(q))
      return matchesCategory && matchesQuery
    })
  }, [query, active])

  return (
    <section className="bg-background py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Search */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-2xl font-bold text-foreground sm:text-3xl">What are you looking for?</h2>
          <div className="relative mt-6">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products, categories or specifications…"
              aria-label="Search products"
              className="w-full rounded-sm border border-border bg-card py-3.5 pl-12 pr-4 text-sm text-foreground outline-none transition-colors focus:border-nt-blue focus:ring-2 focus:ring-nt-blue/20"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="mt-10 flex flex-wrap justify-center gap-2">
          <FilterChip active={active === 'all'} onClick={() => setActive('all')}>
            All Products
          </FilterChip>
          {categories.map((c) => (
            <FilterChip key={c.slug} active={active === c.slug} onClick={() => setActive(c.slug)}>
              {c.name}
            </FilterChip>
          ))}
        </div>

        {/* Grid */}
        <div className="mt-12">
          {filtered.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filtered.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          ) : (
            <div className="rounded-lg border border-dashed border-border py-20 text-center">
              <p className="font-display text-lg font-bold text-foreground">No products found</p>
              <p className="mt-2 text-sm text-muted-foreground">Try a different search or category.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'rounded-full border px-4 py-2 text-sm font-medium transition-colors',
        active
          ? 'border-nt-blue bg-nt-blue text-nt-blue-foreground'
          : 'border-border bg-card text-foreground/70 hover:border-nt-blue/40 hover:text-foreground',
      )}
    >
      {children}
    </button>
  )
}
