-- ============================================================
-- TULUZ PLATFORM — INITIAL SCHEMA
-- Migration 001: Core tables + RLS policies
-- ============================================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- PROFILES (extends auth.users)
-- ============================================================
CREATE TABLE profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  role TEXT NOT NULL DEFAULT 'subscriber'
    CHECK (role IN ('subscriber', 'member', 'corporate', 'admin')),
  full_name TEXT,
  email TEXT,
  country TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Auto-create profile on user signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data ->> 'full_name'
  );
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE handle_new_user();

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

CREATE TRIGGER profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- RLS: profiles
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Profiles: users read own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Profiles: users update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Profiles: admins read all"
  ON profiles FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles p
      WHERE p.id = auth.uid() AND p.role = 'admin'
    )
  );

CREATE POLICY "Profiles: admins update all"
  ON profiles FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM profiles p
      WHERE p.id = auth.uid() AND p.role = 'admin'
    )
  );

-- ============================================================
-- ENTREPRENEUR PROFILES
-- ============================================================
CREATE TABLE entrepreneur_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE UNIQUE NOT NULL,
  business_name TEXT NOT NULL,
  business_description TEXT,
  sector TEXT,
  impact_type TEXT[],
  country TEXT,
  website TEXT,
  available_for TEXT[],
  impact_metrics JSONB DEFAULT '{}',
  ai_context JSONB DEFAULT '{}',
  is_published BOOLEAN DEFAULT false NOT NULL,
  approved_at TIMESTAMPTZ,
  approved_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- RLS: entrepreneur_profiles
ALTER TABLE entrepreneur_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "EntrepreneurProfiles: public reads published"
  ON entrepreneur_profiles FOR SELECT
  USING (is_published = true);

CREATE POLICY "EntrepreneurProfiles: owner reads own"
  ON entrepreneur_profiles FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "EntrepreneurProfiles: owner writes own"
  ON entrepreneur_profiles FOR INSERT
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "EntrepreneurProfiles: owner updates own"
  ON entrepreneur_profiles FOR UPDATE
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "EntrepreneurProfiles: admins full access"
  ON entrepreneur_profiles FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles p
      WHERE p.id = auth.uid() AND p.role = 'admin'
    )
  );

-- ============================================================
-- COURSES
-- ============================================================
CREATE TABLE courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  slug TEXT UNIQUE NOT NULL,
  is_published BOOLEAN DEFAULT false NOT NULL,
  order_index INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

ALTER TABLE courses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Courses: public reads published"
  ON courses FOR SELECT
  USING (is_published = true);

CREATE POLICY "Courses: admins full access"
  ON courses FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles p
      WHERE p.id = auth.uid() AND p.role = 'admin'
    )
  );

-- ============================================================
-- COURSE MODULES
-- ============================================================
CREATE TABLE course_modules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  content_type TEXT CHECK (content_type IN ('video', 'text', 'mixed')),
  content_url TEXT,
  content_summary TEXT,
  deliverable_type TEXT,
  deliverable_description TEXT,
  order_index INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

ALTER TABLE course_modules ENABLE ROW LEVEL SECURITY;

CREATE POLICY "CourseModules: members read from published courses"
  ON course_modules FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM courses c
      WHERE c.id = course_id AND c.is_published = true
    )
    AND
    EXISTS (
      SELECT 1 FROM profiles p
      WHERE p.id = auth.uid() AND p.role IN ('member', 'admin')
    )
  );

CREATE POLICY "CourseModules: admins full access"
  ON course_modules FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles p
      WHERE p.id = auth.uid() AND p.role = 'admin'
    )
  );

-- ============================================================
-- ENROLLMENTS
-- ============================================================
CREATE TABLE enrollments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE NOT NULL,
  started_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  completed_at TIMESTAMPTZ,
  UNIQUE(user_id, course_id)
);

ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enrollments: users read own"
  ON enrollments FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "Enrollments: users create own"
  ON enrollments FOR INSERT
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Enrollments: users update own"
  ON enrollments FOR UPDATE
  USING (user_id = auth.uid());

CREATE POLICY "Enrollments: admins full access"
  ON enrollments FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles p
      WHERE p.id = auth.uid() AND p.role = 'admin'
    )
  );

-- ============================================================
-- MODULE PROGRESS
-- ============================================================
CREATE TABLE module_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  module_id UUID REFERENCES course_modules(id) ON DELETE CASCADE NOT NULL,
  status TEXT DEFAULT 'not_started'
    CHECK (status IN ('not_started', 'in_progress', 'exam_pending', 'completed')) NOT NULL,
  exam_conversation JSONB DEFAULT '[]' NOT NULL,
  exam_passed_at TIMESTAMPTZ,
  deliverable JSONB,
  deliverable_generated_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  UNIQUE(user_id, module_id)
);

ALTER TABLE module_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "ModuleProgress: users read own"
  ON module_progress FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "ModuleProgress: users write own"
  ON module_progress FOR INSERT
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "ModuleProgress: users update own"
  ON module_progress FOR UPDATE
  USING (user_id = auth.uid());

CREATE POLICY "ModuleProgress: admins full access"
  ON module_progress FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles p
      WHERE p.id = auth.uid() AND p.role = 'admin'
    )
  );

-- ============================================================
-- CERTIFICATIONS / BADGES
-- ============================================================
CREATE TABLE certifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  course_id UUID REFERENCES courses(id) ON DELETE SET NULL,
  badge_type TEXT NOT NULL,
  badge_url TEXT,
  issued_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  issued_by UUID REFERENCES profiles(id),
  verification_url TEXT
);

ALTER TABLE certifications ENABLE ROW LEVEL SECURITY;

-- Public badge verification (by verification_url lookup — use separate endpoint)
CREATE POLICY "Certifications: public reads all"
  ON certifications FOR SELECT
  USING (true);

CREATE POLICY "Certifications: admins full access"
  ON certifications FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles p
      WHERE p.id = auth.uid() AND p.role = 'admin'
    )
  );

-- Also allow system to insert via service role (badge generation API)
CREATE POLICY "Certifications: service role insert"
  ON certifications FOR INSERT
  WITH CHECK (true);

-- ============================================================
-- MARKETPLACE CONTACTS / LEADS
-- ============================================================
CREATE TABLE marketplace_contacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  from_user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  to_entrepreneur_id UUID REFERENCES entrepreneur_profiles(id) ON DELETE CASCADE NOT NULL,
  message TEXT,
  contact_type TEXT CHECK (contact_type IN ('b2c', 'b2b', 'partnership')) NOT NULL,
  status TEXT DEFAULT 'pending' NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

ALTER TABLE marketplace_contacts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "MarketplaceContacts: sender reads own"
  ON marketplace_contacts FOR SELECT
  USING (from_user_id = auth.uid());

CREATE POLICY "MarketplaceContacts: entrepreneur reads received"
  ON marketplace_contacts FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM entrepreneur_profiles ep
      WHERE ep.id = to_entrepreneur_id AND ep.user_id = auth.uid()
    )
  );

CREATE POLICY "MarketplaceContacts: authenticated users can send"
  ON marketplace_contacts FOR INSERT
  WITH CHECK (from_user_id = auth.uid() AND auth.uid() IS NOT NULL);

CREATE POLICY "MarketplaceContacts: entrepreneur updates status"
  ON marketplace_contacts FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM entrepreneur_profiles ep
      WHERE ep.id = to_entrepreneur_id AND ep.user_id = auth.uid()
    )
  );

CREATE POLICY "MarketplaceContacts: admins full access"
  ON marketplace_contacts FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles p
      WHERE p.id = auth.uid() AND p.role = 'admin'
    )
  );

-- ============================================================
-- INDEXES for performance
-- ============================================================
CREATE INDEX idx_entrepreneur_profiles_user_id ON entrepreneur_profiles(user_id);
CREATE INDEX idx_entrepreneur_profiles_is_published ON entrepreneur_profiles(is_published);
CREATE INDEX idx_entrepreneur_profiles_sector ON entrepreneur_profiles(sector);
CREATE INDEX idx_entrepreneur_profiles_country ON entrepreneur_profiles(country);
CREATE INDEX idx_course_modules_course_id ON course_modules(course_id);
CREATE INDEX idx_course_modules_order ON course_modules(course_id, order_index);
CREATE INDEX idx_enrollments_user_id ON enrollments(user_id);
CREATE INDEX idx_module_progress_user_id ON module_progress(user_id);
CREATE INDEX idx_module_progress_module_id ON module_progress(module_id);
CREATE INDEX idx_certifications_user_id ON certifications(user_id);
CREATE INDEX idx_marketplace_contacts_entrepreneur ON marketplace_contacts(to_entrepreneur_id);
