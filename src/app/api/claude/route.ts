import Anthropic from '@anthropic-ai/sdk'
import { NextRequest, NextResponse } from 'next/server'

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

export async function POST(req: NextRequest) {
  const { profile, formData, extractedDocText } = await req.json()

  const prompt = `
You are a certified Health & Safety professional. Generate a comprehensive SHE (Safety, Health & Environment) file based on the following information.

## Client Profile
- Name: ${profile.full_name}
- Company: ${profile.company_name}

## Site Information
- Company: ${formData.company_name}
- Site Address: ${formData.site_address}
- Site Description: ${formData.site_description}

## Identified Hazards
${JSON.stringify(formData.hazards, null, 2)}

## Risk Assessments
${JSON.stringify(formData.risk_assessments, null, 2)}

## Emergency Procedures
${JSON.stringify(formData.emergency_procedures, null, 2)}

## Additional Information from Uploaded Documents
${extractedDocText || 'No documents uploaded'}

---

Generate a complete, professional SHE file with the following sections:
1. Executive Summary
2. Company & Site Details
3. Legal Compliance Statement
4. Hazard Register
5. Risk Assessment Matrix
6. Control Measures
7. Emergency Response Procedures
8. Responsibilities & Accountability
9. Review & Sign-off Section

Format it clearly with headings, tables where appropriate, and professional language suitable for H&S sign-off.
`

  const response = await anthropic.messages.create({
    model: 'claude-opus-4-5',
    max_tokens: 4096,
    messages: [{ role: 'user', content: prompt }]
  })

  const content = response.content[0].type === 'text' ? response.content[0].text : ''
  return NextResponse.json({ content })
}
