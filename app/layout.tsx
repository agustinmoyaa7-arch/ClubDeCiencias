import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Nunito, Caveat, Patrick_Hand } from 'next/font/google'
import dynamic from 'next/dynamic'
import './globals.css'
import { SiteNavbar } from '@/components/site-navbar'
import { SiteFooter } from '@/components/site-footer'

const FaqWidget = dynamic(
  () => import('@/components/faq-widget').then(m => ({ default: m.FaqWidget }))
)

const nunito = Nunito({
  variable: '--font-nunito',
  subsets: ['latin'],
  display: 'swap',
})
const caveat = Caveat({
  variable: '--font-caveat',
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
})
const patrick = Patrick_Hand({
  variable: '--font-patrick',
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Club de Ciencia ConCiencia | IPETyM N°84 — Tanti, Córdoba',
  description:
    'Somos estudiantes apasionados por la ciencia, la curiosidad y el aprendizaje colectivo. Revista científica, viajes, eventos y proyectos del Club de Ciencia ConCiencia.',
  generator: 'v0.app',
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#f7eecb',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="es"
      className={`${nunito.variable} ${caveat.variable} ${patrick.variable} bg-background`}
    >
      <body className="font-sans antialiased">
        <SiteNavbar />
        <main className="min-h-[60vh]">{children}</main>
        <SiteFooter />

        <FaqWidget />

        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
