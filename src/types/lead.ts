export type CompanySize =
  | '1-5'
  | '6-20'
  | '21-50'
  | '51-250'
  | '251+'

export type PrivacyConcern = 'bajo' | 'medio' | 'alto'

export interface LeadFormData {
  name: string
  company: string
  email: string
  companySize: CompanySize
  automationGoal: string
  privacyConcern: PrivacyConcern
}
