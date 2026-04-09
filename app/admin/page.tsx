import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Admin | Tuluz' }

export default async function AdminPage() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (profile?.role !== 'admin') redirect('/dashboard')

  // Stats
  const [
    { count: totalProfiles },
    { count: pendingProfiles },
    { count: totalCourses },
    { count: totalCertifications },
  ] = await Promise.all([
    supabase.from('profiles').select('*', { count: 'exact', head: true }),
    supabase.from('entrepreneur_profiles').select('*', { count: 'exact', head: true }).eq('is_published', false),
    supabase.from('courses').select('*', { count: 'exact', head: true }),
    supabase.from('certifications').select('*', { count: 'exact', head: true }),
  ])

  // Recent pending profiles
  const { data: pendingEntrepreneurs } = await supabase
    .from('entrepreneur_profiles')
    .select('*, profiles(full_name, email)')
    .eq('is_published', false)
    .order('created_at', { ascending: false })
    .limit(10)

  return (
    <div className="min-h-screen bg-[#f8fffe]">
      {/* Header */}
      <div className="bg-[#1b4332] text-white px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#40916c] rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">T</span>
          </div>
          <span className="font-bold">Tuluz Admin</span>
        </div>
        <form action="/auth/signout" method="post">
          <button type="submit" className="text-sm text-[#95d5b2] hover:text-white">Salir</button>
        </form>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-8">
        <h1 className="text-2xl font-bold mb-8">Panel de Administración</h1>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { label: 'Usuarios totales', value: totalProfiles ?? 0, icon: '👥' },
            { label: 'Perfiles pendientes', value: pendingProfiles ?? 0, icon: '⏳', alert: (pendingProfiles ?? 0) > 0 },
            { label: 'Cursos', value: totalCourses ?? 0, icon: '📚' },
            { label: 'Certificaciones', value: totalCertifications ?? 0, icon: '🏅' },
          ].map(({ label, value, icon, alert }) => (
            <div key={label}
              className={`bg-white border rounded-2xl p-5 ${alert ? 'border-orange-300' : 'border-[#b7e4c7]'}`}>
              <div className="text-2xl mb-2">{icon}</div>
              <div className={`text-3xl font-bold ${alert ? 'text-orange-600' : 'text-[#1b4332]'}`}>
                {value}
              </div>
              <div className="text-xs text-[#5a8a6a] mt-1">{label}</div>
            </div>
          ))}
        </div>

        {/* Nav links */}
        <div className="grid md:grid-cols-3 gap-4 mb-10">
          {[
            { href: '/admin/profiles', label: 'Gestionar Perfiles', icon: '👥', desc: 'Aprobar perfiles de emprendedoras' },
            { href: '/admin/courses', label: 'Gestionar Cursos', icon: '📚', desc: 'Crear y editar cursos y módulos' },
            { href: '/admin/certifications', label: 'Emitir Insignias', icon: '🏅', desc: 'Otorgar certificaciones a emprendedoras' },
          ].map(({ href, label, icon, desc }) => (
            <Link key={href} href={href}
              className="bg-white border border-[#b7e4c7] rounded-2xl p-5 hover:border-[#40916c]
                hover:shadow-sm transition-all group">
              <span className="text-3xl block mb-2">{icon}</span>
              <h3 className="font-semibold group-hover:text-[#2d6a4f] transition-colors">{label}</h3>
              <p className="text-sm text-[#5a8a6a] mt-1">{desc}</p>
            </Link>
          ))}
        </div>

        {/* Pending profiles */}
        {pendingEntrepreneurs && pendingEntrepreneurs.length > 0 && (
          <div className="bg-white border border-[#b7e4c7] rounded-2xl overflow-hidden">
            <div className="border-b border-[#f0faf4] px-6 py-4 flex items-center justify-between">
              <h2 className="font-semibold">Perfiles pendientes de aprobación</h2>
              <span className="px-2.5 py-1 bg-orange-50 text-orange-700 text-xs rounded-full font-medium">
                {pendingEntrepreneurs.length} pendientes
              </span>
            </div>
            <div className="divide-y divide-[#f0faf4]">
              {pendingEntrepreneurs.map((ep) => (
                <div key={ep.id} className="px-6 py-4 flex items-center justify-between gap-4">
                  <div>
                    <p className="font-medium text-sm">{ep.business_name}</p>
                    <p className="text-xs text-[#5a8a6a]">
                      {(ep.profiles as { full_name?: string; email?: string })?.full_name} ·{' '}
                      {ep.country} · {ep.sector}
                    </p>
                  </div>
                  <Link
                    href={`/admin/profiles/${ep.id}`}
                    className="flex-shrink-0 px-4 py-2 bg-[#2d6a4f] text-white text-sm
                      font-medium rounded-lg hover:bg-[#1b4332] transition-colors"
                  >
                    Revisar →
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
