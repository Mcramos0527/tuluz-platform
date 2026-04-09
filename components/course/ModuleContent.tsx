import type { CourseModule } from '@/types/database'

interface Props {
  module: CourseModule
}

export function ModuleContent({ module }: Props) {
  if (!module.content_url && !module.content_summary) {
    return (
      <div className="bg-white border border-[#b7e4c7] rounded-2xl p-6 text-center text-[#5a8a6a]">
        <p className="text-3xl mb-3">📝</p>
        <p>El contenido de este módulo estará disponible próximamente.</p>
      </div>
    )
  }

  return (
    <div className="space-y-5">
      {/* Video embed */}
      {module.content_url && (module.content_type === 'video' || module.content_type === 'mixed') && (
        <div className="bg-white border border-[#b7e4c7] rounded-2xl overflow-hidden">
          {isYouTubeUrl(module.content_url) ? (
            <div className="relative w-full aspect-video">
              <iframe
                src={toYouTubeEmbed(module.content_url)}
                title={module.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          ) : (
            <div className="relative w-full aspect-video">
              <video
                src={module.content_url}
                controls
                className="w-full h-full object-contain bg-black"
              />
            </div>
          )}
        </div>
      )}

      {/* Text content / summary */}
      {module.content_summary && (
        <div className="bg-white border border-[#b7e4c7] rounded-2xl p-6">
          <h2 className="font-semibold text-lg mb-4">Contenido del módulo</h2>
          <div className="prose prose-sm max-w-none text-[#1b4332]">
            {module.content_summary.split('\n\n').map((paragraph, i) => (
              <p key={i} className="mb-3 text-[#3a5a4a] leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      )}

      {/* Text-only URL (PDF or external resource) */}
      {module.content_url && module.content_type === 'text' && (
        <div className="bg-white border border-[#b7e4c7] rounded-2xl p-6 flex items-center gap-4">
          <span className="text-3xl">📄</span>
          <div>
            <p className="font-medium">Material de lectura</p>
            <a
              href={module.content_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-[#2d6a4f] hover:underline"
            >
              Abrir recurso ↗
            </a>
          </div>
        </div>
      )}
    </div>
  )
}

function isYouTubeUrl(url: string): boolean {
  return url.includes('youtube.com') || url.includes('youtu.be')
}

function toYouTubeEmbed(url: string): string {
  const patterns = [
    /youtube\.com\/watch\?v=([^&]+)/,
    /youtu\.be\/([^?]+)/,
    /youtube\.com\/embed\/([^?]+)/,
  ]
  for (const pattern of patterns) {
    const match = url.match(pattern)
    if (match) return `https://www.youtube.com/embed/${match[1]}`
  }
  return url
}
