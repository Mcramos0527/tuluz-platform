'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { useLanguage } from '@/lib/i18n/LanguageContext'
import type { User } from '@supabase/supabase-js'

/* ── Design tokens ─────────────────────────────────────────────────────── */
const GOLD    = '#C4893A'
const GOLD_DK = '#9E6A24'
const BROWN   = '#2D1E0F'
const MID     = '#7A5430'
const BORDER  = '#EAD9BC'
const CREAM   = '#FDFAF4'

/* Navigation spec (ordered per BDD spec):
   Home · Bootcamp · Hub Online · Metodología · Noticias · Nosotras        */
const NAV_ITEMS = [
  { key: 'home'        as const, href: '/'            },
  { key: 'bootcamp'    as const, href: '/courses'      },
  { key: 'hub'         as const, href: '/marketplace'  },
  { key: 'metodologia' as const, href: '/metodologia'  },
  { key: 'noticias'    as const, href: '/blog'         },
  { key: 'nosotras'    as const, href: '/nosotras'     },
] as const

export function Navbar() {
  const [user, setUser]       = useState<User | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { locale, setLocale, t } = useLanguage()
  const pathname = usePathname()

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then((res: { data: { user: User | null } }) => setUser(res.data.user))
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event: string, session: import('@supabase/supabase-js').Session | null) => {
        setUser(session?.user ?? null)
      }
    )
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll)
    return () => {
      listener.subscription.unsubscribe()
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  /* Close mobile menu on route change */
  useEffect(() => { setMenuOpen(false) }, [pathname])

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 50,
      background: scrolled ? 'rgba(253,250,244,.97)' : CREAM,
      backdropFilter: scrolled ? 'blur(16px)' : 'none',
      borderBottom: `1px solid ${scrolled ? BORDER : 'rgba(234,217,188,.5)'}`,
      transition: 'box-shadow .3s, border-color .3s',
      boxShadow: scrolled ? '0 1px 24px rgba(45,30,15,.07)' : 'none',
    }}>
      <nav style={{
        maxWidth: '72rem', margin: '0 auto',
        padding: '0 2rem', height: '4rem',
        display: 'flex', alignItems: 'center',
        justifyContent: 'space-between', gap: '1.5rem',
      }}>

        {/* ── Wordmark ──────────────────────────────────────────────────── */}
        <Link href="/" style={{ textDecoration: 'none', flexShrink: 0, display: 'flex', alignItems: 'baseline', gap: '1px', cursor: 'pointer' }}>
          <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '1.55rem', fontStyle: 'italic', fontWeight: 700, color: BROWN, letterSpacing: '-0.02em', lineHeight: 1 }}>Tu luz</span>
          <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '1.55rem', fontWeight: 700, color: GOLD, lineHeight: 1 }}>.</span>
        </Link>

        {/* ── Desktop links (6 items) ────────────────────────────────────── */}
        <div className="nav-desktop" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flex: 1, justifyContent: 'center' }}>
          {NAV_ITEMS.map(({ key, href }) => {
            const active = isActive(href)
            return (
              <Link key={href} href={href} style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: '.85rem',
                fontWeight: active ? 600 : 500,
                color: active ? GOLD : MID,
                textDecoration: 'none',
                letterSpacing: active ? '0' : '.01em',
                transition: 'color .2s',
                position: 'relative',
                paddingBottom: '2px',
                cursor: 'pointer',
              }}
                onMouseEnter={e => { if (!active) e.currentTarget.style.color = BROWN }}
                onMouseLeave={e => { if (!active) e.currentTarget.style.color = MID }}>
                {t.nav[key]}
                {/* Active underline */}
                {active && (
                  <span style={{ position: 'absolute', bottom: '-2px', left: 0, right: 0, height: '2px', background: GOLD, borderRadius: '2px' }} />
                )}
              </Link>
            )
          })}
        </div>

        {/* ── Desktop: lang + auth ────────────────────────────────────────── */}
        <div className="nav-desktop" style={{ display: 'flex', alignItems: 'center', gap: '.875rem', flexShrink: 0 }}>
          {/* Language pill */}
          <div style={{ display: 'flex', background: '#EDE3CE', borderRadius: '20px', padding: '3px', gap: '2px' }}>
            {(['es', 'en'] as const).map(lang => (
              <button key={lang} onClick={() => setLocale(lang)} style={{
                padding: '.2rem .6rem', borderRadius: '16px', border: 'none', cursor: 'pointer',
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: '.72rem', fontWeight: 700, letterSpacing: '.05em',
                background: locale === lang ? GOLD : 'transparent',
                color: locale === lang ? '#fff' : MID,
                transition: 'all .2s',
                minHeight: '28px',  /* touch-target compliance */
              }}>
                {lang.toUpperCase()}
              </button>
            ))}
          </div>

          {user ? (
            <Link href="/dashboard" style={{
              padding: '.5rem 1.1rem', borderRadius: '10px',
              background: GOLD, color: '#fff',
              fontFamily: "'Inter', system-ui, sans-serif",
              fontWeight: 600, fontSize: '.82rem',
              textDecoration: 'none', cursor: 'pointer',
              transition: 'background .2s',
              minHeight: '36px', display: 'flex', alignItems: 'center',
            }}
              onMouseEnter={e => (e.currentTarget.style.background = GOLD_DK)}
              onMouseLeave={e => (e.currentTarget.style.background = GOLD)}>
              {t.nav.dashboard}
            </Link>
          ) : (
            <>
              <Link href="/login" style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: '.85rem', fontWeight: 500,
                color: MID, textDecoration: 'none', cursor: 'pointer',
                transition: 'color .2s',
                minHeight: '36px', display: 'flex', alignItems: 'center',
              }}
                onMouseEnter={e => (e.currentTarget.style.color = GOLD)}
                onMouseLeave={e => (e.currentTarget.style.color = MID)}>
                {t.nav.login}
              </Link>
              <Link href="/register" style={{
                padding: '.5rem 1.1rem', borderRadius: '10px',
                background: GOLD, color: '#fff',
                fontFamily: "'Inter', system-ui, sans-serif",
                fontWeight: 600, fontSize: '.82rem',
                textDecoration: 'none', cursor: 'pointer',
                boxShadow: '0 2px 10px rgba(196,137,58,.25)',
                transition: 'all .2s',
                minHeight: '36px', display: 'flex', alignItems: 'center',
              }}
                onMouseEnter={e => { e.currentTarget.style.background = GOLD_DK; e.currentTarget.style.transform = 'translateY(-1px)' }}
                onMouseLeave={e => { e.currentTarget.style.background = GOLD; e.currentTarget.style.transform = 'translateY(0)' }}>
                {t.nav.register}
              </Link>
            </>
          )}
        </div>

        {/* ── Mobile hamburger ──────────────────────────────────────────── */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={menuOpen}
          className="nav-mobile-btn"
          style={{
            display: 'none', padding: '.5rem',
            background: 'transparent', border: 'none',
            cursor: 'pointer', color: GOLD,
            /* 44×44px touch target */
            minWidth: '44px', minHeight: '44px',
            alignItems: 'center', justifyContent: 'center',
            borderRadius: '8px',
          }}>
          <svg width="22" height="22" viewBox="0 0 22 22" fill="currentColor">
            {menuOpen
              ? <path fillRule="evenodd" clipRule="evenodd" d="M5.3 5.3a1 1 0 011.4 0L11 9.6l4.3-4.3a1 1 0 111.4 1.4L12.4 11l4.3 4.3a1 1 0 01-1.4 1.4L11 12.4l-4.3 4.3a1 1 0 01-1.4-1.4L9.6 11 5.3 6.7a1 1 0 010-1.4z" />
              : <path fillRule="evenodd" clipRule="evenodd" d="M3 6a1 1 0 011-1h14a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h14a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h14a1 1 0 110 2H4a1 1 0 01-1-1z" />
            }
          </svg>
        </button>
      </nav>

      {/* ── Mobile menu ───────────────────────────────────────────────────── */}
      {menuOpen && (
        <div style={{
          background: CREAM, borderTop: `1px solid ${BORDER}`,
          padding: '1.25rem 1.5rem 1.75rem',
          display: 'flex', flexDirection: 'column', gap: '.25rem',
        }}>
          {NAV_ITEMS.map(({ key, href }) => {
            const active = isActive(href)
            return (
              <Link key={href} href={href} style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontWeight: active ? 600 : 500,
                fontSize: '1rem',
                color: active ? GOLD : MID,
                textDecoration: 'none',
                padding: '.75rem 0',
                borderBottom: `1px solid rgba(234,217,188,.4)`,
                display: 'flex', alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer',
                /* 44px touch target height */
                minHeight: '44px',
              }}>
                {t.nav[key]}
                {active && <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: GOLD }} />}
              </Link>
            )
          })}

          {/* Lang + auth at bottom */}
          <div style={{ display: 'flex', gap: '.5rem', paddingTop: '1rem' }}>
            {(['es', 'en'] as const).map(lang => (
              <button key={lang} onClick={() => setLocale(lang)} style={{
                padding: '.35rem .875rem', borderRadius: '8px', border: 'none', cursor: 'pointer',
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: '.75rem', fontWeight: 700,
                background: locale === lang ? GOLD : '#EDE3CE',
                color: locale === lang ? '#fff' : MID,
                minHeight: '44px', minWidth: '44px',
              }}>{lang.toUpperCase()}</button>
            ))}
          </div>
          {user ? (
            <Link href="/dashboard" style={{ padding: '.875rem', borderRadius: '10px', textAlign: 'center', background: GOLD, color: '#fff', fontWeight: 600, textDecoration: 'none', fontFamily: "'Inter', system-ui, sans-serif", marginTop: '.5rem' }}>
              {t.nav.dashboard}
            </Link>
          ) : (
            <>
              <Link href="/login" style={{ padding: '.875rem', textAlign: 'center', color: MID, textDecoration: 'none', fontWeight: 500, fontFamily: "'Inter', system-ui, sans-serif", marginTop: '.25rem' }}>
                {t.nav.login}
              </Link>
              <Link href="/register" style={{ padding: '.875rem', borderRadius: '10px', textAlign: 'center', background: GOLD, color: '#fff', fontWeight: 700, textDecoration: 'none', fontFamily: "'Inter', system-ui, sans-serif" }}>
                {t.nav.register}
              </Link>
            </>
          )}
        </div>
      )}

      <style>{`
        @media (max-width: 900px) {
          .nav-desktop { display: none !important; }
          .nav-mobile-btn { display: flex !important; }
        }
      `}</style>
    </header>
  )
}
