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
          <p style={{ fontFamily: sans, fontSize: '1.1rem', color: MID, lineHeight: 1.9, maxWidth: '42rem', marginBottom: '1.25rem' }}>
            {locale === 'es'
              ? 'Nuestra metodología se basa en un modelo desarrollado por la Asociación Tu Luz, validado técnica y académicamente. Este enfoque se llama i4DHARMA.'
              : 'Our methodology is based on a model developed by the Tu Luz Association, technically and academically validated. This approach is called i4DHARMA.'}
          </p>
          <p style={{ fontFamily: sans, fontSize: '1.1rem', color: MID, lineHeight: 1.9, maxWidth: '42rem' }}>
            {locale === 'es'
              ? 'A través de esta metodología, las emprendedoras atraviesan un proceso estructurado que incluye formación académica, validación y certificación de su MVP o Business Case.'
              : 'Through this methodology, entrepreneurs go through a structured process that includes academic training, validation and certification of their MVP or Business Case.'}
          </p>
        </div>
      </section>

      {/* 4 Ejes */}
      <section style={{ padding: '6rem 2rem', background: '#FFFFFF', borderBottom: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: '72rem', margin: '0 auto' }}>
          <p style={{ fontFamily: sans, fontSize: '1.05rem', color: MID, lineHeight: 1.85, maxWidth: '48rem', marginBottom: '3rem' }}>
            {locale === 'es'
              ? 'Durante este proceso identificamos los cuatro ejes clave de impacto:'
              : 'During this process we identify the four key axes of impact:'}
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem' }}>
            {(locale === 'es'
              ? [
                  { label: 'Social',          color: '#5B8DB8', desc: 'Impacto en comunidades, inclusión y bienestar de las personas.' },
                  { label: 'Medioambiental',  color: '#4A9B6F', desc: 'Respeto y regeneración del entorno natural y los recursos.' },
                  { label: 'Económico',       color: '#C4893A', desc: 'Generación de valor sostenible y oportunidades de negocio.' },
                  { label: 'Cultural',        color: '#8B6BB1', desc: 'Preservación de identidad, diversidad y patrimonio humano.' },
                ]
              : [
                  { label: 'Social',          color: '#5B8DB8', desc: 'Impact on communities, inclusion and people\'s wellbeing.' },
                  { label: 'Environmental',   color: '#4A9B6F', desc: 'Respect and regeneration of the natural environment and resources.' },
                  { label: 'Economic',        color: '#C4893A', desc: 'Generation of sustainable value and business opportunities.' },
                  { label: 'Cultural',        color: '#8B6BB1', desc: 'Preservation of identity, diversity and human heritage.' },
                ]
            ).map(({ label, color, desc }) => (
              <div key={label} style={{
                borderRadius: '16px',
                border: `1.5px solid ${BORDER}`,
                padding: '2rem 1.75rem',
                position: 'relative',
                overflow: 'hidden',
                background: '#FDFAF4',
                transition: 'box-shadow .2s, transform .2s',
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = '0 8px 32px rgba(0,0,0,.08)'; (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = 'none'; (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)' }}
              >
                <div style={{ width: '40px', height: '4px', background: color, borderRadius: '4px', marginBottom: '1.25rem' }} />
                <h3 style={{ fontFamily: serif, fontSize: '1.35rem', fontWeight: 700, color: BROWN, marginBottom: '.625rem' }}>{label}</h3>
                <p style={{ fontFamily: sans, fontSize: '.875rem', color: MID, lineHeight: 1.75 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Diferenciador cultural */}
      <section style={{ padding: '5rem 2rem', background: SOFT, borderBottom: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: '72rem', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '3rem', alignItems: 'center' }}>
          <div>
            <p style={{ fontFamily: sans, fontSize: '.72rem', fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase', color: '#8B6BB1', marginBottom: '.875rem' }}>
              {locale === 'es' ? 'El eje diferencial' : 'The differential axis'}
            </p>
            <div style={{ width: '36px', height: '2px', background: '#8B6BB1', borderRadius: '2px', marginBottom: '1.5rem' }} />
            <h2 style={{ fontFamily: serif, fontSize: 'clamp(1.6rem, 3vw, 2.25rem)', fontWeight: 700, lineHeight: 1.2, color: BROWN, marginBottom: '1.5rem' }}>
              {locale === 'es'
                ? <><em style={{ fontStyle: 'italic', color: '#8B6BB1' }}>Cultural</em> — el elemento esencial de i4DHARMA</>
                : <><em style={{ fontStyle: 'italic', color: '#8B6BB1' }}>Cultural</em> — the essential element of i4DHARMA</>}
            </h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <p style={{ fontFamily: sans, fontSize: '1.05rem', color: MID, lineHeight: 1.9 }}>
              {locale === 'es'
                ? 'El eje cultural es el elemento diferencial y esencial de i4DHARMA. Identificamos que muchos emprendimientos liderados por mujeres en todo el mundo preservan oficios, culturas e historias.'
                : 'The cultural axis is the differential and essential element of i4DHARMA. We identified that many women-led ventures around the world preserve trades, cultures and histories.'}
            </p>
            <p style={{ fontFamily: sans, fontSize: '1.05rem', color: MID, lineHeight: 1.9 }}>
              {locale === 'es'
                ? <>Por eso trabajamos desde el concepto de <strong style={{ color: BROWN, fontWeight: 600 }}>"la historia detrás de la historia"</strong>, generando impacto positivo a través de la visibilización de ese valor.</>
                : <>That is why we work from the concept of <strong style={{ color: BROWN, fontWeight: 600 }}>"the story behind the story"</strong>, generating positive impact through the visibility of that value.</>}
            </p>
          </div>
        </div>
      </section>

      {/* Posicionamiento frente a IA */}
      <section style={{ padding: '5rem 2rem', background: BROWN, borderBottom: `1px solid rgba(255,255,255,.08)` }}>
        <div style={{ maxWidth: '52rem', margin: '0 auto', textAlign: 'center' }}>
          <p style={{ fontFamily: sans, fontSize: '.72rem', fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase', color: GOLD, marginBottom: '1.5rem', opacity: .85 }}>
            {locale === 'es' ? 'Nuestro posicionamiento' : 'Our positioning'}
          </p>
          <blockquote style={{ fontFamily: serif, fontSize: 'clamp(1.2rem, 2.5vw, 1.65rem)', fontWeight: 400, fontStyle: 'italic', color: '#F0D9A8', lineHeight: 1.75, margin: 0 }}>
            {locale === 'es'
              ? '"En un mundo donde la inteligencia artificial crece exponencialmente, buscamos revalorizar el arte, la cultura y la sostenibilidad, dando visibilidad a proyectos que actualmente forman parte de economías sumergidas."'
              : '"In a world where artificial intelligence is growing exponentially, we seek to revalue art, culture and sustainability, giving visibility to projects that are currently part of submerged economies."'}
          </blockquote>
        </div>
      </section>

      {/* Para emprendedoras */}
      <section style={{ padding: '6rem 2rem', background: '#FFFFFF', borderBottom: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: '72rem', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '3rem', alignItems: 'center' }}>
          <div>
            <p style={{ fontFamily: sans, fontSize: '.72rem', fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase', color: GOLD, marginBottom: '.875rem' }}>
              {locale === 'es' ? 'Para emprendedoras' : 'For entrepreneurs'}
            </p>
            <div style={{ width: '36px', height: '2px', background: GOLD, borderRadius: '2px', marginBottom: '1.5rem' }} />
            <h2 style={{ fontFamily: serif, fontSize: 'clamp(1.6rem, 3vw, 2.25rem)', fontWeight: 700, lineHeight: 1.2, color: BROWN }}>
              {locale === 'es'
                ? <>Tu proyecto tiene más<br /><em style={{ fontStyle: 'italic', color: GOLD }}>profundidad de la que crees.</em></>
                : <>Your project has more<br /><em style={{ fontStyle: 'italic', color: GOLD }}>depth than you think.</em></>}
            </h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <p style={{ fontFamily: sans, fontSize: '1.05rem', color: MID, lineHeight: 1.9, margin: 0 }}>
              {locale === 'es'
                ? 'Nuestra metodología te proporciona las bases para entender la profundidad de tu proyecto y descubrir todas sus oportunidades de crecimiento. Damos forma, estructura y materialidad a tu emprendimiento, conectándote con una comunidad, generando visibilidad y posicionándote dentro de nuestro marketplace.'
                : 'Our methodology provides you with the foundations to understand the depth of your project and discover all its growth opportunities. We give shape, structure and materiality to your venture, connecting you with a community, generating visibility and positioning you within our marketplace.'}
            </p>
            <div>
              <Link href="/courses" style={{
                display: 'inline-block',
                padding: '.875rem 1.75rem',
                borderRadius: '12px',
                background: GOLD,
                color: '#fff',
                fontFamily: sans,
                fontWeight: 700,
                fontSize: '.95rem',
                textDecoration: 'none',
                boxShadow: '0 4px 20px rgba(196,137,58,.28)',
                transition: 'background .2s, transform .2s',
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = '#9E6A24'; (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-1px)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = GOLD; (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(0)' }}
              >
                {locale === 'es' ? 'Si eres emprendedora, conoce más →' : 'If you are an entrepreneur, learn more →'}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Para empresas */}
      <section style={{ padding: '6rem 2rem', background: SOFT, borderBottom: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: '72rem', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '3rem', alignItems: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <p style={{ fontFamily: sans, fontSize: '1.05rem', color: MID, lineHeight: 1.9, margin: 0 }}>
              {locale === 'es'
                ? 'Te conectamos con proyectos que generan impacto real. Facilitamos informes ESG y de diversidad, ayudándote a construir estrategias sostenibles mientras apoyas emprendimientos liderados por mujeres y contribuyes a un mundo más diverso.'
                : 'We connect you with projects that generate real impact. We provide ESG and diversity reports, helping you build sustainable strategies while supporting women-led ventures and contributing to a more diverse world.'}
            </p>
            <div>
              <Link href="/marketplace" style={{
                display: 'inline-block',
                padding: '.875rem 1.75rem',
                borderRadius: '12px',
                border: `1.5px solid ${BROWN}`,
                color: BROWN,
                background: 'transparent',
                fontFamily: sans,
                fontWeight: 700,
                fontSize: '.95rem',
                textDecoration: 'none',
                transition: 'background .2s, color .2s',
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = BROWN; (e.currentTarget as HTMLAnchorElement).style.color = '#fff' }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'transparent'; (e.currentTarget as HTMLAnchorElement).style.color = BROWN }}
              >
                {locale === 'es' ? 'Si eres empresa, conoce más →' : 'If you are a company, learn more →'}
              </Link>
            </div>
          </div>
          <div>
            <p style={{ fontFamily: sans, fontSize: '.72rem', fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase', color: GOLD, marginBottom: '.875rem' }}>
              {locale === 'es' ? 'Para empresas' : 'For companies'}
            </p>
            <div style={{ width: '36px', height: '2px', background: GOLD, borderRadius: '2px', marginBottom: '1.5rem' }} />
            <h2 style={{ fontFamily: serif, fontSize: 'clamp(1.6rem, 3vw, 2.25rem)', fontWeight: 700, lineHeight: 1.2, color: BROWN }}>
              {locale === 'es'
                ? <>Impacto real,<br /><em style={{ fontStyle: 'italic', color: GOLD }}>medible y verificable.</em></>
                : <>Real impact,<br /><em style={{ fontStyle: 'italic', color: GOLD }}>measurable and verifiable.</em></>}
            </h2>
          </div>
        </div>
      </section>

      {/* ¿Cómo lo hacemos? — placeholder */}
      <section style={{ padding: '6rem 2rem', background: '#FFFFFF', borderBottom: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: '72rem', margin: '0 auto' }}>
          <p style={{ fontFamily: sans, fontSize: '.72rem', fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase', color: GOLD, marginBottom: '.875rem' }}>
            {locale === 'es' ? 'El proceso' : 'The process'}
          </p>
          <div style={{ width: '36px', height: '2px', background: GOLD, borderRadius: '2px', marginBottom: '1.75rem' }} />
          <h2 style={{ fontFamily: serif, fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', fontWeight: 700, lineHeight: 1.15, color: BROWN, marginBottom: '3rem' }}>
            {locale === 'es'
              ? <>¿Cómo lo <em style={{ fontStyle: 'italic', color: GOLD }}>hacemos?</em></>
              : <>How do we <em style={{ fontStyle: 'italic', color: GOLD }}>do it?</em></>}
          </h2>
          {/* Contenido futuro */}
          <div style={{
            border: `2px dashed ${BORDER}`,
            borderRadius: '20px',
            padding: '4rem 2rem',
            textAlign: 'center',
            color: MID,
            fontFamily: sans,
            fontSize: '.9rem',
            opacity: .6,
          }}>
            {locale === 'es' ? 'Contenido próximamente' : 'Content coming soon'}
          </div>
        </div>
      </section>

      {/* Nuestra metodología — descripción */}
      <section style={{ padding: '6rem 2rem', background: SOFT, borderBottom: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: '72rem', margin: '0 auto' }}>
          <p style={{ fontFamily: sans, fontSize: '.72rem', fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase', color: GOLD, marginBottom: '.875rem' }}>
            {locale === 'es' ? 'Nuestra metodología' : 'Our methodology'}
          </p>
          <div style={{ width: '36px', height: '2px', background: GOLD, borderRadius: '2px', marginBottom: '1.75rem' }} />
          <h2 style={{ fontFamily: serif, fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', fontWeight: 700, lineHeight: 1.15, color: BROWN, maxWidth: '600px', marginBottom: '1.75rem' }}>
            {locale === 'es'
              ? <>Un proceso que integra <em style={{ fontStyle: 'italic', color: GOLD }}>lo personal y lo profesional.</em></>
              : <>A process that integrates <em style={{ fontStyle: 'italic', color: GOLD }}>the personal and the professional.</em></>}
          </h2>
          <p style={{ fontFamily: sans, fontSize: '1.1rem', color: MID, lineHeight: 1.9, maxWidth: '42rem' }}>
            {locale === 'es'
              ? 'Tu Luz no es solo formación. Es un camino estructurado hacia la visibilidad y el impacto real. Combinamos inteligencia artificial, certificación ESG y comunidad para que tu negocio brille donde realmente importa.'
              : 'Tu Luz is not just training. It is a structured path toward visibility and real impact. We combine artificial intelligence, ESG certification, and community so your business shines where it truly matters.'}
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

      {/* Avales institucionales */}
      <section style={{ padding: '5rem 2rem', background: '#FFFFFF', borderBottom: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: '72rem', margin: '0 auto' }}>
          <p style={{ fontFamily: sans, fontSize: '.72rem', fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase', color: GOLD, marginBottom: '.875rem' }}>
            {locale === 'es' ? 'Validación institucional' : 'Institutional validation'}
          </p>
          <div style={{ width: '36px', height: '2px', background: GOLD, borderRadius: '2px', marginBottom: '2rem' }} />
          <p style={{ fontFamily: sans, fontSize: '1.05rem', color: MID, lineHeight: 1.85, marginBottom: '2.5rem' }}>
            {locale === 'es' ? 'Nuestros programas están avalados por:' : 'Our programs are endorsed by:'}
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '.875rem' }}>
            {[
              { name: locale === 'es' ? 'Asociación Tu Luz' : 'Tu Luz Association', note: '' },
              { name: 'Roots Consulting', note: locale === 'es' ? 'validación técnica' : 'technical validation' },
              { name: locale === 'es' ? 'Universidad Nacional Tecnológica de Argentina' : 'National Technological University of Argentina', note: locale === 'es' ? 'validación académica' : 'academic validation' },
            ].map(({ name, note }) => (
              <div key={name} style={{
                display: 'flex', alignItems: 'center', gap: '1rem',
                padding: '1.25rem 1.5rem',
                borderRadius: '12px',
                border: `1px solid ${BORDER}`,
                background: '#FDFAF4',
              }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: GOLD, flexShrink: 0 }} />
                <span style={{ fontFamily: sans, fontSize: '1rem', fontWeight: 600, color: BROWN }}>{name}</span>
                {note && (
                  <span style={{
                    marginLeft: 'auto', fontFamily: sans, fontSize: '.75rem', fontWeight: 500,
                    color: '#fff', background: GOLD, borderRadius: '20px',
                    padding: '.2rem .75rem', whiteSpace: 'nowrap',
                  }}>
                    {note}
                  </span>
                )}
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
