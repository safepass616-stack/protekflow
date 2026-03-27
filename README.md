# Protekflow AI - HSE Compliance Management Platform

A professional HSE (Health, Safety & Environment) compliance document generation and management platform for South African construction projects.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- Supabase account (free tier works fine)

### 1. Clone and Install
```bash
npm install
```

### 2. Database Setup

#### Create Supabase Project
1. Go to [https://app.supabase.com](https://app.supabase.com)
2. Click "New Project"
3. Fill in project details:
   - **Project Name**: protekflow-ai (or your choice)
   - **Database Password**: Create a strong password
   - **Region**: Choose closest to South Africa (e.g., Cape Town)
4. Click "Create new project" and wait for setup to complete

#### Get Your Credentials
1. In your Supabase project dashboard, go to **Settings** → **API**
2. Copy these two values:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon public key** (long string starting with `eyJ...`)

#### Configure Environment Variables
1. Open the `.env` file in the project root
2. Replace the placeholder values:
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

#### Run Database Migration
1. In Supabase dashboard, go to **SQL Editor**
2. Click "New Query"
3. Copy the entire contents of `supabase/migrations/001_initial_schema.sql`
4. Paste into the SQL editor
5. Click "Run" to execute the migration
6. You should see "Success. No rows returned" message

### 3. Start Development Server
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## 📊 Database Schema

The database includes the following tables:

- **profiles** - User accounts (extends Supabase auth)
- **professionals** - HSE professional profiles
- **projects** - Construction projects
- **documents** - HSE compliance documents
- **document_revisions** - Document version history
- **document_comments** - Review comments
- **subscriptions** - User subscription plans

## 🔐 Authentication Setup

### Enable Email/Password Authentication
1. In Supabase dashboard, go to **Authentication** → **Providers**
2. Find **Email** provider
3. Enable it if not already enabled
4. **IMPORTANT**: Disable "Confirm email" option for development
   - Under **Email** settings, toggle OFF "Confirm email"
   - This allows instant sign-up without email verification

### Create Demo Users (Optional)
You can create demo users via SQL or the Supabase dashboard:

```sql
-- Admin user
INSERT INTO auth.users (email, encrypted_password, email_confirmed_at)
VALUES ('admin@protekflow.co.za', crypt('demo123', gen_salt('bf')), now());

-- Then create profile
INSERT INTO profiles (id, email, name, role, company)
SELECT id, 'admin@protekflow.co.za', 'System Administrator', 'admin', 'Protekflow AI'
FROM auth.users WHERE email = 'admin@protekflow.co.za';
```

## 🧪 Testing the Setup

1. Start the dev server: `npm run dev`
2. Navigate to the app
3. Try logging in with demo credentials (if created)
4. Check browser console for any Supabase connection errors
5. Verify that data persists after page refresh

## 🏗️ Project Structure

```
protekflow-ai/
├── src/
│   ├── components/       # React components
│   ├── pages/           # Page components
│   ├── lib/             # Supabase client
│   └── types.ts         # TypeScript types
├── supabase/
│   └── migrations/      # Database migrations
├── .env                 # Environment variables (not in git)
└── package.json
```

## 📝 Next Steps

After database setup is complete:

1. **Integrate Authentication**
   - Replace demo login with real Supabase auth
   - Add sign-up functionality
   - Implement password reset

2. **Connect Data to UI**
   - Fetch projects from database
   - Save documents to database
   - Load user profiles

3. **Add Real-time Features**
   - Document status updates
   - Comment notifications
   - Review workflow tracking

4. **Implement File Storage**
   - Supabase Storage for supporting documents
   - PDF export to storage
   - Document attachments

## 🐛 Troubleshooting

### "Missing Supabase environment variables" Error
- Check that `.env` file exists in project root
- Verify `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are set
- Restart dev server after changing `.env`

### Migration Fails
- Check that you copied the entire SQL file
- Verify you're in the correct Supabase project
- Check SQL Editor for specific error messages

### Can't Connect to Database
- Verify project URL is correct (no trailing slash)
- Check that anon key is complete (very long string)
- Ensure project is not paused (free tier auto-pauses after inactivity)

## 📚 Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript/introduction)
- [Row Level Security Guide](https://supabase.com/docs/guides/auth/row-level-security)

## 🆘 Support

If you encounter issues:
1. Check the browser console for errors
2. Review Supabase project logs (Dashboard → Logs)
3. Verify all environment variables are set correctly
4. Ensure database migration ran successfully
