import Link from 'next/link'
import type { EntrepreneurProfile } from '@/types/database'

type Props = {
  entrepreneur: EntrepreneurProfile & {
    profiles: { full_name: string | null; avatar_url: string | null }
  }
}

const IMPACT_LABELS: Record<string, string> = {
  environmental: '🌿 Ambiental',
  social: '🤝 Social',
  economic: '💼 Económico',
}

export function EntrepreneurCard({ entrepreneur: ep }: Props) {
  const initials = ep.business_name
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase()

  return (
    <Link
      href={`/marketplace/${ep.id}`}
      className="group bg-white border border-[#b7e4c7] rounded-2xl p-6 flex flex-col gap-4
        hover:border-[#40916c] hover:shadow-md transition-all"
    >
      {/* Header */}
      <div className="flex items-start gap-4">
        <div className="w-14 h-14 flex-shrink-0 rounded-xl bg-gradient-to-br from-[#2d6a4f] to-[#40916c]
          flex items-center justify-center text-white font-bold text-lg">
          {ep.profiles?.avatar_url ? (
            <img
              src={ep.profiles.avatar_url}
              alt={ep.business_name}
              className="w-full h-full object-cover rounded-xl"
            />
          ) : (
            initials
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-[#1b4332] group-hover:text-[#2d6a4f] transition-colors
            truncate leading-tight">
            {ep.business_name}
          </h3>
          <p className="text-xs text-[#5a8a6a] mt-0.5">
            {ep.country} · {ep.sector}
          </p>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-[#5a8a6a] leading-relaxed line-clamp-3">
        {ep.business_description}
      </p>

      {/* Impact tags */}
      {ep.impact_type && ep.impact_type.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {ep.impact_type.map((type) => (
            <span key={type}
              className="px-2.5 py-1 bg-[#f0faf4] text-[#2d6a4f] text-xs rounded-full font-medium border border-[#d8f3dc]">
              {IMPACT_LABELS[type] ?? type}
            </span>
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between mt-auto pt-2 border-t border-[#f0faf4]">
        <div className="flex gap-1.5">
          {ep.available_for?.includes('b2c') && (
            <span className="px-2 py-0.5 bg-[#d8f3dc] text-[#1b4332] text-xs rounded font-medium">
              B2C
            </span>
          )}
          {ep.available_for?.includes('b2b') && (
            <span className="px-2 py-0.5 bg-[#1b4332] text-white text-xs rounded font-medium">
              B2B
            </span>
          )}
        </div>
        <span className="text-xs text-[#2d6a4f] font-medium group-hover:underline">
          Ver perfil →
        </span>
      </div>
    </Link>
  )
}
