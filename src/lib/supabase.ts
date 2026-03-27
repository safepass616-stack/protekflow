import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)
```

---

**Your `src/` structure should look like this:**
```
src/
├── app/
│   └── api/
│       └── claude/
│           └── route.ts
└── lib/
    ├── anthropic.ts   ← create this
    └── supabase.ts    ← create this
