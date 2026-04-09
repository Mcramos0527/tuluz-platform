'use client'

import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'

interface Props {
  sectors: string[]
  countries: string[]
  activeFilters: {
    sector?: string
    country?: string
    impact?: string
    availability?: string
    q?: string
  }
}

const IMPACT_OPTIONS = [
  { value: 'environmental', label: 'Ambiental', icon: '🌿' },
  { value: 'social', label: 'Social', icon: '🤝' },
  { value: 'economic', label: 'Económico', icon: '💼' },
]

const AVAILABILITY_OPTIONS = [
  { value: 'b2c', label: 'B2C' },
  { value: 'b2b', label: 'B2B' },
]

export function MarketplaceFilters({ sectors, countries, activeFilters }: Props) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const updateFilter = useCallback(
    (key: string, value: string | undefined) => {
      const params = new URLSearchParams(searchParams.toString())
      if (value) {
        params.set(key, value)
      } else {
        params.delete(key)
      }
      router.push(`${pathname}?${params.toString()}`)
    },
    [router, pathname, searchParams]
  )

  const clearAll = () => router.push(pathname)

  const hasFilters = Object.values(activeFilters).some(Boolean)

  return (
    <div className="mb-8 space-y-4">
      {/* Search bar */}
      <div className="flex gap-3">
        <input
          type="text"
          defaultValue={activeFilters.q}
          placeholder="Buscar por nombre de negocio..."
          onChange={(e) => {
            const val = e.target.value
            clearTimeout((window as Window & { _searchTimeout?: ReturnType<typeof setTimeout> })._searchTimeout)
            ;(window as Window & { _searchTimeout?: ReturnType<typeof setTimeout> })._searchTimeout = setTimeout(
              () => updateFilter('q', val || undefined),
              400
            )
          }}
          className="flex-1 px-4 py-2.5 border border-[#b7e4c7] rounded-xl text-sm
            focus:outline-none focus:ring-2 focus:ring-[#40916c] focus:border-transparent
            placeholder:text-[#a0c0a8]"
        />
        {hasFilters && (
          <button
            onClick={clearAll}
            className="px-4 py-2.5 text-sm text-[#5a8a6a] border border-[#b7e4c7]
              rounded-xl hover:bg-[#f0faf4] transition-colors whitespace-nowrap"
          >
            Limpiar filtros
          </button>
        )}
      </div>

      {/* Filters row */}
      <div className="flex flex-wrap gap-3">
        {/* Sector */}
        <select
          value={activeFilters.sector ?? ''}
          onChange={(e) => updateFilter('sector', e.target.value || undefined)}
          className="px-3 py-2 border border-[#b7e4c7] rounded-lg text-sm bg-white
            focus:outline-none focus:ring-2 focus:ring-[#40916c]"
        >
          <option value="">Todos los sectores</option>
          {sectors.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>

        {/* Country */}
        <select
          value={activeFilters.country ?? ''}
          onChange={(e) => updateFilter('country', e.target.value || undefined)}
          className="px-3 py-2 border border-[#b7e4c7] rounded-lg text-sm bg-white
            focus:outline-none focus:ring-2 focus:ring-[#40916c]"
        >
          <option value="">Todos los países</option>
          {countries.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>

        {/* Impact type pills */}
        {IMPACT_OPTIONS.map(({ value, label, icon }) => (
          <button
            key={value}
            onClick={() => updateFilter('impact', activeFilters.impact === value ? undefined : value)}
            className={`px-3 py-2 rounded-lg text-sm border transition-colors flex items-center gap-1.5 ${
              activeFilters.impact === value
                ? 'bg-[#2d6a4f] text-white border-[#2d6a4f]'
                : 'border-[#b7e4c7] text-[#5a8a6a] hover:border-[#40916c] hover:text-[#1b4332]'
            }`}
          >
            <span>{icon}</span> {label}
          </button>
        ))}

        {/* Availability pills */}
        {AVAILABILITY_OPTIONS.map(({ value, label }) => (
          <button
            key={value}
            onClick={() => updateFilter('availability', activeFilters.availability === value ? undefined : value)}
            className={`px-3 py-2 rounded-lg text-sm border transition-colors ${
              activeFilters.availability === value
                ? 'bg-[#2d6a4f] text-white border-[#2d6a4f]'
                : 'border-[#b7e4c7] text-[#5a8a6a] hover:border-[#40916c] hover:text-[#1b4332]'
            }`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  )
}
