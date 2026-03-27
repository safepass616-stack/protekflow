export type WorkflowStep = 
  | 'signup'
  | 'questionnaire'
  | 'ai-generation'
  | 'professional-assignment'
  | 'professional-review'
  | 'completed';

export interface QuestionnaireData {
  // Project Information
  projectName: string;
  projectType: 'construction' | 'electrical' | 'demolition' | 'civil' | 'mining' | 'other';
  projectLocation: string;
  projectDuration: string;
  projectValue: string;
  
  // Client Information
  clientName: string;
  clientContact: string;
  principalContractor: string;
  
  // Site Information
  siteAddress: string;
  siteDescription: string;
  numberOfEmployees: number;
  numberOfContractors: number;
  workingHours: string;
  
  // Risk Assessment
  workAtHeight: boolean;
  excavationWork: boolean;
  confinedSpace: boolean;
  hotWork: boolean;
  electricalWork: boolean;
  heavyMachinery: boolean;
  hazardousSubstances: boolean;
  publicTraffic: boolean;
  
  // Additional Hazards
  identifiedHazards: string[];
  customHazards: string;
  
  // Equipment and Resources
  equipmentList: string;
  emergencyEquipment: string;
  
  // Compliance Requirements
  requiredPermits: string[];
  environmentalConsiderations: string;
  communityImpact: string;
  
  // Statutory Appointments (if known)
  hasConstructionManager: boolean;
  hasHealthSafetyOfficer: boolean;
  hasFirstAider: boolean;
  hasFireMarshal: boolean;
}

export interface GeneratedSHEFile {
  id: string;
  projectId: string;
  version: number;
  status: 'draft' | 'under-review' | 'approved' | 'rejected';
  
  // Generated Content
  executiveSummary: string;
  riskAssessment: RiskAssessmentSection;
  statutoryAppointments: StatutoryAppointment[];
  registers: Register[];
  emergencyPlan: EmergencyPlan;
  trainingMatrix: TrainingRequirement[];
  inspectionSchedule: InspectionSchedule[];
  
  // Metadata
  generatedAt: string;
  assignedProfessionalId?: string;
  reviewedAt?: string;
  approvedAt?: string;
  professionalSignature?: ProfessionalSignature;
}

export interface RiskAssessmentSection {
  overallRiskLevel: 'low' | 'medium' | 'high' | 'critical';
  assessments: RiskAssessment[];
}

export interface RiskAssessment {
  hazard: string;
  activity: string;
  consequence: string;
  likelihood: 'rare' | 'unlikely' | 'possible' | 'likely' | 'almost-certain';
  severity: 'negligible' | 'minor' | 'moderate' | 'major' | 'catastrophic';
  riskRating: number;
  controlMeasures: string[];
  residualRisk: number;
  responsiblePerson: string;
}

export interface StatutoryAppointment {
  position: string;
  name: string;
  qualifications: string[];
  responsibilities: string[];
  appointmentDate: string;
  sacpcmpNumber?: string;
}

export interface Register {
  type: 'incident' | 'inspection' | 'training' | 'equipment' | 'chemical' | 'permit';
  name: string;
  description: string;
  template: string;
  frequency: string;
}

export interface EmergencyPlan {
  emergencyContacts: EmergencyContact[];
  evacuationProcedures: string[];
  assemblyPoints: string[];
  emergencyEquipment: string[];
  medicalFacilities: string[];
}

export interface EmergencyContact {
  role: string;
  name: string;
  phone: string;
  backup?: string;
}

export interface TrainingRequirement {
  training: string;
  targetAudience: string;
  frequency: string;
  provider: string;
  complianceReference: string;
}

export interface InspectionSchedule {
  inspectionType: string;
  frequency: string;
  responsiblePerson: string;
  checklistItems: string[];
}

export interface ProfessionalSignature {
  professionalId: string;
  professionalName: string;
  sacpcmpNumber: string;
  signedAt: string;
  digitalSignature: string;
  comments?: string;
}
