import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-[#1b4332] text-[#b7e4c7]">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-[#40916c] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">T</span>
              </div>
              <span className="font-bold text-lg text-white">Tuluz</span>
            </div>
            <p className="text-sm leading-relaxed max-w-sm">
              Asociación sin fines de lucro que certifica y conecta emprendedoras con
              impacto positivo en Latinoamérica e Iberia.
            </p>
          </div>

          {/* Platform */}
          <div>
            <h4 className="text-white font-semibold mb-3 text-sm">Plataforma</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/marketplace" className="hover:text-white transition-colors">Marketplace</Link></li>
              <li><Link href="/courses" className="hover:text-white transition-colors">Cursos</Link></li>
              <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
              <li><Link href="/register" className="hover:text-white transition-colors">Registrarse</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-semibold mb-3 text-sm">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/privacidad" className="hover:text-white transition-colors">Privacidad</Link></li>
              <li><Link href="/terminos" className="hover:text-white transition-colors">Términos de uso</Link></li>
              <li><Link href="/contacto" className="hover:text-white transition-colors">Contacto</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#2d6a4f] pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-[#74c69d]">
            © {new Date().getFullYear()} Tuluz — Asociación sin fines de lucro. Todos los derechos reservados.
          </p>
          <p className="text-xs text-[#74c69d]">
            Construido con ❤ para Latinoamérica e Iberia
          </p>
        </div>
      </div>
    </footer>
  )
}
