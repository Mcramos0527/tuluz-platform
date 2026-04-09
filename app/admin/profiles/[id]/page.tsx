import { redirect, notFound } from 'next/navigation'
import Link from 'next/link'
import { createClient, createServiceClient } from '@/lib/supabase/server'
import { sendProfileApprovedEmail } from '@/lib/resend/emails'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Revisar Perfil | Admin Tuluz' }

export default async function AdminProfileReviewPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: adminProfile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (adminProfile?.role !== 'admin') redirect('/dashboard')

  const { data: ep } = await supabase
    .from('entrepreneur_profiles')
    .select('*, profiles(full_name, email, country)')
    .eq('id', id)
    .single()

  if (!ep) notFound()

  return (
    <div className="min-h-screen bg-[#f8fffe]">
      <div className="bg-[#1b4332] text-white px-4 py-4">
        <div className="mx-auto max-w-4xl flex items-center gap-3">
          <Link href="/admin" className="text-[#95d5b2] text-sm hover:text-white">
            ← Admin
          </Link>
          <span className="text-[#5a8a6a]">/</span>
          <span className="text-sm">Revisar Perfil</span>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-8">
        <div className="bg-white border border-[#b7e4c7] rounded-2xl overflow-hidden mb-6">
          <div className="border-b border-[#f0faf4] px-6 py-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h1 className="text-xl font-bold">{ep.business_name}</h1>
                <p className="text-sm text-[#5a8a6a] mt-1">
                  {(ep.profiles as { full_name?: string })?.full_name} ·{' '}
                  {(ep.profiles as { email?: string })?.email}
                </p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                ep.is_published
                  ? 'bg-[#d8f3dc] text-[#1b4332]'
                  : 'bg-orange-50 text-orange-700'
              }`}>
                {ep.is_published ? '✓ Publicado' : 'Pendiente de revisión'}
              </span>
            </div>
          </div>

          <div className="p-6 space-y-5">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-[#5a8a6a] uppercase tracking-wider mb-1">Sector</p>
                <p className="font-medium">{ep.sector ?? '—'}</p>
              </div>
              <div>
                <p className="text-xs text-[#5a8a6a] uppercase tracking-wider mb-1">País</p>
                <p className="font-medium">{ep.country ?? '—'}</p>
              </div>
              <div>
                <p className="text-xs text-[#5a8a6a] uppercase tracking-wider mb-1">Disponible para</p>
                <p className="font-medium">{ep.available_for?.join(', ').toUpperCase() ?? '—'}</p>
              </div>
              <div>
                <p className="text-xs text-[#5a8a6a] uppercase tracking-wider mb-1">Tipo de impacto</p>
                <p className="font-medium">{ep.impact_type?.join(', ') ?? '—'}</p>
              </div>
            </div>

            <div>
              <p className="text-xs text-[#5a8a6a] uppercase tracking-wider mb-2">Descripción del negocio</p>
              <p className="text-sm text-[#1b4332] leading-relaxed bg-[#f8fffe] border border-[#e5f5eb] rounded-xl p-4">
                {ep.business_description ?? '—'}
              </p>
            </div>

            {ep.website && (
              <div>
                <p className="text-xs text-[#5a8a6a] uppercase tracking-wider mb-1">Sitio web</p>
                <a href={ep.website} target="_blank" rel="noopener noreferrer"
                  className="text-sm text-[#2d6a4f] hover:underline">
                  {ep.website} ↗
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Action buttons */}
        {!ep.is_published && (
          <div className="flex gap-4">
            <form action={async () => {
              'use server'
              const serviceClient = await createServiceClient()

              await serviceClient
                .from('entrepreneur_profiles')
                .update({
                  is_published: true,
                  approved_at: new Date().toISOString(),
                })
                .eq('id', id)

              const profile = ep.profiles as { full_name?: string; email?: string }
              if (profile?.email && profile?.full_name) {
                await sendProfileApprovedEmail(profile.email, profile.full_name)
              }

              redirect('/admin')
            }}>
              <button type="submit"
                className="px-6 py-3 bg-[#2d6a4f] text-white font-semibold rounded-xl
                  hover:bg-[#1b4332] transition-colors">
                ✓ Aprobar y publicar
              </button>
            </form>

            <Link href="/admin"
              className="px-6 py-3 border border-[#b7e4c7] text-[#5a8a6a] font-medium rounded-xl
                hover:bg-[#f0faf4] transition-colors">
              Volver sin aprobar
            </Link>
          </div>
        )}

        {ep.is_published && (
          <div className="p-4 bg-[#d8f3dc] border border-[#95d5b2] rounded-xl text-sm text-[#1b4332]">
            ✓ Este perfil está publicado en el Marketplace desde{' '}
            {ep.approved_at
              ? new Date(ep.approved_at).toLocaleDateString('es-ES')
              : 'fecha desconocida'}.
          </div>
        )}
      </div>
    </div>
  )
}
