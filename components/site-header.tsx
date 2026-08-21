'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Menu, X, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { nav } from '@/lib/content'
import { Logo } from '@/components/logo'

export function SiteHeader() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  // Only the homepage has a full-bleed hero the header sits over.
  const overHero = pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const solid = scrolled || !overHero
  const light = !solid // white text over hero

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-colors duration-300',
          solid ? 'border-b border-border bg-background/90 backdrop-blur-md' : 'bg-transparent',
        )}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <div className={cn(light && '[&_*]:!text-industrial-foreground')}>
            <Logo invert={light} />
          </div>

          <nav className="hidden items-center gap-8 lg:flex">
            {nav.map((item) => {
              const active = pathname.startsWith(item.href)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'text-sm font-medium transition-colors',
                    light
                      ? 'text-industrial-foreground/80 hover:text-industrial-foreground'
                      : active
                        ? 'text-nt-blue'
                        : 'text-foreground/70 hover:text-foreground',
                  )}
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>

          <div className="hidden lg:block">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-sm bg-nt-blue px-4 py-2.5 text-sm font-semibold text-nt-blue-foreground transition-colors hover:bg-nt-blue/90"
            >
              Request a Quote
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            className={cn(
              'inline-flex h-10 w-10 items-center justify-center rounded-sm lg:hidden',
              light ? 'text-industrial-foreground' : 'text-foreground',
            )}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </header>

      {/* Full-screen mobile menu */}
      <div
        className={cn(
          'fixed inset-0 z-[60] flex flex-col bg-industrial text-industrial-foreground transition-transform duration-300 lg:hidden',
          open ? 'translate-x-0' : 'translate-x-full',
        )}
      >
        <div className="flex h-16 items-center justify-between px-4 sm:px-6">
          <Logo invert />
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="inline-flex h-10 w-10 items-center justify-center rounded-sm text-industrial-foreground"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        <nav className="flex flex-1 flex-col justify-center gap-2 px-6">
          <Link href="/" className="border-b border-white/10 py-4 font-display text-3xl font-bold">
            Home
          </Link>
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="border-b border-white/10 py-4 font-display text-3xl font-bold text-industrial-foreground/90"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="p-6">
          <Link
            href="/contact"
            className="flex items-center justify-center gap-2 rounded-sm bg-nt-green px-5 py-4 text-base font-semibold text-nt-green-foreground"
          >
            Request a Quote
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </>
  )
}
