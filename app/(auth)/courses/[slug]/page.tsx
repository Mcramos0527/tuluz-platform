import { redirect, notFound } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import type { Metadata } from 'next'

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params
  const supabase = await createClient()
  const { data } = await supabase
    .from('courses')
    .select('title, description')
    .eq('slug', slug)
    .single()
  return { title: data ? `${data.title} | Tuluz` : 'Curso' }
}

const STATUS_CONFIG: Record<string, { label: string; color: string }> = {
  not_started: { label: 'Sin comenzar', color: 'text-[#5a8a6a]' },
  in_progress: { label: 'En progreso', color: 'text-blue-600' },
  exam_pending: { label: 'Examen superado', color: 'text-orange-600' },
  completed: { label: '✓ Completado', color: 'text-[#2d6a4f]' },
}

export default async function CoursePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect(`/login?redirectTo=/courses/${slug}`)

  const { data: course } = await supabase
    .from('courses')
    .select('*')
    .eq('slug', slug)
    .eq('is_published', true)
    .single()

  if (!course) notFound()

  const { data: modules } = await supabase
    .from('course_modules')
    .select('*')
    .eq('course_id', course.id)
    .order('order_index', { ascending: true })

  // Auto-enroll if not already enrolled
  const { data: enrollment } = await supabase
    .from('enrollments')
    .select('*')
    .eq('user_id', user.id)
    .eq('course_id', course.id)
    .single()

  if (!enrollment) {
    await supabase.from('enrollments').insert({
      user_id: user.id,
      course_id: course.id,
    })
  }

  // Load progress for all modules
  const moduleIds = modules?.map((m) => m.id) ?? []
  const { data: progressList } = moduleIds.length > 0
    ? await supabase
        .from('module_progress')
        .select('*')
        .eq('user_id', user.id)
        .in('module_id', moduleIds)
    : { data: [] }

  const progressMap = new Map(progressList?.map((p) => [p.module_id, p]))

  const completedCount = progressList?.filter((p) => p.status === 'completed').length ?? 0
  const totalModules = modules?.length ?? 0
  const progressPct = totalModules > 0 ? Math.round((completedCount / totalModules) * 100) : 0

  return (
    <div className="min-h-screen bg-[#f8fffe]">
      {/* Course header */}
      <div className="bg-gradient-to-br from-[#1b4332] to-[#2d6a4f] text-white py-14 px-4">
        <div className="mx-auto max-w-4xl">
          <Link
            href="/courses"
            className="inline-flex items-center gap-1 text-[#95d5b2] text-sm mb-5 hover:text-white transition-colors"
          >
            ← Todos los cursos
          </Link>
          <h1 className="text-3xl font-bold mb-3">{course.title}</h1>
          {course.description && (
            <p className="text-[#b7e4c7] max-w-2xl">{course.description}</p>
          )}

          {/* Progress bar */}
          <div className="mt-6">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-[#95d5b2]">Tu progreso</span>
              <span className="text-white font-semibold">
                {completedCount}/{totalModules} módulos
              </span>
            </div>
            <div className="h-2.5 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#95d5b2] rounded-full transition-all duration-500"
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Modules list */}
      <div className="mx-auto max-w-4xl px-4 py-10">
        <h2 className="font-semibold text-lg mb-5">Módulos del curso</h2>

        {modules && modules.length > 0 ? (
          <div className="space-y-3">
            {modules.map((module, index) => {
              const progress = progressMap.get(module.id)
              const status = progress?.status ?? 'not_started'
              const statusCfg = STATUS_CONFIG[status]
              const isCompleted = status === 'completed'
              const isLocked = index > 0 && !progressMap.get(modules[index - 1].id)

              return (
                <div
                  key={module.id}
                  className={`bg-white border rounded-2xl p-5 transition-all ${
                    isLocked
                      ? 'border-[#e5f5eb] opacity-60'
                      : 'border-[#b7e4c7] hover:border-[#40916c]'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    {/* Module number / status icon */}
                    <div className={`w-10 h-10 flex-shrink-0 rounded-xl flex items-center justify-center
                      font-bold text-sm ${
                        isCompleted
                          ? 'bg-[#2d6a4f] text-white'
                          : isLocked
                          ? 'bg-[#f0faf4] text-[#a0c0a8]'
                          : 'bg-[#d8f3dc] text-[#1b4332]'
                      }`}
                    >
                      {isCompleted ? '✓' : index + 1}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-medium text-[#1b4332] truncate">{module.title}</h3>
                        {module.content_type && (
                          <span className="text-xs text-[#5a8a6a]">
                            {module.content_type === 'video' && '🎥'}
                            {module.content_type === 'text' && '📄'}
                            {module.content_type === 'mixed' && '🎓'}
                          </span>
                        )}
                      </div>
                      {module.deliverable_type && (
                        <p className="text-xs text-[#5a8a6a] mt-0.5">
                          Genera: {module.deliverable_type.replace(/_/g, ' ')}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center gap-4 flex-shrink-0">
                      <span className={`text-xs font-medium ${statusCfg.color}`}>
                        {statusCfg.label}
                      </span>
                      {!isLocked && (
                        <Link
                          href={`/courses/${slug}/modules/${module.id}`}
                          className="px-4 py-2 bg-[#2d6a4f] text-white text-sm font-medium
                            rounded-lg hover:bg-[#1b4332] transition-colors"
                        >
                          {isCompleted ? 'Repasar' : status === 'in_progress' ? 'Continuar' : 'Empezar'}
                        </Link>
                      )}
                      {isLocked && (
                        <span className="text-xs text-[#a0c0a8]">🔒 Bloqueado</span>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <p className="text-[#5a8a6a] text-center py-10">
            Este curso aún no tiene módulos publicados.
          </p>
        )}
      </div>
    </div>
  )
}
