-- ============================================================
--  Noxo IA Empresas — CRM Schema
--  Leads de auditoría de accesibilidad web
--  Compatible con PostgreSQL / Supabase
-- ============================================================

CREATE TABLE IF NOT EXISTS noxo_leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_name TEXT NOT NULL,
  website_url TEXT NOT NULL,
  contact_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  city TEXT,
  niche TEXT NOT NULL DEFAULT 'otro',
  source TEXT DEFAULT 'web-form',
  accessibility_score INTEGER,
  critical_issues INTEGER DEFAULT 0,
  serious_issues INTEGER DEFAULT 0,
  moderate_issues INTEGER DEFAULT 0,
  minor_issues INTEGER DEFAULT 0,
  risk_level TEXT,
  status TEXT NOT NULL DEFAULT 'new',
  last_contacted_at TIMESTAMPTZ,
  next_followup_at TIMESTAMPTZ,
  audit_report_url TEXT,
  audit_json JSONB,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Index for common queries
CREATE INDEX IF NOT EXISTS idx_noxo_leads_status ON noxo_leads(status);
CREATE INDEX IF NOT EXISTS idx_noxo_leads_niche ON noxo_leads(niche);
CREATE INDEX IF NOT EXISTS idx_noxo_leads_created ON noxo_leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_noxo_leads_next_followup ON noxo_leads(next_followup_at) WHERE next_followup_at IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_noxo_leads_score ON noxo_leads(accessibility_score) WHERE accessibility_score IS NOT NULL;

-- Trigger to auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER noxo_leads_updated_at
  BEFORE UPDATE ON noxo_leads
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- ============================================================
-- Estados del lead
-- ============================================================
-- new          → Lead recién creado, sin auditar
-- audited       → Auditoría completada, informe generado
-- contacted     → Enviado primer contacto con informe
-- replied       → Cliente respondió
-- interested    → Muestra interés en contratar
-- won          → Auditoría express pagada y entregada
-- lost          → No interested / no response tras 3 contactos
-- maintenance   → Cliente activo en mantenimiento mensual

-- ============================================================
-- Nichos soportados
-- ============================================================
-- clinica-dental, clinica-estetica, academia, restaurante,
-- ecommerce, inmobiliaria, hotel, otro

-- ============================================================
-- Vista resumen para panel admin
-- ============================================================
CREATE OR REPLACE VIEW noxo_leads_summary AS
SELECT
  status,
  COUNT(*) as total,
  AVG(accessibility_score) as avg_score,
  AVG(critical_issues) as avg_critical,
  COUNT(*) FILTER (WHERE created_at > now() - interval '7 days') as new_this_week,
  COUNT(*) FILTER (WHERE next_followup_at < now() AND status NOT IN ('won', 'lost', 'maintenance')) as overdue_followups
FROM noxo_leads
GROUP BY status
ORDER BY
  CASE status
    WHEN 'new' THEN 1
    WHEN 'audited' THEN 2
    WHEN 'contacted' THEN 3
    WHEN 'replied' THEN 4
    WHEN 'interested' THEN 5
    WHEN 'won' THEN 6
    WHEN 'maintenance' THEN 7
    WHEN 'lost' THEN 8
  END;
