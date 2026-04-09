import { NextRequest } from 'next/server'
import OpenAI from 'openai'
import { createClient } from '@/lib/supabase/server'
import { buildExamSystemPrompt } from '@/lib/ai/prompts'
import { buildEntrepreneurContextForAI, mergeModuleResponses } from '@/lib/ai/context'
import type { ChatMessage } from '@/types/database'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

export async function POST(request: NextRequest) {
  const supabase = await createClient()

  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) {
    return new Response(JSON.stringify({ error: 'No autorizado' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const body = await request.json() as {
    moduleId: string
    message: string
    conversationHistory: ChatMessage[]
  }

  const { moduleId, message, conversationHistory } = body

  if (!moduleId || !message) {
    return new Response(JSON.stringify({ error: 'Parámetros inválidos' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  // Load module info
  const { data: module, error: moduleError } = await supabase
    .from('course_modules')
    .select('*')
    .eq('id', moduleId)
    .single()

  if (moduleError || !module) {
    return new Response(JSON.stringify({ error: 'Módulo no encontrado' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  // Load entrepreneur profile
  const { data: entrepreneurProfile } = await supabase
    .from('entrepreneur_profiles')
    .select('*')
    .eq('user_id', user.id)
    .single()

  if (!entrepreneurProfile) {
    return new Response(
      JSON.stringify({ error: 'Perfil de emprendedora no encontrado. Por favor completa tu perfil primero.' }),
      { status: 404, headers: { 'Content-Type': 'application/json' } }
    )
  }

  const entrepreneurContext = buildEntrepreneurContextForAI(entrepreneurProfile)
  const systemPrompt = buildExamSystemPrompt(
    entrepreneurContext,
    module.title,
    module.content_summary
  )

  // Build message history for OpenAI
  const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [
    { role: 'system', content: systemPrompt },
    ...conversationHistory
      .filter((m) => m.role !== 'system')
      .map((m) => ({
        role: m.role as 'user' | 'assistant',
        content: m.content,
      })),
    { role: 'user', content: message },
  ]

  // Stream the response
  const encoder = new TextEncoder()
  let fullResponse = ''

  const stream = new ReadableStream({
    async start(controller) {
      try {
        const completion = await openai.chat.completions.create({
          model: 'gpt-4o',
          messages,
          stream: true,
          temperature: 0.7,
          max_tokens: 1500,
        })

        for await (const chunk of completion) {
          const delta = chunk.choices[0]?.delta?.content ?? ''
          if (delta) {
            fullResponse += delta
            controller.enqueue(encoder.encode(`data: ${JSON.stringify({ content: delta })}\n\n`))
          }
        }

        // Check if exam was passed
        const examPassed = fullResponse.includes('[EXAM_PASSED]')

        // Save updated conversation to module_progress
        const updatedConversation: ChatMessage[] = [
          ...conversationHistory,
          { role: 'user', content: message, timestamp: new Date().toISOString() },
          { role: 'assistant', content: fullResponse, timestamp: new Date().toISOString() },
        ]

        // Upsert module progress
        await supabase.from('module_progress').upsert({
          user_id: user.id,
          module_id: moduleId,
          status: examPassed ? 'exam_pending' : 'in_progress',
          exam_conversation: updatedConversation as unknown as never,
          ...(examPassed && { exam_passed_at: new Date().toISOString() }),
        }, { onConflict: 'user_id,module_id' })

        // If exam passed, update ai_context with user responses
        if (examPassed) {
          const userResponses = updatedConversation
            .filter((m) => m.role === 'user')
            .map((m) => m.content)

          const updatedContext = mergeModuleResponses(
            entrepreneurProfile.ai_context ?? {},
            moduleId,
            userResponses
          )

          await supabase
            .from('entrepreneur_profiles')
            .update({ ai_context: updatedContext as unknown as never })
            .eq('user_id', user.id)
        }

        controller.enqueue(
          encoder.encode(`data: ${JSON.stringify({ done: true, examPassed })}\n\n`)
        )
        controller.close()
      } catch (err) {
        controller.enqueue(
          encoder.encode(
            `data: ${JSON.stringify({ error: 'Error al procesar la respuesta. Por favor intenta de nuevo.' })}\n\n`
          )
        )
        controller.close()
      }
    },
  })

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    },
  })
}
