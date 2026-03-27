export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'professional' | 'client';
  company: string;
  profession?: string;
  certifications?: string[];
  department?: string;
}

export interface Project {
  id: string;
  name: string;
  client: string;
  contractor: string;
  location: string;
  status: 'active' | 'completed' | 'on-hold';
  riskLevel: 'Low' | 'Medium' | 'High';
  workers: number;
  startDate: string;
  endDate: string;
  progress: number;
  documents: Document[];
  professionalId: string;
  clientId: string;
}

export interface Document {
  id: string;
  type: string;
  name: string;
  status: 'pending-review' | 'approved' | 'rejected';
  createdDate: string;
  reviewedDate?: string;
  createdBy: string;
  reviewedBy?: string;
  version: number;
  googleDocsUrl?: string;
}

export interface Professional {
  id: string;
  name: string;
  title: string;
  company: string;
  location: string;
  experience: string;
  certifications: string[];
  specializations: string[];
  rating: number;
  reviews: number;
  hourlyRate: string;
  availability: 'Available' | 'Busy' | 'Unavailable';
  profileImage?: string;
  bio?: string;
}

export interface ProjectData {
  project_name: string;
  client_name: string;
  company_name: string;
  site_location: string;
  scope_of_work: string;
  project_duration: string;
  workers: string;
  risk_level: string;
  equipment: string;
  hazards: string;
  controls: string;

  // 🔥 Specialized Safety Fields
  work_type?: 'construction' | 'electrical' | 'demolition' | 'civil';
  height_work?: boolean;
  excavation?: boolean;
  confined_space?: boolean;
  hazardous_substances?: boolean;
  traffic_management?: boolean;
}
