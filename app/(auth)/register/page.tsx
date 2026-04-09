'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import type { UserRole } from '@/types/database'

export const dynamic = 'force-dynamic'

export default function RegisterPage() {
  const router = useRouter()
  const [step, setStep] = useState<1 | 2>(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [form, setForm] = useState({
    fullName: '',
    email: '',
    password: '',
    role: 'member' as UserRole,
    country: '',
  })

  function updateForm(field: keyof typeof form, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const supabase = createClient()

    const { data, error: signUpError } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: {
        data: { full_name: form.fullName },
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    })

    if (signUpError) {
      setError(
        signUpError.message.includes('already registered')
          ? 'Este correo ya está registrado. Por favor inicia sesión.'
          : 'Error al crear la cuenta. Por favor intenta de nuevo.'
      )
      setLoading(false)
      return
    }

    if (data.user) {
      await supabase
        .from('profiles')
        .update({ role: form.role, country: form.country, full_name: form.fullName })
        .eq('id', data.user.id)

      if (form.role === 'member') {
        router.push('/onboarding')
      } else {
        router.push('/dashboard')
      }
      router.refresh()
    }

    setLoading(false)
  }

  const roles = [
    {
      value: 'member',
      label: 'Emprendedora / Compradora',
      desc: 'Vende en el marketplace o descubre productos con impacto',
      icon: '🌱',
    },
    {
      value: 'corporate',
      label: 'Empresa',
      desc: 'Encuentra proveedoras para cumplir tus objetivos ESG',
      icon: '🏢',
    },
    {
      value: 'subscriber',
      label: 'Solo quiero seguir el contenido',
      desc: 'Recibe el newsletter y accede al blog',
      icon: '📩',
    },
  ]

  return (
    <div className="flex-1 flex items-center justify-center px-4 py-20 bg-[#f8fffe]">
      <div className="w-full max-w-lg">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 bg-[#2d6a4f] rounded-xl flex items-center justify-center">
              <span className="text-white font-bold">T</span>
            </div>
          </Link>
          <h1 className="text-2xl font-bold">Crear cuenta gratuita</h1>
          <p className="text-[#5a8a6a] mt-2">Únete a la comunidad Tuluz</p>
        </div>

        <div className="bg-white border border-[#b7e4c7] rounded-2xl p-8 shadow-sm">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}

          {step === 1 ? (
            <div>
              <h2 className="font-semibold mb-4">¿Cómo quieres usar Tuluz?</h2>
              <div className="space-y-3 mb-6">
                {roles.map((role) => (
                  <button
                    key={role.value}
                    type="button"
                    onClick={() => updateForm('role', role.value as UserRole)}
                    className={`w-full p-4 rounded-xl border-2 text-left transition-colors ${
                      form.role === role.value
                        ? 'border-[#2d6a4f] bg-[#f0faf4]'
                        : 'border-[#b7e4c7] hover:border-[#40916c]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{role.icon}</span>
                      <div>
                        <p className="font-medium text-sm">{role.label}</p>
                        <p className="text-xs text-[#5a8a6a] mt-0.5">{role.desc}</p>
                      </div>
                      {form.role === role.value && (
                        <div className="ml-auto w-5 h-5 bg-[#2d6a4f] rounded-full flex items-center justify-center">
                          <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                            <path d="M1 4l3 3 5-6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
              <button
                type="button"
                onClick={() => setStep(2)}
                className="w-full py-3 bg-[#2d6a4f] text-white font-semibold rounded-xl
                  hover:bg-[#1b4332] transition-colors"
              >
                Continuar →
              </button>
            </div>
          ) : (
            <form onSubmit={handleRegister} className="space-y-4">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="text-sm text-[#5a8a6a] hover:text-[#1b4332] mb-2 flex items-center gap-1"
              >
                ← Cambiar tipo de cuenta
              </button>

              <div>
                <label htmlFor="fullName" className="block text-sm font-medium mb-1.5">Nombre completo</label>
                <input
                  id="fullName"
                  type="text"
                  required
                  value={form.fullName}
                  onChange={(e) => updateForm('fullName', e.target.value)}
                  placeholder="María García"
                  className="w-full px-4 py-3 border border-[#b7e4c7] rounded-xl text-sm
                    focus:outline-none focus:ring-2 focus:ring-[#40916c] focus:border-transparent
                    placeholder:text-[#a0c0a8]"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1.5">Correo electrónico</label>
                <input
                  id="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => updateForm('email', e.target.value)}
                  placeholder="tu@correo.com"
                  className="w-full px-4 py-3 border border-[#b7e4c7] rounded-xl text-sm
                    focus:outline-none focus:ring-2 focus:ring-[#40916c] focus:border-transparent
                    placeholder:text-[#a0c0a8]"
                />
              </div>

              <div>
                <label htmlFor="country" className="block text-sm font-medium mb-1.5">País</label>
                <select
                  id="country"
                  required
                  value={form.country}
                  onChange={(e) => updateForm('country', e.target.value)}
                  className="w-full px-4 py-3 border border-[#b7e4c7] rounded-xl text-sm
                    focus:outline-none focus:ring-2 focus:ring-[#40916c] bg-white"
                >
                  <option value="">Selecciona tu país</option>
                  <optgroup label="Latinoamérica">
                    {['Argentina', 'Bolivia', 'Brasil', 'Chile', 'Colombia', 'Costa Rica',
                      'Cuba', 'Ecuador', 'El Salvador', 'Guatemala', 'Honduras', 'México',
                      'Nicaragua', 'Panamá', 'Paraguay', 'Perú', 'República Dominicana',
                      'Uruguay', 'Venezuela'].map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </optgroup>
                  <optgroup label="Iberia">
                    {['España', 'Portugal'].map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </optgroup>
                </select>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium mb-1.5">Contraseña</label>
                <input
                  id="password"
                  type="password"
                  required
                  minLength={8}
                  value={form.password}
                  onChange={(e) => updateForm('password', e.target.value)}
                  placeholder="Mínimo 8 caracteres"
                  className="w-full px-4 py-3 border border-[#b7e4c7] rounded-xl text-sm
                    focus:outline-none focus:ring-2 focus:ring-[#40916c] focus:border-transparent"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 bg-[#2d6a4f] text-white font-semibold rounded-xl
                  hover:bg-[#1b4332] transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-2"
              >
                {loading ? 'Creando cuenta...' : 'Crear cuenta gratuita'}
              </button>

              <p className="text-xs text-center text-[#5a8a6a] mt-3">
                Al registrarte aceptas nuestros{' '}
                <Link href="/terminos" className="text-[#2d6a4f] hover:underline">Términos de uso</Link>
                {' '}y{' '}
                <Link href="/privacidad" className="text-[#2d6a4f] hover:underline">Política de privacidad</Link>
              </p>
            </form>
          )}
        </div>

        <p className="text-center text-sm text-[#5a8a6a] mt-6">
          ¿Ya tienes cuenta?{' '}
          <Link href="/login" className="text-[#2d6a4f] font-medium hover:underline">
            Iniciar sesión
          </Link>
        </p>
      </div>
    </div>
  )
}
