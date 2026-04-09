'use client'

import { useState } from 'react'
import type { GeneratedDeliverable, Certification } from '@/types/database'

interface Props {
  businessName: string
  businessDescription: string | null
  sector: string | null
  country: string | null
  deliverables: Record<string, GeneratedDeliverable>
  certifications: Certification[]
}

export function MVPDocument({
  businessName,
  businessDescription,
  sector,
  country,
  deliverables,
  certifications,
}: Props) {
  const [activeTab, setActiveTab] = useState<string>(Object.keys(deliverables)[0] ?? '')
  const [copied, setCopied] = useState(false)

  const deliverableEntries = Object.entries(deliverables)

  function formatTitle(key: string) {
    return key.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())
  }

  function formatDate(iso: string) {
    return new Date(iso).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  async function copyAll() {
    const full = deliverableEntries
      .map(([type, d]) => `# ${formatTitle(type)}\n\n${d.content}`)
      .join('\n\n---\n\n')
    await navigator.clipboard.writeText(full)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  function downloadAll() {
    const full = [
      `# MVP — ${businessName}`,
      `${sector ? `Sector: ${sector}` : ''}${country ? ` · ${country}` : ''}`,
      '',
      ...deliverableEntries.map(([type, d]) =>
        `## ${formatTitle(type)}\n_Generado el ${formatDate(d.generated_at)}_\n\n${d.content}`
      ),
    ].join('\n\n---\n\n')

    const blob = new Blob([full], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `MVP_${businessName.replace(/\s+/g, '_')}.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6">
      {/* Document header */}
      <div className="bg-white border border-[#b7e4c7] rounded-2xl p-6">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h2 className="text-xl font-bold text-[#1b4332]">{businessName}</h2>
            {businessDescription && (
              <p className="text-[#5a8a6a] text-sm mt-1 max-w-2xl">{businessDescription}</p>
            )}
            <div className="flex gap-2 mt-2">
              {sector && <span className="text-xs text-[#5a8a6a] bg-[#f0faf4] px-2 py-1 rounded">{sector}</span>}
              {country && <span className="text-xs text-[#5a8a6a] bg-[#f0faf4] px-2 py-1 rounded">{country}</span>}
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={copyAll}
              className="px-3 py-2 border border-[#b7e4c7] text-[#2d6a4f] text-sm rounded-lg
                hover:bg-[#f0faf4] transition-colors">
              {copied ? '✓ Copiado' : 'Copiar todo'}
            </button>
            <button onClick={downloadAll}
              className="px-3 py-2 bg-[#2d6a4f] text-white text-sm rounded-lg
                hover:bg-[#1b4332] transition-colors">
              Descargar MVP
            </button>
          </div>
        </div>

        {/* Progress indicator */}
        <div className="mt-4 pt-4 border-t border-[#f0faf4]">
          <div className="flex items-center gap-3">
            <span className="text-sm text-[#5a8a6a]">
              {deliverableEntries.length} entregable{deliverableEntries.length !== 1 ? 's' : ''} generado{deliverableEntries.length !== 1 ? 's' : ''}
            </span>
            {certifications.length > 0 && (
              <span className="text-sm text-[#2d6a4f] font-medium">
                · {certifications.length} certificación{certifications.length !== 1 ? 'es' : ''} Tuluz
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Tab nav */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {deliverableEntries.map(([type]) => (
          <button
            key={type}
            onClick={() => setActiveTab(type)}
            className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
              activeTab === type
                ? 'bg-[#2d6a4f] text-white'
                : 'bg-white border border-[#b7e4c7] text-[#5a8a6a] hover:border-[#40916c] hover:text-[#1b4332]'
            }`}
          >
            {formatTitle(type)}
          </button>
        ))}
      </div>

      {/* Active deliverable */}
      {activeTab && deliverables[activeTab] && (
        <div className="bg-white border border-[#b7e4c7] rounded-2xl overflow-hidden">
          <div className="border-b border-[#f0faf4] px-6 py-4 flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-[#1b4332]">{formatTitle(activeTab)}</h3>
              <p className="text-xs text-[#5a8a6a] mt-0.5">
                Generado el {formatDate(deliverables[activeTab].generated_at)}
              </p>
            </div>
          </div>
          <div className="p-6">
            <div className="text-sm text-[#1b4332] leading-relaxed whitespace-pre-wrap
              bg-[#f8fffe] border border-[#e5f5eb] rounded-xl p-5">
              {deliverables[activeTab].content}
            </div>
          </div>
        </div>
      )}

      {/* Certifications section */}
      {certifications.length > 0 && (
        <div className="bg-white border border-[#b7e4c7] rounded-2xl p-6">
          <h3 className="font-semibold mb-4">Certificaciones Tuluz</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {certifications.map((cert) => (
              <div key={cert.id}
                className="flex items-center gap-4 p-4 bg-[#f0faf4] rounded-xl border border-[#d8f3dc]">
                {cert.badge_url && (
                  <img src={cert.badge_url} alt={cert.badge_type} className="w-12 h-12 rounded-lg" />
                )}
                <div>
                  <p className="text-sm font-medium text-[#1b4332]">{cert.badge_type}</p>
                  <p className="text-xs text-[#5a8a6a]">
                    {new Date(cert.issued_at).toLocaleDateString('es-ES')}
                  </p>
                  {cert.verification_url && (
                    <a href={cert.verification_url} target="_blank" rel="noopener noreferrer"
                      className="text-xs text-[#2d6a4f] hover:underline">
                      Verificar ↗
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
