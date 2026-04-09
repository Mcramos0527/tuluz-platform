import { notFound } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import type { Metadata } from 'next'

export async function generateMetadata(
  { params }: { params: Promise<{ id: string }> }
): Promise<Metadata> {
  const { id } = await params
  const supabase = await createClient()
  const { data } = await supabase
    .from('entrepreneur_profiles')
    .select('business_name, business_description')
    .eq('id', id)
    .eq('is_published', true)
    .single()

  return {
    title: data ? `${data.business_name} | Marketplace Tuluz` : 'Perfil no encontrado',
    description: data?.business_description ?? undefined,
  }
}

const IMPACT_LABELS: Record<string, string> = {
  environmental: '🌿 Impacto Ambiental',
  social: '🤝 Impacto Social',
  economic: '💼 Impacto Económico',
}

export default async function EntrepreneurProfilePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createClient()

  const { data: ep } = await supabase
    .from('entrepreneur_profiles')
    .select('*, profiles(full_name, avatar_url, email)')
    .eq('id', id)
    .eq('is_published', true)
    .single()

  if (!ep) notFound()

  const { data: certifications } = await supabase
    .from('certifications')
    .select('*')
    .eq('user_id', ep.user_id)
    .order('issued_at', { ascending: false })

  const deliverables = ep.ai_context?.deliverables ?? {}
  const hasDeliverables = Object.keys(deliverables).length > 0

  const initials = ep.business_name
    .split(' ')
    .slice(0, 2)
    .map((w: string) => w[0])
    .join('')
    .toUpperCase()

  return (
    <div className="min-h-screen bg-[#f8fffe]">
      {/* Hero banner */}
      <div className="bg-gradient-to-br from-[#1b4332] to-[#2d6a4f] h-40" />

      <div className="mx-auto max-w-4xl px-4 pb-16">
        {/* Profile header */}
        <div className="-mt-20 mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-end gap-5">
            <div className="w-28 h-28 rounded-2xl bg-gradient-to-br from-[#40916c] to-[#95d5b2]
              flex items-center justify-center text-white font-bold text-3xl
              border-4 border-white shadow-lg flex-shrink-0">
              {ep.profiles?.avatar_url ? (
                <img
                  src={ep.profiles.avatar_url}
                  alt={ep.business_name}
                  className="w-full h-full object-cover rounded-2xl"
                />
              ) : (
                initials
              )}
            </div>
            <div className="pb-2">
              <h1 className="text-2xl sm:text-3xl font-bold text-[#1b4332]">
                {ep.business_name}
              </h1>
              <p className="text-[#5a8a6a] mt-1">
                {ep.country}{ep.sector ? ` · ${ep.sector}` : ''}
              </p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="md:col-span-2 space-y-8">
            {/* About */}
            <div className="bg-white border border-[#b7e4c7] rounded-2xl p-6">
              <h2 className="font-semibold text-lg mb-4">Sobre el negocio</h2>
              <p className="text-[#5a8a6a] leading-relaxed">{ep.business_description}</p>

              {ep.website && (
                <a
                  href={ep.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 mt-4 text-sm text-[#2d6a4f] hover:underline"
                >
                  🌐 Visitar sitio web
                </a>
              )}
            </div>

            {/* MVP deliverables */}
            {hasDeliverables && (
              <div className="bg-white border border-[#b7e4c7] rounded-2xl p-6">
                <h2 className="font-semibold text-lg mb-4">Plan de Negocio Certificado</h2>
                <p className="text-sm text-[#5a8a6a] mb-5">
                  Generado y validado durante el proceso de formación Tuluz
                </p>
                <div className="space-y-4">
                  {Object.entries(deliverables).map(([type, deliverable]) => {
                    const d = deliverable as { content?: string }
                    return (
                      <div key={type} className="border border-[#d8f3dc] rounded-xl p-4">
                        <h3 className="font-medium text-sm text-[#1b4332] mb-2">
                          📄 {type.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
                        </h3>
                        <p className="text-xs text-[#5a8a6a] line-clamp-3 whitespace-pre-line">
                          {d.content}
                        </p>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Impact metrics */}
            {ep.impact_metrics && Object.keys(ep.impact_metrics).length > 0 && (
              <div className="bg-white border border-[#b7e4c7] rounded-2xl p-6">
                <h2 className="font-semibold text-lg mb-4">Métricas de Impacto</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {ep.impact_metrics.employees != null && (
                    <div className="text-center p-4 bg-[#f0faf4] rounded-xl">
                      <p className="text-2xl font-bold text-[#2d6a4f]">
                        {ep.impact_metrics.employees}
                      </p>
                      <p className="text-xs text-[#5a8a6a] mt-1">Empleos generados</p>
                    </div>
                  )}
                  {ep.impact_metrics.co2_reduced != null && (
                    <div className="text-center p-4 bg-[#f0faf4] rounded-xl">
                      <p className="text-2xl font-bold text-[#2d6a4f]">
                        {ep.impact_metrics.co2_reduced}t
                      </p>
                      <p className="text-xs text-[#5a8a6a] mt-1">CO₂ reducido</p>
                    </div>
                  )}
                  {ep.impact_metrics.communities != null && (
                    <div className="text-center p-4 bg-[#f0faf4] rounded-xl">
                      <p className="text-2xl font-bold text-[#2d6a4f]">
                        {ep.impact_metrics.communities}
                      </p>
                      <p className="text-xs text-[#5a8a6a] mt-1">Comunidades</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* Contact CTA */}
            <div className="bg-gradient-to-br from-[#1b4332] to-[#2d6a4f] text-white rounded-2xl p-5">
              <h3 className="font-semibold mb-2">¿Quieres contactar con {ep.business_name}?</h3>
              <p className="text-[#b7e4c7] text-sm mb-4">
                Inicia sesión para enviar un mensaje o solicitar colaboración.
              </p>
              <Link
                href="/login"
                className="block w-full text-center py-2.5 bg-white text-[#1b4332]
                  font-semibold rounded-xl hover:bg-[#d8f3dc] transition-colors text-sm"
              >
                Contactar →
              </Link>
            </div>

            {/* Availability */}
            <div className="bg-white border border-[#b7e4c7] rounded-2xl p-5">
              <h3 className="font-semibold mb-3 text-sm">Disponibilidad</h3>
              <div className="flex flex-wrap gap-2">
                {ep.available_for?.includes('b2c') && (
                  <span className="px-3 py-1.5 bg-[#d8f3dc] text-[#1b4332] text-sm rounded-lg font-medium">
                    🛍️ B2C
                  </span>
                )}
                {ep.available_for?.includes('b2b') && (
                  <span className="px-3 py-1.5 bg-[#1b4332] text-white text-sm rounded-lg font-medium">
                    🏢 B2B
                  </span>
                )}
              </div>
            </div>

            {/* Impact types */}
            {ep.impact_type && ep.impact_type.length > 0 && (
              <div className="bg-white border border-[#b7e4c7] rounded-2xl p-5">
                <h3 className="font-semibold mb-3 text-sm">Tipo de impacto</h3>
                <div className="space-y-2">
                  {ep.impact_type.map((type: string) => (
                    <div key={type} className="flex items-center gap-2 text-sm text-[#5a8a6a]">
                      {IMPACT_LABELS[type] ?? type}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Badges */}
            {certifications && certifications.length > 0 && (
              <div className="bg-white border border-[#b7e4c7] rounded-2xl p-5">
                <h3 className="font-semibold mb-3 text-sm">Certificaciones Tuluz</h3>
                <div className="space-y-2">
                  {certifications.map((cert) => (
                    <div key={cert.id} className="flex items-center gap-2">
                      {cert.badge_url && (
                        <img src={cert.badge_url} alt={cert.badge_type} className="w-8 h-8 rounded" />
                      )}
                      <div>
                        <p className="text-xs font-medium">{cert.badge_type}</p>
                        <a
                          href={cert.verification_url ?? '#'}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-[#2d6a4f] hover:underline"
                        >
                          Verificar ↗
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
