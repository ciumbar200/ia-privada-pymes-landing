interface FooterProps {
  brand: string
}

export function Footer({ brand }: FooterProps) {
  return (
    <footer className="border-t border-white/70 bg-white/70 py-8">
      <div className="section-shell flex flex-col gap-3 text-sm text-graphite-600 md:flex-row md:items-center md:justify-between">
        <p>
          © {new Date().getFullYear()} {brand}. Todos los derechos reservados.
        </p>
        <p>Automatización útil, segura y orientada a negocio para micropymes y pymes.</p>
      </div>
    </footer>
  )
}
