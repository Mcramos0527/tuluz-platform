'use client'

import Link from 'next/link'
import { useLanguage } from '@/lib/i18n/LanguageContext'

export function Footer() {
  const { t } = useLanguage()

  return (
    <footer style={{ background: '#2D1E0F', color: '#C4A87A' }}>
      <div style={{ maxWidth: '68rem', margin: '0 auto', padding: '3.5rem 1.5rem 2rem' }}>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '2.5rem',
          marginBottom: '2.5rem',
        }}>
          {/* Brand */}
          <div style={{ gridColumn: 'span 2', maxWidth: '22rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '.6rem', marginBottom: '1rem' }}>
              <div style={{
                width: '2.25rem', height: '2.25rem',
                background: 'linear-gradient(135deg, #C4893A, #F0D9A8)',
                borderRadius: '.6rem',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <span style={{ color: '#2D1E0F', fontWeight: 900, fontSize: '1rem', fontFamily: 'Georgia, serif' }}>T</span>
              </div>
              <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700, fontSize: '1.2rem', color: '#F0D9A8' }}>Tuluz</span>
            </div>
            <p style={{ fontSize: '.875rem', lineHeight: 1.75, maxWidth: '20rem' }}>
              {t.footer.tagline}
            </p>
          </div>

          {/* Platform */}
          <div>
            <h4 style={{ color: '#F0D9A8', fontWeight: 600, fontSize: '.875rem', marginBottom: '.875rem' }}>
              {t.footer.platform}
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '.5rem' }}>
              {[
                { href: '/marketplace', label: t.nav.marketplace },
                { href: '/courses', label: t.nav.courses },
                { href: '/blog', label: t.nav.blog },
                { href: '/register', label: t.nav.register },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} style={{ fontSize: '.875rem', textDecoration: 'none', color: '#C4A87A', transition: 'color .2s' }}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 style={{ color: '#F0D9A8', fontWeight: 600, fontSize: '.875rem', marginBottom: '.875rem' }}>
              {t.footer.legal}
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '.5rem' }}>
              {[
                { href: '/privacidad', label: t.footer.privacy },
                { href: '/terminos', label: t.footer.terms },
                { href: '/contacto', label: t.footer.contact },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} style={{ fontSize: '.875rem', textDecoration: 'none', color: '#C4A87A' }}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div style={{
          borderTop: '1px solid #3D2B1A',
          paddingTop: '1.5rem',
          display: 'flex', flexWrap: 'wrap',
          justifyContent: 'space-between', alignItems: 'center', gap: '.75rem',
        }}>
          <p style={{ fontSize: '.8rem', color: '#8C6B47' }}>
            © {new Date().getFullYear()} Tuluz — {t.footer.copyright}
          </p>
          <p style={{ fontSize: '.8rem', color: '#8C6B47' }}>
            {t.footer.madeWith}
          </p>
        </div>
      </div>
    </footer>
  )
}
