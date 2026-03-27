import { QuestionnaireData, GeneratedSHEFile, RiskAssessment } from '../types/workflow';

// Risk matrix calculation
const calculateRiskRating = (likelihood: string, severity: string): number => {
  const likelihoodValues: Record<string, number> = {
    'rare': 1,
    'unlikely': 2,
    'possible': 3,
    'likely': 4,
    'almost-certain': 5
  };
  
  const severityValues: Record<string, number> = {
    'negligible': 1,
    'minor': 2,
    'moderate': 3,
    'major': 4,
    'catastrophic': 5
  };
  
  return likelihoodValues[likelihood] * severityValues[severity];
};

// Generate comprehensive risk assessments based on questionnaire
const generateRiskAssessments = (data: QuestionnaireData): RiskAssessment[] => {
  const assessments: RiskAssessment[] = [];
  
  if (data.workAtHeight) {
    assessments.push({
      hazard: 'Falls from Height',
      activity: 'Working at heights above 2 meters',
      consequence: 'Serious injury or fatality from falling',
      likelihood: data.numberOfEmployees > 50 ? 'likely' : 'possible',
      severity: 'catastrophic',
      riskRating: 0,
      controlMeasures: [
        'Implement fall protection systems (guardrails, safety nets, personal fall arrest systems)',
        'Conduct daily pre-use inspections of all fall protection equipment',
        'Provide working at height training to all personnel',
        'Establish exclusion zones below work areas',
        'Use appropriate access equipment (scaffolding, mobile elevated work platforms)',
        'Implement permit-to-work system for work at height',
        'Ensure adequate lighting in work areas',
        'Monitor weather conditions (cease work in high winds/rain)'
      ],
      residualRisk: 0,
      responsiblePerson: 'Site Manager / H&S Officer'
    });
  }
  
  if (data.excavationWork) {
    assessments.push({
      hazard: 'Excavation Collapse / Trench Cave-in',
      activity: 'Excavation and trenching operations',
      consequence: 'Burial, crushing injuries, fatality',
      likelihood: 'possible',
      severity: 'catastrophic',
      riskRating: 0,
      controlMeasures: [
        'Conduct soil analysis and geotechnical survey',
        'Install appropriate shoring, shielding, or sloping systems',
        'Implement trench box systems for depths exceeding 1.5m',
        'Daily inspections by competent person before entry',
        'Establish safe access/egress points (ladders every 7.5m)',
        'Locate and mark underground services before excavation',
        'Implement exclusion zones around excavation edges',
        'Provide adequate dewatering systems',
        'Monitor for ground movement and unstable conditions',
        'Emergency rescue equipment readily available'
      ],
      residualRisk: 0,
      responsiblePerson: 'Excavation Supervisor / Engineer'
    });
  }
  
  if (data.confinedSpace) {
    assessments.push({
      hazard: 'Confined Space Entry Hazards',
      activity: 'Entry into confined spaces (tanks, manholes, vessels)',
      consequence: 'Asphyxiation, toxic exposure, engulfment',
      likelihood: 'unlikely',
      severity: 'catastrophic',
      riskRating: 0,
      controlMeasures: [
        'Implement confined space entry permit system',
        'Conduct atmospheric testing (oxygen, toxic gases, flammable gases)',
        'Provide continuous air monitoring during entry',
        'Ensure adequate ventilation (forced air supply)',
        'Use appropriate respiratory protection equipment',
        'Assign trained standby person (never enter alone)',
        'Establish emergency rescue procedures and equipment',
        'Provide communication systems (two-way radios)',
        'Use intrinsically safe equipment only',
        'Conduct confined space entry training'
      ],
      residualRisk: 0,
      responsiblePerson: 'Confined Space Supervisor'
    });
  }
  
  if (data.hotWork) {
    assessments.push({
      hazard: 'Fire and Explosion from Hot Work',
      activity: 'Welding, cutting, grinding, and hot work operations',
      consequence: 'Fire, explosion, burns, property damage',
      likelihood: 'possible',
      severity: 'major',
      riskRating: 0,
      controlMeasures: [
        'Implement hot work permit system',
        'Remove or protect flammable materials within 10m radius',
        'Provide fire extinguishers and fire blankets',
        'Assign trained fire watch (during and 60 minutes after)',
        'Ensure adequate ventilation to prevent gas accumulation',
        'Use spark arrestors and welding screens',
        'Check for fire hazards above and below work area',
        'Conduct gas testing in areas with potential gas presence',
        'Ensure hot work equipment is in good condition',
        'Provide appropriate PPE (welding helmet, gloves, apron)'
      ],
      residualRisk: 0,
      responsiblePerson: 'Hot Work Supervisor'
    });
  }
  
  if (data.electricalWork) {
    assessments.push({
      hazard: 'Electrical Shock and Electrocution',
      activity: 'Electrical installation, maintenance, and testing',
      consequence: 'Electric shock, burns, cardiac arrest, fatality',
      likelihood: 'unlikely',
      severity: 'catastrophic',
      riskRating: 0,
      controlMeasures: [
        'Implement Lock-Out Tag-Out (LOTO) procedures',
        'Verify de-energization with voltage tester',
        'Use only qualified and licensed electricians',
        'Provide insulated tools and equipment',
        'Use appropriate electrical PPE (insulated gloves, safety boots)',
        'Install RCD/GFCI protection on all circuits',
        'Maintain safe working distances from live parts',
        'Implement electrical work permit system',
        'Ensure proper earthing and bonding',
        'Conduct regular electrical inspections and testing'
      ],
      residualRisk: 0,
      responsiblePerson: 'Electrical Engineer / Licensed Electrician'
    });
  }
  
  if (data.heavyMachinery) {
    assessments.push({
      hazard: 'Mobile Plant and Equipment Incidents',
      activity: 'Operation of excavators, cranes, forklifts, and heavy machinery',
      consequence: 'Crushing, struck-by incidents, rollovers, fatality',
      likelihood: 'possible',
      severity: 'catastrophic',
      riskRating: 0,
      controlMeasures: [
        'Ensure all operators are trained and licensed',
        'Conduct daily pre-start equipment inspections',
        'Implement traffic management plan (separate pedestrian/vehicle routes)',
        'Use spotters for reversing and blind spot operations',
        'Install reversing alarms and cameras on all vehicles',
        'Establish exclusion zones around operating machinery',
        'Provide high-visibility clothing to all personnel',
        'Implement load charts and safe working load limits',
        'Ensure ground conditions can support equipment loads',
        'Regular maintenance and certification of lifting equipment'
      ],
      residualRisk: 0,
      responsiblePerson: 'Plant Manager / Equipment Supervisor'
    });
  }
  
  if (data.hazardousSubstances) {
    assessments.push({
      hazard: 'Exposure to Hazardous Substances',
      activity: 'Handling, storage, and use of chemicals and hazardous materials',
      consequence: 'Chemical burns, poisoning, respiratory illness, cancer',
      likelihood: 'possible',
      severity: 'major',
      riskRating: 0,
      controlMeasures: [
        'Maintain chemical register with Safety Data Sheets (SDS)',
        'Conduct risk assessments for all hazardous substances',
        'Provide appropriate PPE (gloves, goggles, respirators)',
        'Implement proper storage (segregation, ventilation, containment)',
        'Use secondary containment for liquid chemicals',
        'Provide eyewash stations and emergency showers',
        'Train workers on chemical hazards and emergency response',
        'Implement spill response procedures and kits',
        'Ensure adequate ventilation in work areas',
        'Conduct air monitoring for exposure levels',
        'Dispose of hazardous waste according to regulations'
      ],
      residualRisk: 0,
      responsiblePerson: 'H&S Officer / Chemical Safety Coordinator'
    });
  }
  
  if (data.publicTraffic) {
    assessments.push({
      hazard: 'Vehicle-Pedestrian Interactions',
      activity: 'Work near public roads and traffic areas',
      consequence: 'Vehicle strikes, serious injury, fatality',
      likelihood: 'likely',
      severity: 'major',
      riskRating: 0,
      controlMeasures: [
        'Implement comprehensive traffic management plan',
        'Install physical barriers (concrete barriers, safety fencing)',
        'Provide adequate signage and road markings',
        'Use traffic control personnel (flaggers) with proper training',
        'Establish reduced speed zones',
        'Provide high-visibility clothing to all workers',
        'Install temporary lighting for night work',
        'Coordinate with local authorities and traffic department',
        'Conduct regular safety briefings on traffic hazards',
        'Implement site access control procedures'
      ],
      residualRisk: 0,
      responsiblePerson: 'Traffic Management Coordinator'
    });
  }
  
  // Calculate risk ratings
  assessments.forEach(assessment => {
    assessment.riskRating = calculateRiskRating(assessment.likelihood, assessment.severity);
    assessment.residualRisk = Math.max(1, Math.floor(assessment.riskRating / 3)); // Assume controls reduce risk by ~66%
  });
  
  return assessments;
};

// Generate statutory appointments based on project requirements
const generateStatutoryAppointments = (data: QuestionnaireData) => {
  const appointments = [];
  
  // Construction Manager (required for all construction projects)
  if (data.projectType === 'construction' || data.projectType === 'civil') {
    appointments.push({
      position: 'Construction Manager',
      name: '[To be appointed]',
      qualifications: ['Construction Management Qualification', 'Registered with SACPCMP'],
      responsibilities: [
        'Overall management of construction activities',
        'Ensure compliance with approved plans and specifications',
        'Coordinate with client, consultants, and contractors',
        'Manage project schedule and budget',
        'Implement quality control procedures'
      ],
      appointmentDate: new Date().toISOString().split('T')[0],
      sacpcmpNumber: '[Registration Number]'
    });
  }
  
  // Health and Safety Officer (mandatory for projects with >20 workers)
  if (data.numberOfEmployees > 20) {
    appointments.push({
      position: 'Health and Safety Officer',
      name: '[To be appointed by assigned professional]',
      qualifications: [
        'National Diploma in Safety Management or equivalent',
        'SAMTRAC or NEBOSH certification',
        'Registered with SACPCMP (Safety category)'
      ],
      responsibilities: [
        'Develop and implement site-specific H&S plan',
        'Conduct risk assessments and safety inspections',
        'Investigate incidents and accidents',
        'Coordinate H&S training and induction',
        'Maintain H&S records and registers',
        'Liaise with Department of Employment and Labour inspectors',
        'Monitor compliance with OHS Act and Construction Regulations'
      ],
      appointmentDate: new Date().toISOString().split('T')[0],
      sacpcmpNumber: '[Registration Number]'
    });
  }
  
  // First Aider (required - 1 per 50 workers)
  const firstAiders = Math.max(1, Math.ceil((data.numberOfEmployees + data.numberOfContractors) / 50));
  for (let i = 0; i < firstAiders; i++) {
    appointments.push({
      position: `First Aider ${firstAiders > 1 ? `#${i + 1}` : ''}`,
      name: '[To be appointed]',
      qualifications: ['Level 2 First Aid Certificate (valid)'],
      responsibilities: [
        'Provide immediate first aid treatment for injuries/illnesses',
        'Maintain first aid equipment and supplies',
        'Keep records of first aid treatments',
        'Coordinate emergency medical response',
        'Conduct first aid awareness training'
      ],
      appointmentDate: new Date().toISOString().split('T')[0]
    });
  }
  
  // Fire Marshal
  appointments.push({
    position: 'Fire Marshal',
    name: '[To be appointed]',
    qualifications: ['Fire Fighting and Prevention Training'],
    responsibilities: [
      'Conduct fire risk assessments',
      'Maintain fire fighting equipment',
      'Coordinate fire drills and evacuations',
      'Monitor hot work activities',
      'Ensure fire exits and routes are clear',
      'Liaise with emergency services'
    ],
    appointmentDate: new Date().toISOString().split('T')[0]
  });
  
  // Environmental Control Officer (if environmental considerations present)
  if (data.environmentalConsiderations) {
    appointments.push({
      position: 'Environmental Control Officer',
      name: '[To be appointed]',
      qualifications: ['Environmental Management Qualification', 'Registered Environmental Assessment Practitioner (preferred)'],
      responsibilities: [
        'Implement Environmental Management Plan',
        'Monitor compliance with environmental permits',
        'Conduct environmental inspections',
        'Manage waste disposal and recycling',
        'Monitor water and air quality',
        'Coordinate with environmental authorities'
      ],
      appointmentDate: new Date().toISOString().split('T')[0]
    });
  }
  
  return appointments;
};

// Generate required registers
const generateRegisters = (data: QuestionnaireData) => {
  const registers = [
    {
      type: 'incident' as const,
      name: 'Incident and Accident Register',
      description: 'Record of all incidents, accidents, near-misses, and dangerous occurrences',
      template: 'Date, Time, Location, Description, Injured Person(s), Injury Type, Witnesses, Investigation, Corrective Actions',
      frequency: 'Record immediately after incident'
    },
    {
      type: 'inspection' as const,
      name: 'Site Inspection Register',
      description: 'Weekly site safety inspections and audits',
      template: 'Date, Inspector, Areas Inspected, Findings, Non-Conformances, Corrective Actions, Sign-off',
      frequency: 'Weekly minimum'
    },
    {
      type: 'training' as const,
      name: 'Training Register',
      description: 'Record of all H&S training, inductions, and toolbox talks',
      template: 'Date, Training Topic, Trainer, Attendees (with signatures), Duration, Training Materials',
      frequency: 'Updated after each training session'
    },
    {
      type: 'equipment' as const,
      name: 'Plant and Equipment Register',
      description: 'Inventory and inspection records for all plant and equipment',
      template: 'Equipment ID, Description, Serial Number, Inspection Date, Inspector, Condition, Next Inspection Date, Certificates',
      frequency: 'Updated monthly and after inspections'
    }
  ];
  
  if (data.hazardousSubstances) {
    registers.push({
      type: 'chemical' as const,
      name: 'Hazardous Chemical Substances Register',
      description: 'Inventory of all hazardous substances with Safety Data Sheets',
      template: 'Chemical Name, Quantity, Location, SDS Reference, Risk Rating, PPE Required, Emergency Procedures',
      frequency: 'Updated when new chemicals introduced'
    });
  }
  
  if (data.requiredPermits.length > 0) {
    registers.push({
      type: 'permit' as const,
      name: 'Permit to Work Register',
      description: 'Record of all permits issued for high-risk activities',
      template: 'Permit Number, Activity, Date Issued, Valid Until, Authorized By, Worker(s), Precautions, Sign-off',
      frequency: 'Updated daily'
    });
  }
  
  return registers;
};

// Main AI generation function
export const generateSHEFile = async (data: QuestionnaireData): Promise<Partial<GeneratedSHEFile>> => {
  // Simulate AI processing time
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  const riskAssessments = generateRiskAssessments(data);
  const overallRiskLevel = riskAssessments.some(r => r.riskRating >= 15) ? 'critical' :
                           riskAssessments.some(r => r.riskRating >= 10) ? 'high' :
                           riskAssessments.some(r => r.riskRating >= 6) ? 'medium' : 'low';
  
  return {
    version: 1,
    status: 'draft',
    executiveSummary: `
This Health, Safety, and Environmental (HSE) File has been prepared for ${data.projectName}, a ${data.projectType} project located at ${data.siteAddress}. 

The project involves ${data.numberOfEmployees} direct employees and ${data.numberOfContractors} contractor personnel, working ${data.workingHours} over an estimated duration of ${data.projectDuration}.

Key Project Information:
- Client: ${data.clientName}
- Principal Contractor: ${data.principalContractor}
- Project Value: ${data.projectValue}
- Overall Risk Level: ${overallRiskLevel.toUpperCase()}

This HSE File contains comprehensive risk assessments, statutory appointments, safety registers, emergency procedures, and compliance documentation required under the Occupational Health and Safety Act (Act 85 of 1993) and the Construction Regulations 2014.

The file has been generated using AI-assisted risk analysis and will be reviewed and digitally signed by a registered SACPCMP Health and Safety professional to ensure legal compliance and audit readiness.
    `.trim(),
    riskAssessment: {
      overallRiskLevel,
      assessments: riskAssessments
    },
    statutoryAppointments: generateStatutoryAppointments(data),
    registers: generateRegisters(data),
    emergencyPlan: {
      emergencyContacts: [
        { role: 'Emergency Services', name: 'SAPS/Fire/Ambulance', phone: '10111 / 10177', backup: '112 (Mobile)' },
        { role: 'Site Manager', name: '[To be appointed]', phone: '[Contact Number]' },
        { role: 'H&S Officer', name: '[To be appointed]', phone: '[Contact Number]' },
        { role: 'First Aider', name: '[To be appointed]', phone: '[Contact Number]' },
        { role: 'Client Representative', name: data.clientContact, phone: '[Contact Number]' }
      ],
      evacuationProcedures: [
        'Upon hearing the evacuation alarm (continuous siren), stop work immediately',
        'Switch off equipment and secure hazardous materials if safe to do so',
        'Proceed calmly to the nearest designated assembly point',
        'Do not use elevators during evacuation',
        'Assist persons with disabilities or injuries',
        'Report to the assembly point coordinator for headcount',
        'Do not re-enter the site until authorized by site management'
      ],
      assemblyPoints: [
        'Primary Assembly Point: [Location to be determined on site]',
        'Secondary Assembly Point: [Alternative location]'
      ],
      emergencyEquipment: [
        'First aid kits (minimum 1 per 50 workers)',
        'Fire extinguishers (appropriate types for site hazards)',
        'Emergency eyewash stations and safety showers',
        'Spill kits for hazardous substances',
        'Emergency communication equipment (two-way radios)',
        'Emergency lighting and backup power'
      ],
      medicalFacilities: [
        'On-site first aid room with qualified first aider',
        'Nearest hospital: [To be identified based on site location]',
        'Emergency medical services contact: 10177 or 082 911'
      ]
    },
    trainingMatrix: [
      {
        training: 'Site Induction',
        targetAudience: 'All personnel entering site',
        frequency: 'Once-off (on first day)',
        provider: 'Site H&S Officer',
        complianceReference: 'Construction Regulation 5'
      },
      {
        training: 'Toolbox Talks',
        targetAudience: 'All workers',
        frequency: 'Weekly minimum',
        provider: 'Supervisors / H&S Officer',
        complianceReference: 'OHS Act Section 8'
      },
      {
        training: 'Working at Heights',
        targetAudience: 'Workers performing elevated work',
        frequency: 'Annually',
        provider: 'Accredited training provider',
        complianceReference: 'Construction Regulation 10'
      },
      {
        training: 'First Aid Level 2',
        targetAudience: 'Designated first aiders',
        frequency: 'Every 3 years',
        provider: 'Accredited first aid provider',
        complianceReference: 'General Safety Regulation 3'
      },
      {
        training: 'Fire Fighting and Prevention',
        targetAudience: 'Fire marshals and all workers',
        frequency: 'Annually',
        provider: 'Fire safety training provider',
        complianceReference: 'General Safety Regulation 4'
      }
    ],
    inspectionSchedule: [
      {
        inspectionType: 'General Site Safety Inspection',
        frequency: 'Weekly',
        responsiblePerson: 'H&S Officer',
        checklistItems: [
          'Housekeeping and site cleanliness',
          'Access routes and walkways clear',
          'Fire equipment accessible and in date',
          'First aid kits stocked',
          'Signage visible and in good condition',
          'PPE compliance',
          'Scaffold and edge protection integrity',
          'Electrical installations safe',
          'Excavations properly supported'
        ]
      },
      {
        inspectionType: 'Scaffold Inspection',
        frequency: 'Before first use, after modifications, weekly',
        responsiblePerson: 'Competent Person (Scaffolder)',
        checklistItems: [
          'Foundation stable and level',
          'Standards plumb and properly braced',
          'Ledgers and transoms secure',
          'Decking complete and tied down',
          'Guardrails and toeboards in place',
          'Access ladders secure',
          'Load capacity signage displayed',
          'Inspection tag current'
        ]
      },
      {
        inspectionType: 'Lifting Equipment Inspection',
        frequency: 'Before use, monthly, annual certification',
        responsiblePerson: 'Appointed Competent Person',
        checklistItems: [
          'Visual inspection for damage/wear',
          'Load chart displayed and legible',
          'Safety devices functional',
          'Wire ropes/chains not damaged',
          'Hooks with safety latches',
          'Certification up to date',
          'Operator license valid'
        ]
      }
    ],
    generatedAt: new Date().toISOString()
  };
};
