'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useLanguage } from '@/lib/i18n/LanguageContext'

const serif = "'Playfair Display', Georgia, serif"
const sans  = "'Inter', system-ui, sans-serif"
const GOLD    = '#C4893A'
const GOLD_LT = '#F0D9A8'
const BORDER  = '#3D2B1A'
const MUTED   = '#8C6B47'
const CREAM   = '#C4A87A'

export function Footer() {
  const { t } = useLanguage()

  const navLinks = [
    { href: '/',            label: t.nav.home        },
    { href: '/courses',     label: t.nav.bootcamp    },
    { href: '/marketplace', label: t.nav.hub         },
    { href: '/hub-online',  label: t.nav.hubOnline   },
    { href: '/metodologia', label: t.nav.metodologia },
    { href: '/blog',        label: t.nav.noticias    },
    { href: '/nosotras',    label: t.nav.nosotras    },
  ]

  return (
    <footer style={{ background: '#2D1E0F', color: CREAM, fontFamily: sans }}>
      <div style={{ maxWidth: '72rem', margin: '0 auto', padding: '4rem 2rem 2rem' }}>

        {/* ── Brand row ─────────────────────────────────────────────── */}
        <div style={{ marginBottom: '1rem' }}>
          <Link href="/" style={{ display: 'inline-flex', textDecoration: 'none', cursor: 'pointer' }}>
            <Image
              src="/brand/logo-white-bg.png"
              alt="Tu Luz"
              width={160}
              height={54}
              style={{
                height: '48px',
                width: 'auto',
                objectFit: 'contain',
                borderRadius: '8px',
                background: '#fff',
                padding: '4px 10px',
              }}
            />
          </Link>
        </div>
        <p style={{ fontSize: '.875rem', lineHeight: 1.75, maxWidth: '28rem', color: CREAM, marginBottom: '3rem' }}>
          {t.footer.tagline}
        </p>

        {/* ── 4 columns ─────────────────────────────────────────────── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '2.5rem', marginBottom: '3rem' }}>

          {/* Column 1: Navegación */}
          <div>
            <h4 style={{ color: GOLD_LT, fontWeight: 600, fontSize: '.875rem', marginBottom: '1rem' }}>
              {t.footer.navColumn}
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '.5rem' }}>
              {navLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} style={{ fontSize: '.875rem', textDecoration: 'none', color: CREAM, transition: 'color .2s' }}
                    onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = GOLD_LT}
                    onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = CREAM}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Nosotras */}
          <div>
            <h4 style={{ color: GOLD_LT, fontWeight: 600, fontSize: '.875rem', marginBottom: '1rem' }}>
              {t.footer.aboutColumn}
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '.5rem' }}>
              {t.footer.aboutLinks.map(({ href, label }: { href: string; label: string }) => (
                <li key={label}>
                  <Link href={href} style={{ fontSize: '.875rem', textDecoration: 'none', color: CREAM, transition: 'color .2s' }}
                    onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = GOLD_LT}
                    onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = CREAM}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Redes sociales */}
          <div>
            <h4 style={{ color: GOLD_LT, fontWeight: 600, fontSize: '.875rem', marginBottom: '1rem' }}>
              {t.footer.socialColumn}
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '.5rem' }}>
              {t.footer.social.map(({ href, label }: { href: string; label: string }) => (
                <li key={label}>
                  <Link href={href} style={{ fontSize: '.875rem', textDecoration: 'none', color: CREAM, transition: 'color .2s' }}
                    onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = GOLD_LT}
                    onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = CREAM}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contacto */}
          <div>
            <h4 style={{ color: GOLD_LT, fontWeight: 600, fontSize: '.875rem', marginBottom: '1rem' }}>
              {t.footer.contactColumn}
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '.5rem' }}>
              <li>
                <a href={`mailto:${t.footer.email}`} style={{ fontSize: '.875rem', textDecoration: 'none', color: CREAM, transition: 'color .2s' }}
                  onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = GOLD_LT}
                  onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = CREAM}>
                  {t.footer.email}
                </a>
              </li>
              <li>
                <span style={{ fontSize: '.875rem', color: CREAM }}>{t.footer.location}</span>
              </li>
              <li style={{ marginTop: '.25rem' }}>
                <Link href="/contacto" style={{ fontSize: '.875rem', textDecoration: 'none', color: CREAM, transition: 'color .2s' }}
                  onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = GOLD_LT}
                  onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = CREAM}>
                  {t.footer.contact}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* ── Bottom bar ────────────────────────────────────────────── */}
        <div style={{ borderTop: `1px solid ${BORDER}`, paddingTop: '1.5rem', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '.75rem' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', alignItems: 'center' }}>
            <p style={{ fontSize: '.8rem', color: MUTED }}>
              © {new Date().getFullYear()} Tu Luz — {t.footer.copyright}
            </p>
            <div style={{ display: 'flex', gap: '1.25rem' }}>
              {[
                { href: '/privacidad', label: t.footer.privacy },
                { href: '/terminos',   label: t.footer.terms   },
              ].map(({ href, label }) => (
                <Link key={href} href={href} style={{ fontSize: '.8rem', color: MUTED, textDecoration: 'none', transition: 'color .2s' }}
                  onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = CREAM}
                  onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = MUTED}>
                  {label}
                </Link>
              ))}
            </div>
          </div>
          <p style={{ fontSize: '.8rem', color: MUTED }}>{t.footer.madeWith}</p>
        </div>

      </div>
    </footer>
  )
}
