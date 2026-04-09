import { createClient } from '@/lib/supabase/server'
import { MarketplaceFilters } from '@/components/marketplace/MarketplaceFilters'
import { EntrepreneurCard } from '@/components/marketplace/EntrepreneurCard'
import type { Metadata } from 'next'
import type { EntrepreneurProfile } from '@/types/database'

export const metadata: Metadata = {
  title: 'Marketplace — Emprendedoras Certificadas | Tuluz',
  description: 'Descubre emprendedoras con impacto positivo certificadas por Tuluz en Latinoamérica e Iberia.',
}

interface SearchParams {
  sector?: string
  country?: string
  impact?: string
  availability?: string
  q?: string
}

export default async function MarketplacePage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>
}) {
  const params = await searchParams
  const supabase = await createClient()

  let query = supabase
    .from('entrepreneur_profiles')
    .select('*, profiles(full_name, avatar_url, email)')
    .eq('is_published', true)
    .order('approved_at', { ascending: false })

  if (params.sector) query = query.eq('sector', params.sector)
  if (params.country) query = query.eq('country', params.country)
  if (params.availability) query = query.contains('available_for', [params.availability])
  if (params.impact) query = query.contains('impact_type', [params.impact])
  if (params.q) query = query.ilike('business_name', `%${params.q}%`)

  const { data: entrepreneurs } = await query.limit(60)

  const { data: sectors } = await supabase
    .from('entrepreneur_profiles')
    .select('sector')
    .eq('is_published', true)
    .not('sector', 'is', null)

  const { data: countries } = await supabase
    .from('entrepreneur_profiles')
    .select('country')
    .eq('is_published', true)
    .not('country', 'is', null)

  const uniqueSectors = [...new Set(sectors?.map((s) => s.sector).filter(Boolean))] as string[]
  const uniqueCountries = [...new Set(countries?.map((c) => c.country).filter(Boolean))] as string[]

  return (
    <div className="min-h-screen bg-[#f8fffe]">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#1b4332] to-[#2d6a4f] text-white py-16 px-4">
        <div className="mx-auto max-w-6xl">
          <span className="inline-block mb-3 px-3 py-1 text-xs font-semibold
            bg-white/10 rounded-full text-[#95d5b2] uppercase tracking-wider">
            Directorio Certificado
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">
            Marketplace de Emprendedoras
          </h1>
          <p className="text-[#b7e4c7] text-lg max-w-2xl">
            Descubre emprendedoras con impacto positivo certificadas por Tuluz en
            Latinoamérica e Iberia. Todas verificadas por nuestro equipo.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-10">
        <MarketplaceFilters
          sectors={uniqueSectors}
          countries={uniqueCountries}
          activeFilters={params}
        />

        {entrepreneurs && entrepreneurs.length > 0 ? (
          <>
            <p className="text-sm text-[#5a8a6a] mb-6">
              {entrepreneurs.length} emprendedora{entrepreneurs.length !== 1 ? 's' : ''} encontrada{entrepreneurs.length !== 1 ? 's' : ''}
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {entrepreneurs.map((entrepreneur) => (
                <EntrepreneurCard
                  key={entrepreneur.id}
                  entrepreneur={entrepreneur as EntrepreneurProfile & {
                    profiles: { full_name: string | null; avatar_url: string | null }
                  }}
                />
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-20">
            <p className="text-4xl mb-4">🔍</p>
            <h3 className="text-xl font-semibold mb-2">No se encontraron resultados</h3>
            <p className="text-[#5a8a6a]">Prueba con otros filtros o términos de búsqueda.</p>
          </div>
        )}
      </div>
    </div>
  )
}
