export type LeadSector =
  | 'coliving-flex-living'
  | 'inmobiliarias-property-managers'
  | 'clinicas-salud-privada'
  | 'academias-formacion'
  | 'otro'

export interface LeadFormData {
  name: string
  company: string
  email: string
  phone: string
  sector: LeadSector
}
