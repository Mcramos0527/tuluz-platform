'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectTo = searchParams.get('redirectTo') ?? '/dashboard'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [magicLinkSent, setMagicLinkSent] = useState(false)

  const supabase = createClient()

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError('Correo o contraseña incorrectos. Por favor verifica tus datos.')
      setLoading(false)
      return
    }

    router.push(redirectTo)
    router.refresh()
  }

  async function handleMagicLink() {
    if (!email) {
      setError('Por favor ingresa tu correo electrónico.')
      return
    }
    setLoading(true)
    setError(null)

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback?redirectTo=${redirectTo}`,
      },
    })

    if (error) {
      setError('No se pudo enviar el enlace mágico. Por favor intenta de nuevo.')
    } else {
      setMagicLinkSent(true)
    }
    setLoading(false)
  }

  if (magicLinkSent) {
    return (
      <div className="flex-1 flex items-center justify-center px-4 py-20 bg-[#f8fffe]">
        <div className="w-full max-w-md text-center">
          <div className="w-16 h-16 bg-[#d8f3dc] rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-3xl">✉️</span>
          </div>
          <h2 className="text-2xl font-bold mb-3">¡Revisa tu correo!</h2>
          <p className="text-[#5a8a6a] mb-6">
            Te enviamos un enlace mágico a <strong>{email}</strong>.
            Haz clic en él para iniciar sesión automáticamente.
          </p>
          <button
            onClick={() => setMagicLinkSent(false)}
            className="text-sm text-[#2d6a4f] hover:underline"
          >
            ← Volver al inicio de sesión
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 flex items-center justify-center px-4 py-20 bg-[#f8fffe]">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 bg-[#2d6a4f] rounded-xl flex items-center justify-center">
              <span className="text-white font-bold">T</span>
            </div>
          </Link>
          <h1 className="text-2xl font-bold">Iniciar sesión</h1>
          <p className="text-[#5a8a6a] mt-2">Bienvenida de vuelta a Tuluz</p>
        </div>

        <div className="bg-white border border-[#b7e4c7] rounded-2xl p-8 shadow-sm">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1.5">
                Correo electrónico
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@correo.com"
                className="w-full px-4 py-3 border border-[#b7e4c7] rounded-xl text-sm
                  focus:outline-none focus:ring-2 focus:ring-[#40916c] focus:border-transparent
                  placeholder:text-[#a0c0a8]"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-1.5">
                Contraseña
              </label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 border border-[#b7e4c7] rounded-xl text-sm
                  focus:outline-none focus:ring-2 focus:ring-[#40916c] focus:border-transparent"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-[#2d6a4f] text-white font-semibold rounded-xl
                hover:bg-[#1b4332] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Iniciando sesión...' : 'Iniciar sesión'}
            </button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#b7e4c7]" />
            </div>
            <div className="relative flex justify-center text-xs text-[#5a8a6a] bg-white px-3">
              o
            </div>
          </div>

          <button
            onClick={handleMagicLink}
            disabled={loading}
            className="w-full py-3 px-4 border-2 border-[#b7e4c7] text-[#2d6a4f] font-medium
              rounded-xl hover:bg-[#f0faf4] transition-colors text-sm disabled:opacity-50"
          >
            Enviar enlace mágico al correo
          </button>
        </div>

        <p className="text-center text-sm text-[#5a8a6a] mt-6">
          ¿No tienes cuenta?{' '}
          <Link href="/register" className="text-[#2d6a4f] font-medium hover:underline">
            Registrarse gratis
          </Link>
        </p>
      </div>
    </div>
  )
}
