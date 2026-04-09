'use client'

import { useState } from 'react'
import type { GeneratedDeliverable } from '@/types/database'

interface Props {
  deliverable: GeneratedDeliverable
}

export function DeliverableCard({ deliverable }: Props) {
  const [copied, setCopied] = useState(false)

  const title = deliverable.deliverable_type
    ?.replace(/_/g, ' ')
    .replace(/\b\w/g, (l) => l.toUpperCase()) ?? 'Entregable'

  const generatedDate = new Date(deliverable.generated_at).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  async function copyToClipboard() {
    await navigator.clipboard.writeText(deliverable.content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  function downloadAsText() {
    const blob = new Blob([deliverable.content], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${deliverable.deliverable_type ?? 'entregable'}.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="bg-white border-2 border-[#95d5b2] rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#1b4332] to-[#2d6a4f] px-6 py-4 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-lg">📄</span>
            <h3 className="font-semibold text-white">{title}</h3>
          </div>
          <p className="text-xs text-[#95d5b2] mt-0.5">Generado el {generatedDate}</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={copyToClipboard}
            className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white text-xs
              rounded-lg transition-colors"
          >
            {copied ? '✓ Copiado' : 'Copiar'}
          </button>
          <button
            onClick={downloadAsText}
            className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white text-xs
              rounded-lg transition-colors"
          >
            Descargar
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="bg-[#f8fffe] border border-[#e5f5eb] rounded-xl p-5
          text-sm text-[#1b4332] leading-relaxed whitespace-pre-wrap max-h-96 overflow-y-auto">
          {deliverable.content}
        </div>
      </div>
    </div>
  )
}
