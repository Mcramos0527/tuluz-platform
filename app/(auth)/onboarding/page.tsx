'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import type { ImpactType, AvailabilityType } from '@/types/database'

const SECTORS = [
  'Moda sostenible', 'Alimentación y gastronomía', 'Tecnología verde', 'Educación',
  'Salud y bienestar', 'Arte y cultura', 'Turismo sostenible', 'Agricultura y agroecología',
  'Energía renovable', 'Economía circular', 'Servicios sociales', 'Otro',
]

export default function OnboardingPage() {
  const router = useRouter()
  const [step, setStep] = useState<1 | 2 | 3>(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [form, setForm] = useState({
    businessName: '',
    businessDescription: '',
    sector: '',
    country: '',
    website: '',
    impactType: [] as ImpactType[],
    availableFor: [] as AvailabilityType[],
    employees: '',
  })

  function toggleImpactType(type: ImpactType) {
    setForm((prev) => ({
      ...prev,
      impactType: prev.impactType.includes(type)
        ? prev.impactType.filter((t) => t !== type)
        : [...prev.impactType, type],
    }))
  }

  function toggleAvailability(type: AvailabilityType) {
    setForm((prev) => ({
      ...prev,
      availableFor: prev.availableFor.includes(type)
        ? prev.availableFor.filter((t) => t !== type)
        : [...prev.availableFor, type],
    }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      router.push('/login')
      return
    }

    const { error: insertError } = await supabase.from('entrepreneur_profiles').insert({
      user_id: user.id,
      business_name: form.businessName,
      business_description: form.businessDescription,
      sector: form.sector,
      country: form.country,
      website: form.website || null,
      impact_type: form.impactType,
      available_for: form.availableFor,
      impact_metrics: form.employees ? { employees: parseInt(form.employees) } : {},
      ai_context: {},
      is_published: false,
    })

    if (insertError) {
      setError('Error al crear tu perfil. Por favor intenta de nuevo.')
      setLoading(false)
      return
    }

    router.push('/dashboard')
    router.refresh()
  }

  const progressWidth = `${(step / 3) * 100}%`

  return (
    <div className="min-h-screen bg-[#f8fffe] flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold">Configura tu perfil de emprendedora</h1>
          <p className="text-[#5a8a6a] mt-2">
            Paso {step} de 3 — Esto nos ayuda a conectarte con los compradores correctos
          </p>
          {/* Progress bar */}
          <div className="mt-4 h-2 bg-[#d8f3dc] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#2d6a4f] rounded-full transition-all duration-300"
              style={{ width: progressWidth }}
            />
          </div>
        </div>

        <div className="bg-white border border-[#b7e4c7] rounded-2xl p-8 shadow-sm">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}

          {step === 1 && (
            <div className="space-y-5">
              <h2 className="font-semibold text-lg">Cuéntanos sobre tu negocio</h2>

              <div>
                <label className="block text-sm font-medium mb-1.5">
                  Nombre de tu negocio *
                </label>
                <input
                  type="text"
                  required
                  value={form.businessName}
                  onChange={(e) => setForm((p) => ({ ...p, businessName: e.target.value }))}
                  placeholder="Ej: EcoTela Artesanal"
                  className="w-full px-4 py-3 border border-[#b7e4c7] rounded-xl text-sm
                    focus:outline-none focus:ring-2 focus:ring-[#40916c] focus:border-transparent
                    placeholder:text-[#a0c0a8]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1.5">
                  Describe tu negocio y su impacto *
                </label>
                <textarea
                  required
                  rows={4}
                  value={form.businessDescription}
                  onChange={(e) => setForm((p) => ({ ...p, businessDescription: e.target.value }))}
                  placeholder="Cuéntanos qué haces, cómo lo haces, y qué impacto genera en tu comunidad o el medio ambiente..."
                  className="w-full px-4 py-3 border border-[#b7e4c7] rounded-xl text-sm
                    focus:outline-none focus:ring-2 focus:ring-[#40916c] focus:border-transparent
                    placeholder:text-[#a0c0a8] resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1.5">Sector *</label>
                <select
                  required
                  value={form.sector}
                  onChange={(e) => setForm((p) => ({ ...p, sector: e.target.value }))}
                  className="w-full px-4 py-3 border border-[#b7e4c7] rounded-xl text-sm
                    focus:outline-none focus:ring-2 focus:ring-[#40916c] bg-white"
                >
                  <option value="">Selecciona tu sector</option>
                  {SECTORS.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              <button
                type="button"
                disabled={!form.businessName || !form.businessDescription || !form.sector}
                onClick={() => setStep(2)}
                className="w-full py-3 bg-[#2d6a4f] text-white font-semibold rounded-xl
                  hover:bg-[#1b4332] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Continuar →
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-5">
              <h2 className="font-semibold text-lg">Tu impacto y disponibilidad</h2>

              <div>
                <label className="block text-sm font-medium mb-3">
                  Tipo de impacto (selecciona todos los que apliquen) *
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {([
                    { value: 'environmental', label: 'Ambiental', icon: '🌿' },
                    { value: 'social', label: 'Social', icon: '🤝' },
                    { value: 'economic', label: 'Económico', icon: '💼' },
                  ] as const).map(({ value, label, icon }) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => toggleImpactType(value)}
                      className={`p-4 rounded-xl border-2 text-center transition-colors ${
                        form.impactType.includes(value)
                          ? 'border-[#2d6a4f] bg-[#f0faf4]'
                          : 'border-[#b7e4c7] hover:border-[#40916c]'
                      }`}
                    >
                      <div className="text-2xl mb-1">{icon}</div>
                      <div className="text-xs font-medium">{label}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-3">
                  Disponible para *
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {([
                    { value: 'b2c', label: 'Clientes individuales (B2C)', icon: '🛍️' },
                    { value: 'b2b', label: 'Empresas (B2B)', icon: '🏢' },
                  ] as const).map(({ value, label, icon }) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => toggleAvailability(value)}
                      className={`p-4 rounded-xl border-2 text-left transition-colors ${
                        form.availableFor.includes(value)
                          ? 'border-[#2d6a4f] bg-[#f0faf4]'
                          : 'border-[#b7e4c7] hover:border-[#40916c]'
                      }`}
                    >
                      <div className="text-xl mb-1">{icon}</div>
                      <div className="text-xs font-medium">{label}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1.5">
                  ¿Cuántas personas emplea tu negocio?
                </label>
                <input
                  type="number"
                  min="0"
                  value={form.employees}
                  onChange={(e) => setForm((p) => ({ ...p, employees: e.target.value }))}
                  placeholder="Ej: 5"
                  className="w-full px-4 py-3 border border-[#b7e4c7] rounded-xl text-sm
                    focus:outline-none focus:ring-2 focus:ring-[#40916c] focus:border-transparent"
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex-1 py-3 border-2 border-[#b7e4c7] text-[#2d6a4f] font-medium
                    rounded-xl hover:bg-[#f0faf4] transition-colors"
                >
                  ← Atrás
                </button>
                <button
                  type="button"
                  disabled={form.impactType.length === 0 || form.availableFor.length === 0}
                  onClick={() => setStep(3)}
                  className="flex-1 py-3 bg-[#2d6a4f] text-white font-semibold rounded-xl
                    hover:bg-[#1b4332] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Continuar →
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <form onSubmit={handleSubmit} className="space-y-5">
              <h2 className="font-semibold text-lg">Datos de contacto y presencia web</h2>

              <div>
                <label className="block text-sm font-medium mb-1.5">País *</label>
                <select
                  required
                  value={form.country}
                  onChange={(e) => setForm((p) => ({ ...p, country: e.target.value }))}
                  className="w-full px-4 py-3 border border-[#b7e4c7] rounded-xl text-sm
                    focus:outline-none focus:ring-2 focus:ring-[#40916c] bg-white"
                >
                  <option value="">Selecciona tu país</option>
                  <optgroup label="Latinoamérica">
                    {['Argentina', 'Bolivia', 'Brasil', 'Chile', 'Colombia', 'Costa Rica',
                      'Ecuador', 'El Salvador', 'Guatemala', 'Honduras', 'México',
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
                <label className="block text-sm font-medium mb-1.5">
                  Sitio web (opcional)
                </label>
                <input
                  type="url"
                  value={form.website}
                  onChange={(e) => setForm((p) => ({ ...p, website: e.target.value }))}
                  placeholder="https://tunegocio.com"
                  className="w-full px-4 py-3 border border-[#b7e4c7] rounded-xl text-sm
                    focus:outline-none focus:ring-2 focus:ring-[#40916c] focus:border-transparent
                    placeholder:text-[#a0c0a8]"
                />
              </div>

              <div className="bg-[#f0faf4] border border-[#b7e4c7] rounded-xl p-4 text-sm text-[#5a8a6a]">
                <strong className="text-[#1b4332]">¿Qué pasa ahora?</strong> Nuestro equipo
                revisará tu perfil en las próximas 48 horas. Recibirás un correo cuando esté
                aprobado y visible en el Marketplace.
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="flex-1 py-3 border-2 border-[#b7e4c7] text-[#2d6a4f] font-medium
                    rounded-xl hover:bg-[#f0faf4] transition-colors"
                >
                  ← Atrás
                </button>
                <button
                  type="submit"
                  disabled={loading || !form.country}
                  className="flex-1 py-3 bg-[#2d6a4f] text-white font-semibold rounded-xl
                    hover:bg-[#1b4332] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {loading ? 'Guardando...' : 'Crear mi perfil 🌱'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
