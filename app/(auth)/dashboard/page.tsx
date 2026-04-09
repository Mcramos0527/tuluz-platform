import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Mi Panel' }

export default async function DashboardPage() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  if (!profile) redirect('/login')

  const { data: entrepreneurProfile } = profile.role === 'member'
    ? await supabase
        .from('entrepreneur_profiles')
        .select('*')
        .eq('user_id', user.id)
        .single()
    : { data: null }

  const { data: enrollments } = profile.role === 'member'
    ? await supabase
        .from('enrollments')
        .select('*, courses(*)')
        .eq('user_id', user.id)
    : { data: [] }

  const { data: certifications } = await supabase
    .from('certifications')
    .select('*')
    .eq('user_id', user.id)
    .order('issued_at', { ascending: false })
    .limit(5)

  const firstName = profile.full_name?.split(' ')[0] ?? 'Bienvenida'

  return (
    <div className="min-h-screen bg-[#f8fffe]">
      {/* Top bar */}
      <header className="bg-white border-b border-[#b7e4c7] px-4 py-4">
        <div className="mx-auto max-w-6xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#2d6a4f] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">T</span>
              </div>
              <span className="font-bold text-[#1b4332]">Tuluz</span>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-[#5a8a6a]">{profile.email}</span>
            <form action="/auth/signout" method="post">
              <button type="submit" className="text-sm text-[#5a8a6a] hover:text-[#1b4332]">
                Salir
              </button>
            </form>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-8">
        {/* Welcome */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold">¡Hola, {firstName}! 👋</h1>
          <p className="text-[#5a8a6a] mt-1">
            {profile.role === 'member' && 'Panel de emprendedora'}
            {profile.role === 'corporate' && 'Panel corporativo — ESG'}
            {profile.role === 'subscriber' && 'Panel de suscriptora'}
            {profile.role === 'admin' && 'Panel de administración'}
          </p>
        </div>

        {/* Member / Entrepreneur dashboard */}
        {profile.role === 'member' && (
          <div className="grid md:grid-cols-3 gap-6">
            {/* Profile status */}
            <div className="bg-white border border-[#b7e4c7] rounded-2xl p-6">
              <h3 className="font-semibold mb-3">Mi Perfil</h3>
              {entrepreneurProfile ? (
                <div>
                  <p className="text-sm text-[#5a8a6a] mb-2">{entrepreneurProfile.business_name}</p>
                  <span className={`inline-block px-2.5 py-1 text-xs rounded-full font-medium ${
                    entrepreneurProfile.is_published
                      ? 'bg-[#d8f3dc] text-[#1b4332]'
                      : 'bg-yellow-50 text-yellow-700'
                  }`}>
                    {entrepreneurProfile.is_published ? '✓ Publicado' : '⏳ Pendiente aprobación'}
                  </span>
                  <div className="mt-4 flex gap-2">
                    <Link href="/profile"
                      className="text-xs text-[#2d6a4f] hover:underline">
                      Editar perfil →
                    </Link>
                  </div>
                </div>
              ) : (
                <div>
                  <p className="text-sm text-[#5a8a6a] mb-4">
                    Completa tu perfil de emprendedora para aparecer en el Marketplace.
                  </p>
                  <Link
                    href="/onboarding"
                    className="inline-block px-4 py-2 bg-[#2d6a4f] text-white text-sm
                      font-medium rounded-lg hover:bg-[#1b4332] transition-colors"
                  >
                    Crear perfil →
                  </Link>
                </div>
              )}
            </div>

            {/* Courses */}
            <div className="bg-white border border-[#b7e4c7] rounded-2xl p-6">
              <h3 className="font-semibold mb-3">Mis Cursos</h3>
              {enrollments && enrollments.length > 0 ? (
                <div className="space-y-3">
                  {enrollments.slice(0, 3).map((enrollment) => (
                    <div key={enrollment.id} className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">
                          {(enrollment.courses as { title?: string })?.title ?? 'Curso'}
                        </p>
                        <p className="text-xs text-[#5a8a6a]">
                          {enrollment.completed_at ? '✓ Completado' : 'En progreso'}
                        </p>
                      </div>
                      <Link
                        href={`/courses/${(enrollment.courses as { slug?: string })?.slug}`}
                        className="text-xs text-[#2d6a4f] hover:underline"
                      >
                        Continuar →
                      </Link>
                    </div>
                  ))}
                </div>
              ) : (
                <div>
                  <p className="text-sm text-[#5a8a6a] mb-4">
                    Inscríbete en un curso y construye tu MVP con IA.
                  </p>
                  <Link
                    href="/courses"
                    className="inline-block px-4 py-2 bg-[#2d6a4f] text-white text-sm
                      font-medium rounded-lg hover:bg-[#1b4332] transition-colors"
                  >
                    Ver cursos →
                  </Link>
                </div>
              )}
            </div>

            {/* Certifications */}
            <div className="bg-white border border-[#b7e4c7] rounded-2xl p-6">
              <h3 className="font-semibold mb-3">Mis Insignias</h3>
              {certifications && certifications.length > 0 ? (
                <div className="space-y-2">
                  {certifications.map((cert) => (
                    <div key={cert.id} className="flex items-center gap-2">
                      <span className="text-lg">🏅</span>
                      <div>
                        <p className="text-sm font-medium">{cert.badge_type}</p>
                        <p className="text-xs text-[#5a8a6a]">
                          {new Date(cert.issued_at).toLocaleDateString('es-ES')}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-[#5a8a6a]">
                  Completa cursos para obtener tus primeras insignias certificadas.
                </p>
              )}
            </div>

            {/* MVP link */}
            {entrepreneurProfile && (
              <div className="md:col-span-3 bg-gradient-to-r from-[#1b4332] to-[#2d6a4f]
                text-white rounded-2xl p-6 flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-lg">Mi MVP Acumulado</h3>
                  <p className="text-[#b7e4c7] text-sm mt-1">
                    Visualiza y exporta todos los entregables generados por la IA durante tus cursos.
                  </p>
                </div>
                <Link
                  href="/mvp"
                  className="flex-shrink-0 px-5 py-2.5 bg-white text-[#1b4332] font-semibold
                    rounded-xl hover:bg-[#d8f3dc] transition-colors text-sm"
                >
                  Ver mi MVP →
                </Link>
              </div>
            )}
          </div>
        )}

        {/* Corporate dashboard */}
        {profile.role === 'corporate' && (
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white border border-[#b7e4c7] rounded-2xl p-6">
              <h3 className="font-semibold mb-3">Buscar Proveedoras ESG</h3>
              <p className="text-sm text-[#5a8a6a] mb-4">
                Encuentra emprendedoras certificadas por Tuluz para cumplir tus objetivos de sostenibilidad.
              </p>
              <Link
                href="/marketplace"
                className="inline-block px-4 py-2 bg-[#2d6a4f] text-white text-sm
                  font-medium rounded-lg hover:bg-[#1b4332] transition-colors"
              >
                Ir al Marketplace →
              </Link>
            </div>
            <div className="bg-white border border-[#b7e4c7] rounded-2xl p-6">
              <h3 className="font-semibold mb-3">Dashboard ESG</h3>
              <p className="text-sm text-[#5a8a6a]">
                Próximamente: métricas y reportes de impacto de tu cadena de valor.
              </p>
            </div>
          </div>
        )}

        {/* Subscriber dashboard */}
        {profile.role === 'subscriber' && (
          <div className="bg-white border border-[#b7e4c7] rounded-2xl p-8 text-center max-w-lg mx-auto">
            <p className="text-4xl mb-4">📩</p>
            <h3 className="font-semibold text-lg mb-2">Suscripción activa</h3>
            <p className="text-[#5a8a6a] text-sm mb-6">
              Recibirás el newsletter de Tuluz con las últimas noticias sobre emprendimiento
              consciente y sostenibilidad.
            </p>
            <Link
              href="/marketplace"
              className="inline-block px-5 py-2.5 bg-[#2d6a4f] text-white font-medium
                rounded-xl hover:bg-[#1b4332] transition-colors text-sm"
            >
              Explorar el Marketplace
            </Link>
          </div>
        )}

        {/* Admin dashboard */}
        {profile.role === 'admin' && (
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { href: '/admin/profiles', label: 'Gestionar Perfiles', icon: '👥', desc: 'Aprobar y gestionar perfiles de emprendedoras' },
              { href: '/admin/courses', label: 'Gestionar Cursos', icon: '📚', desc: 'Crear y editar cursos y módulos' },
              { href: '/admin/certifications', label: 'Certificaciones', icon: '🏅', desc: 'Emitir y gestionar insignias' },
            ].map(({ href, label, icon, desc }) => (
              <Link key={href} href={href}
                className="bg-white border border-[#b7e4c7] rounded-2xl p-6 hover:border-[#40916c]
                  transition-colors group">
                <span className="text-3xl block mb-3">{icon}</span>
                <h3 className="font-semibold group-hover:text-[#2d6a4f] transition-colors">{label}</h3>
                <p className="text-sm text-[#5a8a6a] mt-1">{desc}</p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
