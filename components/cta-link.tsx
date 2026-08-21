import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

type Variant = 'primary' | 'green' | 'outline' | 'ghost' | 'light'

const styles: Record<Variant, string> = {
  primary: 'bg-nt-blue text-nt-blue-foreground hover:bg-nt-blue/90',
  green: 'bg-nt-green text-nt-green-foreground hover:bg-nt-green/90',
  outline: 'border border-border bg-transparent text-foreground hover:bg-secondary',
  ghost: 'bg-transparent text-nt-blue hover:bg-secondary',
  light: 'border border-white/25 bg-transparent text-industrial-foreground hover:bg-white/10',
}

export function CtaLink({
  href,
  children,
  variant = 'primary',
  arrow = true,
  className,
}: {
  href: string
  children: React.ReactNode
  variant?: Variant
  arrow?: boolean
  className?: string
}) {
  return (
    <Link
      href={href}
      className={cn(
        'group inline-flex items-center justify-center gap-2 rounded-sm px-6 py-3.5 text-sm font-semibold transition-colors',
        styles[variant],
        className,
      )}
    >
      {children}
      {arrow && <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />}
    </Link>
  )
}
