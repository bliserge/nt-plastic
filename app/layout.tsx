import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Archivo, Inter } from 'next/font/google'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const archivo = Archivo({
  subsets: ['latin'],
  variable: '--font-archivo',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'NT Plastic Industries Ltd — Engineering Plastic Solutions',
    template: '%s | NT Plastic Industries Ltd',
  },
  description:
    'NT Plastic Industries manufactures durable plastic solutions — water storage, piping, packaging, household and industrial products — engineered for everyday life and the industries that move communities forward.',
  generator: 'v0.app',
}

export const viewport: Viewport = {
  themeColor: '#1c3a5e',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${archivo.variable} bg-background`}>
      <body className="antialiased font-sans">
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
