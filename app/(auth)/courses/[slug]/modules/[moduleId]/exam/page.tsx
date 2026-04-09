import { redirect, notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { AIExamChat } from '@/components/course/AIExamChat'
import type { CourseModule, ModuleProgress } from '@/types/database'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Examen con IA | Tuluz' }

export default async function ExamPage({
  params,
}: {
  params: Promise<{ slug: string; moduleId: string }>
}) {
  const { slug, moduleId } = await params
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect(`/login?redirectTo=/courses/${slug}/modules/${moduleId}/exam`)

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

  const { data: entrepreneurProfile } = await supabase
    .from('entrepreneur_profiles')
    .select('business_name, sector, country')
    .eq('user_id', user.id)
    .single()

  return (
    <div className="min-h-screen bg-[#f8fffe] flex flex-col">
      <AIExamChat
        moduleId={moduleId}
        moduleTitle={module.title}
        courseSlug={slug}
        deliverableType={module.deliverable_type}
        initialConversation={progress?.exam_conversation ?? []}
        initialStatus={progress?.status ?? 'in_progress'}
        existingDeliverable={progress?.deliverable ?? null}
        entrepreneurName={(entrepreneurProfile as { business_name?: string } | null)?.business_name ?? undefined}
      />
    </div>
  )
}
