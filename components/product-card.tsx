import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import type { Product } from '@/lib/content'

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/products/${product.category}/${product.slug}`}
      className="group flex flex-col overflow-hidden rounded-lg border border-border bg-card transition-colors hover:border-nt-blue/40"
    >
      <div className="relative aspect-square overflow-hidden bg-secondary">
        <Image
          src={product.image || '/placeholder.svg'}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 rounded-sm bg-background/85 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-nt-blue backdrop-blur">
          {product.categoryName}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-lg font-bold leading-tight text-foreground">{product.name}</h3>
        <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-muted-foreground">{product.short}</p>
        <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
          <span className="text-xs font-semibold text-nt-green">{product.keySpec}</span>
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-nt-blue">
            View Product
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>
      </div>
    </Link>
  )
}
