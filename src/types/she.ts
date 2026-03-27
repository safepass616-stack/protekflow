export type SHEStatus = 'draft' | 'pending_review' | 'signed_off' | 'complete'

export interface Hazard {
  id: string
  description: string
  category: string
  affected_persons: string
}

export interface RiskAssessment {
  id: string
  hazard_id: string
  likelihood: 1 | 2 | 3 | 4 | 5
  severity: 1 | 2 | 3 | 4 | 5
  risk_level: 'low' | 'medium' | 'high' | 'critical'
  control_measures: string
  residual_risk: 'low' | 'medium' | 'high'
}

export interface EmergencyProcedure {
  id: string
  scenario: string
  steps: string[]
  responsible_person: string
  contact_number: string
}

export interface SHEFile {
  id: string
  user_id: string
  status: SHEStatus
  company_name: string
  site_address: string
  site_description: string
  hazards: Hazard[]
  risk_assessments: RiskAssessment[]
  emergency_procedures: EmergencyProcedure[]
  generated_content: string
  google_doc_url?: string
  pdf_url?: string
  created_at: string
  updated_at: string
}
