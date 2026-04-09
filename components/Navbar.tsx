'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { User } from '@supabase/supabase-js'

export function Navbar() {
  const [user, setUser] = useState<User | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(({ data }) => setUser(data.user))

    const { data: listener } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null)
    })
    return () => listener.subscription.unsubscribe()
  }, [])

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-[#b7e4c7]">
      <nav className="mx-auto max-w-6xl px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#2d6a4f] rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">T</span>
          </div>
          <span className="font-bold text-lg text-[#1b4332]">Tuluz</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/marketplace" className="text-sm text-[#5a8a6a] hover:text-[#1b4332] transition-colors">
            Marketplace
          </Link>
          <Link href="/courses" className="text-sm text-[#5a8a6a] hover:text-[#1b4332] transition-colors">
            Cursos
          </Link>
          <Link href="/blog" className="text-sm text-[#5a8a6a] hover:text-[#1b4332] transition-colors">
            Blog
          </Link>
        </div>

        {/* Auth buttons */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <Link
              href="/dashboard"
              className="px-4 py-2 text-sm font-medium bg-[#2d6a4f] text-white rounded-lg
                hover:bg-[#1b4332] transition-colors"
            >
              Mi Panel
            </Link>
          ) : (
            <>
              <Link
                href="/login"
                className="px-4 py-2 text-sm font-medium text-[#2d6a4f] hover:text-[#1b4332] transition-colors"
              >
                Iniciar sesión
              </Link>
              <Link
                href="/register"
                className="px-4 py-2 text-sm font-medium bg-[#2d6a4f] text-white rounded-lg
                  hover:bg-[#1b4332] transition-colors"
              >
                Registrarse
              </Link>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-2 rounded-lg text-[#2d6a4f] hover:bg-[#d8f3dc] transition-colors"
          aria-label="Abrir menú"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            {menuOpen ? (
              <path fillRule="evenodd" clipRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" />
            ) : (
              <path fillRule="evenodd" clipRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-[#b7e4c7] px-4 py-4 flex flex-col gap-4">
          <Link href="/marketplace" className="text-sm text-[#5a8a6a]" onClick={() => setMenuOpen(false)}>
            Marketplace
          </Link>
          <Link href="/courses" className="text-sm text-[#5a8a6a]" onClick={() => setMenuOpen(false)}>
            Cursos
          </Link>
          <Link href="/blog" className="text-sm text-[#5a8a6a]" onClick={() => setMenuOpen(false)}>
            Blog
          </Link>
          <hr className="border-[#b7e4c7]" />
          {user ? (
            <Link
              href="/dashboard"
              className="px-4 py-2 text-sm font-medium bg-[#2d6a4f] text-white rounded-lg text-center"
              onClick={() => setMenuOpen(false)}
            >
              Mi Panel
            </Link>
          ) : (
            <>
              <Link href="/login" className="text-sm text-[#2d6a4f] font-medium" onClick={() => setMenuOpen(false)}>
                Iniciar sesión
              </Link>
              <Link
                href="/register"
                className="px-4 py-2 text-sm font-medium bg-[#2d6a4f] text-white rounded-lg text-center"
                onClick={() => setMenuOpen(false)}
              >
                Registrarse
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  )
}
