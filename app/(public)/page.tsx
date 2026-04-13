'use client'

import Link from 'next/link'
import { useLanguage } from '@/lib/i18n/LanguageContext'

const gold        = '#C4893A'
const goldDark    = '#9E6A24'
const goldPale    = '#FAF1DC'
const goldLight   = '#F0D9A8'
const purple      = '#7B5296'
const bgSoft      = '#F9F2E6'
const textDark    = '#2D1E0F'
const textMuted   = '#9C7A52'
const textMid     = '#6B4A2A'
const border      = '#EAD9BC'
const white       = '#FFFFFF'

export default function LandingPage() {
  const { t } = useLanguage()

  return (
    <div>

      {/* ─── HERO ── */}
      <section style={{ background: `linear-gradient(145deg, #2D1E0F 0%, #5A3418 45%, ${gold} 100%)`, color: white, padding: '5rem 1.5rem 4rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-120px', right: '-80px', width: '420px', height: '420px', background: `radial-gradient(circle, ${gold}55 0%, transparent 70%)`, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-80px', left: '-60px', width: '300px', height: '300px', background: `radial-gradient(circle, ${purple}33 0%, transparent 70%)`, pointerEvents: 'none' }} />
        <div style={{ position: 'relative', maxWidth: '68rem', margin: '0 auto' }}>
          <span style={{ display: 'inline-block', marginBottom: '1.25rem', padding: '.35rem 1rem', borderRadius: '9999px', background: 'rgba(196,137,58,.2)', border: `1px solid ${gold}66`, fontSize: '.8rem', fontWeight: 600, color: goldLight, letterSpacing: '.05em' }}>
            {t.hero.badge}
          </span>
          <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(2.4rem, 5.5vw, 4rem)', fontWeight: 700, lineHeight: 1.15, marginBottom: '1.25rem' }}>
            {t.hero.h1a}<br />
            <em style={{ color: goldLight, fontStyle: 'italic' }}>{t.hero.h1b}</em>
          </h1>
          <p style={{ fontSize: '1.125rem', color: '#EAD9BC', maxWidth: '36rem', marginBottom: '2.25rem', lineHeight: 1.75 }}>
            {t.hero.sub}
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.875rem' }}>
            <Link href="/register" style={{ display: 'inline-flex', alignItems: 'center', padding: '.9rem 2.25rem', borderRadius: '14px', background: gold, color: white, fontWeight: 700, fontSize: '1rem', textDecoration: 'none' }}>
              {t.hero.cta1}
            </Link>
            <Link href="/marketplace" style={{ display: 'inline-flex', alignItems: 'center', padding: '.9rem 2.25rem', borderRadius: '14px', border: `2px solid ${gold}88`, color: goldLight, fontWeight: 600, fontSize: '1rem', textDecoration: 'none', background: 'transparent' }}>
              {t.hero.cta2}
            </Link>
          </div>
        </div>
      </section>

      {/* ─── STATS ── */}
      <div style={{ background: textDark, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '1rem', padding: '1.75rem 2rem', textAlign: 'center' }}>
        {[
          { val: '500+', lbl: t.stats.entrepreneurs },
          { val: '12',   lbl: t.stats.countries },
          { val: '85%',  lbl: t.stats.satisfaction },
          { val: '€2M+', lbl: t.stats.impact },
        ].map(({ val, lbl }) => (
          <div key={lbl}>
            <p style={{ fontSize: '1.875rem', fontWeight: 800, color: goldLight, lineHeight: 1 }}>{val}</p>
            <p style={{ fontSize: '.8rem', color: '#C4A87A', marginTop: '.3rem' }}>{lbl}</p>
          </div>
        ))}
      </div>

      {/* ─── AI FEATURES ── */}
      <section style={{ padding: '5rem 1.5rem', background: white }}>
        <div style={{ maxWidth: '68rem', margin: '0 auto' }}>
          <div style={{ maxWidth: '36rem', marginBottom: '3rem' }}>
            <p style={{ fontSize: '.75rem', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: gold, marginBottom: '.6rem' }}>{t.ai.tag}</p>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', fontWeight: 700, color: textDark, marginBottom: '1rem', lineHeight: 1.25 }}>
              {t.ai.h2a}<br />{t.ai.h2b}
            </h2>
            <p style={{ fontSize: '1.05rem', color: textMid, lineHeight: 1.75 }}>{t.ai.sub}</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
            {t.ai.features.map(({ icon, title, desc }: { icon: string; title: string; desc: string }) => (
              <div key={title} style={{ background: '#FDFAF4', border: `1px solid ${border}`, borderRadius: '1.25rem', padding: '1.75rem' }}>
                <div style={{ width: '3rem', height: '3rem', background: goldPale, borderRadius: '.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', marginBottom: '1rem' }}>{icon}</div>
                <h3 style={{ fontWeight: 700, fontSize: '1.05rem', color: textDark, marginBottom: '.5rem' }}>{title}</h3>
                <p style={{ fontSize: '.9rem', color: textMid, lineHeight: 1.7 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── COURSES ── */}
      <section style={{ padding: '5rem 1.5rem', background: bgSoft }}>
        <div style={{ maxWidth: '68rem', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <p style={{ fontSize: '.75rem', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: gold, marginBottom: '.6rem' }}>{t.courses.tag}</p>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', fontWeight: 700, color: textDark, lineHeight: 1.25 }}>
              {t.courses.h2a}<br />{t.courses.h2b}
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {t.courses.modules.map(({ tag, title, desc, deliverable }: { tag: string; title: string; desc: string; deliverable: string }, i: number) => (
              <div key={title} style={{ background: white, border: `1px solid ${border}`, borderRadius: '1.25rem', overflow: 'hidden' }}>
                <div style={{ height: '6px', background: [gold, purple, '#B5665A'][i] }} />
                <div style={{ padding: '1.75rem' }}>
                  <span style={{ display: 'inline-block', padding: '.25rem .875rem', borderRadius: '9999px', background: goldPale, color: goldDark, fontSize: '.75rem', fontWeight: 600, marginBottom: '1rem' }}>{tag}</span>
                  <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '1.2rem', fontWeight: 700, color: textDark, marginBottom: '.6rem', lineHeight: 1.3 }}>{title}</h3>
                  <p style={{ fontSize: '.875rem', color: textMid, lineHeight: 1.7, marginBottom: '1.25rem' }}>{desc}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem', fontSize: '.8rem', color: textMuted, borderTop: `1px solid ${border}`, paddingTop: '1rem' }}>
                    <span>📄</span>
                    <span>{t.courses.generates} <strong style={{ color: textMid }}>{deliverable}</strong></span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <Link href="/courses" style={{ display: 'inline-flex', alignItems: 'center', padding: '.85rem 2rem', borderRadius: '14px', background: gold, color: white, fontWeight: 600, fontSize: '.95rem', textDecoration: 'none' }}>
              {t.courses.viewAll}
            </Link>
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ── */}
      <section style={{ padding: '5rem 1.5rem', background: white }}>
        <div style={{ maxWidth: '68rem', margin: '0 auto', textAlign: 'center' }}>
          <p style={{ fontSize: '.75rem', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: gold, marginBottom: '.6rem' }}>{t.howItWorks.tag}</p>
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', fontWeight: 700, color: textDark, marginBottom: '1rem', lineHeight: 1.25 }}>
            {t.howItWorks.h2a}<br />{t.howItWorks.h2b}
          </h2>
          <p style={{ color: textMid, fontSize: '1.05rem', maxWidth: '34rem', margin: '0 auto 3rem', lineHeight: 1.75 }}>{t.howItWorks.sub}</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
            {t.howItWorks.steps.map(({ step, icon, title, desc }: { step: string; icon: string; title: string; desc: string }) => (
              <div key={step} style={{ textAlign: 'center' }}>
                <div style={{ width: '3.5rem', height: '3.5rem', background: goldPale, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', margin: '0 auto 1rem', border: `2px solid ${goldLight}` }}>{icon}</div>
                <div style={{ fontSize: '3rem', fontWeight: 900, color: goldLight, lineHeight: 1, fontFamily: "'Playfair Display', Georgia, serif", marginBottom: '.25rem' }}>{step}</div>
                <h3 style={{ fontWeight: 700, fontSize: '1.05rem', color: textDark, marginBottom: '.4rem' }}>{title}</h3>
                <p style={{ fontSize: '.875rem', color: textMid, lineHeight: 1.65 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── MARKETPLACE ── */}
      <section style={{ padding: '5rem 1.5rem', background: bgSoft }}>
        <div style={{ maxWidth: '68rem', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', alignItems: 'center' }}>
            <div>
              <p style={{ fontSize: '.75rem', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: gold, marginBottom: '.6rem' }}>{t.marketplace.tag}</p>
              <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', fontWeight: 700, color: textDark, marginBottom: '1rem', lineHeight: 1.25 }}>
                {t.marketplace.h2a}<br />{t.marketplace.h2b}
              </h2>
              <p style={{ fontSize: '1.05rem', color: textMid, lineHeight: 1.75, marginBottom: '1.75rem' }}>{t.marketplace.sub}</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '.75rem', marginBottom: '2rem' }}>
                {t.marketplace.features.map((item: string) => (
                  <div key={item} style={{ display: 'flex', gap: '.75rem', fontSize: '.95rem', color: textMid }}><span>{item}</span></div>
                ))}
              </div>
              <Link href="/marketplace" style={{ display: 'inline-flex', alignItems: 'center', padding: '.85rem 2rem', borderRadius: '14px', background: gold, color: white, fontWeight: 600, fontSize: '.95rem', textDecoration: 'none' }}>
                {t.marketplace.cta}
              </Link>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                { name: 'EcoTela Artesanal', country: 'México', sector: 'Moda sostenible', tags: ['🌿 Ambiental', '🤝 Social'] },
                { name: 'Raíces Vivas', country: 'Colombia', sector: 'Agroecología', tags: ['🌿 Ambiental', '💼 Económico'] },
                { name: 'Luz Solar Comunitaria', country: 'España', sector: 'Energía renovable', tags: ['🌿 Ambiental'] },
              ].map((card) => (
                <div key={card.name} style={{ background: white, border: `1px solid ${border}`, borderRadius: '1rem', padding: '1.1rem 1.25rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ width: '2.75rem', height: '2.75rem', flexShrink: 0, background: `linear-gradient(135deg, ${gold}, ${goldLight})`, borderRadius: '.625rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: white, fontWeight: 800, fontSize: '.9rem' }}>
                    {card.name[0]}
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontWeight: 600, fontSize: '.9rem', color: textDark }}>{card.name}</p>
                    <p style={{ fontSize: '.78rem', color: textMuted }}>{card.country} · {card.sector}</p>
                    <div style={{ display: 'flex', gap: '.4rem', marginTop: '.4rem', flexWrap: 'wrap' }}>
                      {card.tags.map(tag => (
                        <span key={tag} style={{ fontSize: '.7rem', padding: '.15rem .6rem', background: goldPale, color: goldDark, borderRadius: '9999px', fontWeight: 600 }}>{tag}</span>
                      ))}
                    </div>
                  </div>
                  <span style={{ fontSize: '.75rem', color: gold, fontWeight: 600 }}>{t.marketplace.view}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── MISSION ── */}
      <section style={{ padding: '5rem 1.5rem', background: `linear-gradient(145deg, ${textDark} 0%, #4A2D14 60%, #6B3D18 100%)`, color: white }}>
        <div style={{ maxWidth: '68rem', margin: '0 auto', textAlign: 'center' }}>
          <p style={{ fontSize: '.75rem', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: goldLight, marginBottom: '.6rem' }}>{t.mission.tag}</p>
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(1.75rem, 4vw, 3rem)', fontWeight: 700, lineHeight: 1.25, marginBottom: '1.25rem' }}>
            {t.mission.h2a}<br />
            <em style={{ color: goldLight, fontStyle: 'italic' }}>{t.mission.h2b}</em>
          </h2>
          <p style={{ fontSize: '1.05rem', color: '#EAD9BC', maxWidth: '42rem', margin: '0 auto 3rem', lineHeight: 1.75 }}>{t.mission.sub}</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1.5rem', marginTop: '1rem' }}>
            {t.mission.values.map(({ icon, title, desc }: { icon: string; title: string; desc: string }) => (
              <div key={title} style={{ background: 'rgba(255,255,255,.06)', border: '1px solid rgba(255,255,255,.12)', borderRadius: '1.25rem', padding: '1.5rem' }}>
                <div style={{ fontSize: '1.75rem', marginBottom: '.75rem' }}>{icon}</div>
                <h3 style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '.4rem', color: goldLight }}>{title}</h3>
                <p style={{ fontSize: '.85rem', color: '#C4A87A', lineHeight: 1.65 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ── */}
      <section style={{ padding: '5rem 1.5rem', background: bgSoft, textAlign: 'center' }}>
        <div style={{ maxWidth: '40rem', margin: '0 auto' }}>
          <div style={{ width: '4rem', height: '4rem', background: `linear-gradient(135deg, ${gold}, ${goldLight})`, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.75rem', margin: '0 auto 1.5rem' }}>✨</div>
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', fontWeight: 700, color: textDark, marginBottom: '1rem', lineHeight: 1.25 }}>
            {t.cta.h2a}<br />{t.cta.h2b}
          </h2>
          <p style={{ color: textMid, fontSize: '1.05rem', marginBottom: '2rem', lineHeight: 1.75 }}>{t.cta.sub}</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.875rem', justifyContent: 'center' }}>
            <Link href="/register" style={{ display: 'inline-flex', alignItems: 'center', padding: '.9rem 2.25rem', borderRadius: '14px', background: gold, color: white, fontWeight: 700, fontSize: '1rem', textDecoration: 'none' }}>
              {t.cta.btn1}
            </Link>
            <Link href="/marketplace" style={{ display: 'inline-flex', alignItems: 'center', padding: '.9rem 2.25rem', borderRadius: '14px', border: `2px solid ${border}`, color: textMid, fontWeight: 600, fontSize: '1rem', textDecoration: 'none', background: 'transparent' }}>
              {t.cta.btn2}
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
