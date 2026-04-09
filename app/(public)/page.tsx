import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tuluz — Emprendimiento Consciente con Impacto Positivo',
}

export default function LandingPage() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#1b4332] via-[#2d6a4f] to-[#40916c] text-white">
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        <div className="relative mx-auto max-w-6xl px-4 py-24 sm:py-32 lg:py-40">
          <div className="max-w-3xl">
            <span className="inline-block mb-4 px-4 py-1.5 text-sm font-medium
              bg-white/10 border border-white/20 rounded-full text-[#b7e4c7]">
              Asociación sin fines de lucro · Latinoamérica e Iberia
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Tu impacto positivo<br />
              <span className="text-[#95d5b2]">merece ser visto.</span>
            </h1>
            <p className="text-lg sm:text-xl text-[#d8f3dc] mb-10 leading-relaxed max-w-2xl">
              Tuluz certifica y conecta emprendedoras con impacto real con empresas
              que necesitan demostrar su cadena de valor sostenible. Construye tu MVP,
              obtén certificaciones ESG y accede al marketplace más comprometido
              de Latinoamérica e Iberia.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/register"
                className="inline-flex items-center justify-center px-8 py-4 text-base
                  font-semibold bg-white text-[#1b4332] rounded-xl hover:bg-[#d8f3dc]
                  transition-colors shadow-lg"
              >
                Empieza gratis →
              </Link>
              <Link
                href="/marketplace"
                className="inline-flex items-center justify-center px-8 py-4 text-base
                  font-semibold border-2 border-white/40 text-white rounded-xl
                  hover:border-white/70 hover:bg-white/10 transition-colors"
              >
                Ver el Marketplace
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-[#1b4332] text-white">
        <div className="mx-auto max-w-6xl px-4 py-8 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          {[
            { value: '500+', label: 'Emprendedoras' },
            { value: '12', label: 'Países' },
            { value: '85%', label: 'Satisfacción' },
            { value: '€2M+', label: 'Impacto generado' },
          ].map(({ value, label }) => (
            <div key={label}>
              <p className="text-3xl font-bold text-[#95d5b2]">{value}</p>
              <p className="text-sm text-[#b7e4c7] mt-1">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Problem / Solution */}
      <section className="mx-auto max-w-6xl px-4 py-20">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">El puente que faltaba</h2>
          <p className="text-[#5a8a6a] text-lg max-w-2xl mx-auto">
            Las regulaciones ESG obligan a las empresas a demostrar cadenas de valor
            sostenibles. Las emprendedoras crean ese valor pero son invisibles. Tuluz
            cambia eso.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white border border-[#b7e4c7] rounded-2xl p-8">
            <div className="w-12 h-12 bg-[#d8f3dc] rounded-xl flex items-center justify-center mb-4">
              <span className="text-2xl">🏭</span>
            </div>
            <h3 className="text-xl font-semibold mb-3">Para empresas (B2B)</h3>
            <p className="text-[#5a8a6a] leading-relaxed">
              Encuentra proveedoras certificadas que te permitan cumplir con normativas ESG,
              documentar tu impacto social y justificar ante auditores tu cadena de valor sostenible.
            </p>
          </div>
          <div className="bg-white border border-[#b7e4c7] rounded-2xl p-8">
            <div className="w-12 h-12 bg-[#d8f3dc] rounded-xl flex items-center justify-center mb-4">
              <span className="text-2xl">🌱</span>
            </div>
            <h3 className="text-xl font-semibold mb-3">Para emprendedoras</h3>
            <p className="text-[#5a8a6a] leading-relaxed">
              Certifica tu impacto, construye tu MVP guiada por IA, obtén insignias
              verificables y accede a un directorio donde compradores conscientes te
              buscan activamente.
            </p>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-[#f0faf4] py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Cómo funciona</h2>
            <p className="text-[#5a8a6a] text-lg">Tu camino hacia el impacto certificado</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Regístrate y crea tu perfil',
                desc: 'Cuéntanos sobre tu negocio, tu impacto y tus metas. En menos de 10 minutos ya eres parte de la comunidad.',
              },
              {
                step: '02',
                title: 'Aprende y construye tu MVP con IA',
                desc: 'Completa los módulos del curso y nuestra IA te examina, te guía y genera automáticamente cada pieza de tu plan de negocio.',
              },
              {
                step: '03',
                title: 'Certifícate y conéctate',
                desc: 'Obtén tus insignias verificables Tuluz, aparece en el Marketplace y conecta con empresas que buscan exactamente lo que tú ofreces.',
              },
            ].map(({ step, title, desc }) => (
              <div key={step} className="relative">
                <div className="text-6xl font-bold text-[#b7e4c7] mb-4">{step}</div>
                <h3 className="text-xl font-semibold mb-3">{title}</h3>
                <p className="text-[#5a8a6a] leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Differentiator */}
      <section className="mx-auto max-w-6xl px-4 py-20">
        <div className="bg-gradient-to-br from-[#1b4332] to-[#2d6a4f] rounded-3xl p-10 sm:p-16 text-white">
          <div className="max-w-2xl">
            <span className="inline-block mb-4 px-3 py-1 text-xs font-semibold
              bg-white/10 rounded-full text-[#95d5b2] uppercase tracking-wider">
              IA integrada
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Tu mentora de IA sabe todo sobre tu negocio
            </h2>
            <p className="text-[#d8f3dc] text-lg leading-relaxed mb-8">
              No es un chatbot genérico. Nuestra IA aprende de cada respuesta que das,
              recuerda todo tu contexto y construye tu plan de negocio de forma acumulativa
              módulo a módulo. Al final del curso, tienes un MVP completo generado
              específicamente para ti.
            </p>
            <Link
              href="/register"
              className="inline-flex items-center px-6 py-3 bg-[#95d5b2] text-[#1b4332]
                font-semibold rounded-xl hover:bg-[#b7e4c7] transition-colors"
            >
              Empieza tu curso →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="bg-[#f0faf4] py-20">
        <div className="mx-auto max-w-2xl px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            ¿Lista para hacer visible tu impacto?
          </h2>
          <p className="text-[#5a8a6a] text-lg mb-8">
            Únete a cientos de emprendedoras que ya certificaron su negocio con Tuluz.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register"
              className="inline-flex items-center justify-center px-8 py-4 text-base
                font-semibold bg-[#2d6a4f] text-white rounded-xl hover:bg-[#1b4332]
                transition-colors shadow-md"
            >
              Crear cuenta gratuita
            </Link>
            <Link
              href="/marketplace"
              className="inline-flex items-center justify-center px-8 py-4 text-base
                font-semibold border-2 border-[#2d6a4f] text-[#2d6a4f] rounded-xl
                hover:bg-[#d8f3dc] transition-colors"
            >
              Explorar el Marketplace
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
