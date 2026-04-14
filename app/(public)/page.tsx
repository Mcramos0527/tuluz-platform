'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useLanguage } from '@/lib/i18n/LanguageContext'

/* ── tokens ─────────────────────────────────────────────────── */
const T = {
  gold:     '#C4893A',
  goldDk:   '#9E6A24',
  goldLt:   '#F0D9A8',
  goldPale: '#FAF1DC',
  cream:    '#FDFAF4',
  soft:     '#F5ECD8',
  dark:     '#1A0F05',
  brown:    '#2D1E0F',
  mid:      '#6B4A2A',
  muted:    '#9C7A52',
  border:   '#E5D4B0',
  white:    '#FFFFFF',
}
const serif = "'Playfair Display', Georgia, serif"
const sans  = "'Inter', system-ui, sans-serif"

/* ── reusable pieces ─────────────────────────────────────────── */
function Eyebrow({ children, light }: { children: React.ReactNode; light?: boolean }) {
  return (
    <p style={{
      fontFamily: sans, fontSize: '.72rem', fontWeight: 700,
      letterSpacing: '.12em', textTransform: 'uppercase',
      color: light ? 'rgba(240,217,168,.8)' : T.gold,
      marginBottom: '.875rem',
    }}>{children}</p>
  )
}

function Divider({ light }: { light?: boolean }) {
  return <div style={{ width: '40px', height: '2px', background: light ? `${T.goldLt}88` : T.gold, borderRadius: '2px', marginBottom: '1.5rem' }} />
}

export default function LandingPage() {
  const { t } = useLanguage()

  return (
    <div style={{ fontFamily: sans, color: T.brown }}>

      {/* ══════════════════════════════════════════════════════
          HERO — Editorial split: text left · photo right
      ══════════════════════════════════════════════════════ */}
      <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: 'calc(100vh - 4rem)' }} className="hero-grid">
        {/* Left: cream panel */}
        <div style={{
          background: T.cream,
          display: 'flex', flexDirection: 'column', justifyContent: 'center',
          padding: '5rem 4rem 5rem 5rem',
        }}>
          {/* Award trust pill */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '.5rem',
            background: T.goldPale, borderRadius: '999px',
            padding: '.35rem 1rem', marginBottom: '2.25rem', alignSelf: 'flex-start',
            border: `1px solid ${T.border}`,
          }}>
            <span style={{ fontSize: '.8rem' }}>🏆</span>
            <span style={{ fontFamily: sans, fontSize: '.75rem', fontWeight: 600, color: T.goldDk, letterSpacing: '.04em' }}>
              Premio Lidera Mujer · 2024
            </span>
          </div>

          {/* Headline */}
          <h1 style={{
            fontFamily: serif,
            fontSize: 'clamp(2.8rem, 4.5vw, 4.25rem)',
            fontWeight: 700, lineHeight: 1.1,
            letterSpacing: '-0.02em',
            color: T.brown,
            marginBottom: '1.5rem',
          }}>
            {t.hero.h1a}<br />
            <em style={{ fontStyle: 'italic', color: T.gold }}>{t.hero.h1b}</em>
          </h1>

          {/* Sub */}
          <p style={{ fontSize: '1.05rem', color: T.mid, lineHeight: 1.85, maxWidth: '34rem', marginBottom: '2.5rem' }}>
            {t.hero.sub}
          </p>

          {/* CTAs */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.875rem', marginBottom: '3rem' }}>
            <Link href="/register" style={{
              display: 'inline-flex', alignItems: 'center',
              padding: '.95rem 2.25rem', borderRadius: '10px',
              background: T.gold, color: T.white,
              fontWeight: 700, fontSize: '.95rem', textDecoration: 'none',
              fontFamily: sans,
              boxShadow: `0 4px 20px rgba(196,137,58,.35)`,
              transition: 'all .2s',
            }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = T.goldDk; el.style.transform = 'translateY(-1px)'; el.style.boxShadow = '0 6px 24px rgba(196,137,58,.45)' }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = T.gold; el.style.transform = 'translateY(0)'; el.style.boxShadow = '0 4px 20px rgba(196,137,58,.35)' }}>
              {t.hero.cta1}
            </Link>
            <Link href="/marketplace" style={{
              display: 'inline-flex', alignItems: 'center',
              padding: '.95rem 2.25rem', borderRadius: '10px',
              border: `1.5px solid ${T.border}`,
              color: T.mid, fontWeight: 600, fontSize: '.95rem',
              textDecoration: 'none', fontFamily: sans,
              background: 'transparent', transition: 'border-color .2s, color .2s',
            }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.borderColor = T.gold; el.style.color = T.gold }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.borderColor = T.border; el.style.color = T.mid }}>
              {t.hero.cta2}
            </Link>
          </div>

          {/* Stat strip */}
          <div style={{ display: 'flex', gap: '2rem', paddingTop: '2rem', borderTop: `1px solid ${T.border}` }}>
            {[
              { val: '500+', lbl: t.stats.entrepreneurs },
              { val: '12', lbl: t.stats.countries },
              { val: '85%', lbl: t.stats.satisfaction },
            ].map(({ val, lbl }) => (
              <div key={lbl}>
                <p style={{ fontFamily: serif, fontSize: '1.75rem', fontWeight: 700, color: T.brown, lineHeight: 1 }}>{val}</p>
                <p style={{ fontSize: '.72rem', color: T.muted, marginTop: '.25rem', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '.06em' }}>{lbl}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right: photo panel */}
        <div style={{ position: 'relative', minHeight: '500px' }}>
          <Image
            src="/brand/workshop.jpg"
            alt="Tu Luz community"
            fill
            style={{ objectFit: 'cover', objectPosition: 'center 20%' }}
            priority
          />
          {/* Subtle left edge blend */}
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(253,250,244,.25) 0%, transparent 20%)' }} />
          {/* Bottom caption */}
          <div style={{
            position: 'absolute', bottom: '1.75rem', left: '1.75rem', right: '1.75rem',
            background: 'rgba(26,15,5,.75)', backdropFilter: 'blur(12px)',
            borderRadius: '12px', padding: '1rem 1.25rem',
            border: '1px solid rgba(240,217,168,.15)',
          }}>
            <p style={{ fontFamily: serif, fontStyle: 'italic', color: T.goldLt, fontSize: '.95rem', lineHeight: 1.55, marginBottom: '.35rem' }}>
              &ldquo;Tuluz me dio las herramientas para hacer visible lo que siempre supe que tenía.&rdquo;
            </p>
            <p style={{ fontFamily: sans, fontSize: '.72rem', color: 'rgba(196,168,122,.7)', fontWeight: 500, letterSpacing: '.05em', textTransform: 'uppercase' }}>
              Verónica Elena Carmona · Fundadora
            </p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          DARK STATS BAR
      ══════════════════════════════════════════════════════ */}
      <div style={{ background: T.dark, borderBottom: `1px solid rgba(240,217,168,.08)` }}>
        <div style={{ maxWidth: '72rem', margin: '0 auto', padding: '0 2rem', display: 'flex', flexWrap: 'wrap' }}>
          {[
            { val: '500+', lbl: t.stats.entrepreneurs },
            { val: '12',   lbl: t.stats.countries },
            { val: '85%',  lbl: t.stats.satisfaction },
            { val: '€2M+', lbl: t.stats.impact },
          ].map(({ val, lbl }, i, arr) => (
            <div key={lbl} style={{
              flex: '1 1 140px', padding: '2.25rem 1.5rem', textAlign: 'center',
              borderRight: i < arr.length - 1 ? '1px solid rgba(240,217,168,.08)' : 'none',
            }}>
              <p style={{ fontFamily: serif, fontSize: '2.5rem', fontWeight: 700, color: T.goldLt, lineHeight: 1, marginBottom: '.4rem' }}>{val}</p>
              <p style={{ fontFamily: sans, fontSize: '.72rem', color: T.muted, fontWeight: 500, letterSpacing: '.08em', textTransform: 'uppercase' }}>{lbl}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          AI MENTOR — White, asymmetric
      ══════════════════════════════════════════════════════ */}
      <section style={{ padding: '7rem 0', background: T.white }}>
        <div style={{ maxWidth: '72rem', margin: '0 auto', padding: '0 2rem' }}>
          {/* Header row */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', marginBottom: '4.5rem', alignItems: 'end' }}>
            <div>
              <Eyebrow>{t.ai.tag}</Eyebrow>
              <Divider />
              <h2 style={{ fontFamily: serif, fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', fontWeight: 700, lineHeight: 1.15, letterSpacing: '-0.02em', color: T.brown }}>
                {t.ai.h2a}<br />
                <em style={{ fontStyle: 'italic', color: T.gold }}>{t.ai.h2b}</em>
              </h2>
            </div>
            <p style={{ fontSize: '1.05rem', color: T.mid, lineHeight: 1.85 }}>{t.ai.sub}</p>
          </div>

          {/* Feature cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5px', background: T.border }}>
            {t.ai.features.map(({ icon, title, desc }: { icon: string; title: string; desc: string }, i: number) => (
              <div key={title} style={{
                background: T.white, padding: '2.25rem 2rem',
                transition: 'background .2s',
              }}
                onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.background = T.soft}
                onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.background = T.white}>
                <div style={{ fontFamily: serif, fontSize: '2.25rem', fontWeight: 700, color: T.border, lineHeight: 1, marginBottom: '1.25rem' }}>
                  0{i + 1}
                </div>
                <div style={{ fontSize: '1.5rem', marginBottom: '.875rem' }}>{icon}</div>
                <h3 style={{ fontFamily: serif, fontWeight: 700, fontSize: '1.1rem', color: T.brown, marginBottom: '.6rem' }}>{title}</h3>
                <p style={{ fontSize: '.9rem', color: T.mid, lineHeight: 1.75 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          COMMUNITY — Full-width editorial photo + overlay text
      ══════════════════════════════════════════════════════ */}
      <section style={{ position: 'relative', height: '520px', overflow: 'hidden' }}>
        <Image
          src="/brand/community.jpg"
          alt="Comunidad Tu Luz"
          fill
          style={{ objectFit: 'cover', objectPosition: 'center 35%' }}
        />
        {/* gradient: clear in center, dark at edges */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(26,15,5,.85) 0%, rgba(26,15,5,.45) 50%, rgba(26,15,5,.65) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center' }}>
          <div style={{ maxWidth: '72rem', margin: '0 auto', padding: '0 2rem', width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '3rem', flexWrap: 'wrap' }}>
            <div style={{ maxWidth: '42rem' }}>
              <Eyebrow light>{t.community.tag}</Eyebrow>
              <h2 style={{ fontFamily: serif, fontSize: 'clamp(2rem, 4vw, 3.25rem)', fontWeight: 700, lineHeight: 1.15, letterSpacing: '-0.02em', color: T.white, marginBottom: '1.25rem' }}>
                {t.community.h2a}{' '}
                <em style={{ fontStyle: 'italic', color: T.goldLt }}>{t.community.h2b}</em>
              </h2>
              <p style={{ fontSize: '1.05rem', color: 'rgba(234,217,188,.85)', lineHeight: 1.8, maxWidth: '34rem' }}>{t.community.sub}</p>
            </div>
            <Link href="/register" style={{
              display: 'inline-flex', alignItems: 'center', whiteSpace: 'nowrap',
              padding: '1rem 2.5rem', borderRadius: '10px',
              background: T.gold, color: T.white,
              fontWeight: 700, fontSize: '1rem', textDecoration: 'none',
              boxShadow: '0 4px 20px rgba(196,137,58,.40)',
              fontFamily: sans,
            }}>
              {t.community.cta}
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          COURSES — Soft bg
      ══════════════════════════════════════════════════════ */}
      <section style={{ padding: '7rem 0', background: T.soft }}>
        <div style={{ maxWidth: '72rem', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ marginBottom: '4rem' }}>
            <Eyebrow>{t.courses.tag}</Eyebrow>
            <Divider />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem' }}>
              <h2 style={{ fontFamily: serif, fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', fontWeight: 700, lineHeight: 1.15, letterSpacing: '-0.02em', color: T.brown }}>
                {t.courses.h2a}{' '}
                <em style={{ fontStyle: 'italic', color: T.gold }}>{t.courses.h2b}</em>
              </h2>
              <Link href="/courses" style={{ fontFamily: sans, fontSize: '.875rem', fontWeight: 600, color: T.gold, textDecoration: 'none', whiteSpace: 'nowrap' }}>{t.courses.viewAll}</Link>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {t.courses.modules.map(({ tag, title, desc, deliverable }: { tag: string; title: string; desc: string; deliverable: string }, i: number) => (
              <div key={title} style={{
                background: T.white, borderRadius: '1rem',
                overflow: 'hidden',
                boxShadow: '0 2px 12px rgba(45,30,15,.06), 0 1px 3px rgba(45,30,15,.04)',
                transition: 'box-shadow .25s, transform .25s',
              }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLDivElement; el.style.boxShadow = '0 8px 32px rgba(45,30,15,.12)'; el.style.transform = 'translateY(-3px)' }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLDivElement; el.style.boxShadow = '0 2px 12px rgba(45,30,15,.06), 0 1px 3px rgba(45,30,15,.04)'; el.style.transform = 'translateY(0)' }}>
                <div style={{ height: '3px', background: [T.gold, '#7B5296', '#3D8B6E'][i] }} />
                <div style={{ padding: '2rem' }}>
                  <p style={{ fontFamily: sans, fontSize: '.7rem', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: T.muted, marginBottom: '.875rem' }}>{tag}</p>
                  <h3 style={{ fontFamily: serif, fontSize: '1.2rem', fontWeight: 700, color: T.brown, marginBottom: '.75rem', lineHeight: 1.3 }}>{title}</h3>
                  <p style={{ fontFamily: sans, fontSize: '.875rem', color: T.mid, lineHeight: 1.8, marginBottom: '1.5rem' }}>{desc}</p>
                  <div style={{ borderTop: `1px solid ${T.border}`, paddingTop: '1rem', display: 'flex', alignItems: 'center', gap: '.5rem', fontSize: '.8rem', color: T.muted }}>
                    <span style={{ color: T.gold, fontSize: '.9rem' }}>📄</span>
                    <span>{t.courses.generates} <strong style={{ color: T.mid, fontWeight: 600 }}>{deliverable}</strong></span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          HOW IT WORKS — White, numbered steps
      ══════════════════════════════════════════════════════ */}
      <section style={{ padding: '7rem 0', background: T.white }}>
        <div style={{ maxWidth: '72rem', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ maxWidth: '44rem', marginBottom: '4.5rem' }}>
            <Eyebrow>{t.howItWorks.tag}</Eyebrow>
            <Divider />
            <h2 style={{ fontFamily: serif, fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', fontWeight: 700, lineHeight: 1.15, letterSpacing: '-0.02em', color: T.brown, marginBottom: '1rem' }}>
              {t.howItWorks.h2a}{' '}
              <em style={{ fontStyle: 'italic', color: T.gold }}>{t.howItWorks.h2b}</em>
            </h2>
            <p style={{ fontSize: '1.05rem', color: T.mid, lineHeight: 1.8 }}>{t.howItWorks.sub}</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0', position: 'relative' }}>
            {/* Connecting rule */}
            <div style={{ position: 'absolute', top: '28px', left: '7%', right: '7%', height: '1px', background: T.border, zIndex: 0 }} className="steps-rule" />
            {t.howItWorks.steps.map(({ step, icon, title, desc }: { step: string; icon: string; title: string; desc: string }) => (
              <div key={step} style={{ padding: '0 1.5rem', position: 'relative', zIndex: 1 }}>
                <div style={{
                  width: '56px', height: '56px',
                  background: T.white, border: `2px solid ${T.border}`,
                  borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.4rem', marginBottom: '1.25rem',
                  boxShadow: '0 2px 12px rgba(45,30,15,.08)',
                }}>{icon}</div>
                <p style={{ fontFamily: serif, fontSize: '.72rem', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: T.gold, marginBottom: '.35rem' }}>{step}</p>
                <h3 style={{ fontFamily: serif, fontWeight: 700, fontSize: '1.1rem', color: T.brown, marginBottom: '.5rem' }}>{title}</h3>
                <p style={{ fontFamily: sans, fontSize: '.875rem', color: T.mid, lineHeight: 1.75 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          AWARD / SOCIAL PROOF — Soft bg, asymmetric
      ══════════════════════════════════════════════════════ */}
      <section style={{ padding: '7rem 0', background: T.soft }}>
        <div style={{ maxWidth: '72rem', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'start' }}>
            {/* Text */}
            <div>
              <Eyebrow>{t.award.tag}</Eyebrow>
              <Divider />
              <h2 style={{ fontFamily: serif, fontSize: 'clamp(1.85rem, 3.5vw, 2.5rem)', fontWeight: 700, lineHeight: 1.15, letterSpacing: '-0.02em', color: T.brown, marginBottom: '1.25rem' }}>
                {t.award.h2a}<br />
                <em style={{ fontStyle: 'italic', color: T.gold }}>{t.award.h2b}</em>
              </h2>
              <p style={{ fontFamily: sans, fontSize: '1rem', color: T.mid, lineHeight: 1.85, marginBottom: '2rem' }}>{t.award.sub}</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {t.award.bullets.map((item: string) => (
                  <div key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '.875rem' }}>
                    <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: T.goldPale, border: `1px solid ${T.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '.65rem', flexShrink: 0, marginTop: '2px' }}>✓</div>
                    <span style={{ fontFamily: sans, fontSize: '.95rem', color: T.mid, lineHeight: 1.6 }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Photos */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '.875rem' }}>
              <div style={{ position: 'relative', height: '280px', borderRadius: '1rem', overflow: 'hidden', gridColumn: 'span 2', boxShadow: '0 4px 24px rgba(45,30,15,.12)' }}>
                <Image src="/brand/award.jpg" alt="Premio Lidera Mujer" fill style={{ objectFit: 'cover', objectPosition: 'center 25%' }} />
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(to top, rgba(26,15,5,.75) 0%, transparent 100%)', padding: '1.25rem' }}>
                  <p style={{ fontFamily: sans, fontSize: '.75rem', fontWeight: 600, color: T.goldLt, letterSpacing: '.06em', textTransform: 'uppercase' }}>Premio Lidera Mujer 2024</p>
                </div>
              </div>
              <div style={{ position: 'relative', height: '200px', borderRadius: '.875rem', overflow: 'hidden', boxShadow: '0 4px 16px rgba(45,30,15,.10)' }}>
                <Image src="/brand/session.jpg" alt="Sesión Tu Luz" fill style={{ objectFit: 'cover' }} />
              </div>
              <div style={{ position: 'relative', height: '200px', borderRadius: '.875rem', overflow: 'hidden', boxShadow: '0 4px 16px rgba(45,30,15,.10)' }}>
                <Image src="/brand/business.jpg" alt="Tu Luz formación" fill style={{ objectFit: 'cover' }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          MARKETPLACE — White
      ══════════════════════════════════════════════════════ */}
      <section style={{ padding: '7rem 0', background: T.white }}>
        <div style={{ maxWidth: '72rem', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '5rem', alignItems: 'start' }}>
            <div>
              <Eyebrow>{t.marketplace.tag}</Eyebrow>
              <Divider />
              <h2 style={{ fontFamily: serif, fontSize: 'clamp(1.85rem, 3.5vw, 2.5rem)', fontWeight: 700, lineHeight: 1.15, letterSpacing: '-0.02em', color: T.brown, marginBottom: '1.25rem' }}>
                {t.marketplace.h2a}<br />
                <em style={{ fontStyle: 'italic', color: T.gold }}>{t.marketplace.h2b}</em>
              </h2>
              <p style={{ fontSize: '1.05rem', color: T.mid, lineHeight: 1.85, marginBottom: '2rem' }}>{t.marketplace.sub}</p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '.75rem', marginBottom: '2.5rem' }}>
                {t.marketplace.features.map((item: string) => (
                  <li key={item} style={{ fontFamily: sans, fontSize: '.95rem', color: T.mid, lineHeight: 1.6 }}>{item}</li>
                ))}
              </ul>
              <Link href="/marketplace" style={{
                display: 'inline-flex', alignItems: 'center',
                padding: '.9rem 2.25rem', borderRadius: '10px',
                background: T.gold, color: T.white,
                fontWeight: 700, fontSize: '.95rem', textDecoration: 'none',
                fontFamily: sans,
                boxShadow: '0 4px 20px rgba(196,137,58,.30)',
              }}>
                {t.marketplace.cta}
              </Link>
            </div>

            {/* Sample listings */}
            <div>
              <p style={{ fontFamily: sans, fontSize: '.72rem', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: T.muted, marginBottom: '1.25rem' }}>
                Emprendedoras verificadas
              </p>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {[
                  { name: 'EcoTela Artesanal', country: 'México', sector: 'Moda sostenible', tags: ['Ambiental', 'Social'], color: '#3D8B6E' },
                  { name: 'Raíces Vivas', country: 'Colombia', sector: 'Agroecología', tags: ['Ambiental', 'Económico'], color: T.gold },
                  { name: 'Luz Solar Comunitaria', country: 'España', sector: 'Energía renovable', tags: ['Ambiental'], color: '#4A8FB5' },
                ].map((card, i, arr) => (
                  <div key={card.name} style={{
                    display: 'flex', alignItems: 'center', gap: '1rem',
                    padding: '1.1rem 0',
                    borderBottom: i < arr.length - 1 ? `1px solid ${T.border}` : 'none',
                    transition: 'background .15s',
                  }}>
                    <div style={{
                      width: '42px', height: '42px', borderRadius: '10px', flexShrink: 0,
                      background: `${card.color}18`, border: `1.5px solid ${card.color}40`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontFamily: serif, fontWeight: 700, fontSize: '1.1rem', color: card.color,
                    }}>{card.name[0]}</div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem', marginBottom: '.2rem' }}>
                        <p style={{ fontWeight: 600, fontSize: '.9rem', color: T.brown }}>{card.name}</p>
                        <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#3D8B6E', flexShrink: 0 }} title="Verificada" />
                      </div>
                      <p style={{ fontSize: '.78rem', color: T.muted }}>{card.country} · {card.sector}</p>
                    </div>
                    <div style={{ display: 'flex', gap: '.35rem', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                      {card.tags.map(tag => (
                        <span key={tag} style={{
                          fontSize: '.68rem', padding: '.15rem .55rem',
                          background: T.goldPale, color: T.goldDk,
                          borderRadius: '999px', fontWeight: 600, whiteSpace: 'nowrap',
                        }}>{tag}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <Link href="/marketplace" style={{ display: 'block', textAlign: 'center', padding: '.875rem', marginTop: '1.25rem', borderRadius: '10px', border: `1px solid ${T.border}`, fontFamily: sans, fontSize: '.875rem', fontWeight: 600, color: T.mid, textDecoration: 'none', transition: 'border-color .2s, color .2s' }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.borderColor = T.gold; el.style.color = T.gold }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.borderColor = T.border; el.style.color = T.mid }}>
                {t.marketplace.view} todas →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          MISSION — Dark cinematic strip
      ══════════════════════════════════════════════════════ */}
      <section style={{ padding: '7rem 0', background: `linear-gradient(160deg, ${T.dark} 0%, #2A1708 60%, #3A2010 100%)` }}>
        <div style={{ maxWidth: '72rem', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ maxWidth: '48rem', marginBottom: '4rem' }}>
            <Eyebrow light>{t.mission.tag}</Eyebrow>
            <Divider light />
            <h2 style={{ fontFamily: serif, fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, lineHeight: 1.15, letterSpacing: '-0.02em', color: T.white }}>
              {t.mission.h2a}<br />
              <em style={{ fontStyle: 'italic', color: T.goldLt }}>{t.mission.h2b}</em>
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '2px', background: 'rgba(240,217,168,.06)' }}>
            {t.mission.values.map(({ icon, title, desc }: { icon: string; title: string; desc: string }) => (
              <div key={title} style={{
                padding: '2.5rem 2rem', background: T.dark,
                transition: 'background .25s',
              }}
                onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.background = '#25140A'}
                onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.background = T.dark}>
                <div style={{ fontSize: '1.75rem', marginBottom: '1rem' }}>{icon}</div>
                <h3 style={{ fontFamily: serif, fontWeight: 700, fontSize: '1.05rem', color: T.goldLt, marginBottom: '.5rem' }}>{title}</h3>
                <p style={{ fontFamily: sans, fontSize: '.875rem', color: 'rgba(196,168,122,.7)', lineHeight: 1.75 }}>{desc}</p>
              </div>
            ))}
          </div>
          <div style={{ marginTop: '4.5rem', textAlign: 'center' }}>
            <p style={{ fontFamily: serif, fontSize: 'clamp(1.35rem, 2.5vw, 1.85rem)', fontStyle: 'italic', color: T.goldLt, lineHeight: 1.55, maxWidth: '40rem', margin: '0 auto', opacity: 0.85 }}>
              &ldquo;{t.mission.sub}&rdquo;
            </p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          CTA — Founder photo + strong close
      ══════════════════════════════════════════════════════ */}
      <section style={{ overflow: 'hidden', background: T.soft }}>
        <div style={{ maxWidth: '72rem', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', alignItems: 'stretch' }} className="cta-grid">
          {/* Photo */}
          <div style={{ position: 'relative', minHeight: '480px' }}>
            <Image
              src="/brand/founder.jpg"
              alt="Tu Luz"
              fill
              style={{ objectFit: 'cover', objectPosition: 'center top' }}
            />
          </div>
          {/* Text */}
          <div style={{ padding: '5rem 4rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Divider />
            <h2 style={{ fontFamily: serif, fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', fontWeight: 700, lineHeight: 1.15, letterSpacing: '-0.02em', color: T.brown, marginBottom: '1.25rem' }}>
              {t.cta.h2a}<br />
              <em style={{ fontStyle: 'italic', color: T.gold }}>{t.cta.h2b}</em>
            </h2>
            <p style={{ fontFamily: sans, fontSize: '1.05rem', color: T.mid, lineHeight: 1.85, marginBottom: '2.5rem' }}>{t.cta.sub}</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.875rem' }}>
              <Link href="/register" style={{
                display: 'inline-flex', alignItems: 'center',
                padding: '1rem 2.5rem', borderRadius: '10px',
                background: T.gold, color: T.white,
                fontWeight: 700, fontSize: '1rem', textDecoration: 'none',
                fontFamily: sans,
                boxShadow: '0 4px 20px rgba(196,137,58,.35)',
              }}>
                {t.cta.btn1}
              </Link>
              <Link href="/marketplace" style={{
                display: 'inline-flex', alignItems: 'center',
                padding: '1rem 2.5rem', borderRadius: '10px',
                border: `1.5px solid ${T.border}`,
                color: T.mid, fontWeight: 600, fontSize: '1rem',
                textDecoration: 'none', fontFamily: sans,
                background: 'transparent',
              }}>
                {t.cta.btn2}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .hero-grid > div:last-child { min-height: 320px !important; }
          .cta-grid { grid-template-columns: 1fr !important; }
          .steps-rule { display: none; }
        }
      `}</style>
    </div>
  )
}
