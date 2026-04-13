import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { LanguageProvider } from '@/lib/i18n/LanguageContext'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: {
    template: '%s | Tuluz',
    default: 'Tuluz — Emprendimiento Consciente con Impacto Positivo',
  },
  description:
    'Tuluz certifica y conecta emprendedoras con impacto positivo en Latinoamérica e Iberia. Construye tu MVP, obtén certificaciones ESG y conecta con empresas que valoran tu impacto.',
  keywords: ['emprendimiento consciente', 'sostenibilidad', 'ESG', 'Latinoamérica', 'certificación'],
  openGraph: {
    siteName: 'Tuluz',
    locale: 'es_ES',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={`${geistSans.variable} ${geistMono.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased" style={{ background: 'var(--bg)', color: 'var(--text)' }}>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  )
}
