import { ProjectData } from '../types';

export const generateDocument = (data: ProjectData): string => {
  const currentDate = new Date().toLocaleDateString('en-ZA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Generate hazard-specific sections based on selected hazards
  const generateHazardSections = (): string => {
    let sections = '';

    if (data.height_work) {
      sections += `

### 9.1 FALL PROTECTION (REGULATION 10) ✓ APPLICABLE

**Work at Heights Identified:** YES - Work above 2 meters present on this project

#### 9.1.1 Regulation 10(1) - Fall Protection Equipment

**Requirement:** Ensure fall protection equipment is provided where there is a risk of falling 2 meters or more.

**Status:** ☑ Implemented

**Control Measures:**
- Edge protection systems (guardrails, toe boards)
- Safety nets where applicable
- Personal fall arrest systems (harnesses, lanyards)
- Fall prevention platforms
- Competent person supervision
- Regular equipment inspection

**Evidence:** Fall protection plan, equipment inspection records, training certificates

#### 9.1.2 Regulation 10(2) - Collective Measures Priority

**Hierarchy Applied:**
1. Eliminate work at height (design out)
2. Collective fall prevention (guardrails, platforms)
3. Collective fall mitigation (safety nets)
4. Personal fall protection (harnesses)
5. Personal fall mitigation (fall arrest systems)

**Evidence:** Fall protection risk assessment and method statements

#### 9.1.3 Personal Fall Protection Equipment

**Equipment Provided:**
- Full-body harnesses (SANS compliant)
- Double lanyards with shock absorbers
- Anchor points (tested and certified)
- Rescue equipment and procedures

**Evidence:** PPE issue records, training certificates, anchor point certifications
`;
    }

    if (data.excavation) {
      sections += `

### 9.2 EXCAVATION WORK (REGULATION 11) ✓ APPLICABLE

**Excavation Work Identified:** YES - Excavation activities present on this project

#### 9.2.1 Regulation 11(1) - Competent Supervisor

**Requirement:** Appoint a competent person to supervise excavation work.

**Status:** ☑ Appointed

**Supervisor Details:**
- Name: [To be appointed]
- Competency: Qualified excavation supervisor
- Appointment Date: [Before excavation commencement]

**Evidence:** Appointment letter, competency certificate

#### 9.2.2 Regulation 11(2) - Excavation Inspections

**Requirement:** Ensure excavation is inspected before work commences and after any event affecting stability.

**Inspection Frequency:**
- Before each shift
- After rainfall
- After blasting
- After any ground movement
- After any incident

**Evidence:** Excavation inspection register (daily records)

#### 9.2.3 Regulation 11(3) - Excavation Support

**Requirement:** Ensure excavation is supported or battered to prevent collapse.

**Support Measures:**
- Engineered support systems (designed by competent person)
- Battering/benching (appropriate angle of repose)
- Shoring and bracing systems
- Exclusion zones (minimum 1.5 times depth from edge)

**Evidence:** Excavation support design, installation records, inspection certificates
`;
    }

    if (data.confined_space) {
      sections += `

### 9.3 CONFINED SPACE ENTRY ✓ APPLICABLE

**Confined Space Work Identified:** YES - Confined space entry required on this project

**Confined Spaces on Site:**
- [List specific confined spaces: tanks, sewers, manholes, etc.]

#### 9.3.1 Confined Space Entry Procedures

**Mandatory Requirements:**
1. **Permit-to-Work System**
   - Written permit required for all entries
   - Authorized person approval
   - Valid for single entry/shift only

2. **Atmospheric Testing**
   - Test before entry: Oxygen (19.5%-23.5%), LEL (<10%), toxic gases
   - Continuous monitoring during work
   - Calibrated gas detection equipment

3. **Ventilation**
   - Forced ventilation (mechanical)
   - Continuous air supply during work
   - Purging of hazardous atmospheres

4. **Standby Person**
   - Trained standby person at entrance
   - Maintain visual/communication contact
   - Never enter to rescue without proper equipment

5. **Rescue Equipment**
   - Retrieval equipment (harness, winch)
   - Self-contained breathing apparatus (SCBA)
   - Emergency rescue plan in place

6. **Training**
   - Confined space entry training
   - Rescue procedures training
   - Emergency response drills

**Evidence:** Permit-to-work register, atmospheric testing records, training certificates
`;
    }

    if (data.hazardous_substances) {
      sections += `

### 9.4 HAZARDOUS SUBSTANCES ✓ APPLICABLE

**Hazardous Substances Present:** YES - Hazardous materials handling required

**Hazardous Substances on Site:**
- [List specific substances: chemicals, fuels, solvents, etc.]

#### 9.4.1 Hazardous Substance Management

**Control Measures:**

1. **Substitution**
   - Replace with less hazardous alternatives where possible
   - Use water-based products instead of solvent-based

2. **Safety Data Sheets (SDS)**
   - SDS available for all hazardous substances
   - SDS communicated to all workers
   - SDS stored in accessible location

3. **Storage and Handling**
   - Proper storage in designated areas
   - Compatible substances stored together
   - Secondary containment (bunding)
   - Clear labeling and signage
   - Spill kits readily available

4. **Personal Protective Equipment**
   - Respiratory protection (masks, respirators)
   - Skin protection (gloves, barrier cream)
   - Eye protection (goggles, face shields)
   - Protective clothing (overalls, aprons)

5. **Health Surveillance**
   - Medical surveillance for exposed workers
   - Baseline and periodic health assessments
   - Records maintained

6. **Emergency Procedures**
   - Spill response procedures
   - Emergency shower/eyewash stations
   - First aid for chemical exposure
   - Emergency contact numbers

**Evidence:** SDS register, storage inspection records, PPE issue records, health surveillance records
`;
    }

    if (data.traffic_management) {
      sections += `

### 9.5 TRAFFIC MANAGEMENT ✓ APPLICABLE

**Traffic Management Required:** YES - Vehicle/pedestrian interface present

#### 9.5.1 Traffic Management Plan

**Plan Components:**

1. **Site Access Control**
   - Designated entry/exit points
   - Security/access control
   - Vehicle registration system
   - Visitor management

2. **Traffic Routes**
   - Clearly marked vehicle routes
   - One-way systems where applicable
   - Turning circles for large vehicles
   - Loading/offloading zones

3. **Speed Limits**
   - Site speed limit: 20-40 km/h (depending on area)
   - Speed limit signage at strategic locations
   - Speed enforcement (speed bumps, monitoring)

4. **Pedestrian Safety**
   - Designated pedestrian walkways
   - Physical separation from vehicle routes (barriers, fencing)
   - Pedestrian crossings (marked, signage)
   - High-visibility vests mandatory

5. **Reversing Operations**
   - Banksmen for all reversing operations
   - Reversing alarms on all vehicles
   - Exclusion zones during reversing
   - Communication system (radio/hand signals)

6. **Signage and Road Markings**
   - Directional signage
   - Warning signs (heavy vehicles, pedestrians, speed limits)
   - Road markings (lanes, parking, crossings)
   - Night-time visibility (reflective signs, lighting)

7. **Public Road Interface**
   - Traffic accommodation plan (if working on/near public roads)
   - Road closure permits obtained
   - Flagmen/traffic controllers
   - Public safety barriers and signage

**Evidence:** Traffic management plan, site layout drawings, signage register, banksman training records
`;
    }

    return sections;
  };

  // Generate work type specific information
  const workTypeInfo = data.work_type ? `

## WORK TYPE CLASSIFICATION

**Primary Work Type:** ${data.work_type.charAt(0).toUpperCase() + data.work_type.slice(1)}

**Work Type Specific Requirements:**

${data.work_type === 'construction' ? `
**Construction Work Requirements:**
- CIDB contractor registration required
- Construction work permit (if >50 workers or >30 days)
- Baseline risk assessment mandatory
- Construction Health and Safety professionals appointed
- Scaffolding, formwork, and temporary works designs
` : ''}

${data.work_type === 'electrical' ? `
**Electrical Work Requirements:**
- Qualified electricians (registered with DoL)
- Electrical Certificate of Compliance (CoC) required
- SANS 10142-1 compliance mandatory
- Isolation and lockout/tagout procedures
- Electrical safe work permits
- RCD protection on all portable equipment
` : ''}

${data.work_type === 'demolition' ? `
**Demolition Work Requirements:**
- Demolition permit from local authority
- Structural engineer assessment
- Asbestos survey (for buildings pre-2008)
- Demolition method statement
- Exclusion zones and public safety measures
- Dust and noise control measures
` : ''}

${data.work_type === 'civil' ? `
**Civil Engineering Requirements:**
- ECSA registered professional engineer
- Geotechnical investigation
- Traffic accommodation (if road works)
- Environmental authorization (if required)
- Services location and protection
- Earthworks and drainage designs
` : ''}
` : '';

  return `
# HEALTH AND SAFETY FILE
## Construction Regulations 2014 Compliance Document

---

## DOCUMENT METADATA

**Template Version:** 1.0  
**Regulation Reference:** Construction Regulations, 2014 (Government Gazette No. 37305)  
**Act Reference:** Occupational Health and Safety Act, 1993 (Act No. 85 of 1993)  
**Document Status:** Active  
**Created Date:** ${currentDate}  
**Last Updated:** ${currentDate}

---

## COVER PAGE

**Project Name:** ${data.project_name || '[Project Name]'}

**Client:** ${data.client_name || '[Client Name]'}

**Principal Contractor:** ${data.company_name || '[Company Name]'}

**Site Location:** ${data.site_location || '[Site Location]'}

**Document Date:** ${currentDate}

**Document Version:** 1.0

**Prepared By:** Construction Health and Safety Manager

**Approved By:** Principal Contractor

**Compliance Period:** ${currentDate} to Project Completion

---

## EXECUTIVE SUMMARY

**Project Overview:**
${data.scope_of_work || '[Project description]'}

**Project Duration:** ${data.project_duration || '[Duration]'}

**Number of Workers:** ${data.workers || '[Number of workers]'}

**Risk Classification:** ${data.risk_level || 'Medium'} Risk Construction Work

**Permit Required:** ${data.workers && parseInt(data.workers) > 50 ? 'YES - Construction work permit required (more than 50 workers)' : 'To be determined based on final project scope'}

${workTypeInfo}

## HAZARD PROFILE

**Major Hazards Identified on this Project:**

${data.height_work ? '✓ **Work at Heights** - Fall protection measures required (Regulation 10)' : ''}
${data.excavation ? '✓ **Excavation Work** - Support systems and inspections required (Regulation 11)' : ''}
${data.confined_space ? '✓ **Confined Space Entry** - Permit-to-work and atmospheric testing required' : ''}
${data.hazardous_substances ? '✓ **Hazardous Substances** - Chemical management and PPE required' : ''}
${data.traffic_management ? '✓ **Traffic Management** - Vehicle/pedestrian separation required' : ''}

**Equipment Used:** ${data.equipment || '[Equipment list]'}

**Additional Hazards:** ${data.hazards || '[Hazards identified]'}

**Control Measures:** ${data.controls || '[Control measures]'}

---

## TABLE OF CONTENTS

1. Project Information
2. Project Parties and Appointments
3. Regulatory Compliance Framework
4. Client Duties (Regulation 5)
5. Designer Duties (Regulation 6)
6. Principal Contractor Duties (Regulation 7)
7. Contractor Duties (Regulation 8)
8. Construction Manager Duties (Regulation 9)
9. Specific Construction Work Compliance (Regulations 10-20)
10. Health and Safety Documentation
11. Permits and Notifications
12. Training and Competency Requirements
13. Risk Assessment and Control Measures
14. Emergency Procedures
15. Monitoring and Review

---

## 1. PROJECT INFORMATION

### 1.1 Project Overview

**Project Name:** ${data.project_name || '[Project Name]'}

**Project Description:** ${data.scope_of_work || '[Project description and scope of work]'}

**Project Location:**
- Physical Address: ${data.site_location || '[Site location]'}
- Province: [Province]
- Municipality: [Municipality]

**Project Dates:**
- Commencement Date: [Start date]
- Expected Completion Date: [Completion date]
- Total Duration: ${data.project_duration || '[Duration]'}

**Project Value:** [Contract value in ZAR]

### 1.2 Construction Work Classification

**Type of Construction Work:**
${data.scope_of_work ? '- ' + data.scope_of_work.split(',').join('\n- ') : `
- Excavation work
- Structural work
- Work at height
- Scaffolding erection
- Electrical installations
- Other construction activities
`}

**Risk Classification:** ${data.risk_level || 'Medium'} Risk Construction Work

**Number of Workers:** ${data.workers || '[Number of workers]'}

**Permit Required:** ${data.workers && parseInt(data.workers) > 50 ? 'YES - Construction work permit required (more than 50 workers or work exceeding 30 days)' : 'To be determined based on project scope'}

---

## 9. SPECIFIC CONSTRUCTION WORK COMPLIANCE (REGULATIONS 10-20)

${generateHazardSections()}

${!data.height_work && !data.excavation && !data.confined_space && !data.hazardous_substances && !data.traffic_management ? `

### 9.1 FALL PROTECTION (REGULATION 10)

**Applicable to this project:** To be determined based on final scope

### 9.2 EXCAVATION WORK (REGULATION 11)

**Applicable to this project:** To be determined based on final scope

### 9.3 SCAFFOLDING (REGULATION 12)

**Applicable to this project:** To be determined based on final scope

### 9.4 CONFINED SPACE ENTRY

**Applicable to this project:** To be determined based on final scope

### 9.5 HAZARDOUS SUBSTANCES

**Applicable to this project:** To be determined based on final scope

### 9.6 TRAFFIC MANAGEMENT

**Applicable to this project:** To be determined based on final scope
` : ''}

---

## 15. MONITORING AND REVIEW

### 15.1 Inspections and Audits

**Inspection Schedule:**

| Inspection Type | Frequency | Responsible Person | Record |
|-----------------|-----------|-------------------|--------|
| Daily site inspection | Daily | Site Supervisor | Daily inspection checklist |
| Weekly H&S inspection | Weekly | CHSO | Weekly inspection report |
${data.height_work ? '| Fall protection inspection | Before use, weekly | Competent Person | Fall protection register |\n' : ''}
${data.excavation ? '| Excavation inspection | Daily before work | Competent Person | Excavation inspection register |\n' : ''}
${data.confined_space ? '| Confined space inspection | Before each entry | Competent Person | Confined space entry register |\n' : ''}
| Electrical equipment testing | 3 months | Qualified Electrician | Test certificate |
| Lifting equipment examination | 6 months | Approved Inspection Authority | Examination certificate |
| Fire extinguisher inspection | Monthly | Fire Marshal/CHSO | Fire equipment register |
| First aid kit inspection | Monthly | First Aider | First aid kit checklist |
| PPE inspection | Daily | Supervisor | Visual inspection |

---

**END OF HEALTH AND SAFETY FILE**

---

**Document Generated by:** Protekflow AI - HSE Compliance Solutions  
**Generation Date:** ${currentDate}  
**Template Version:** 1.0 (Enhanced with Work Type Classification & Hazard-Specific Sections)  
**Regulation Reference:** Construction Regulations, 2014 (Government Gazette No. 37305)  
**Act Reference:** Occupational Health and Safety Act, 1993 (Act No. 85 of 1993)
`;
};
