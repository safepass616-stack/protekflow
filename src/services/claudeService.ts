import Anthropic from '@anthropic-ai/sdk';
import { QuestionnaireData } from '../types/workflow';

const apiKey = import.meta.env.VITE_CLAUDE_API_KEY;

if (!apiKey) {
  console.error('VITE_CLAUDE_API_KEY is not set in environment variables');
}

const anthropic = new Anthropic({
  apiKey: apiKey,
  dangerouslyAllowBrowser: true // Required for browser usage
});

export interface GeneratedDocument {
  title: string;
  content: string;
  type: 'health_safety_plan' | 'risk_assessment' | 'method_statement';
  metadata: {
    projectName: string;
    generatedAt: string;
    version: string;
  };
}

const buildPrompt = (data: QuestionnaireData): string => {
  const hazards = [];
  if (data.workAtHeight) hazards.push('Work at Heights (Regulation 10)');
  if (data.excavationWork) hazards.push('Excavation Work (Regulation 11)');
  if (data.confinedSpace) hazards.push('Confined Space Entry');
  if (data.hotWork) hazards.push('Hot Work Operations');
  if (data.electricalWork) hazards.push('Electrical Work');
  if (data.heavyMachinery) hazards.push('Heavy Machinery and Mobile Plant');
  if (data.hazardousSubstances) hazards.push('Hazardous Substances');
  if (data.publicTraffic) hazards.push('Public Traffic Management');

  return `You are an expert South African Construction Health and Safety professional with extensive knowledge of the Occupational Health and Safety Act (Act 85 of 1993) and Construction Regulations 2014.

Generate a comprehensive Health and Safety File for the following construction project:

PROJECT INFORMATION:
- Project Name: ${data.projectName}
- Project Type: ${data.projectType}
- Location: ${data.projectLocation}
- Duration: ${data.projectDuration || 'To be determined'}
- Value: ${data.projectValue || 'To be determined'}

CLIENT INFORMATION:
- Client: ${data.clientName}
- Principal Contractor: ${data.principalContractor}
- Site Address: ${data.siteAddress}
- Site Description: ${data.siteDescription || 'N/A'}

WORKFORCE:
- Direct Employees: ${data.numberOfEmployees}
- Contractors: ${data.numberOfContractors}
- Working Hours: ${data.workingHours || 'Standard construction hours'}

IDENTIFIED HAZARDS:
${hazards.length > 0 ? hazards.map(h => `- ${h}`).join('\n') : '- General construction hazards'}

ADDITIONAL INFORMATION:
- Custom Hazards: ${data.customHazards || 'None specified'}
- Equipment: ${data.equipmentList || 'Standard construction equipment'}
- Required Permits: ${data.requiredPermits.join(', ') || 'To be determined'}
- Environmental Considerations: ${data.environmentalConsiderations || 'N/A'}

STATUTORY APPOINTMENTS:
- Construction Manager: ${data.hasConstructionManager ? 'Required' : 'To be determined'}
- Health & Safety Officer: ${data.hasHealthSafetyOfficer ? 'Required' : 'To be determined'}
- First Aider: ${data.hasFirstAider ? 'Required' : 'To be determined'}
- Fire Marshal: ${data.hasFireMarshal ? 'Required' : 'To be determined'}

Generate a professional, audit-ready Health and Safety File that includes:

1. EXECUTIVE SUMMARY
   - Project overview
   - Key stakeholders
   - Risk classification
   - Compliance statement

2. COMPREHENSIVE RISK ASSESSMENT
   - Detailed risk assessment for each identified hazard
   - Likelihood and severity ratings (use 5x5 risk matrix)
   - Control measures (hierarchy of controls)
   - Residual risk ratings
   - Responsible persons

3. STATUTORY APPOINTMENTS
   - Required appointments based on project size and hazards
   - Roles and responsibilities
   - Competency requirements
   - SACPCMP registration requirements where applicable

4. HEALTH AND SAFETY PLAN
   - Site-specific safety rules
   - Induction and training requirements
   - PPE requirements
   - Emergency procedures
   - Incident reporting procedures

5. METHOD STATEMENTS
   - Safe work procedures for each identified hazard
   - Step-by-step instructions
   - Required equipment and PPE
   - Emergency response procedures

6. INSPECTION AND MONITORING
   - Inspection schedules
   - Checklists
   - Record keeping requirements

7. LEGAL COMPLIANCE
   - Relevant sections of Construction Regulations 2014
   - OHSA 1993 requirements
   - Required permits and notifications

Format the document professionally with clear headings, numbered sections, and bullet points. Use South African terminology and regulations. Ensure the document is ready for Department of Labour inspection.

The document should be approximately 8-10 pages when formatted, comprehensive yet practical for site use.`;
};

export const generateHealthSafetyDocument = async (
  data: QuestionnaireData
): Promise<GeneratedDocument> => {
  try {
    if (!apiKey) {
      throw new Error('Claude API key is not configured. Please set VITE_CLAUDE_API_KEY in your environment variables.');
    }

    const prompt = buildPrompt(data);

    const message = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 8000,
      temperature: 0.7,
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ]
    });

    // Extract text content from Claude's response
    const content = message.content
      .filter((block): block is Anthropic.TextBlock => block.type === 'text')
      .map(block => block.text)
      .join('\n\n');

    if (!content || content.trim().length === 0) {
      throw new Error('Claude API returned an empty response');
    }

    return {
      title: `Health and Safety File - ${data.projectName}`,
      content: content,
      type: 'health_safety_plan',
      metadata: {
        projectName: data.projectName,
        generatedAt: new Date().toISOString(),
        version: '1.0'
      }
    };
  } catch (error: any) {
    console.error('Claude API Error:', error);
    
    // Provide user-friendly error messages
    if (error.message?.includes('API key')) {
      throw new Error('API key configuration error. Please contact support.');
    } else if (error.message?.includes('rate limit')) {
      throw new Error('Service is currently busy. Please try again in a few moments.');
    } else if (error.message?.includes('network') || error.message?.includes('fetch')) {
      throw new Error('Network error. Please check your connection and try again.');
    } else {
      throw new Error(`Failed to generate document: ${error.message || 'Unknown error'}`);
    }
  }
};

export const generateRiskAssessment = async (
  data: QuestionnaireData
): Promise<GeneratedDocument> => {
  // Similar implementation for risk assessment specific generation
  const document = await generateHealthSafetyDocument(data);
  return {
    ...document,
    title: `Risk Assessment - ${data.projectName}`,
    type: 'risk_assessment'
  };
};

export const generateMethodStatement = async (
  data: QuestionnaireData,
  activity: string
): Promise<GeneratedDocument> => {
  // Similar implementation for method statement specific generation
  const document = await generateHealthSafetyDocument(data);
  return {
    ...document,
    title: `Method Statement - ${activity}`,
    type: 'method_statement'
  };
};
