import { notFound } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Verificar Insignia | Tuluz' }

export default async function VerifyBadgePage({
  params,
}: {
  params: Promise<{ badge: string }>
}) {
  const { badge } = await params
  const supabase = await createClient()

  const { data: certification } = await supabase
    .from('certifications')
    .select('*, profiles(full_name, email)')
    .eq('id', badge)
    .single()

  if (!certification) notFound()

  const issuedDate = new Date(certification.issued_at).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  const badgeLabels: Record<string, string> = {
    course_completion: 'Certificado de Curso',
    conscious_entrepreneur: 'Emprendedora Consciente',
    verified_impact: 'Impacto Verificado',
  }

  const label = badgeLabels[certification.badge_type] ?? certification.badge_type
  const recipientName = (certification.profiles as { full_name?: string })?.full_name ?? 'Emprendedora'

  return (
    <div className="min-h-screen bg-[#f8fffe] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-lg text-center">
        {/* Valid badge */}
        <div className="bg-white border-2 border-[#95d5b2] rounded-3xl p-10 shadow-lg">
          {/* Tuluz seal */}
          <div className="w-20 h-20 bg-gradient-to-br from-[#2d6a4f] to-[#40916c] rounded-full
            flex items-center justify-center mx-auto mb-6">
            <span className="text-white text-3xl font-bold">T</span>
          </div>

          <div className="inline-block mb-3 px-3 py-1 bg-[#d8f3dc] text-[#1b4332] text-xs
            font-semibold rounded-full">
            ✓ Insignia verificada y auténtica
          </div>

          <h1 className="text-2xl font-bold text-[#1b4332] mt-2">{label}</h1>

          {certification.badge_url && (
            <img
              src={certification.badge_url}
              alt={label}
              className="w-64 mx-auto my-6 rounded-xl shadow-sm"
            />
          )}

          <p className="text-[#5a8a6a] mb-1">Esta insignia fue otorgada a</p>
          <p className="text-xl font-semibold text-[#1b4332]">{recipientName}</p>
          <p className="text-[#5a8a6a] text-sm mt-2">el {issuedDate}</p>

          <div className="mt-6 pt-6 border-t border-[#f0faf4]">
            <p className="text-xs text-[#5a8a6a]">
              Emitido por la Asociación Tuluz · ID: {badge}
            </p>
          </div>
        </div>

        <p className="mt-8 text-sm text-[#5a8a6a]">
          ¿Quieres obtener tu propia certificación?{' '}
          <Link href="/register" className="text-[#2d6a4f] font-medium hover:underline">
            Únete a Tuluz
          </Link>
        </p>
      </div>
    </div>
  )
}
