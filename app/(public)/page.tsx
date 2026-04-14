'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useLanguage } from '@/lib/i18n/LanguageContext'

/* ─── Design tokens ─────────────────────────────────────── */
const G = {
  gold:      '#C4893A',
  goldDark:  '#9E6A24',
  goldDeep:  '#7A5019',
  goldLight: '#F0D9A8',
  goldPale:  '#FAF1DC',
  bgSoft:    '#F6EFE0',
  bgWarm:    '#FDFAF4',
  text:      '#2D1E0F',
  textMid:   '#6B4A2A',
  textMuted: '#9C7A52',
  border:    '#E8D5B0',
  white:     '#FFFFFF',
  dark:      '#1E1208',
}

const serif   = "'Playfair Display', Georgia, serif"
const cardShadow = '0 2px 20px rgba(45,30,15,.07), 0 1px 4px rgba(45,30,15,.04)'
const cardShadowHover = '0 8px 32px rgba(45,30,15,.13), 0 2px 8px rgba(45,30,15,.06)'

/* ─── Helper: section tag ───────────────────────────────── */
function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span style={{
      display: 'inline-block', fontSize: '.72rem', fontWeight: 700,
      letterSpacing: '.12em', textTransform: 'uppercase',
      color: G.gold, marginBottom: '.75rem',
    }}>{children}</span>
  )
}

/* ─── Helper: section heading ───────────────────────────── */
function SectionHeading({ children, light }: { children: React.ReactNode; light?: boolean }) {
  return (
    <h2 style={{
      fontFamily: serif,
      fontSize: 'clamp(1.85rem, 3.5vw, 2.75rem)',
      fontWeight: 700, lineHeight: 1.2,
      color: light ? G.goldLight : G.text,
      marginBottom: '1rem',
    }}>{children}</h2>
  )
}

export default function LandingPage() {
  const { t } = useLanguage()

  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>

      {/* ══════════════════════════════════════════════════════
          HERO — Full-screen editorial
      ══════════════════════════════════════════════════════ */}
      <section style={{ position: 'relative', overflow: 'hidden', minHeight: '92vh', display: 'flex', alignItems: 'center' }}>
        {/* Photo */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <Image
            src="/brand/workshop.jpg"
            alt="Tu Luz community"
            fill
            style={{ objectFit: 'cover', objectPosition: 'center 25%' }}
            priority
          />
          {/* Layered gradient for depth */}
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(20,12,4,.92) 0%, rgba(30,18,8,.82) 45%, rgba(45,30,15,.50) 100%)' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(20,12,4,.6) 0%, transparent 50%)' }} />
        </div>

        <div style={{ position: 'relative', zIndex: 1, maxWidth: '72rem', margin: '0 auto', padding: '7rem 2rem 6rem', width: '100%' }}>
          {/* Badge */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '.5rem', marginBottom: '2rem', padding: '.4rem 1.1rem', borderRadius: '999px', background: 'rgba(196,137,58,.18)', border: '1px solid rgba(240,217,168,.35)', backdropFilter: 'blur(8px)' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: G.goldLight, flexShrink: 0 }} />
            <span style={{ fontSize: '.75rem', fontWeight: 600, color: G.goldLight, letterSpacing: '.07em' }}>{t.hero.badge}</span>
          </div>

          {/* Heading */}
          <h1 style={{ fontFamily: serif, fontSize: 'clamp(2.8rem, 6.5vw, 5rem)', fontWeight: 700, lineHeight: 1.1, marginBottom: '1.75rem', color: G.white, maxWidth: '700px' }}>
            {t.hero.h1a}
            <br />
            <em style={{ color: G.goldLight, fontStyle: 'italic' }}>{t.hero.h1b}</em>
          </h1>

          {/* Sub */}
          <p style={{ fontSize: '1.1rem', color: 'rgba(234,217,188,.88)', maxWidth: '36rem', marginBottom: '2.75rem', lineHeight: 1.85, fontWeight: 400 }}>
            {t.hero.sub}
          </p>

          {/* CTAs */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '4rem' }}>
            <Link href="/register" style={{
              display: 'inline-flex', alignItems: 'center',
              padding: '1rem 2.5rem', borderRadius: '12px',
              background: G.gold, color: G.white,
              fontWeight: 700, fontSize: '1rem', textDecoration: 'none',
              boxShadow: `0 4px 24px rgba(196,137,58,.5)`,
              letterSpacing: '.01em',
            }}>
              {t.hero.cta1}
            </Link>
            <Link href="/marketplace" style={{
              display: 'inline-flex', alignItems: 'center',
              padding: '1rem 2.5rem', borderRadius: '12px',
              border: '1.5px solid rgba(240,217,168,.5)',
              color: G.goldLight, fontWeight: 600, fontSize: '1rem',
              textDecoration: 'none',
              background: 'rgba(255,255,255,.06)',
              backdropFilter: 'blur(12px)',
            }}>
              {t.hero.cta2}
            </Link>
          </div>

          {/* Trust strips */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.875rem' }}>
            {[
              { icon: '🏆', label: 'Premio Lidera Mujer 2024' },
              { icon: '🌍', label: 'LATAM & Europa' },
              { icon: '♻️', label: 'Asociación sin fines de lucro' },
            ].map(item => (
              <div key={item.label} style={{
                display: 'flex', alignItems: 'center', gap: '.5rem',
                background: 'rgba(255,255,255,.08)', backdropFilter: 'blur(12px)',
                borderRadius: '8px', padding: '.45rem .9rem',
                border: '1px solid rgba(255,255,255,.12)',
              }}>
                <span style={{ fontSize: '1rem' }}>{item.icon}</span>
                <span style={{ fontSize: '.78rem', color: G.goldLight, fontWeight: 500 }}>{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom fade */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '120px', background: `linear-gradient(to top, ${G.dark} 0%, transparent 100%)`, zIndex: 1 }} />
      </section>

      {/* ══════════════════════════════════════════════════════
          STATS — Dark editorial band
      ══════════════════════════════════════════════════════ */}
      <div style={{ background: G.dark }}>
        <div style={{ maxWidth: '72rem', margin: '0 auto', padding: '2.5rem 2rem', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around', gap: '1.5rem' }}>
          {[
            { val: '500+', lbl: t.stats.entrepreneurs },
            { val: '12',   lbl: t.stats.countries },
            { val: '85%',  lbl: t.stats.satisfaction },
            { val: '€2M+', lbl: t.stats.impact },
          ].map(({ val, lbl }, i, arr) => (
            <div key={lbl} style={{ textAlign: 'center', position: 'relative', flex: '1 1 120px' }}>
              {i < arr.length - 1 && (
                <div style={{ position: 'absolute', right: 0, top: '10%', height: '80%', width: '1px', background: 'rgba(240,217,168,.12)' }} />
              )}
              <p style={{ fontFamily: serif, fontSize: '2.25rem', fontWeight: 700, color: G.goldLight, lineHeight: 1 }}>{val}</p>
              <p style={{ fontSize: '.78rem', color: '#9C7A52', marginTop: '.4rem', fontWeight: 500, letterSpacing: '.04em', textTransform: 'uppercase' }}>{lbl}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          AI MENTOR — White section
      ══════════════════════════════════════════════════════ */}
      <section style={{ padding: '6rem 2rem', background: G.white }}>
        <div style={{ maxWidth: '72rem', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '4rem', alignItems: 'center', marginBottom: '4rem' }}>
            <div>
              <Tag>{t.ai.tag}</Tag>
              <SectionHeading>
                {t.ai.h2a}<br />
                <em style={{ fontStyle: 'italic', color: G.gold }}>{t.ai.h2b}</em>
              </SectionHeading>
              <p style={{ fontSize: '1.05rem', color: G.textMid, lineHeight: 1.85, maxWidth: '32rem' }}>{t.ai.sub}</p>
            </div>
            {/* Decorative accent */}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <div style={{ width: '160px', height: '160px', borderRadius: '50%', background: `radial-gradient(circle at 30% 30%, ${G.goldLight}, ${G.goldPale})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '4rem', boxShadow: `0 20px 60px rgba(196,137,58,.20)` }}>
                🤖
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.25rem' }}>
            {t.ai.features.map(({ icon, title, desc }: { icon: string; title: string; desc: string }, i: number) => (
              <div key={title} style={{
                background: G.bgWarm,
                border: `1px solid ${G.border}`,
                borderRadius: '1.25rem',
                padding: '2rem 1.75rem',
                boxShadow: cardShadow,
                transition: 'box-shadow .25s, transform .25s',
                cursor: 'default',
                borderTop: `3px solid ${[G.gold, '#7B5296', '#4A8FB5', '#5B9A6C'][i]}`,
              }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLDivElement; el.style.boxShadow = cardShadowHover; el.style.transform = 'translateY(-2px)' }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLDivElement; el.style.boxShadow = cardShadow; el.style.transform = 'translateY(0)' }}>
                <div style={{
                  width: '48px', height: '48px',
                  background: `linear-gradient(135deg, ${G.goldPale}, ${G.goldLight})`,
                  borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.4rem', marginBottom: '1.25rem',
                }}>{icon}</div>
                <h3 style={{ fontWeight: 700, fontSize: '1rem', color: G.text, marginBottom: '.5rem', lineHeight: 1.3 }}>{title}</h3>
                <p style={{ fontSize: '.875rem', color: G.textMid, lineHeight: 1.75 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          COMMUNITY — Photo + text split, dark bg
      ══════════════════════════════════════════════════════ */}
      <section style={{ overflow: 'hidden', background: G.text }}>
        <div style={{ maxWidth: '72rem', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}>
          {/* Photo side */}
          <div style={{ position: 'relative', minHeight: '480px' }}>
            <Image
              src="/brand/community.jpg"
              alt="Comunidad Tu Luz"
              fill
              style={{ objectFit: 'cover', objectPosition: 'center top' }}
            />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, transparent 70%, rgba(45,30,15,.8))' }} />
          </div>
          {/* Text side */}
          <div style={{ padding: '5rem 3rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Tag>{t.community.tag}</Tag>
            <SectionHeading light>
              {t.community.h2a}<br />
              <em style={{ fontStyle: 'italic', color: G.gold }}>{t.community.h2b}</em>
            </SectionHeading>
            <p style={{ fontSize: '1rem', color: '#C4A87A', lineHeight: 1.9, marginBottom: '2rem', maxWidth: '30rem' }}>
              {t.community.sub}
            </p>
            <Link href="/register" style={{
              display: 'inline-flex', alignItems: 'center', alignSelf: 'flex-start',
              padding: '.9rem 2rem', borderRadius: '12px',
              background: G.gold, color: G.white,
              fontWeight: 600, fontSize: '.95rem', textDecoration: 'none',
              boxShadow: `0 4px 20px rgba(196,137,58,.35)`,
            }}>
              {t.community.cta}
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          COURSES — Warm soft bg
      ══════════════════════════════════════════════════════ */}
      <section style={{ padding: '6rem 2rem', background: G.bgSoft }}>
        <div style={{ maxWidth: '72rem', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <Tag>{t.courses.tag}</Tag>
            <SectionHeading>
              {t.courses.h2a}<br />
              <em style={{ fontStyle: 'italic', color: G.gold }}>{t.courses.h2b}</em>
            </SectionHeading>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {t.courses.modules.map(({ tag, title, desc, deliverable }: { tag: string; title: string; desc: string; deliverable: string }, i: number) => (
              <div key={title} style={{
                background: G.white,
                borderRadius: '1.25rem',
                overflow: 'hidden',
                boxShadow: cardShadow,
                transition: 'box-shadow .25s, transform .25s',
              }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLDivElement; el.style.boxShadow = cardShadowHover; el.style.transform = 'translateY(-3px)' }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLDivElement; el.style.boxShadow = cardShadow; el.style.transform = 'translateY(0)' }}>
                {/* Top accent bar */}
                <div style={{ height: '4px', background: [G.gold, '#7B5296', '#4A8FB5'][i] }} />
                <div style={{ padding: '2rem' }}>
                  <span style={{
                    display: 'inline-block', padding: '.2rem .875rem',
                    borderRadius: '999px', background: G.goldPale, color: G.goldDark,
                    fontSize: '.72rem', fontWeight: 700, letterSpacing: '.05em',
                    textTransform: 'uppercase', marginBottom: '1.1rem',
                  }}>{tag}</span>
                  <h3 style={{ fontFamily: serif, fontSize: '1.2rem', fontWeight: 700, color: G.text, marginBottom: '.6rem', lineHeight: 1.3 }}>{title}</h3>
                  <p style={{ fontSize: '.875rem', color: G.textMid, lineHeight: 1.8, marginBottom: '1.5rem' }}>{desc}</p>
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: '.5rem',
                    borderTop: `1px solid ${G.border}`, paddingTop: '1rem',
                    fontSize: '.8rem', color: G.textMuted,
                  }}>
                    <span style={{ color: G.gold }}>📄</span>
                    <span>{t.courses.generates} <strong style={{ color: G.textMid, fontWeight: 600 }}>{deliverable}</strong></span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <Link href="/courses" style={{
              display: 'inline-flex', alignItems: 'center',
              padding: '.9rem 2.25rem', borderRadius: '12px',
              background: G.gold, color: G.white,
              fontWeight: 600, fontSize: '.95rem', textDecoration: 'none',
              boxShadow: `0 4px 20px rgba(196,137,58,.30)`,
            }}>
              {t.courses.viewAll}
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          HOW IT WORKS — White with connected steps
      ══════════════════════════════════════════════════════ */}
      <section style={{ padding: '6rem 2rem', background: G.white }}>
        <div style={{ maxWidth: '72rem', margin: '0 auto', textAlign: 'center' }}>
          <Tag>{t.howItWorks.tag}</Tag>
          <SectionHeading>
            {t.howItWorks.h2a}<br />
            <em style={{ fontStyle: 'italic', color: G.gold }}>{t.howItWorks.h2b}</em>
          </SectionHeading>
          <p style={{ color: G.textMid, fontSize: '1.05rem', maxWidth: '34rem', margin: '0 auto 4rem', lineHeight: 1.8 }}>{t.howItWorks.sub}</p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', position: 'relative' }}>
            {t.howItWorks.steps.map(({ step, icon, title, desc }: { step: string; icon: string; title: string; desc: string }) => (
              <div key={step} style={{ textAlign: 'center', padding: '0 1rem' }}>
                {/* Step number badge */}
                <div style={{
                  width: '56px', height: '56px',
                  background: `linear-gradient(135deg, ${G.goldPale}, ${G.goldLight})`,
                  borderRadius: '50%', border: `2px solid ${G.gold}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.4rem', margin: '0 auto .75rem',
                  boxShadow: `0 4px 16px rgba(196,137,58,.20)`,
                }}>{icon}</div>
                <div style={{
                  fontFamily: serif, fontSize: '.72rem', fontWeight: 700,
                  color: G.goldDark, letterSpacing: '.1em', textTransform: 'uppercase',
                  marginBottom: '.4rem',
                }}>{step}</div>
                <h3 style={{ fontWeight: 700, fontSize: '1rem', color: G.text, marginBottom: '.4rem' }}>{title}</h3>
                <p style={{ fontSize: '.875rem', color: G.textMid, lineHeight: 1.7 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          AWARD / SOCIAL PROOF — Soft bg, photo grid
      ══════════════════════════════════════════════════════ */}
      <section style={{ padding: '6rem 2rem', background: G.bgSoft }}>
        <div style={{ maxWidth: '72rem', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3.5rem', alignItems: 'center' }}>
            {/* Text */}
            <div>
              <Tag>{t.award.tag}</Tag>
              <SectionHeading>
                {t.award.h2a}<br />
                <em style={{ fontStyle: 'italic', color: G.gold }}>{t.award.h2b}</em>
              </SectionHeading>
              <p style={{ fontSize: '1rem', color: G.textMid, lineHeight: 1.85, marginBottom: '2rem' }}>{t.award.sub}</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '.875rem' }}>
                {t.award.bullets.map((item: string) => (
                  <div key={item} style={{ display: 'flex', gap: '.875rem', alignItems: 'flex-start' }}>
                    <div style={{ width: '2px', height: '100%', background: G.gold, flexShrink: 0, marginTop: '4px', borderRadius: '2px', alignSelf: 'stretch', minHeight: '16px' }} />
                    <span style={{ fontSize: '.95rem', color: G.textMid, lineHeight: 1.6 }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Photo grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div style={{ position: 'relative', height: '260px', borderRadius: '1.25rem', overflow: 'hidden', gridColumn: 'span 2', boxShadow: cardShadow }}>
                <Image src="/brand/award.jpg" alt="Premio Lidera Mujer" fill style={{ objectFit: 'cover', objectPosition: 'center 20%' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(20,12,4,.5) 0%, transparent 60%)' }} />
                <div style={{ position: 'absolute', bottom: '1rem', left: '1.25rem', color: G.goldLight, fontSize: '.8rem', fontWeight: 600 }}>Premio Lidera Mujer 2024</div>
              </div>
              <div style={{ position: 'relative', height: '190px', borderRadius: '1rem', overflow: 'hidden', boxShadow: cardShadow }}>
                <Image src="/brand/session.jpg" alt="Sesión Tu Luz" fill style={{ objectFit: 'cover' }} />
              </div>
              <div style={{ position: 'relative', height: '190px', borderRadius: '1rem', overflow: 'hidden', boxShadow: cardShadow }}>
                <Image src="/brand/business.jpg" alt="Formación Tu Luz" fill style={{ objectFit: 'cover' }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          MARKETPLACE — White bg
      ══════════════════════════════════════════════════════ */}
      <section style={{ padding: '6rem 2rem', background: G.white }}>
        <div style={{ maxWidth: '72rem', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>
            <div>
              <Tag>{t.marketplace.tag}</Tag>
              <SectionHeading>
                {t.marketplace.h2a}<br />
                <em style={{ fontStyle: 'italic', color: G.gold }}>{t.marketplace.h2b}</em>
              </SectionHeading>
              <p style={{ fontSize: '1.05rem', color: G.textMid, lineHeight: 1.85, marginBottom: '1.75rem' }}>{t.marketplace.sub}</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '.75rem', marginBottom: '2.5rem' }}>
                {t.marketplace.features.map((item: string) => (
                  <div key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '.75rem', fontSize: '.95rem', color: G.textMid, lineHeight: 1.5 }}>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <Link href="/marketplace" style={{
                display: 'inline-flex', alignItems: 'center',
                padding: '.9rem 2.25rem', borderRadius: '12px',
                background: G.gold, color: G.white,
                fontWeight: 600, fontSize: '.95rem', textDecoration: 'none',
                boxShadow: `0 4px 20px rgba(196,137,58,.30)`,
              }}>
                {t.marketplace.cta}
              </Link>
            </div>

            {/* Sample cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                { name: 'EcoTela Artesanal', country: 'México', sector: 'Moda sostenible', tags: ['🌿 Ambiental', '🤝 Social'], color: '#5B9A6C' },
                { name: 'Raíces Vivas', country: 'Colombia', sector: 'Agroecología', tags: ['🌿 Ambiental', '💼 Económico'], color: '#C4893A' },
                { name: 'Luz Solar Comunitaria', country: 'España', sector: 'Energía renovable', tags: ['🌿 Ambiental'], color: '#4A8FB5' },
              ].map((card) => (
                <div key={card.name} style={{
                  background: G.bgSoft,
                  border: `1px solid ${G.border}`,
                  borderRadius: '1rem',
                  padding: '1.1rem 1.25rem',
                  display: 'flex', alignItems: 'center', gap: '1rem',
                  boxShadow: cardShadow, transition: 'box-shadow .2s',
                }}
                  onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.boxShadow = cardShadowHover}
                  onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.boxShadow = cardShadow}>
                  {/* Avatar */}
                  <div style={{
                    width: '44px', height: '44px', flexShrink: 0,
                    background: `linear-gradient(135deg, ${card.color}22, ${card.color}44)`,
                    border: `2px solid ${card.color}55`,
                    borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: card.color, fontWeight: 800, fontSize: '1rem',
                  }}>
                    {card.name[0]}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontWeight: 600, fontSize: '.9rem', color: G.text, marginBottom: '.15rem' }}>{card.name}</p>
                    <p style={{ fontSize: '.78rem', color: G.textMuted, marginBottom: '.4rem' }}>{card.country} · {card.sector}</p>
                    <div style={{ display: 'flex', gap: '.35rem', flexWrap: 'wrap' }}>
                      {card.tags.map(tag => (
                        <span key={tag} style={{ fontSize: '.68rem', padding: '.1rem .55rem', background: G.goldPale, color: G.goldDeep, borderRadius: '999px', fontWeight: 600 }}>{tag}</span>
                      ))}
                    </div>
                  </div>
                  <span style={{ fontSize: '.8rem', color: G.gold, fontWeight: 600, flexShrink: 0 }}>{t.marketplace.view}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          MISSION — Dark cinematic
      ══════════════════════════════════════════════════════ */}
      <section style={{ padding: '6rem 2rem', background: `linear-gradient(145deg, ${G.dark} 0%, #2D1A08 50%, #3D2410 100%)` }}>
        <div style={{ maxWidth: '72rem', margin: '0 auto', textAlign: 'center' }}>
          <Tag>{t.mission.tag}</Tag>
          <h2 style={{ fontFamily: serif, fontSize: 'clamp(2rem, 4.5vw, 3.25rem)', fontWeight: 700, lineHeight: 1.2, color: G.white, marginBottom: '1.25rem' }}>
            {t.mission.h2a}<br />
            <em style={{ color: G.goldLight, fontStyle: 'italic' }}>{t.mission.h2b}</em>
          </h2>
          <p style={{ fontSize: '1.05rem', color: 'rgba(196,168,122,.85)', maxWidth: '40rem', margin: '0 auto 4rem', lineHeight: 1.85 }}>{t.mission.sub}</p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem' }}>
            {t.mission.values.map(({ icon, title, desc }: { icon: string; title: string; desc: string }) => (
              <div key={title} style={{
                background: 'rgba(255,255,255,.05)',
                border: '1px solid rgba(240,217,168,.12)',
                borderRadius: '1.25rem',
                padding: '2rem 1.5rem',
                transition: 'background .25s, border-color .25s',
              }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLDivElement; el.style.background = 'rgba(196,137,58,.1)'; el.style.borderColor = 'rgba(196,137,58,.35)' }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLDivElement; el.style.background = 'rgba(255,255,255,.05)'; el.style.borderColor = 'rgba(240,217,168,.12)' }}>
                <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>{icon}</div>
                <h3 style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '.5rem', color: G.goldLight }}>{title}</h3>
                <p style={{ fontSize: '.875rem', color: 'rgba(196,168,122,.75)', lineHeight: 1.7 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          CTA — Photo + text split
      ══════════════════════════════════════════════════════ */}
      <section style={{ overflow: 'hidden', background: G.bgSoft }}>
        <div style={{ maxWidth: '72rem', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr)', alignItems: 'stretch' }}>
          {/* Photo */}
          <div style={{ position: 'relative', minHeight: '420px' }}>
            <Image
              src="/brand/founder.jpg"
              alt="Tu Luz"
              fill
              style={{ objectFit: 'cover', objectPosition: 'center top' }}
            />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, transparent 50%, rgba(246,239,224,.7))' }} />
          </div>
          {/* Text */}
          <div style={{ padding: '5rem 3rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            {/* Gold accent line */}
            <div style={{ width: '40px', height: '3px', background: G.gold, borderRadius: '2px', marginBottom: '1.75rem' }} />
            <SectionHeading>
              {t.cta.h2a}<br />
              <em style={{ fontStyle: 'italic', color: G.gold }}>{t.cta.h2b}</em>
            </SectionHeading>
            <p style={{ color: G.textMid, fontSize: '1.05rem', marginBottom: '2.5rem', lineHeight: 1.85, maxWidth: '30rem' }}>{t.cta.sub}</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
              <Link href="/register" style={{
                display: 'inline-flex', alignItems: 'center',
                padding: '1rem 2.5rem', borderRadius: '12px',
                background: G.gold, color: G.white,
                fontWeight: 700, fontSize: '1rem', textDecoration: 'none',
                boxShadow: `0 4px 24px rgba(196,137,58,.35)`,
              }}>
                {t.cta.btn1}
              </Link>
              <Link href="/marketplace" style={{
                display: 'inline-flex', alignItems: 'center',
                padding: '1rem 2.5rem', borderRadius: '12px',
                border: `1.5px solid ${G.border}`,
                color: G.textMid, fontWeight: 600, fontSize: '1rem',
                textDecoration: 'none', background: 'transparent',
              }}>
                {t.cta.btn2}
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
