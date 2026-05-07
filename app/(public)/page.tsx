'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useLanguage } from '@/lib/i18n/LanguageContext'

/* ── Design tokens ─────────────────────────────────────────────────────────
   UI/UX Pro Max: Storytelling-Driven + Organic Biophilic
   Palette: Luxury/Premium Brand (#1C1917, #C4893A)                        */
const D = {
  gold:      '#C4893A',
  goldDk:    '#9E6A24',
  goldLt:    '#F0D9A8',
  goldPale:  '#FAF1DC',
  cream:     '#FDFAF4',
  soft:      '#F5ECD8',
  dark:      '#1C1917',
  darkMid:   '#28160A',
  ink:       '#0C0A09',
  brown:     '#2D1E0F',
  mid:       '#6B4A2A',
  muted:     '#9C7A52',
  border:    '#E5D4B0',
  white:     '#FFFFFF',
}
const serif = "'Playfair Display', Georgia, serif"
const sans  = "'Inter', system-ui, sans-serif"
const shadow    = '0 8px 32px rgba(0,0,0,0.08)'
const shadowHov = '0 16px 48px rgba(0,0,0,0.14)'

/* ── Reusable atoms ─────────────────────────────────────────────────────── */
function Eyebrow({ label, light }: { label: string; light?: boolean }) {
  return (
    <p style={{ fontFamily: sans, fontSize: '.72rem', fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase', color: light ? 'rgba(240,217,168,.75)' : D.gold, marginBottom: '.75rem' }}>
      {label}
    </p>
  )
}
function Accent({ light, center }: { light?: boolean; center?: boolean }) {
  return <div style={{ width: '36px', height: '2px', background: light ? 'rgba(240,217,168,.5)' : D.gold, borderRadius: '2px', marginBottom: '1.75rem', margin: center ? '0 auto 1.75rem' : undefined }} />
}

/* ── Page ─────────────────────────────────────────────────────────────────── */
export default function LandingPage() {
  const { t } = useLanguage()

  return (
    <div style={{ fontFamily: sans, color: D.brown, overflowX: 'hidden' }}>

      {/* ═══════════════════════════════════════════════════════════
          1. HERO — Full-bleed photo + emotional hook
          BDD: "ve el título Haz brillar tu negocio con impacto
                consciente" + CTA "Únete al Bootcamp"
          ═══════════════════════════════════════════════════════════ */}
      <section style={{ position: 'relative', minHeight: 'calc(100vh - 4rem)', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0 }}>
          <Image src="/brand/workshop.jpg" alt="Tu Luz — Emprendedoras con impacto" fill style={{ objectFit: 'cover', objectPosition: 'center 22%' }} priority />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(105deg, rgba(12,8,4,.94) 0%, rgba(20,13,6,.86) 42%, rgba(30,20,10,.60) 72%, rgba(28,25,23,.35) 100%)' }} />
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '160px', background: `linear-gradient(to top, ${D.dark}, transparent)` }} />
        </div>

        <div style={{ position: 'relative', zIndex: 1, maxWidth: '72rem', margin: '0 auto', padding: '6rem 2rem 8rem', width: '100%' }}>
          {/* Award pill */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '.5rem', background: 'rgba(196,137,58,.15)', border: '1px solid rgba(240,217,168,.25)', borderRadius: '999px', padding: '.35rem 1.1rem', marginBottom: '2.25rem', backdropFilter: 'blur(8px)' }}>
            <span style={{ fontSize: '.85rem' }}>🏆</span>
            <span style={{ fontFamily: sans, fontSize: '.75rem', fontWeight: 600, color: D.goldLt, letterSpacing: '.05em' }}>Premio Lidera Mujer 2025</span>
          </div>

          <h1 style={{ fontFamily: serif, fontSize: 'clamp(3rem, 6.5vw, 5.25rem)', fontWeight: 700, lineHeight: 1.08, letterSpacing: '-0.025em', color: D.white, maxWidth: '720px', marginBottom: '1.75rem' }}>
            {t.hero.h1a}<br />
            <em style={{ fontStyle: 'italic', color: D.goldLt }}>{t.hero.h1b}</em>
          </h1>

          <p style={{ fontFamily: sans, fontSize: '1.1rem', color: 'rgba(234,217,188,.85)', maxWidth: '38rem', lineHeight: 1.85, marginBottom: '2.75rem' }}>
            {t.hero.sub}
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '4.5rem' }}>
            <Link href="/courses" style={{ display: 'inline-flex', alignItems: 'center', gap: '.4rem', padding: '1rem 2.5rem', borderRadius: '12px', background: D.gold, color: D.white, fontFamily: sans, fontWeight: 700, fontSize: '1rem', textDecoration: 'none', boxShadow: '0 4px 24px rgba(196,137,58,.45)', transition: 'all .2s' }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = D.goldDk; el.style.transform = 'translateY(-2px)'; el.style.boxShadow = '0 8px 32px rgba(196,137,58,.50)' }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = D.gold; el.style.transform = 'translateY(0)'; el.style.boxShadow = '0 4px 24px rgba(196,137,58,.45)' }}>
              {t.hero.cta1}
            </Link>
            <Link href="/marketplace" style={{ display: 'inline-flex', alignItems: 'center', padding: '1rem 2.5rem', borderRadius: '12px', border: '1.5px solid rgba(240,217,168,.40)', color: D.goldLt, fontFamily: sans, fontWeight: 600, fontSize: '1rem', textDecoration: 'none', background: 'rgba(255,255,255,.06)', backdropFilter: 'blur(10px)', transition: 'border-color .2s, background .2s' }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.borderColor = 'rgba(240,217,168,.75)'; el.style.background = 'rgba(255,255,255,.10)' }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.borderColor = 'rgba(240,217,168,.40)'; el.style.background = 'rgba(255,255,255,.06)' }}>
              {t.hero.cta2}
            </Link>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.75rem' }}>
            {[
              { icon: '🌍', text: 'LATAM & Europa' },
              { icon: '♻️', text: 'Asociación sin fines de lucro' },
              { icon: '✅', text: 'Perfiles certificados verificados' },
            ].map(item => (
              <div key={item.text} style={{ display: 'inline-flex', alignItems: 'center', gap: '.45rem', background: 'rgba(255,255,255,.07)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,.10)', borderRadius: '8px', padding: '.4rem .875rem' }}>
                <span style={{ fontSize: '.9rem' }}>{item.icon}</span>
                <span style={{ fontFamily: sans, fontSize: '.75rem', color: 'rgba(234,217,188,.85)', fontWeight: 500 }}>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          2. STATS BAR — dark, Playfair numerals
          ═══════════════════════════════════════════════════════════ */}
      <div style={{ background: D.dark }}>
        <div style={{ maxWidth: '72rem', margin: '0 auto', display: 'flex', flexWrap: 'wrap' }}>
          {[
            { val: '500+', lbl: t.stats.entrepreneurs },
            { val: '12',   lbl: t.stats.countries },
            { val: '85%',  lbl: t.stats.satisfaction },
            { val: '€2M+', lbl: t.stats.impact },
          ].map(({ val, lbl }, i, arr) => (
            <div key={lbl} style={{ flex: '1 1 140px', padding: '2.5rem 1.5rem', textAlign: 'center', borderRight: i < arr.length - 1 ? '1px solid rgba(240,217,168,.07)' : 'none' }}>
              <p style={{ fontFamily: serif, fontSize: '2.75rem', fontWeight: 700, color: D.goldLt, lineHeight: 1, marginBottom: '.4rem' }}>{val}</p>
              <p style={{ fontFamily: sans, fontSize: '.72rem', color: '#9C7A52', fontWeight: 500, letterSpacing: '.09em', textTransform: 'uppercase' }}>{lbl}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════
          3. PREMIO MUJER LIDERA
          BDD: "ve foto award.jpg optimizada" +
               "ve texto Premio Mujer Lidera Social 2025"
          ═══════════════════════════════════════════════════════════ */}
      <section style={{ padding: '7rem 2rem', background: D.soft }}>
        <div style={{ maxWidth: '72rem', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '5rem', alignItems: 'center' }} className="premio-grid">
            {/* Photo */}
            <div style={{ position: 'relative', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 20px 64px rgba(0,0,0,.16)' }}>
              <div style={{ position: 'relative', height: '440px' }}>
                <Image src="/brand/award.jpg" alt="Premio Mujer Lidera Social 2025" fill style={{ objectFit: 'cover', objectPosition: 'center 20%' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(12,8,4,.60) 0%, transparent 55%)' }} />
                <div style={{ position: 'absolute', bottom: '1.5rem', left: '1.75rem', right: '1.75rem' }}>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '.5rem', background: 'rgba(196,137,58,.20)', border: '1px solid rgba(240,217,168,.30)', borderRadius: '8px', padding: '.4rem .875rem', backdropFilter: 'blur(8px)' }}>
                    <span style={{ fontFamily: sans, fontSize: '.72rem', fontWeight: 700, color: D.goldLt, letterSpacing: '.06em', textTransform: 'uppercase' }}>Premio Mujer Lidera Social 2025</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Text */}
            <div>
              <Eyebrow label={t.premio.eyebrow} />
              <Accent />
              <h2 style={{ fontFamily: serif, fontSize: 'clamp(2rem, 3.5vw, 2.875rem)', fontWeight: 700, lineHeight: 1.15, letterSpacing: '-0.025em', color: D.brown, marginBottom: '1.25rem' }}>
                {t.premio.h2a}<br />
                <em style={{ fontStyle: 'italic', color: D.gold }}>{t.premio.h2b}</em>
              </h2>
              <p style={{ fontFamily: sans, fontSize: '1.05rem', color: D.mid, lineHeight: 1.9, marginBottom: '2rem', maxWidth: '38rem' }}>{t.premio.desc}</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '.875rem' }}>
                {t.premio.bullets.map((item: string) => (
                  <div key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                    <div style={{ width: '22px', height: '22px', borderRadius: '50%', flexShrink: 0, background: D.goldPale, border: `1.5px solid ${D.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sans, fontSize: '.65rem', fontWeight: 700, color: D.gold, marginTop: '2px' }}>✓</div>
                    <span style={{ fontFamily: sans, fontSize: '.95rem', color: D.mid, lineHeight: 1.65 }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          4. SOBRE TU LUZ
          BDD: "ve descripción de la asociación" +
               "ve CTA Descubre más sobre nosotras → /nosotras"
          ═══════════════════════════════════════════════════════════ */}
      <section style={{ padding: '7rem 2rem', background: D.white, textAlign: 'center' }}>
        <div style={{ maxWidth: '52rem', margin: '0 auto' }}>
          <Eyebrow label={t.sobreTuluz.eyebrow} />
          <Accent center />
          <h2 style={{ fontFamily: serif, fontSize: 'clamp(2rem, 3.5vw, 2.875rem)', fontWeight: 700, lineHeight: 1.15, letterSpacing: '-0.025em', color: D.brown, marginBottom: '1.5rem' }}>
            {t.sobreTuluz.h2a}<br />
            <em style={{ fontStyle: 'italic', color: D.gold }}>{t.sobreTuluz.h2b}</em>
          </h2>
          <p style={{ fontFamily: sans, fontSize: '1.1rem', color: D.mid, lineHeight: 1.9, maxWidth: '44rem', margin: '0 auto 2.5rem' }}>
            {t.sobreTuluz.desc}
          </p>
          <Link href="/nosotras" style={{ display: 'inline-flex', alignItems: 'center', padding: '1rem 2.5rem', borderRadius: '12px', background: D.gold, color: D.white, fontFamily: sans, fontWeight: 700, fontSize: '1rem', textDecoration: 'none', boxShadow: '0 4px 20px rgba(196,137,58,.30)', transition: 'all .2s' }}
            onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = D.goldDk; el.style.transform = 'translateY(-2px)' }}
            onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = D.gold; el.style.transform = 'translateY(0)' }}>
            {t.sobreTuluz.cta} →
          </Link>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          5. QUÉ HACEMOS — 3 cards with bullets + "Saber más"
          BDD: "ve 3 bloques tipo cards: Formación con propósito,
               Certificación verificable, Conexión con empresas"
               "cada card tiene bullets descriptivos"
               "ve botón Saber más en cada card"
          ═══════════════════════════════════════════════════════════ */}
      <section style={{ padding: '7rem 2rem', background: D.soft }}>
        <div style={{ maxWidth: '72rem', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <Eyebrow label={t.queHacemos.eyebrow} />
            <Accent center />
            <h2 style={{ fontFamily: serif, fontSize: 'clamp(2rem, 3.5vw, 2.875rem)', fontWeight: 700, lineHeight: 1.15, letterSpacing: '-0.025em', color: D.brown }}>
              {t.queHacemos.h2a}<br />
              <em style={{ fontStyle: 'italic', color: D.gold }}>{t.queHacemos.h2b}</em>
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {t.queHacemos.cards.map(({ icon, title, bullets, cta, href }: { icon: string; title: string; bullets: string[]; cta: string; href: string }, i: number) => (
              <div key={title} style={{ background: D.white, borderRadius: '20px', overflow: 'hidden', boxShadow: shadow, border: `1px solid ${D.border}`, display: 'flex', flexDirection: 'column', transition: 'box-shadow .3s, transform .3s' }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLDivElement; el.style.boxShadow = shadowHov; el.style.transform = 'translateY(-4px)' }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLDivElement; el.style.boxShadow = shadow; el.style.transform = 'translateY(0)' }}>
                {/* Accent bar */}
                <div style={{ height: '3px', background: [D.gold, '#7B5296', '#3D8B6E'][i] }} />
                <div style={{ padding: '2.25rem 2rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ fontSize: '2rem', marginBottom: '1.1rem' }}>{icon}</div>
                  <h3 style={{ fontFamily: serif, fontSize: '1.25rem', fontWeight: 700, color: D.brown, marginBottom: '1.25rem', lineHeight: 1.25 }}>{title}</h3>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '.625rem', marginBottom: '2rem', flex: 1 }}>
                    {bullets.map((bullet: string) => (
                      <li key={bullet} style={{ display: 'flex', alignItems: 'flex-start', gap: '.75rem' }}>
                        <span style={{ color: D.gold, fontWeight: 700, fontSize: '.85rem', marginTop: '.1rem', flexShrink: 0 }}>→</span>
                        <span style={{ fontFamily: sans, fontSize: '.9rem', color: D.mid, lineHeight: 1.65 }}>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href={href} style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: '.75rem 1.75rem', borderRadius: '10px', border: `1.5px solid ${D.border}`, color: D.mid, fontFamily: sans, fontWeight: 600, fontSize: '.875rem', textDecoration: 'none', transition: 'border-color .2s, color .2s, background .2s' }}
                    onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.borderColor = D.gold; el.style.color = D.gold; el.style.background = D.goldPale }}
                    onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.borderColor = D.border; el.style.color = D.mid; el.style.background = 'transparent' }}>
                    {cta} →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          6. PROGRAMAS — 4 program blocks (2×2 grid)
          BDD: "ve los 4 programas: Bootcamp de verano, Marketplace,
               Mentoría IA + humana, Certificación i4DHARMA"
          ═══════════════════════════════════════════════════════════ */}
      <section style={{ padding: '7rem 2rem', background: D.white }}>
        <div style={{ maxWidth: '72rem', margin: '0 auto' }}>
          <div style={{ marginBottom: '4rem' }}>
            <Eyebrow label={t.programas.eyebrow} />
            <Accent />
            <h2 style={{ fontFamily: serif, fontSize: 'clamp(2rem, 3.5vw, 2.875rem)', fontWeight: 700, lineHeight: 1.15, letterSpacing: '-0.025em', color: D.brown, maxWidth: '560px' }}>
              {t.programas.h2a}<br />
              <em style={{ fontStyle: 'italic', color: D.gold }}>{t.programas.h2b}</em>
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1px', background: D.border }}>
            {t.programas.items.map(({ tag, title, desc, href, cta }: { tag: string; title: string; desc: string; href: string; cta: string }, i: number) => (
              <div key={title} style={{ background: D.white, padding: '2.75rem 2.5rem', transition: 'background .2s', cursor: 'default' }}
                onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.background = D.soft}
                onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.background = D.white}>
                <p style={{ fontFamily: serif, fontSize: '3.5rem', fontWeight: 700, color: 'rgba(196,137,58,.12)', lineHeight: 1, marginBottom: '.75rem', letterSpacing: '-0.03em' }}>
                  {String(i + 1).padStart(2, '0')}
                </p>
                <span style={{ display: 'inline-block', fontFamily: sans, fontSize: '.7rem', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: D.gold, background: D.goldPale, border: `1px solid ${D.border}`, borderRadius: '999px', padding: '.2rem .75rem', marginBottom: '1rem' }}>{tag}</span>
                <h3 style={{ fontFamily: serif, fontWeight: 700, fontSize: '1.3rem', color: D.brown, lineHeight: 1.2, marginBottom: '.875rem' }}>{title}</h3>
                <p style={{ fontFamily: sans, fontSize: '.9rem', color: D.mid, lineHeight: 1.85, marginBottom: '1.75rem' }}>{desc}</p>
                <Link href={href} style={{ fontFamily: sans, fontSize: '.875rem', fontWeight: 600, color: D.gold, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '.3rem', transition: 'gap .2s' }}
                  onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.gap = '.55rem'}
                  onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.gap = '.3rem'}>
                  {cta} →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          7. FRASE DESTACADA
          BDD: "ve la frase De emprendedora a empresaria certificada"
               "la sección se distingue visualmente del resto"
          ═══════════════════════════════════════════════════════════ */}
      <section style={{ padding: '6rem 2rem', background: `linear-gradient(135deg, ${D.dark} 0%, ${D.darkMid} 60%, #3A2010 100%)`, textAlign: 'center' }}>
        <div style={{ maxWidth: '56rem', margin: '0 auto' }}>
          <div style={{ width: '48px', height: '2px', background: 'rgba(240,217,168,.30)', borderRadius: '2px', margin: '0 auto 2rem' }} />
          <p style={{ fontFamily: serif, fontSize: 'clamp(1.75rem, 4vw, 3.25rem)', fontWeight: 700, fontStyle: 'italic', color: D.goldLt, lineHeight: 1.2, letterSpacing: '-0.02em', marginBottom: '1.25rem' }}>
            &ldquo;{t.fraseDestacada.text}&rdquo;
          </p>
          <p style={{ fontFamily: sans, fontSize: '.9rem', color: 'rgba(196,168,122,.65)', letterSpacing: '.06em', textTransform: 'uppercase', fontWeight: 500 }}>
            {t.fraseDestacada.sub}
          </p>
          <div style={{ width: '48px', height: '2px', background: 'rgba(240,217,168,.30)', borderRadius: '2px', margin: '2rem auto 0' }} />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          8. NOTICIAS — 3 article previews
          BDD: "ve 3 artículos recientes con título, imagen y enlace"
               "ve enlace a la página completa de noticias (/blog)"
          ═══════════════════════════════════════════════════════════ */}
      <section style={{ padding: '7rem 2rem', background: D.cream }}>
        <div style={{ maxWidth: '72rem', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem', marginBottom: '3.5rem' }}>
            <div>
              <Eyebrow label={t.noticias.eyebrow} />
              <Accent />
              <h2 style={{ fontFamily: serif, fontSize: 'clamp(2rem, 3.5vw, 2.875rem)', fontWeight: 700, lineHeight: 1.15, letterSpacing: '-0.025em', color: D.brown }}>
                {t.noticias.h2a}<br />
                <em style={{ fontStyle: 'italic', color: D.gold }}>{t.noticias.h2b}</em>
              </h2>
            </div>
            <Link href="/blog" style={{ fontFamily: sans, fontSize: '.875rem', fontWeight: 600, color: D.gold, textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0 }}>
              {t.noticias.viewAll}
            </Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {t.noticias.articles.map(({ category, title, excerpt, img, href }: { category: string; title: string; excerpt: string; img: string; href: string }) => (
              <Link key={title} href={href} style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', borderRadius: '20px', overflow: 'hidden', background: D.white, border: `1px solid ${D.border}`, boxShadow: shadow, transition: 'box-shadow .3s, transform .3s' }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.boxShadow = shadowHov; el.style.transform = 'translateY(-4px)' }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.boxShadow = shadow; el.style.transform = 'translateY(0)' }}>
                {/* Article image */}
                <div style={{ position: 'relative', height: '200px', overflow: 'hidden' }}>
                  <Image src={img} alt={title} fill style={{ objectFit: 'cover', transition: 'transform .4s' }} />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(12,8,4,.5) 0%, transparent 60%)' }} />
                  <span style={{ position: 'absolute', top: '1rem', left: '1rem', fontFamily: sans, fontSize: '.68rem', fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: D.goldLt, background: 'rgba(28,25,23,.55)', backdropFilter: 'blur(6px)', borderRadius: '6px', padding: '.25rem .6rem' }}>{category}</span>
                </div>
                {/* Article text */}
                <div style={{ padding: '1.75rem 1.75rem 2rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <h3 style={{ fontFamily: serif, fontWeight: 700, fontSize: '1.1rem', color: D.brown, lineHeight: 1.35, marginBottom: '.75rem', flex: 1 }}>{title}</h3>
                  <p style={{ fontFamily: sans, fontSize: '.875rem', color: D.muted, lineHeight: 1.75, marginBottom: '1.25rem' }}>{excerpt}</p>
                  <span style={{ fontFamily: sans, fontSize: '.8rem', fontWeight: 600, color: D.gold }}>Leer más →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          9. GALERÍA COMUNIDAD — Bento grid of certified women
          BDD: "ve el texto Tu Luz ya es una red activa"
               "ve tarjetas de mujeres certificadas en formato grid"
               "ve CTA Registra tu emprendimiento → /register"
          ═══════════════════════════════════════════════════════════ */}
      <section style={{ padding: '7rem 2rem', background: D.soft }}>
        <div style={{ maxWidth: '72rem', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center', marginBottom: '4rem' }} className="galeria-header">
            <div>
              <Eyebrow label={t.galeria.eyebrow} />
              <Accent />
              <h2 style={{ fontFamily: serif, fontSize: 'clamp(2rem, 3.5vw, 2.875rem)', fontWeight: 700, lineHeight: 1.15, letterSpacing: '-0.025em', color: D.brown }}>
                {t.galeria.h2a}<br />
                <em style={{ fontStyle: 'italic', color: D.gold }}>{t.galeria.h2b}</em>
              </h2>
            </div>
            <div>
              <p style={{ fontFamily: sans, fontSize: '1.05rem', color: D.mid, lineHeight: 1.9, marginBottom: '2rem' }}>{t.galeria.sub}</p>
              <Link href="/register" style={{ display: 'inline-flex', alignItems: 'center', padding: '1rem 2.5rem', borderRadius: '12px', background: D.gold, color: D.white, fontFamily: sans, fontWeight: 700, fontSize: '1rem', textDecoration: 'none', boxShadow: '0 4px 20px rgba(196,137,58,.30)', transition: 'all .2s' }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = D.goldDk; el.style.transform = 'translateY(-2px)' }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = D.gold; el.style.transform = 'translateY(0)' }}>
                {t.galeria.cta} →
              </Link>
            </div>
          </div>

          {/* Bento grid — certified entrepreneur cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gridTemplateRows: 'auto auto', gap: '1rem' }} className="bento-grid">
            {[
              { name: 'Ana García',        country: 'México',    sector: 'Moda sostenible',    color: '#C4893A', span: '1 / span 2' },
              { name: 'María López',       country: 'Colombia',  sector: 'Agroecología',       color: '#3D8B6E', span: 'auto' },
              { name: 'Carmen Rodríguez',  country: 'España',    sector: 'Energía renovable',  color: '#4A8FB5', span: 'auto' },
              { name: 'Isabel Martínez',   country: 'Perú',      sector: 'Educación inclusiva',color: '#7B5296', span: 'auto' },
              { name: 'Laura González',    country: 'Argentina', sector: 'Finanzas conscientes',color: '#B85C4A', span: 'auto' },
              { name: 'Sofía Castro',      country: 'Chile',     sector: 'Economía circular',  color: '#5A8F3D', span: 'auto' },
              { name: 'Patricia Morales',  country: 'Brasil',    sector: 'Salud comunitaria',  color: '#8F6B3D', span: 'auto' },
              { name: 'Alejandra Torres',  country: 'México',    sector: 'Turismo regenerativo',color: '#4A7A8F', span: 'auto' },
            ].map(({ name, country, sector, color, span }) => (
              <div key={name} style={{ gridColumn: span, background: D.white, borderRadius: '20px', padding: '1.75rem 1.5rem', border: `1px solid ${D.border}`, boxShadow: shadow, transition: 'box-shadow .2s, transform .2s', cursor: 'default' }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLDivElement; el.style.boxShadow = shadowHov; el.style.transform = 'scale(1.02)' }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLDivElement; el.style.boxShadow = shadow; el.style.transform = 'scale(1)' }}>
                {/* Avatar */}
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: `${color}18`, border: `2px solid ${color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: serif, fontSize: '1.25rem', fontWeight: 700, color, marginBottom: '1rem' }}>
                  {name[0]}
                </div>
                {/* Name + verified */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem', marginBottom: '.25rem' }}>
                  <p style={{ fontFamily: sans, fontWeight: 600, fontSize: '.95rem', color: D.brown }}>{name}</p>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#3D8B6E', flexShrink: 0 }} title="Verificada" />
                </div>
                <p style={{ fontFamily: sans, fontSize: '.78rem', color: D.muted, marginBottom: '.5rem' }}>{country}</p>
                <span style={{ fontFamily: sans, fontSize: '.72rem', fontWeight: 600, color, background: `${color}12`, border: `1px solid ${color}25`, borderRadius: '999px', padding: '.2rem .6rem', display: 'inline-block' }}>{sector}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          10. FINAL CTA — strong narrative close
          ═══════════════════════════════════════════════════════════ */}
      <section style={{ overflow: 'hidden', background: D.dark }}>
        <div style={{ maxWidth: '72rem', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: '520px' }} className="cta-grid">
          <div style={{ position: 'relative', minHeight: '480px' }}>
            <Image src="/brand/founder.jpg" alt="Tu Luz — Fundadora Verónica Elena Carmona" fill style={{ objectFit: 'cover', objectPosition: 'center top' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, transparent 55%, rgba(28,25,23,.7))' }} />
          </div>
          <div style={{ padding: '5rem 4rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Accent light />
            <h2 style={{ fontFamily: serif, fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontWeight: 700, lineHeight: 1.2, letterSpacing: '-0.025em', color: D.white, marginBottom: '1.25rem' }}>
              {t.cta.h2a}<br />
              <em style={{ fontStyle: 'italic', color: D.goldLt }}>{t.cta.h2b}</em>
            </h2>
            <p style={{ fontFamily: sans, fontSize: '1.05rem', color: 'rgba(196,168,122,.80)', lineHeight: 1.9, marginBottom: '2.5rem', maxWidth: '30rem' }}>{t.cta.sub}</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.875rem' }}>
              <Link href="/register" style={{ display: 'inline-flex', alignItems: 'center', padding: '1rem 2.5rem', borderRadius: '12px', background: D.gold, color: D.white, fontFamily: sans, fontWeight: 700, fontSize: '1rem', textDecoration: 'none', boxShadow: '0 4px 20px rgba(196,137,58,.32)', transition: 'all .2s' }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = D.goldDk; el.style.transform = 'translateY(-2px)' }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = D.gold; el.style.transform = 'translateY(0)' }}>
                {t.cta.btn1}
              </Link>
              <Link href="/marketplace" style={{ display: 'inline-flex', alignItems: 'center', padding: '1rem 2.5rem', borderRadius: '12px', border: '1.5px solid rgba(240,217,168,.25)', color: D.goldLt, fontFamily: sans, fontWeight: 600, fontSize: '1rem', textDecoration: 'none', background: 'transparent', transition: 'border-color .2s, color .2s' }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.borderColor = 'rgba(240,217,168,.60)' }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.borderColor = 'rgba(240,217,168,.25)' }}>
                {t.cta.btn2}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .cta-grid { grid-template-columns: 1fr !important; }
          .premio-grid { gap: 3rem !important; }
          .galeria-header { gap: 2rem !important; }
          .bento-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .bento-grid > div:first-child {
            grid-column: auto !important;
          }
        }
        @media (max-width: 480px) {
          .bento-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}
