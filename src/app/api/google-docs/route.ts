import { google } from 'googleapis'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { content, title, reviewerEmail } = await req.json()

  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    },
    scopes: [
      'https://www.googleapis.com/auth/documents',
      'https://www.googleapis.com/auth/drive',
    ],
  })

  const docs = google.docs({ version: 'v1', auth })
  const drive = google.drive({ version: 'v3', auth })

  // Create the Google Doc
  const doc = await docs.documents.create({
    requestBody: { title: `SHE File - ${title}` }
  })

  const docId = doc.data.documentId!

  // Insert content
  await docs.documents.batchUpdate({
    documentId: docId,
    requestBody: {
      requests: [{
        insertText: {
          location: { index: 1 },
          text: content
        }
      }]
    }
  })

  // Share with H&S reviewer
  if (reviewerEmail) {
    await drive.permissions.create({
      fileId: docId,
      requestBody: {
        role: 'commenter',
        type: 'user',
        emailAddress: reviewerEmail,
      },
      sendNotificationEmail: true,
    })
  }

  const docUrl = `https://docs.google.com/document/d/${docId}/edit`
  return NextResponse.json({ url: docUrl, docId })
}