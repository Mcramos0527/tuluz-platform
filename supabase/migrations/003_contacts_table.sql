-- ─────────────────────────────────────────────────────────────────────────────
-- 003_contacts_table.sql
-- CRM contacts imported from Wix / external marketing tool.
-- These are NOT auth.users — they are leads/prospects that can later be
-- invited to create a full account (converted_user_id links back to profiles).
-- ─────────────────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS contacts (
  id                UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name         TEXT,
  email             TEXT        NOT NULL,
  phone             TEXT,
  city              TEXT,
  state             TEXT,
  country           TEXT,
  -- 'emprendedora' | 'empresa' | 'lead' | 'subscriber'
  role              TEXT        NOT NULL DEFAULT 'lead'
                    CHECK (role IN ('emprendedora', 'empresa', 'lead', 'subscriber')),
  -- 'subscribed' | 'unsubscribed' | 'never_subscribed'
  email_status      TEXT        NOT NULL DEFAULT 'never_subscribed'
                    CHECK (email_status IN ('subscribed', 'unsubscribed', 'never_subscribed')),
  source            TEXT,
  language          TEXT,
  tags              TEXT[],
  is_emprendedora   BOOLEAN     NOT NULL DEFAULT false,
  last_activity     TEXT,
  last_activity_at  TIMESTAMPTZ,
  wix_created_at    TIMESTAMPTZ,
  -- set when this contact is converted into a real platform user
  converted_user_id UUID        REFERENCES profiles(id) ON DELETE SET NULL,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Prevent duplicate imports
CREATE UNIQUE INDEX IF NOT EXISTS contacts_email_unique_idx
  ON contacts (LOWER(email));

CREATE INDEX IF NOT EXISTS contacts_role_idx          ON contacts (role);
CREATE INDEX IF NOT EXISTS contacts_email_status_idx  ON contacts (email_status);
CREATE INDEX IF NOT EXISTS contacts_country_idx       ON contacts (country);
CREATE INDEX IF NOT EXISTS contacts_is_emprendedora_idx ON contacts (is_emprendedora);

-- RLS
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- Only admins can read/write contacts
CREATE POLICY "Admin full access to contacts"
  ON contacts FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
        AND profiles.role = 'admin'
    )
  );
