'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useLanguage } from '@/lib/i18n/LanguageContext'

const serif  = "'Playfair Display', Georgia, serif"
const sans   = "'Inter', system-ui, sans-serif"
const GOLD   = '#C4893A'
const BROWN  = '#2D1E0F'
const MID    = '#6B4A2A'
const MUTED  = '#9C7A52'
const SOFT   = '#F5ECD8'
const DARK   = '#1C1917'
const GOLD_LT = '#F0D9A8'
const BORDER = '#E5D4B0'

const TEAM_ES = [
  { name: 'Verónica Elena Carmona', role: 'Fundadora & Directora', bio: 'Emprendedora social, mentora y Premio Lidera Mujer 2024. Lleva más de 10 años impulsando proyectos de impacto consciente en LATAM y Europa.' },
  { name: 'Equipo de Mentoras', role: 'Red de expertas verificadas', bio: 'Profesionales en sostenibilidad, ESG, comunicación de impacto y negocios conscientes con presencia en 12 países.' },
]

const TEAM_EN = [
  { name: 'Verónica Elena Carmona', role: 'Founder & Director', bio: 'Social entrepreneur, mentor, and Lidera Mujer Award winner 2024. Over 10 years driving conscious impact projects across LATAM and Europe.' },
  { name: 'Mentors Network', role: 'Verified expert network', bio: 'Professionals in sustainability, ESG, impact communication, and conscious business with presence in 12 countries.' },
]

const VALUES_ES = [
  { icon: '✨', title: 'Impacto consciente', desc: 'Cada acción tiene un propósito. Construimos negocios que integran el bienestar personal con el impacto colectivo.' },
  { icon: '🌱', title: 'Sin fines de lucro', desc: 'Somos una asociación. El 100% de nuestros recursos se reinvierten en la comunidad de emprendedoras.' },
  { icon: '🔗', title: 'Conexión real', desc: 'No vendemos promesas. Generamos puentes reales entre emprendedoras certificadas y empresas comprometidas.' },
  { icon: '🌍', title: 'Alcance global', desc: 'Presentes en Latinoamérica y Europa, con una visión que no tiene fronteras.' },
]

const VALUES_EN = [
  { icon: '✨', title: 'Conscious impact', desc: 'Every action has a purpose. We build businesses that integrate personal wellbeing with collective impact.' },
  { icon: '🌱', title: 'Non-profit', desc: 'We are an association. 100% of our resources are reinvested in the community of entrepreneurs.' },
  { icon: '🔗', title: 'Real connection', desc: 'We don\'t sell promises. We build real bridges between certified entrepreneurs and committed companies.' },
  { icon: '🌍', title: 'Global reach', desc: 'Present in Latin America and Europe, with a vision that knows no borders.' },
]

export default function NosotrasPage() {
  const { locale } = useLanguage()
  const team   = locale === 'es' ? TEAM_ES   : TEAM_EN
  const values = locale === 'es' ? VALUES_ES : VALUES_EN

  return (
    <div style={{ fontFamily: sans, color: BROWN }}>

      {/* Hero */}
      <section style={{ padding: '7rem 2rem 5rem', background: SOFT, borderBottom: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: '72rem', margin: '0 auto' }}>
          <p style={{ fontFamily: sans, fontSize: '.72rem', fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase', color: GOLD, marginBottom: '.875rem' }}>
            {locale === 'es' ? 'Nosotras' : 'About us'}
          </p>
          <div style={{ width: '36px', height: '2px', background: GOLD, borderRadius: '2px', marginBottom: '1.75rem' }} />
          <h1 style={{ fontFamily: serif, fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.025em', color: BROWN, maxWidth: '680px', marginBottom: '1.5rem' }}>
            {locale === 'es'
              ? <>Impulsamos mujeres que<br /><em style={{ fontStyle: 'italic', color: GOLD }}>ya están cambiando el mundo.</em></>
              : <>We empower women who are<br /><em style={{ fontStyle: 'italic', color: GOLD }}>already changing the world.</em></>}
          </h1>
          <p style={{ fontFamily: sans, fontSize: '1.1rem', color: MID, lineHeight: 1.9, maxWidth: '42rem' }}>
            {locale === 'es'
              ? 'Tuluz es una asociación sin fines de lucro fundada con la misión de hacer visible, certificar y conectar el talento femenino con impacto real en Latinoamérica y Europa.'
              : 'Tuluz is a non-profit association founded with the mission of making visible, certifying, and connecting female talent with real impact across Latin America and Europe.'}
          </p>
        </div>
      </section>

      {/* Award photo */}
      <section style={{ position: 'relative', height: '420px', overflow: 'hidden' }}>
        <Image src="/brand/award.jpg" alt="Tu Luz award" fill style={{ objectFit: 'cover', objectPosition: 'center 20%' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(12,8,4,.80) 0%, rgba(20,13,6,.50) 55%, transparent 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', padding: '0 3rem' }}>
          <div style={{ maxWidth: '44rem' }}>
            <p style={{ fontFamily: serif, fontSize: 'clamp(1.2rem, 2.5vw, 1.7rem)', fontStyle: 'italic', color: GOLD_LT, lineHeight: 1.6, marginBottom: '1.25rem' }}>
              &ldquo;{locale === 'es'
                ? 'Creé Tuluz porque yo misma fui esa emprendedora invisible que tenía impacto pero no tenía visibilidad. Quiero que ninguna mujer vuelva a pasar por eso.'
                : 'I created Tuluz because I was that invisible entrepreneur — I had impact but no visibility. I want no woman to go through that again.'}&rdquo;
            </p>
            <p style={{ fontFamily: sans, fontSize: '.75rem', fontWeight: 700, color: 'rgba(240,217,168,.7)', letterSpacing: '.08em', textTransform: 'uppercase' }}>
              Verónica Elena Carmona · {locale === 'es' ? 'Fundadora' : 'Founder'}
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section style={{ padding: '6rem 2rem', background: '#fff' }}>
        <div style={{ maxWidth: '72rem', margin: '0 auto' }}>
          <p style={{ fontFamily: sans, fontSize: '.72rem', fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase', color: GOLD, marginBottom: '.875rem' }}>
            {locale === 'es' ? 'Nuestros valores' : 'Our values'}
          </p>
          <div style={{ width: '36px', height: '2px', background: GOLD, borderRadius: '2px', marginBottom: '3rem' }} />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1px', background: BORDER }}>
            {values.map(({ icon, title, desc }) => (
              <div key={title} style={{ background: '#fff', padding: '2.5rem 2.25rem', transition: 'background .2s', cursor: 'default' }}
                onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.background = SOFT}
                onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.background = '#fff'}>
                <div style={{ fontSize: '1.75rem', marginBottom: '1.1rem' }}>{icon}</div>
                <h3 style={{ fontFamily: serif, fontWeight: 700, fontSize: '1.1rem', color: BROWN, marginBottom: '.5rem' }}>{title}</h3>
                <p style={{ fontFamily: sans, fontSize: '.9rem', color: MID, lineHeight: 1.8 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section style={{ padding: '6rem 2rem', background: SOFT, borderTop: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: '72rem', margin: '0 auto' }}>
          <p style={{ fontFamily: sans, fontSize: '.72rem', fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase', color: GOLD, marginBottom: '.875rem' }}>
            {locale === 'es' ? 'El equipo' : 'The team'}
          </p>
          <div style={{ width: '36px', height: '2px', background: GOLD, borderRadius: '2px', marginBottom: '3rem' }} />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {team.map(({ name, role, bio }) => (
              <div key={name} style={{ background: '#fff', borderRadius: '20px', padding: '2.5rem 2rem', border: `1px solid ${BORDER}`, boxShadow: '0 8px 32px rgba(0,0,0,0.06)' }}>
                <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: `linear-gradient(135deg, #FAF1DC, #F0D9A8)`, border: `2px solid ${BORDER}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: serif, fontSize: '1.5rem', fontWeight: 700, color: GOLD, marginBottom: '1.25rem' }}>
                  {name[0]}
                </div>
                <h3 style={{ fontFamily: serif, fontWeight: 700, fontSize: '1.1rem', color: BROWN, marginBottom: '.25rem' }}>{name}</h3>
                <p style={{ fontFamily: sans, fontSize: '.78rem', fontWeight: 700, color: GOLD, letterSpacing: '.05em', textTransform: 'uppercase', marginBottom: '.875rem' }}>{role}</p>
                <p style={{ fontFamily: sans, fontSize: '.9rem', color: MID, lineHeight: 1.8 }}>{bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission dark strip */}
      <section style={{ padding: '6rem 2rem', background: DARK, textAlign: 'center' }}>
        <div style={{ maxWidth: '48rem', margin: '0 auto' }}>
          <div style={{ width: '36px', height: '2px', background: 'rgba(240,217,168,.35)', borderRadius: '2px', margin: '0 auto 2.5rem' }} />
          <p style={{ fontFamily: serif, fontSize: 'clamp(1.35rem, 2.5vw, 1.8rem)', fontStyle: 'italic', color: GOLD_LT, lineHeight: 1.65, marginBottom: '3rem', opacity: 0.85 }}>
            {locale === 'es'
              ? '&ldquo;Cada emprendedora certificada es una prueba de que el impacto y el negocio no están en conflicto — se necesitan.&rdquo;'
              : '&ldquo;Every certified entrepreneur is proof that impact and business are not in conflict — they need each other.&rdquo;'}
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <Link href="/register" style={{ padding: '1rem 2.5rem', borderRadius: '12px', background: GOLD, color: '#fff', fontFamily: sans, fontWeight: 700, fontSize: '1rem', textDecoration: 'none', boxShadow: '0 4px 20px rgba(196,137,58,.35)' }}>
              {locale === 'es' ? 'Únete a la comunidad →' : 'Join the community →'}
            </Link>
            <Link href="/metodologia" style={{ padding: '1rem 2.5rem', borderRadius: '12px', border: '1.5px solid rgba(234,217,188,.25)', color: GOLD_LT, fontFamily: sans, fontWeight: 600, fontSize: '1rem', textDecoration: 'none' }}>
              {locale === 'es' ? 'Nuestra metodología' : 'Our methodology'}
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
