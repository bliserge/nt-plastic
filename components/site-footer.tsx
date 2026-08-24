import Link from 'next/link'
import { ArrowRight, Phone, Mail, MapPin, Clock } from 'lucide-react'
import { site, categories, solutions } from '@/lib/content'
import { Logo } from '@/components/logo'

export function SiteFooter() {
  return (
    <footer className="bg-industrial text-industrial-foreground">
      {/* CTA strip */}
      <div className="border-b border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-4 py-12 sm:px-6 lg:flex-row lg:items-center lg:px-8">
          <h2 className="max-w-xl text-balance font-display text-3xl font-bold sm:text-4xl">
            Have a project in mind?
          </h2>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-sm bg-nt-green px-6 py-3.5 text-sm font-semibold text-nt-green-foreground transition-colors hover:bg-nt-green/90"
          >
            Request a Quote
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-10 px-4 py-16 sm:px-6 md:grid-cols-4 lg:grid-cols-5 lg:px-8">
        <div className="col-span-2 lg:col-span-1">
          <Logo invert />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-industrial-foreground/60">
            {site.description}
          </p>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-nt-green">Company</h3>
          <ul className="mt-4 space-y-3 text-sm text-industrial-foreground/70">
            <li><Link href="/about" className="hover:text-industrial-foreground">About Us</Link></li>
            <li><Link href="/manufacturing" className="hover:text-industrial-foreground">Manufacturing</Link></li>
            <li><Link href="/sustainability" className="hover:text-industrial-foreground">Sustainability</Link></li>
            <li><Link href="/contact" className="hover:text-industrial-foreground">Contact Us</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-nt-green">Products</h3>
          <ul className="mt-4 space-y-3 text-sm text-industrial-foreground/70">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link href={`/products/${c.slug}`} className="hover:text-industrial-foreground">
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-nt-green">Solutions</h3>
          <ul className="mt-4 space-y-3 text-sm text-industrial-foreground/70">
            {solutions.slice(0, 5).map((s) => (
              <li key={s.slug}>
                <Link href={`/solutions/${s.slug}`} className="hover:text-industrial-foreground">
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="col-span-2 md:col-span-4 lg:col-span-1">
          <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-nt-green">Contact</h3>
          <ul className="mt-4 space-y-3 text-sm text-industrial-foreground/70">
            <li className="flex items-start gap-2.5">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-nt-green" />
              <span>{site.contact.phone}</span>
            </li>
            <li className="flex items-start gap-2.5">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-nt-green" />
              <span>{site.contact.email}</span>
            </li>
            <li className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-nt-green" />
              <span>{site.contact.address}</span>
            </li>
            <li className="flex items-start gap-2.5">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-nt-green" />
              <span>{site.contact.hours}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 sm:flex-row sm:px-6 lg:px-8">
          <p className="text-xs text-industrial-foreground/50">
            &copy; {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <div className="flex gap-5">
            {site.social.map((s) => (
              <a key={s.label} href={s.href} className="text-xs text-industrial-foreground/60 hover:text-industrial-foreground">
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
