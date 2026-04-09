import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'
import { createClient } from '@/lib/supabase/server'
import { buildDeliverableSystemPrompt } from '@/lib/ai/prompts'
import {
  buildEntrepreneurContextForAI,
  mergeDeliverable,
  extractUserResponses,
} from '@/lib/ai/context'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

export async function POST(request: NextRequest) {
  const supabase = await createClient()

  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  const body = await request.json() as { moduleId: string }
  const { moduleId } = body

  if (!moduleId) {
    return NextResponse.json({ error: 'Parámetros inválidos' }, { status: 400 })
  }

  // Load module
  const { data: module, error: moduleError } = await supabase
    .from('course_modules')
    .select('*')
    .eq('id', moduleId)
    .single()

  if (moduleError || !module) {
    return NextResponse.json({ error: 'Módulo no encontrado' }, { status: 404 })
  }

  if (!module.deliverable_type) {
    return NextResponse.json(
      { error: 'Este módulo no tiene un entregable configurado' },
      { status: 400 }
    )
  }

  // Load entrepreneur profile
  const { data: entrepreneurProfile } = await supabase
    .from('entrepreneur_profiles')
    .select('*')
    .eq('user_id', user.id)
    .single()

  if (!entrepreneurProfile) {
    return NextResponse.json(
      { error: 'Perfil de emprendedora no encontrado' },
      { status: 404 }
    )
  }

  // Load module progress for conversation history
  const { data: rawProgress } = await supabase
    .from('module_progress')
    .select('exam_conversation, status')
    .eq('user_id', user.id)
    .eq('module_id', moduleId)
    .single()
  const progress = rawProgress as unknown as { exam_conversation: Array<{ role: string; content: string }>; status: string } | null

  if (!progress || progress.status === 'not_started') {
    return NextResponse.json(
      { error: 'Debes completar el examen antes de generar el entregable' },
      { status: 400 }
    )
  }

  const entrepreneurContext = buildEntrepreneurContextForAI(entrepreneurProfile)
  const moduleResponses = extractUserResponses(
    progress.exam_conversation ?? []
  )

  const systemPrompt = buildDeliverableSystemPrompt(
    entrepreneurContext,
    moduleResponses,
    module.deliverable_type,
    module.deliverable_description,
    entrepreneurProfile.ai_context?.deliverables ?? {}
  )

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [{ role: 'system', content: systemPrompt }],
      temperature: 0.6,
      max_tokens: 2000,
    })

    const deliverableContent = completion.choices[0]?.message?.content ?? ''

    if (!deliverableContent) {
      return NextResponse.json(
        { error: 'No se pudo generar el entregable. Por favor intenta de nuevo.' },
        { status: 500 }
      )
    }

    // Save deliverable to module_progress
    const deliverableRecord = {
      content: deliverableContent,
      generated_at: new Date().toISOString(),
      module_id: moduleId,
      deliverable_type: module.deliverable_type,
    }

    await supabase.from('module_progress').update({
      status: 'completed',
      deliverable: deliverableRecord as unknown as never,
      deliverable_generated_at: new Date().toISOString(),
    })
    .eq('user_id', user.id)
    .eq('module_id', moduleId)

    // Update cumulative ai_context on entrepreneur profile
    const updatedContext = mergeDeliverable(
      entrepreneurProfile.ai_context ?? {},
      moduleId,
      module.deliverable_type,
      deliverableContent
    )

    await supabase
      .from('entrepreneur_profiles')
      .update({ ai_context: updatedContext as unknown as never })
      .eq('user_id', user.id)

    return NextResponse.json({
      deliverable: deliverableRecord,
      message: '¡Entregable generado exitosamente!',
    })
  } catch {
    return NextResponse.json(
      { error: 'Error al generar el entregable. Por favor intenta de nuevo.' },
      { status: 500 }
    )
  }
}
