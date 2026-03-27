import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  const { sheFileId, content, companyName } = await req.json()

  // Use a headless HTML-to-PDF approach via Puppeteer or a service
  // Simplest option: store content and generate on demand
  // Here we'll save to Supabase Storage as a text blob and return URL
  
  const fileName = `she-files/${sheFileId}/she-file.txt`
  
  const { data, error } = await supabaseAdmin.storage
    .from('she-files')
    .upload(fileName, content, {
      contentType: 'text/plain',
      upsert: true
    })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  const { data: urlData } = supabaseAdmin.storage
    .from('she-files')
    .getPublicUrl(fileName)

  return NextResponse.json({ url: urlData.publicUrl })
}
```

---

## 7. Environment Variables

**`.env.local`**
```
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Anthropic
ANTHROPIC_API_KEY=

# Google (Service Account)
GOOGLE_CLIENT_EMAIL=
GOOGLE_PRIVATE_KEY=