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
    <footer className="border-t border-white/70 bg-white/80 py-10">
      <div className="section-shell grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="font-heading text-xl text-brand-950">{brand}</p>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-graphite-600">
            Sistema de captación, seguimiento y cierre de leads para coliving, alquiler flexible y
            property managers.
          </p>
          <p className="mt-5 text-sm text-graphite-600">
            © {new Date().getFullYear()} {brand}. Todos los derechos reservados.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {linkGroups.map((group) => (
            <div key={group.title}>
              <p className="text-sm font-semibold uppercase tracking-[0.12em] text-brand-700">{group.title}</p>
              <div className="mt-4 space-y-3">
                {group.links.map((link) => (
                  <a key={link.href} href={link.href} className="block text-sm text-graphite-700 hover:text-brand-950">
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
