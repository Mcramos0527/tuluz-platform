import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  const supabase = await createServiceClient()

  const body = await request.json() as {
    userId: string
    courseId?: string
    badgeType: string
    recipientName: string
    adminSecret: string
  }

  const { userId, courseId, badgeType, recipientName, adminSecret } = body

  if (adminSecret !== process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  const issuedAt = new Date()
  const badgeId = crypto.randomUUID()
  const verificationUrl = `${process.env.NEXT_PUBLIC_APP_URL}/verify/${badgeId}`

  const svg = generateBadgeSVG({
    recipientName,
    badgeType,
    issuedAt,
    verificationUrl,
  })

  // Upload SVG to Supabase Storage
  const fileName = `badges/${badgeId}.svg`
  const { error: uploadError } = await supabase.storage
    .from('badges')
    .upload(fileName, Buffer.from(svg), {
      contentType: 'image/svg+xml',
      upsert: false,
    })

  if (uploadError) {
    return NextResponse.json(
      { error: 'Error al subir la insignia: ' + uploadError.message },
      { status: 500 }
    )
  }

  const { data: publicUrlData } = supabase.storage
    .from('badges')
    .getPublicUrl(fileName)

  const badgeUrl = publicUrlData.publicUrl

  // Save certification to DB
  const { data: certification, error: certError } = await supabase
    .from('certifications')
    .insert({
      id: badgeId,
      user_id: userId,
      course_id: courseId ?? null,
      badge_type: badgeType,
      badge_url: badgeUrl,
      verification_url: verificationUrl,
    })
    .select()
    .single()

  if (certError) {
    return NextResponse.json(
      { error: 'Error al guardar la certificación' },
      { status: 500 }
    )
  }

  return NextResponse.json({ certification, badgeUrl, verificationUrl })
}

function generateBadgeSVG({
  recipientName,
  badgeType,
  issuedAt,
  verificationUrl,
}: {
  recipientName: string
  badgeType: string
  issuedAt: Date
  verificationUrl: string
}): string {
  const dateStr = issuedAt.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  const badgeLabel: Record<string, string> = {
    course_completion: 'Certificado de Curso',
    conscious_entrepreneur: 'Emprendedora Consciente',
    verified_impact: 'Impacto Verificado',
  }

  const label = badgeLabel[badgeType] ?? badgeType

  // Escape XML special characters
  const safeName = recipientName.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  const safeLabel = label.replace(/&/g, '&amp;')

  return `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="250" viewBox="0 0 400 250">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#2d6a4f;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#40916c;stop-opacity:1" />
    </linearGradient>
    <linearGradient id="seal" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#d4a017;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#f0c040;stop-opacity:1" />
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="400" height="250" rx="16" ry="16" fill="url(#bg)" />

  <!-- Border -->
  <rect x="8" y="8" width="384" height="234" rx="12" ry="12"
    fill="none" stroke="#ffffff" stroke-width="1.5" stroke-opacity="0.3" />

  <!-- Tuluz seal circle -->
  <circle cx="60" cy="60" r="36" fill="url(#seal)" />
  <text x="60" y="55" font-family="serif" font-size="22" fill="#1a3a2a"
    text-anchor="middle" dominant-baseline="middle">T</text>
  <text x="60" y="74" font-family="sans-serif" font-size="7" fill="#1a3a2a"
    text-anchor="middle" letter-spacing="2">TULUZ</text>

  <!-- Badge type label -->
  <text x="110" y="42" font-family="sans-serif" font-size="11" fill="#b7e4c7"
    font-weight="500" letter-spacing="1">${safeLabel.toUpperCase()}</text>

  <!-- Recipient name -->
  <text x="110" y="66" font-family="sans-serif" font-size="18" fill="#ffffff"
    font-weight="700">${safeName}</text>

  <!-- Divider -->
  <line x1="30" y1="110" x2="370" y2="110"
    stroke="#ffffff" stroke-width="0.8" stroke-opacity="0.2" />

  <!-- Description text -->
  <text x="200" y="140" font-family="sans-serif" font-size="11" fill="#d8f3dc"
    text-anchor="middle">Ha completado satisfactoriamente el proceso de</text>
  <text x="200" y="158" font-family="sans-serif" font-size="11" fill="#d8f3dc"
    text-anchor="middle">certificación de la Asociación Tuluz</text>

  <!-- Date -->
  <text x="200" y="190" font-family="sans-serif" font-size="10" fill="#95d5b2"
    text-anchor="middle">${dateStr}</text>

  <!-- Verification URL -->
  <text x="200" y="222" font-family="sans-serif" font-size="8" fill="#74c69d"
    text-anchor="middle" font-style="italic">${verificationUrl}</text>
</svg>`
}
