'use client'

import Link from 'next/link'
import { useLanguage } from '@/lib/i18n/LanguageContext'

const serif = "'Playfair Display', Georgia, serif"
const sans  = "'Inter', system-ui, sans-serif"
const GOLD  = '#C4893A'
const BROWN = '#2D1E0F'
const MID   = '#6B4A2A'
const SOFT  = '#F5ECD8'
const BORDER = '#E5D4B0'

const STEPS_ES = [
  { n: '01', title: 'Autoconocimiento', desc: 'Exploramos quién eres, cuál es tu propósito y qué impacto quieres generar. El punto de partida es siempre tu historia.' },
  { n: '02', title: 'Formación con IA', desc: 'Un tutor de inteligencia artificial acompaña tu aprendizaje módulo a módulo, adaptándose a tu ritmo y sector.' },
  { n: '03', title: 'Entregables reales', desc: 'Cada módulo genera un entregable tangible: plan de impacto, análisis ESG, estrategia de comunicación y más.' },
  { n: '04', title: 'Certificación ESG', desc: 'Al completar el programa obtienes una certificación verificable que acredita tu perfil de emprendedora con impacto.' },
  { n: '05', title: 'Conexión B2B', desc: 'Tu perfil certificado se publica en el Marketplace donde empresas con metas ESG pueden encontrarte y contratarte.' },
  { n: '06', title: 'Comunidad y red', desc: 'Formas parte de una red de más de 500 emprendedoras en LATAM y Europa que se apoyan, colaboran y crecen juntas.' },
]

const STEPS_EN = [
  { n: '01', title: 'Self-knowledge', desc: 'We explore who you are, your purpose, and the impact you want to create. The starting point is always your story.' },
  { n: '02', title: 'AI-powered learning', desc: 'An artificial intelligence tutor guides your learning module by module, adapting to your pace and sector.' },
  { n: '03', title: 'Real deliverables', desc: 'Each module generates a tangible deliverable: impact plan, ESG analysis, communication strategy, and more.' },
  { n: '04', title: 'ESG Certification', desc: 'Upon completing the program you receive a verifiable certification accrediting your profile as an impact entrepreneur.' },
  { n: '05', title: 'B2B Connection', desc: 'Your certified profile is published on the Marketplace where companies with ESG goals can find and hire you.' },
  { n: '06', title: 'Community & network', desc: 'You join a network of 500+ entrepreneurs across LATAM and Europe who support, collaborate, and grow together.' },
]

export default function MetodologiaPage() {
  const { locale } = useLanguage()
  const steps = locale === 'es' ? STEPS_ES : STEPS_EN

  return (
    <div style={{ fontFamily: sans, color: BROWN }}>

      {/* Hero */}
      <section style={{ padding: '7rem 2rem 5rem', background: SOFT, borderBottom: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: '72rem', margin: '0 auto' }}>
          <p style={{ fontFamily: sans, fontSize: '.72rem', fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase', color: GOLD, marginBottom: '.875rem' }}>
            {locale === 'es' ? 'Nuestra metodología' : 'Our methodology'}
          </p>
          <div style={{ width: '36px', height: '2px', background: GOLD, borderRadius: '2px', marginBottom: '1.75rem' }} />
          <h1 style={{ fontFamily: serif, fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.025em', color: BROWN, maxWidth: '700px', marginBottom: '1.5rem' }}>
            {locale === 'es'
              ? <>Un proceso que integra<br /><em style={{ fontStyle: 'italic', color: GOLD }}>lo personal y lo profesional.</em></>
              : <>A process that integrates<br /><em style={{ fontStyle: 'italic', color: GOLD }}>the personal and the professional.</em></>}
          </h1>
          <p style={{ fontFamily: sans, fontSize: '1.1rem', color: MID, lineHeight: 1.9, maxWidth: '42rem' }}>
            {locale === 'es'
              ? 'Tuluz no es solo formación. Es un camino estructurado hacia la visibilidad y el impacto real. Combinamos inteligencia artificial, certificación ESG y comunidad para que tu negocio brillé donde realmente importa.'
              : 'Tuluz is not just training. It is a structured path toward visibility and real impact. We combine artificial intelligence, ESG certification, and community so your business shines where it truly matters.'}
          </p>
        </div>
      </section>

      {/* Steps */}
      <section style={{ padding: '6rem 2rem', background: '#FFFFFF' }}>
        <div style={{ maxWidth: '72rem', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1px', background: BORDER }}>
            {steps.map(({ n, title, desc }) => (
              <div key={n} style={{
                background: '#fff', padding: '2.5rem 2.25rem',
                transition: 'background .2s', cursor: 'default',
              }}
                onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.background = SOFT}
                onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.background = '#fff'}>
                <p style={{ fontFamily: serif, fontSize: '3rem', fontWeight: 700, color: 'rgba(196,137,58,.15)', lineHeight: 1, marginBottom: '1rem', letterSpacing: '-0.03em' }}>{n}</p>
                <h3 style={{ fontFamily: serif, fontSize: '1.2rem', fontWeight: 700, color: BROWN, marginBottom: '.625rem' }}>{title}</h3>
                <p style={{ fontFamily: sans, fontSize: '.9rem', color: MID, lineHeight: 1.85 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '6rem 2rem', background: SOFT, textAlign: 'center', borderTop: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: '40rem', margin: '0 auto' }}>
          <h2 style={{ fontFamily: serif, fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', fontWeight: 700, lineHeight: 1.2, color: BROWN, marginBottom: '1.25rem' }}>
            {locale === 'es' ? <>¿Lista para <em style={{ fontStyle: 'italic', color: GOLD }}>empezar?</em></> : <>Ready to <em style={{ fontStyle: 'italic', color: GOLD }}>begin?</em></>}
          </h2>
          <p style={{ fontFamily: sans, fontSize: '1rem', color: MID, lineHeight: 1.85, marginBottom: '2.5rem' }}>
            {locale === 'es'
              ? 'Accede al Bootcamp, trabaja con tu tutora de IA y obtén tu certificación ESG en semanas.'
              : 'Join the Bootcamp, work with your AI tutor, and earn your ESG certification in weeks.'}
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <Link href="/register" style={{ padding: '1rem 2.5rem', borderRadius: '12px', background: GOLD, color: '#fff', fontFamily: sans, fontWeight: 700, fontSize: '1rem', textDecoration: 'none', boxShadow: '0 4px 20px rgba(196,137,58,.30)' }}>
              {locale === 'es' ? 'Empieza gratis →' : 'Start for free →'}
            </Link>
            <Link href="/courses" style={{ padding: '1rem 2.5rem', borderRadius: '12px', border: `1.5px solid ${BORDER}`, color: MID, fontFamily: sans, fontWeight: 600, fontSize: '1rem', textDecoration: 'none' }}>
              {locale === 'es' ? 'Ver el Bootcamp' : 'View Bootcamp'}
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
