export type UserRole = 'client' | 'professional' | 'admin'

export interface User {
  id: string
  email: string
  role: UserRole
  created_at: string
}

export interface Profile {
  id: string
  user_id: string
  full_name: string
  company_name?: string
  phone?: string
  role: UserRole
  created_at: string
  updated_at: string
}

export interface Professional {
  id: string
  user_id: string
  qualifications: string
  certifications: string[]
  sacpcmp_registration?: string
  specializations: string[]
  experience_years: number
  hourly_rate?: number
  availability: boolean
  bio?: string
  created_at: string
  updated_at: string
}

export interface Project {
  id: string
  client_id: string
  professional_id?: string
  project_name: string
  project_type: string
  location: string
  start_date: string
  duration_months: number
  workforce_size: number
  hazards: string[]
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled'
  created_at: string
  updated_at: string
}

export interface Document {
  id: string
  project_id: string
  title: string
  content: string
  document_type: string
  status: 'draft' | 'pending_review' | 'approved' | 'rejected'
  version: number
  word_count: number
  generated_by: 'ai' | 'professional'
  created_at: string
  updated_at: string
}

export interface Revision {
  id: string
  document_id: string
  professional_id: string
  content: string
  version: number
  notes?: string
  created_at: string
}

export interface Comment {
  id: string
  document_id: string
  user_id: string
  content: string
  created_at: string
}

export interface Subscription {
  id: string
  user_id: string
  plan: 'pay_per_doc' | 'pro' | 'enterprise'
  status: 'active' | 'cancelled' | 'expired'
  documents_remaining: number
  start_date: string
  end_date?: string
  created_at: string
  updated_at: string
}

export interface QuestionnaireData {
  projectName: string
  projectType: string
  location: string
  startDate: string
  durationMonths: number
  workforceSize: number
  hazards: string[]
  safetyMeasures: string
  emergencyProcedures: string
  additionalInfo: string
}
