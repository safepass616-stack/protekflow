/*
  # Initial Database Schema for Protekflow AI

  ## Overview
  This migration sets up the complete database schema for the Protekflow AI HSE Compliance Management Platform.

  ## 1. New Tables

  ### `profiles`
  - `id` (uuid, primary key, references auth.users)
  - `email` (text, unique)
  - `name` (text)
  - `role` (enum: admin, professional, client)
  - `company` (text)
  - `profession` (text, nullable - for professionals)
  - `certifications` (text[], nullable - for professionals)
  - `department` (text, nullable - for clients)
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### `professionals`
  - `id` (uuid, primary key)
  - `user_id` (uuid, references profiles)
  - `title` (text)
  - `location` (text)
  - `experience` (text)
  - `specializations` (text[])
  - `rating` (numeric)
  - `reviews` (integer)
  - `hourly_rate` (text)
  - `availability` (enum: Available, Busy, Unavailable)
  - `profile_image` (text, nullable)
  - `bio` (text, nullable)
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### `projects`
  - `id` (uuid, primary key)
  - `name` (text)
  - `client_id` (uuid, references profiles)
  - `professional_id` (uuid, references profiles, nullable)
  - `contractor` (text)
  - `location` (text)
  - `status` (enum: active, completed, on-hold)
  - `risk_level` (enum: Low, Medium, High)
  - `workers` (integer)
  - `start_date` (date)
  - `end_date` (date)
  - `progress` (integer, default 0)
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### `documents`
  - `id` (uuid, primary key)
  - `project_id` (uuid, references projects)
  - `type` (text)
  - `name` (text)
  - `status` (enum: pending-review, approved, rejected)
  - `created_date` (timestamptz)
  - `reviewed_date` (timestamptz, nullable)
  - `created_by` (uuid, references profiles)
  - `reviewed_by` (uuid, references profiles, nullable)
  - `version` (integer, default 1)
  - `google_docs_url` (text, nullable)
  - `project_data` (jsonb)
  - `content` (text)
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### `document_revisions`
  - `id` (uuid, primary key)
  - `document_id` (uuid, references documents)
  - `version` (integer)
  - `content` (text)
  - `project_data` (jsonb)
  - `created_by` (uuid, references profiles)
  - `created_at` (timestamptz)

  ### `document_comments`
  - `id` (uuid, primary key)
  - `document_id` (uuid, references documents)
  - `user_id` (uuid, references profiles)
  - `comment` (text)
  - `created_at` (timestamptz)

  ### `subscriptions`
  - `id` (uuid, primary key)
  - `user_id` (uuid, references profiles)
  - `plan` (enum: pay-per-doc, pro, enterprise)
  - `status` (enum: active, cancelled, expired)
  - `documents_remaining` (integer, nullable)
  - `start_date` (timestamptz)
  - `end_date` (timestamptz, nullable)
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ## 2. Security
  - Enable RLS on all tables
  - Add policies for role-based access control
  - Admins can access all data
  - Professionals can access their assigned projects and documents
  - Clients can access their own projects and documents

  ## 3. Indexes
  - Add indexes for frequently queried columns
  - Foreign key indexes for better join performance
*/

-- Create custom types/enums
CREATE TYPE user_role AS ENUM ('admin', 'professional', 'client');
CREATE TYPE project_status AS ENUM ('active', 'completed', 'on-hold');
CREATE TYPE risk_level AS ENUM ('Low', 'Medium', 'High');
CREATE TYPE document_status AS ENUM ('pending-review', 'approved', 'rejected');
CREATE TYPE professional_availability AS ENUM ('Available', 'Busy', 'Unavailable');
CREATE TYPE subscription_plan AS ENUM ('pay-per-doc', 'pro', 'enterprise');
CREATE TYPE subscription_status AS ENUM ('active', 'cancelled', 'expired');

-- ============================================================================
-- STEP 1: CREATE ALL TABLES (No RLS policies yet)
-- ============================================================================

-- Profiles table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  name text NOT NULL,
  role user_role NOT NULL DEFAULT 'client',
  company text NOT NULL,
  profession text,
  certifications text[],
  department text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Professionals table (extended profile for HSE professionals)
CREATE TABLE IF NOT EXISTS professionals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  title text NOT NULL,
  location text NOT NULL,
  experience text NOT NULL,
  specializations text[] NOT NULL DEFAULT '{}',
  rating numeric(3,2) DEFAULT 0.00 CHECK (rating >= 0 AND rating <= 5),
  reviews integer DEFAULT 0,
  hourly_rate text NOT NULL,
  availability professional_availability DEFAULT 'Available',
  profile_image text,
  bio text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id)
);

-- Projects table
CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  client_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  professional_id uuid REFERENCES profiles(id) ON DELETE SET NULL,
  contractor text NOT NULL,
  location text NOT NULL,
  status project_status DEFAULT 'active',
  risk_level risk_level NOT NULL,
  workers integer NOT NULL DEFAULT 0,
  start_date date NOT NULL,
  end_date date NOT NULL,
  progress integer DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Documents table
CREATE TABLE IF NOT EXISTS documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid REFERENCES projects(id) ON DELETE CASCADE NOT NULL,
  type text NOT NULL,
  name text NOT NULL,
  status document_status DEFAULT 'pending-review',
  created_date timestamptz DEFAULT now(),
  reviewed_date timestamptz,
  created_by uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  reviewed_by uuid REFERENCES profiles(id) ON DELETE SET NULL,
  version integer DEFAULT 1,
  google_docs_url text,
  project_data jsonb NOT NULL,
  content text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Document revisions table (for version history)
CREATE TABLE IF NOT EXISTS document_revisions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  document_id uuid REFERENCES documents(id) ON DELETE CASCADE NOT NULL,
  version integer NOT NULL,
  content text NOT NULL,
  project_data jsonb NOT NULL,
  created_by uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Document comments table
CREATE TABLE IF NOT EXISTS document_comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  document_id uuid REFERENCES documents(id) ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  comment text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Subscriptions table
CREATE TABLE IF NOT EXISTS subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  plan subscription_plan NOT NULL,
  status subscription_status DEFAULT 'active',
  documents_remaining integer,
  start_date timestamptz DEFAULT now(),
  end_date timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- ============================================================================
-- STEP 2: CREATE INDEXES
-- ============================================================================

CREATE INDEX IF NOT EXISTS idx_profiles_email ON profiles(email);
CREATE INDEX IF NOT EXISTS idx_profiles_role ON profiles(role);
CREATE INDEX IF NOT EXISTS idx_professionals_user_id ON professionals(user_id);
CREATE INDEX IF NOT EXISTS idx_professionals_availability ON professionals(availability);
CREATE INDEX IF NOT EXISTS idx_projects_client_id ON projects(client_id);
CREATE INDEX IF NOT EXISTS idx_projects_professional_id ON projects(professional_id);
CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status);
CREATE INDEX IF NOT EXISTS idx_documents_project_id ON documents(project_id);
CREATE INDEX IF NOT EXISTS idx_documents_created_by ON documents(created_by);
CREATE INDEX IF NOT EXISTS idx_documents_status ON documents(status);
CREATE INDEX IF NOT EXISTS idx_document_revisions_document_id ON document_revisions(document_id);
CREATE INDEX IF NOT EXISTS idx_document_comments_document_id ON document_comments(document_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_user_id ON subscriptions(user_id);

-- ============================================================================
-- STEP 3: CREATE TRIGGERS
-- ============================================================================

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add updated_at triggers to all tables
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_professionals_updated_at
  BEFORE UPDATE ON professionals
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON projects
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_documents_updated_at
  BEFORE UPDATE ON documents
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_subscriptions_updated_at
  BEFORE UPDATE ON subscriptions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- STEP 4: ENABLE RLS (All tables exist now, safe to enable)
-- ============================================================================

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE professionals ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE document_revisions ENABLE ROW LEVEL SECURITY;
ALTER TABLE document_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- STEP 5: CREATE RLS POLICIES (All tables exist, policies can reference them)
-- ============================================================================

-- RLS Policies for profiles
CREATE POLICY "Users can read own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Admins can read all profiles"
  ON profiles FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- RLS Policies for professionals
CREATE POLICY "Anyone can read professional profiles"
  ON professionals FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Professionals can update own profile"
  ON professionals FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Admins can manage all professional profiles"
  ON professionals FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- RLS Policies for projects
CREATE POLICY "Clients can read own projects"
  ON projects FOR SELECT
  TO authenticated
  USING (
    client_id = auth.uid() OR
    professional_id = auth.uid() OR
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Clients can create projects"
  ON projects FOR INSERT
  TO authenticated
  WITH CHECK (
    client_id = auth.uid() OR
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Clients can update own projects"
  ON projects FOR UPDATE
  TO authenticated
  USING (
    client_id = auth.uid() OR
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- RLS Policies for documents
CREATE POLICY "Users can read documents from their projects"
  ON documents FOR SELECT
  TO authenticated
  USING (
    created_by = auth.uid() OR
    EXISTS (
      SELECT 1 FROM projects
      WHERE projects.id = documents.project_id
      AND (projects.client_id = auth.uid() OR projects.professional_id = auth.uid())
    ) OR
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Clients can create documents"
  ON documents FOR INSERT
  TO authenticated
  WITH CHECK (
    created_by = auth.uid() AND
    EXISTS (
      SELECT 1 FROM projects
      WHERE projects.id = documents.project_id
      AND projects.client_id = auth.uid()
    )
  );

CREATE POLICY "Professionals can update documents they review"
  ON documents FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM projects
      WHERE projects.id = documents.project_id
      AND projects.professional_id = auth.uid()
    ) OR
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- RLS Policies for document_revisions
CREATE POLICY "Users can read revisions of accessible documents"
  ON document_revisions FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM documents
      WHERE documents.id = document_revisions.document_id
      AND (
        documents.created_by = auth.uid() OR
        EXISTS (
          SELECT 1 FROM projects
          WHERE projects.id = documents.project_id
          AND (projects.client_id = auth.uid() OR projects.professional_id = auth.uid())
        )
      )
    ) OR
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Users can create revisions for accessible documents"
  ON document_revisions FOR INSERT
  TO authenticated
  WITH CHECK (
    created_by = auth.uid() AND
    EXISTS (
      SELECT 1 FROM documents
      WHERE documents.id = document_revisions.document_id
      AND (
        documents.created_by = auth.uid() OR
        EXISTS (
          SELECT 1 FROM projects
          WHERE projects.id = documents.project_id
          AND (projects.client_id = auth.uid() OR projects.professional_id = auth.uid())
        )
      )
    )
  );

-- RLS Policies for document_comments
CREATE POLICY "Users can read comments on accessible documents"
  ON document_comments FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM documents
      WHERE documents.id = document_comments.document_id
      AND (
        documents.created_by = auth.uid() OR
        EXISTS (
          SELECT 1 FROM projects
          WHERE projects.id = documents.project_id
          AND (projects.client_id = auth.uid() OR projects.professional_id = auth.uid())
        )
      )
    ) OR
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Users can create comments on accessible documents"
  ON document_comments FOR INSERT
  TO authenticated
  WITH CHECK (
    user_id = auth.uid() AND
    EXISTS (
      SELECT 1 FROM documents
      WHERE documents.id = document_comments.document_id
      AND (
        documents.created_by = auth.uid() OR
        EXISTS (
          SELECT 1 FROM projects
          WHERE projects.id = documents.project_id
          AND (projects.client_id = auth.uid() OR projects.professional_id = auth.uid())
        )
      )
    )
  );

-- RLS Policies for subscriptions
CREATE POLICY "Users can read own subscription"
  ON subscriptions FOR SELECT
  TO authenticated
  USING (
    user_id = auth.uid() OR
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Admins can manage all subscriptions"
  ON subscriptions FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );
