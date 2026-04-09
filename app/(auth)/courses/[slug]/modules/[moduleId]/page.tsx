import { redirect, notFound } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { DeliverableCard } from '@/components/course/DeliverableCard'
import { ModuleContent } from '@/components/course/ModuleContent'
import type { CourseModule, ModuleProgress, GeneratedDeliverable } from '@/types/database'
import type { Metadata } from 'next'

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string; moduleId: string }> }
): Promise<Metadata> {
  const { moduleId } = await params
  const supabase = await createClient()
  const { data } = await supabase
    .from('course_modules')
    .select('title')
    .eq('id', moduleId)
    .single()
  const row = data as unknown as { title: string } | null
  return { title: row ? `${row.title} | Tuluz` : 'Módulo' }
}

export default async function ModulePage({
  params,
}: {
  params: Promise<{ slug: string; moduleId: string }>
}) {
  const { slug, moduleId } = await params
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect(`/login?redirectTo=/courses/${slug}/modules/${moduleId}`)

  const { data: rawModule } = await supabase
    .from('course_modules')
    .select('*, courses(title, slug)')
    .eq('id', moduleId)
    .single()

  if (!rawModule) notFound()
  const module = rawModule as unknown as CourseModule & { courses: { title: string; slug: string } }

  const { data: rawProgress } = await supabase
    .from('module_progress')
    .select('*')
    .eq('user_id', user.id)
    .eq('module_id', moduleId)
    .single()
  const progress = rawProgress as unknown as ModuleProgress | null

  // Auto-create progress record if not exists
  if (!progress) {
    await supabase.from('module_progress').insert({
      user_id: user.id,
      module_id: moduleId,
      status: 'in_progress',
      exam_conversation: [],
    })
  }

  const isCompleted = progress?.status === 'completed'
  const examPassed = progress?.status === 'exam_pending' || isCompleted

  return (
    <div className="min-h-screen bg-[#f8fffe]">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-[#b7e4c7] px-4 py-3">
        <div className="mx-auto max-w-4xl flex items-center gap-2 text-sm text-[#5a8a6a]">
          <Link href="/courses" className="hover:text-[#1b4332]">Cursos</Link>
          <span>›</span>
          <Link href={`/courses/${slug}`} className="hover:text-[#1b4332]">
            {(module.courses as { title?: string })?.title}
          </Link>
          <span>›</span>
          <span className="text-[#1b4332] font-medium">{module.title}</span>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-8 space-y-8">
        {/* Module header */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#1b4332]">{module.title}</h1>
          {module.deliverable_type && (
            <p className="text-[#5a8a6a] mt-2 text-sm">
              Al completar este módulo generarás:{' '}
              <span className="font-medium text-[#2d6a4f]">
                {module.deliverable_type.replace(/_/g, ' ')}
              </span>
            </p>
          )}
        </div>

        {/* Module content */}
        <ModuleContent module={module} />

        {/* Status banner */}
        {isCompleted ? (
          <div className="bg-[#d8f3dc] border border-[#95d5b2] rounded-2xl p-5 flex items-center gap-4">
            <span className="text-3xl">✅</span>
            <div>
              <p className="font-semibold text-[#1b4332]">¡Módulo completado!</p>
              <p className="text-sm text-[#2d6a4f]">
                Has superado el examen y generado tu entregable.
              </p>
            </div>
          </div>
        ) : examPassed ? (
          <div className="bg-orange-50 border border-orange-200 rounded-2xl p-5 flex items-center justify-between gap-4">
            <div>
              <p className="font-semibold text-orange-800">¡Examen superado!</p>
              <p className="text-sm text-orange-600">
                Ahora puedes generar tu entregable con IA.
              </p>
            </div>
            <Link
              href={`/courses/${slug}/modules/${moduleId}/exam`}
              className="flex-shrink-0 px-4 py-2 bg-orange-500 text-white font-medium
                rounded-xl hover:bg-orange-600 transition-colors text-sm"
            >
              Generar entregable →
            </Link>
          </div>
        ) : (
          <div className="bg-white border border-[#b7e4c7] rounded-2xl p-6 text-center">
            <p className="text-4xl mb-3">🤖</p>
            <h3 className="font-semibold text-lg mb-2">
              ¿Lista para el examen con IA?
            </h3>
            <p className="text-[#5a8a6a] text-sm mb-5 max-w-md mx-auto">
              Cuando hayas revisado el contenido del módulo, inicia el examen con tu
              mentora de IA. Te hará preguntas específicas sobre tu negocio y,
              al superarlo, generará automáticamente un entregable para tu MVP.
            </p>
            <Link
              href={`/courses/${slug}/modules/${moduleId}/exam`}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#2d6a4f] text-white
                font-semibold rounded-xl hover:bg-[#1b4332] transition-colors"
            >
              Iniciar examen con IA →
            </Link>
          </div>
        )}

        {/* Deliverable if completed */}
        {isCompleted && progress?.deliverable && (
          <DeliverableCard deliverable={progress.deliverable as GeneratedDeliverable} />
        )}
      </div>
    </div>
  )
}
