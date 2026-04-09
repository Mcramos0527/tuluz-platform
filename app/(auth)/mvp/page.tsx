import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { MVPDocument } from '@/components/mvp/MVPDocument'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Mi MVP | Tuluz' }

export default async function MVPPage() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login?redirectTo=/mvp')

  const { data: entrepreneurProfile } = await supabase
    .from('entrepreneur_profiles')
    .select('*')
    .eq('user_id', user.id)
    .single()

  if (!entrepreneurProfile) {
    return (
      <div className="min-h-screen bg-[#f8fffe] flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <p className="text-4xl mb-4">📋</p>
          <h2 className="text-xl font-semibold mb-3">Tu MVP está vacío</h2>
          <p className="text-[#5a8a6a] mb-6">
            Primero completa tu perfil de emprendedora y luego inscríbete en un curso.
            La IA generará cada pieza de tu MVP al completar los módulos.
          </p>
          <Link href="/onboarding"
            className="inline-block px-6 py-3 bg-[#2d6a4f] text-white font-medium rounded-xl
              hover:bg-[#1b4332] transition-colors">
            Crear perfil →
          </Link>
        </div>
      </div>
    )
  }

  const deliverables = entrepreneurProfile.ai_context?.deliverables ?? {}
  const hasDeliverables = Object.keys(deliverables).length > 0

  const { data: certifications } = await supabase
    .from('certifications')
    .select('*')
    .eq('user_id', user.id)
    .order('issued_at', { ascending: false })

  return (
    <div className="min-h-screen bg-[#f8fffe]">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#1b4332] to-[#2d6a4f] text-white py-12 px-4">
        <div className="mx-auto max-w-4xl">
          <Link href="/dashboard" className="text-[#95d5b2] text-sm hover:text-white mb-4 inline-block">
            ← Volver al panel
          </Link>
          <h1 className="text-3xl font-bold mb-1">Mi MVP Acumulado</h1>
          <p className="text-[#b7e4c7]">{entrepreneurProfile.business_name}</p>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-8">
        {hasDeliverables ? (
          <MVPDocument
            businessName={entrepreneurProfile.business_name}
            businessDescription={entrepreneurProfile.business_description}
            sector={entrepreneurProfile.sector}
            country={entrepreneurProfile.country}
            deliverables={deliverables}
            certifications={certifications ?? []}
          />
        ) : (
          <div className="text-center py-16 bg-white border border-[#b7e4c7] rounded-2xl">
            <p className="text-4xl mb-4">🤖</p>
            <h3 className="text-xl font-semibold mb-3">Aún no hay entregables</h3>
            <p className="text-[#5a8a6a] mb-6 max-w-sm mx-auto">
              Completa los módulos del curso para que la IA genere cada pieza de tu MVP.
              Aquí se irán acumulando todos tus entregables.
            </p>
            <Link
              href="/courses"
              className="inline-block px-6 py-3 bg-[#2d6a4f] text-white font-medium
                rounded-xl hover:bg-[#1b4332] transition-colors"
            >
              Ir a mis cursos →
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
