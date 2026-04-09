import { Resend } from 'resend'

function getResend() {
  return new Resend(process.env.RESEND_API_KEY ?? 'placeholder')
}

const FROM = 'Tuluz <hola@tuluz.org>'

export async function sendWelcomeEmail(to: string, name: string) {
  return getResend().emails.send({
    from: FROM,
    to,
    subject: '¡Bienvenida a Tuluz! 🌱',
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#1a3a2a">
        <div style="background:#2d6a4f;padding:32px;border-radius:12px 12px 0 0;text-align:center">
          <h1 style="color:#ffffff;margin:0;font-size:28px">Bienvenida a Tuluz</h1>
          <p style="color:#b7e4c7;margin:8px 0 0">Emprendimiento Consciente con Impacto Positivo</p>
        </div>
        <div style="background:#f8fffe;padding:32px;border-radius:0 0 12px 12px;border:1px solid #d8f3dc">
          <p style="font-size:16px">Hola <strong>${name}</strong>,</p>
          <p>Es un placer tenerte en nuestra comunidad de emprendedoras conscientes.</p>
          <p>En Tuluz te acompañamos a construir un negocio con propósito, certificar tu impacto positivo y conectar con empresas que valoran lo que tú creates.</p>
          <div style="text-align:center;margin:32px 0">
            <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard"
              style="background:#40916c;color:#ffffff;padding:14px 28px;border-radius:8px;text-decoration:none;font-weight:600">
              Ir a mi panel →
            </a>
          </div>
          <p style="color:#74c69d;font-size:13px">Con cariño, el equipo de Tuluz 🌿</p>
        </div>
      </div>
    `,
  })
}

export async function sendBadgeEmail(
  to: string,
  name: string,
  badgeType: string,
  badgeUrl: string,
  verificationUrl: string
) {
  const labels: Record<string, string> = {
    course_completion: 'Certificado de Curso',
    conscious_entrepreneur: 'Emprendedora Consciente',
    verified_impact: 'Impacto Verificado',
  }
  const label = labels[badgeType] ?? badgeType

  return getResend().emails.send({
    from: FROM,
    to,
    subject: `¡Felicitaciones! Has obtenido tu insignia: ${label}`,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#1a3a2a">
        <div style="background:#2d6a4f;padding:32px;border-radius:12px 12px 0 0;text-align:center">
          <h1 style="color:#ffffff;margin:0">¡Nueva Insignia! 🏅</h1>
        </div>
        <div style="background:#f8fffe;padding:32px;border-radius:0 0 12px 12px;border:1px solid #d8f3dc">
          <p>Hola <strong>${name}</strong>,</p>
          <p>¡Felicitaciones! Has obtenido la insignia <strong>${label}</strong> de la Asociación Tuluz.</p>
          <div style="text-align:center;margin:24px 0">
            <img src="${badgeUrl}" alt="Insignia Tuluz" style="max-width:300px;border-radius:8px" />
          </div>
          <p>Puedes verificar tu insignia en: <a href="${verificationUrl}">${verificationUrl}</a></p>
          <p style="color:#74c69d;font-size:13px">El equipo de Tuluz 🌿</p>
        </div>
      </div>
    `,
  })
}

export async function sendProfileApprovedEmail(to: string, name: string) {
  return getResend().emails.send({
    from: FROM,
    to,
    subject: '¡Tu perfil ha sido aprobado en Tuluz!',
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#1a3a2a">
        <div style="background:#2d6a4f;padding:32px;border-radius:12px 12px 0 0;text-align:center">
          <h1 style="color:#ffffff;margin:0">¡Perfil Aprobado! ✅</h1>
        </div>
        <div style="background:#f8fffe;padding:32px;border-radius:0 0 12px 12px;border:1px solid #d8f3dc">
          <p>Hola <strong>${name}</strong>,</p>
          <p>Tu perfil de emprendedora ha sido aprobado y ya es visible en el Marketplace de Tuluz.</p>
          <p>Compradores y empresas ya pueden encontrar tu negocio y contactarte.</p>
          <div style="text-align:center;margin:32px 0">
            <a href="${process.env.NEXT_PUBLIC_APP_URL}/marketplace"
              style="background:#40916c;color:#ffffff;padding:14px 28px;border-radius:8px;text-decoration:none;font-weight:600">
              Ver mi perfil en el Marketplace →
            </a>
          </div>
          <p style="color:#74c69d;font-size:13px">El equipo de Tuluz 🌿</p>
        </div>
      </div>
    `,
  })
}
