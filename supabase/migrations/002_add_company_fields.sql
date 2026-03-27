/*
  # Add Company and Professional Extended Fields

  ## Overview
  This migration adds comprehensive company information fields for clients/constructors
  and extended professional information for HSE professionals to enable document auto-fill.

  ## Changes to `profiles` table
  - Add company registration fields (reg number, COID, tax, VAT)
  - Add company contact information
  - Add professional qualification fields

  ## Why These Fields?
  These fields enable automatic population of HSE compliance documents with company
  and professional information, significantly reducing data entry time for users.
*/

-- Add company information fields for clients/constructors
ALTER TABLE profiles
ADD COLUMN IF NOT EXISTS company_reg_number text,
ADD COLUMN IF NOT EXISTS coid_number text,
ADD COLUMN IF NOT EXISTS tax_number text,
ADD COLUMN IF NOT EXISTS vat_number text,
ADD COLUMN IF NOT EXISTS company_address text,
ADD COLUMN IF NOT EXISTS contact_number text;

-- Add extended professional information fields
ALTER TABLE profiles
ADD COLUMN IF NOT EXISTS qualifications text,
ADD COLUMN IF NOT EXISTS years_experience text,
ADD COLUMN IF NOT EXISTS sacpcmp_number text,
ADD COLUMN IF NOT EXISTS id_number text;

-- Create index for company registration number lookups
CREATE INDEX IF NOT EXISTS idx_profiles_company_reg_number ON profiles(company_reg_number);

-- Create index for SACPCMP number lookups
CREATE INDEX IF NOT EXISTS idx_profiles_sacpcmp_number ON profiles(sacpcmp_number);
