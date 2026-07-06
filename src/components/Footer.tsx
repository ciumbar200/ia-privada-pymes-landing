import type { LinkEntry } from '../data/content'

interface FooterProps {
  brand: string
  linkGroups: Array<{
    title: string
    links: LinkEntry[]
  }>
}

export function Footer({ brand, linkGroups }: FooterProps) {
  return (
    <footer className="border-t border-brand-800/60 bg-brand-950 py-10">
      <div className="section-shell grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="font-heading text-xl text-white">{brand}</p>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-brand-400">
            Auditoría IA gratuita e implementación de proyectos de inteligencia artificial
            para empresas.
          </p>
          <p className="mt-5 text-sm text-brand-500">
            © {new Date().getFullYear()} {brand}. Todos los derechos reservados.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {linkGroups.map((group) => (
            <div key={group.title}>
              <p className="text-sm font-semibold uppercase tracking-[0.12em] text-electric-300">{group.title}</p>
              <div className="mt-4 space-y-3">
                {group.links.map((link) => (
                  <a key={link.href} href={link.href} className="block text-sm text-brand-300 hover:text-white">
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </footer>
  )
}