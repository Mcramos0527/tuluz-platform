'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useLanguage } from '@/lib/i18n/LanguageContext'
import type { User } from '@supabase/supabase-js'

export function Navbar() {
  const [user, setUser] = useState<User | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { locale, setLocale, t } = useLanguage()

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then((res: { data: { user: User | null } }) => setUser(res.data.user))
    const { data: listener } = supabase.auth.onAuthStateChange((_event: string, session: import('@supabase/supabase-js').Session | null) => {
      setUser(session?.user ?? null)
    })
    const handleScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', handleScroll)
    return () => {
      listener.subscription.unsubscribe()
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 50,
      background: scrolled ? 'rgba(253,250,244,.97)' : '#FDFAF4',
      backdropFilter: scrolled ? 'blur(16px)' : 'none',
      borderBottom: `1px solid ${scrolled ? '#EAD9BC' : '#F2E8D2'}`,
      transition: 'all .3s ease',
      boxShadow: scrolled ? '0 2px 24px rgba(45,30,15,.07)' : 'none',
    }}>
      <nav style={{
        maxWidth: '72rem', margin: '0 auto',
        padding: '0 2rem', height: '3.75rem',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        {/* Logo — mix-blend-mode:multiply makes white bg invisible on cream */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', flexShrink: 0 }}>
          <Image
            src="/brand/logo.png"
            alt="Tu Luz"
            width={110}
            height={44}
            style={{ objectFit: 'contain', mixBlendMode: 'multiply', display: 'block' }}
            priority
          />
        </Link>

        {/* Desktop nav links */}
        <div className="nav-desktop" style={{ display: 'flex', alignItems: 'center', gap: '2.25rem' }}>
          {([
            { href: '/marketplace', label: t.nav.marketplace },
            { href: '/courses', label: t.nav.courses },
            { href: '/blog', label: t.nav.blog },
          ] as const).map(({ href, label }) => (
            <Link key={href} href={href}
              style={{ fontSize: '.875rem', fontWeight: 500, color: '#7A5430', textDecoration: 'none', letterSpacing: '.01em', transition: 'color .2s' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#C4893A')}
              onMouseLeave={e => (e.currentTarget.style.color = '#7A5430')}>
              {label}
            </Link>
          ))}
        </div>

        {/* Desktop: language + auth */}
        <div className="nav-desktop" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {/* Language toggle — pill style */}
          <div style={{ display: 'flex', gap: '2px', background: '#EDE3CE', borderRadius: '20px', padding: '3px' }}>
            {(['es', 'en'] as const).map((lang) => (
              <button key={lang} onClick={() => setLocale(lang)} style={{
                padding: '.2rem .65rem', borderRadius: '16px', border: 'none', cursor: 'pointer',
                fontSize: '.72rem', fontWeight: 700, letterSpacing: '.04em',
                fontFamily: 'Inter, system-ui, sans-serif',
                background: locale === lang ? '#C4893A' : 'transparent',
                color: locale === lang ? '#fff' : '#7A5430',
                transition: 'all .2s ease',
              }}>
                {lang.toUpperCase()}
              </button>
            ))}
          </div>

          {user ? (
            <Link href="/dashboard" style={{
              padding: '.5rem 1.25rem', borderRadius: '10px',
              background: '#C4893A', color: '#fff',
              fontWeight: 600, fontSize: '.85rem', textDecoration: 'none',
              transition: 'background .2s',
            }}
              onMouseEnter={e => (e.currentTarget.style.background = '#9E6A24')}
              onMouseLeave={e => (e.currentTarget.style.background = '#C4893A')}>
              {t.nav.dashboard}
            </Link>
          ) : (
            <>
              <Link href="/login" style={{ fontSize: '.875rem', fontWeight: 500, color: '#7A5430', textDecoration: 'none' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#C4893A')}
                onMouseLeave={e => (e.currentTarget.style.color = '#7A5430')}>
                {t.nav.login}
              </Link>
              <Link href="/register" style={{
                padding: '.5rem 1.25rem', borderRadius: '10px',
                background: '#C4893A', color: '#fff',
                fontWeight: 600, fontSize: '.85rem', textDecoration: 'none',
                boxShadow: '0 2px 8px rgba(196,137,58,.30)',
                transition: 'all .2s ease',
              }}
                onMouseEnter={e => { e.currentTarget.style.background = '#9E6A24'; e.currentTarget.style.boxShadow = '0 4px 14px rgba(196,137,58,.40)' }}
                onMouseLeave={e => { e.currentTarget.style.background = '#C4893A'; e.currentTarget.style.boxShadow = '0 2px 8px rgba(196,137,58,.30)' }}>
                {t.nav.register}
              </Link>
            </>
          )}
        </div>

        {/* Mobile hamburger */}
        <button onClick={() => setMenuOpen(!menuOpen)} aria-label="menu" className="nav-mobile-btn"
          style={{ display: 'none', padding: '.5rem', borderRadius: '.5rem', background: 'transparent', border: 'none', cursor: 'pointer', color: '#C4893A' }}>
          <svg width="22" height="22" viewBox="0 0 22 22" fill="currentColor">
            {menuOpen
              ? <path fillRule="evenodd" clipRule="evenodd" d="M5.3 5.3a1 1 0 011.4 0L11 9.6l4.3-4.3a1 1 0 111.4 1.4L12.4 11l4.3 4.3a1 1 0 01-1.4 1.4L11 12.4l-4.3 4.3a1 1 0 01-1.4-1.4L9.6 11 5.3 6.7a1 1 0 010-1.4z" />
              : <path fillRule="evenodd" clipRule="evenodd" d="M3 6a1 1 0 011-1h14a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h14a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h14a1 1 0 110 2H4a1 1 0 01-1-1z" />
            }
          </svg>
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{ background: '#FDFAF4', borderTop: '1px solid #EAD9BC', padding: '1.25rem 1.5rem 1.75rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {([
            { href: '/marketplace', label: t.nav.marketplace },
            { href: '/courses', label: t.nav.courses },
            { href: '/blog', label: t.nav.blog },
          ] as const).map(({ href, label }) => (
            <Link key={href} href={href} style={{ color: '#7A5430', textDecoration: 'none', fontWeight: 500, fontSize: '.95rem' }} onClick={() => setMenuOpen(false)}>{label}</Link>
          ))}
          <hr style={{ border: 'none', borderTop: '1px solid #EAD9BC' }} />
          <div style={{ display: 'flex', gap: '.5rem' }}>
            {(['es', 'en'] as const).map((lang) => (
              <button key={lang} onClick={() => setLocale(lang)} style={{
                padding: '.35rem .875rem', borderRadius: '8px', border: 'none', cursor: 'pointer',
                fontSize: '.75rem', fontWeight: 700,
                background: locale === lang ? '#C4893A' : '#EDE3CE',
                color: locale === lang ? '#fff' : '#7A5430',
              }}>
                {lang.toUpperCase()}
              </button>
            ))}
          </div>
          {user ? (
            <Link href="/dashboard" style={{ padding: '.75rem', borderRadius: '10px', textAlign: 'center', background: '#C4893A', color: '#fff', fontWeight: 600, textDecoration: 'none' }} onClick={() => setMenuOpen(false)}>{t.nav.dashboard}</Link>
          ) : (
            <>
              <Link href="/login" style={{ color: '#7A5430', textDecoration: 'none', fontWeight: 500 }} onClick={() => setMenuOpen(false)}>{t.nav.login}</Link>
              <Link href="/register" style={{ padding: '.75rem', borderRadius: '10px', textAlign: 'center', background: '#C4893A', color: '#fff', fontWeight: 600, textDecoration: 'none' }} onClick={() => setMenuOpen(false)}>{t.nav.register}</Link>
            </>
          )}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-mobile-btn { display: flex !important; }
        }
      `}</style>
    </header>
  )
}
