import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Hub Online | Tu Luz',
  description: 'El espacio digital de Tu Luz para emprendedoras con impacto: herramientas, recursos y comunidad en un solo lugar.',
}

const features = [
  { icon: '📚', title: 'Recursos y Herramientas', desc: 'Acceso a materiales, plantillas ESG y guías prácticas para tu negocio.' },
  { icon: '🤝', title: 'Comunidad Activa',        desc: 'Conecta con otras emprendedoras, mentoras y aliadas de la red Tu Luz.' },
  { icon: '🏅', title: 'Certificaciones',          desc: 'Gestiona y comparte tus insignias verificadas por la Asociación Tu Luz.' },
  { icon: '📊', title: 'Panel de Impacto',         desc: 'Visualiza y mide el impacto positivo de tu emprendimiento en tiempo real.' },
]

export default function HubOnlinePage() {
  return (
    <>
      <style>{`
        .hub-card { transition: box-shadow .2s, transform .2s; }
        .hub-card:hover { box-shadow: 0 8px 32px rgba(0,0,0,.08); transform: translateY(-2px); }
        .hub-btn-gold { transition: background .2s; }
        .hub-btn-gold:hover { background: #9E6A24 !important; }
        .hub-btn-outline { transition: border-color .2s, color .2s; }
        .hub-btn-outline:hover { border-color: #F0D9A8 !important; color: #fff !important; }
      `}</style>

      <div style={{ minHeight: '100vh', background: '#FDFAF4' }}>

        {/* Hero */}
        <section style={{
          background: 'linear-gradient(135deg, #2D1E0F 0%, #4A2E16 100%)',
          color: '#FDFAF4',
          padding: '6rem 2rem 5rem',
          textAlign: 'center',
        }}>
          <div style={{ maxWidth: '52rem', margin: '0 auto' }}>
            <span style={{
              display: 'inline-block',
              background: 'rgba(196,137,58,.18)',
              border: '1px solid rgba(196,137,58,.35)',
              color: '#F0D9A8',
              fontSize: '.75rem',
              fontFamily: "'Inter', system-ui, sans-serif",
              fontWeight: 600,
              letterSpacing: '.12em',
              textTransform: 'uppercase',
              padding: '.35rem .9rem',
              borderRadius: '20px',
              marginBottom: '1.5rem',
            }}>
              Próximamente
            </span>
            <h1 style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
              fontWeight: 700,
              lineHeight: 1.15,
              marginBottom: '1.25rem',
              color: '#F0D9A8',
            }}>
              Hub Online
            </h1>
            <p style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontSize: '1.1rem',
              lineHeight: 1.75,
              color: '#C4A87A',
              maxWidth: '36rem',
              margin: '0 auto',
            }}>
              Tu espacio digital para crecer, conectar y brillar junto a una comunidad de
              emprendedoras con impacto consciente.
            </p>
          </div>
        </section>

        {/* Feature cards */}
        <section style={{ maxWidth: '64rem', margin: '0 auto', padding: '5rem 2rem 0' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1.5rem',
          }}>
            {features.map(({ icon, title, desc }) => (
              <div key={title} className="hub-card" style={{
                background: '#FFFFFF',
                border: '1px solid #E5D4B0',
                borderRadius: '20px',
                padding: '2rem',
              }}>
                <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>{icon}</div>
                <h3 style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: '1.15rem',
                  fontWeight: 700,
                  color: '#1C1917',
                  marginBottom: '.5rem',
                }}>{title}</h3>
                <p style={{
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontSize: '.9rem',
                  lineHeight: 1.65,
                  color: '#6B4A2A',
                }}>{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section style={{ maxWidth: '64rem', margin: '0 auto', padding: '3rem 2rem 5rem' }}>
          <div style={{
            background: 'linear-gradient(135deg, #2D1E0F, #4A2E16)',
            borderRadius: '24px',
            padding: '3.5rem 2rem',
            textAlign: 'center',
            color: '#F0D9A8',
          }}>
            <h2 style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 'clamp(1.5rem, 3vw, 2rem)',
              fontWeight: 700,
              marginBottom: '1rem',
            }}>
              Estamos construyendo algo especial
            </h2>
            <p style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontSize: '1rem',
              lineHeight: 1.7,
              color: '#C4A87A',
              maxWidth: '32rem',
              margin: '0 auto 2rem',
            }}>
              El Hub Online estará disponible pronto. Únete al Bootcamp o visita el
              Marketplace mientras tanto.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="/courses" className="hub-btn-gold" style={{
                display: 'inline-block',
                padding: '.875rem 2rem',
                background: '#C4893A',
                color: '#fff',
                borderRadius: '12px',
                fontFamily: "'Inter', system-ui, sans-serif",
                fontWeight: 700,
                fontSize: '.95rem',
                textDecoration: 'none',
              }}>
                Ver Bootcamp →
              </a>
              <a href="/marketplace" className="hub-btn-outline" style={{
                display: 'inline-block',
                padding: '.875rem 2rem',
                background: 'transparent',
                color: '#F0D9A8',
                border: '1px solid rgba(196,137,58,.5)',
                borderRadius: '12px',
                fontFamily: "'Inter', system-ui, sans-serif",
                fontWeight: 600,
                fontSize: '.95rem',
                textDecoration: 'none',
              }}>
                Explorar Marketplace
              </a>
            </div>
          </div>
        </section>

      </div>
    </>
  )
}
