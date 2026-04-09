import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Cursos | Tuluz' }

export default async function CoursesPage() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login?redirectTo=/courses')

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  const { data: courses } = await supabase
    .from('courses')
    .select('*')
    .eq('is_published', true)
    .order('order_index', { ascending: true })

  const { data: enrollments } = await supabase
    .from('enrollments')
    .select('course_id, completed_at')
    .eq('user_id', user.id)

  const enrolledCourseIds = new Set(enrollments?.map((e) => e.course_id))
  const completedCourseIds = new Set(
    enrollments?.filter((e) => e.completed_at).map((e) => e.course_id)
  )

  return (
    <div className="min-h-screen bg-[#f8fffe]">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#1b4332] to-[#2d6a4f] text-white py-14 px-4">
        <div className="mx-auto max-w-5xl">
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">Cursos Tuluz</h1>
          <p className="text-[#b7e4c7] text-lg max-w-2xl">
            Construye tu MVP guiada por inteligencia artificial. Cada módulo genera
            automáticamente una pieza de tu plan de negocio.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 py-10">
        {profile?.role === 'subscriber' && (
          <div className="mb-8 p-4 bg-yellow-50 border border-yellow-200 rounded-xl text-yellow-800 text-sm">
            Para acceder a los cursos necesitas actualizar tu cuenta a <strong>Miembro</strong>.{' '}
            <Link href="/register" className="underline font-medium">Actualizar cuenta</Link>
          </div>
        )}

        {courses && courses.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-6">
            {courses.map((course) => {
              const isEnrolled = enrolledCourseIds.has(course.id)
              const isCompleted = completedCourseIds.has(course.id)

              return (
                <div key={course.id}
                  className="bg-white border border-[#b7e4c7] rounded-2xl overflow-hidden hover:shadow-md transition-shadow">
                  {/* Course color bar */}
                  <div className="h-2 bg-gradient-to-r from-[#2d6a4f] to-[#95d5b2]" />

                  <div className="p-6">
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <h2 className="font-semibold text-lg leading-tight">{course.title}</h2>
                      {isCompleted && (
                        <span className="flex-shrink-0 px-2.5 py-1 bg-[#d8f3dc] text-[#1b4332]
                          text-xs rounded-full font-medium">
                          ✓ Completado
                        </span>
                      )}
                      {isEnrolled && !isCompleted && (
                        <span className="flex-shrink-0 px-2.5 py-1 bg-blue-50 text-blue-700
                          text-xs rounded-full font-medium">
                          En progreso
                        </span>
                      )}
                    </div>

                    {course.description && (
                      <p className="text-sm text-[#5a8a6a] leading-relaxed mb-5">
                        {course.description}
                      </p>
                    )}

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs text-[#5a8a6a]">
                        <span>🤖 Con IA integrada</span>
                      </div>
                      {profile?.role === 'member' || profile?.role === 'admin' ? (
                        <Link
                          href={`/courses/${course.slug}`}
                          className="px-4 py-2 bg-[#2d6a4f] text-white text-sm font-medium
                            rounded-lg hover:bg-[#1b4332] transition-colors"
                        >
                          {isEnrolled ? 'Continuar →' : 'Ver curso →'}
                        </Link>
                      ) : (
                        <span className="text-xs text-[#5a8a6a]">
                          Requiere membresía
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-4xl mb-4">📚</p>
            <h3 className="text-xl font-semibold mb-2">Cursos próximamente</h3>
            <p className="text-[#5a8a6a]">
              Estamos preparando el primer curso. ¡Vuelve pronto!
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
