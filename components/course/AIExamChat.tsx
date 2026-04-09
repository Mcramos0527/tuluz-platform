'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import type { ChatMessage, GeneratedDeliverable } from '@/types/database'

interface Props {
  moduleId: string
  moduleTitle: string
  courseSlug: string
  deliverableType: string | null
  initialConversation: ChatMessage[]
  initialStatus: string
  existingDeliverable: GeneratedDeliverable | null
  entrepreneurName?: string
}

export function AIExamChat({
  moduleId,
  moduleTitle,
  courseSlug,
  deliverableType,
  initialConversation,
  initialStatus,
  existingDeliverable,
  entrepreneurName,
}: Props) {
  const [messages, setMessages] = useState<ChatMessage[]>(initialConversation)
  const [input, setInput] = useState('')
  const [streaming, setStreaming] = useState(false)
  const [status, setStatus] = useState(initialStatus)
  const [deliverable, setDeliverable] = useState<GeneratedDeliverable | null>(existingDeliverable)
  const [generatingDeliverable, setGeneratingDeliverable] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const bottomRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const isCompleted = status === 'completed'
  const examPassed = status === 'exam_pending' || isCompleted

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, streaming])

  async function sendMessage() {
    if (!input.trim() || streaming) return

    const userMessage = input.trim()
    setInput('')
    setError(null)

    const updatedMessages: ChatMessage[] = [
      ...messages,
      { role: 'user', content: userMessage, timestamp: new Date().toISOString() },
    ]
    setMessages(updatedMessages)
    setStreaming(true)

    let assistantContent = ''
    const assistantMsg: ChatMessage = {
      role: 'assistant',
      content: '',
      timestamp: new Date().toISOString(),
    }
    setMessages([...updatedMessages, assistantMsg])

    try {
      const response = await fetch('/api/ai/exam', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          moduleId,
          message: userMessage,
          conversationHistory: messages,
        }),
      })

      if (!response.ok || !response.body) {
        throw new Error('Error al conectar con el servidor')
      }

      const reader = response.body.getReader()
      const decoder = new TextDecoder()

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        const chunk = decoder.decode(value)
        const lines = chunk.split('\n')

        for (const line of lines) {
          if (!line.startsWith('data: ')) continue
          const data = line.slice(6)
          try {
            const parsed = JSON.parse(data) as {
              content?: string
              done?: boolean
              examPassed?: boolean
              error?: string
            }

            if (parsed.error) {
              setError(parsed.error)
              break
            }

            if (parsed.content) {
              assistantContent += parsed.content
              setMessages((prev) => {
                const updated = [...prev]
                updated[updated.length - 1] = {
                  ...assistantMsg,
                  content: assistantContent,
                }
                return updated
              })
            }

            if (parsed.done) {
              if (parsed.examPassed) {
                setStatus('exam_pending')
              }
            }
          } catch {
            // Ignore malformed SSE lines
          }
        }
      }
    } catch {
      setError('No se pudo conectar con la IA. Por favor intenta de nuevo.')
    } finally {
      setStreaming(false)
    }
  }

  async function generateDeliverable() {
    setGeneratingDeliverable(true)
    setError(null)

    try {
      const response = await fetch('/api/ai/deliverable', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ moduleId }),
      })

      const data = await response.json() as {
        deliverable?: GeneratedDeliverable
        error?: string
      }

      if (!response.ok || data.error) {
        setError(data.error ?? 'Error al generar el entregable')
        return
      }

      if (data.deliverable) {
        setDeliverable(data.deliverable)
        setStatus('completed')
      }
    } catch {
      setError('Error al generar el entregable. Por favor intenta de nuevo.')
    } finally {
      setGeneratingDeliverable(false)
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  // Auto-resize textarea
  function handleInputChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setInput(e.target.value)
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 160)}px`
    }
  }

  // Strip the [EXAM_PASSED] token from display
  function cleanContent(content: string) {
    return content.replace('[EXAM_PASSED]', '').trim()
  }

  return (
    <div className="flex flex-col h-screen max-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-[#b7e4c7] px-4 py-3 flex-shrink-0">
        <div className="mx-auto max-w-3xl flex items-center justify-between gap-3">
          <div>
            <p className="text-xs text-[#5a8a6a]">Examen con IA · {moduleTitle}</p>
            {entrepreneurName && (
              <p className="text-xs text-[#a0c0a8]">
                Contexto: {entrepreneurName}
              </p>
            )}
          </div>
          <Link
            href={`/courses/${courseSlug}`}
            className="text-sm text-[#5a8a6a] hover:text-[#1b4332] transition-colors"
          >
            ← Volver al curso
          </Link>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="mx-auto max-w-3xl space-y-5">
          {/* Welcome message if empty */}
          {messages.length === 0 && (
            <div className="text-center py-10">
              <div className="w-16 h-16 bg-gradient-to-br from-[#2d6a4f] to-[#40916c] rounded-2xl
                flex items-center justify-center mx-auto mb-4 text-2xl">
                🤖
              </div>
              <h2 className="font-semibold text-lg mb-2">Hola, soy tu mentora de IA</h2>
              <p className="text-[#5a8a6a] text-sm max-w-md mx-auto">
                Voy a hacerte algunas preguntas sobre el módulo{' '}
                <strong>&ldquo;{moduleTitle}&rdquo;</strong> aplicadas específicamente a tu negocio.
                Cuando estés lista, escribe tu primer mensaje.
              </p>
              {!examPassed && (
                <button
                  onClick={() => {
                    setInput('Estoy lista para empezar el examen')
                    setTimeout(() => sendMessage(), 100)
                  }}
                  className="mt-6 px-6 py-3 bg-[#2d6a4f] text-white font-semibold rounded-xl
                    hover:bg-[#1b4332] transition-colors text-sm"
                >
                  Comenzar examen →
                </button>
              )}
            </div>
          )}

          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              {msg.role === 'assistant' && (
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#2d6a4f] to-[#40916c]
                  flex items-center justify-center text-white text-sm mr-3 flex-shrink-0 mt-1">
                  🤖
                </div>
              )}
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${
                  msg.role === 'user'
                    ? 'bg-[#2d6a4f] text-white rounded-tr-sm'
                    : 'bg-white border border-[#b7e4c7] text-[#1b4332] rounded-tl-sm'
                }`}
              >
                {cleanContent(msg.content)}
                {i === messages.length - 1 && streaming && msg.role === 'assistant' && (
                  <span className="inline-block w-1.5 h-4 bg-[#40916c] ml-1 animate-pulse rounded-sm" />
                )}
              </div>
            </div>
          ))}

          {/* Exam passed banner */}
          {examPassed && !isCompleted && (
            <div className="bg-[#f0faf4] border border-[#95d5b2] rounded-2xl p-5 text-center">
              <p className="text-2xl mb-2">🎉</p>
              <p className="font-semibold text-[#1b4332] mb-1">¡Has superado el examen!</p>
              <p className="text-sm text-[#5a8a6a] mb-4">
                La IA ahora generará{' '}
                {deliverableType ? (
                  <strong>{deliverableType.replace(/_/g, ' ')}</strong>
                ) : (
                  'tu entregable'
                )}{' '}
                para tu MVP.
              </p>
              <button
                onClick={generateDeliverable}
                disabled={generatingDeliverable}
                className="px-6 py-3 bg-[#2d6a4f] text-white font-semibold rounded-xl
                  hover:bg-[#1b4332] transition-colors disabled:opacity-50 text-sm"
              >
                {generatingDeliverable ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Generando...
                  </span>
                ) : (
                  'Generar mi entregable →'
                )}
              </button>
            </div>
          )}

          {/* Completed — show deliverable */}
          {isCompleted && deliverable && (
            <div className="bg-white border-2 border-[#95d5b2] rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">📄</span>
                <h3 className="font-semibold text-[#1b4332]">
                  {deliverable.deliverable_type?.replace(/_/g, ' ') ?? 'Entregable generado'}
                </h3>
                <span className="ml-auto px-2.5 py-1 bg-[#d8f3dc] text-[#1b4332] text-xs rounded-full font-medium">
                  ✓ Guardado en tu MVP
                </span>
              </div>
              <div className="text-sm text-[#5a8a6a] leading-relaxed whitespace-pre-wrap
                max-h-72 overflow-y-auto border border-[#e5f5eb] rounded-xl p-4 bg-[#f8fffe]">
                {deliverable.content}
              </div>
              <div className="mt-4 flex gap-3">
                <Link
                  href="/mvp"
                  className="px-4 py-2 bg-[#2d6a4f] text-white text-sm font-medium rounded-lg hover:bg-[#1b4332] transition-colors"
                >
                  Ver mi MVP completo →
                </Link>
                <Link
                  href={`/courses/${courseSlug}`}
                  className="px-4 py-2 border border-[#b7e4c7] text-[#2d6a4f] text-sm font-medium rounded-lg hover:bg-[#f0faf4] transition-colors"
                >
                  Siguiente módulo
                </Link>
              </div>
            </div>
          )}

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
              {error}
            </div>
          )}

          <div ref={bottomRef} />
        </div>
      </div>

      {/* Input area */}
      {!isCompleted && !examPassed && (
        <div className="flex-shrink-0 bg-white border-t border-[#b7e4c7] px-4 py-4">
          <div className="mx-auto max-w-3xl flex gap-3 items-end">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="Escribe tu respuesta... (Enter para enviar, Shift+Enter para nueva línea)"
              disabled={streaming}
              rows={1}
              className="flex-1 px-4 py-3 border border-[#b7e4c7] rounded-xl text-sm
                focus:outline-none focus:ring-2 focus:ring-[#40916c] focus:border-transparent
                placeholder:text-[#a0c0a8] resize-none overflow-hidden disabled:opacity-60"
            />
            <button
              onClick={sendMessage}
              disabled={streaming || !input.trim()}
              className="flex-shrink-0 w-11 h-11 bg-[#2d6a4f] text-white rounded-xl
                hover:bg-[#1b4332] transition-colors disabled:opacity-40 disabled:cursor-not-allowed
                flex items-center justify-center"
              aria-label="Enviar"
            >
              {streaming ? (
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M1.5 1.5l13 6.5-13 6.5V9.5L10 8 1.5 6.5V1.5z" />
                </svg>
              )}
            </button>
          </div>
          <p className="text-center text-xs text-[#a0c0a8] mt-2">
            Powered by GPT-4o · Tuluz AI Mentor
          </p>
        </div>
      )}
    </div>
  )
}
