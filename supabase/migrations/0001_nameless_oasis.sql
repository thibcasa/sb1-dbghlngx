/*
  # Initial CRM Schema

  1. New Tables
    - user_campaigns: Links users to campaigns
    - user_leads: Links users to leads
    - campaigns: Stores campaign data and settings
    - leads: Manages lead information and status
    - interactions: Tracks all lead interactions
  
  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- User relationship tables
CREATE TABLE IF NOT EXISTS user_campaigns (
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  campaign_id uuid,
  role text DEFAULT 'owner',
  created_at timestamptz DEFAULT now(),
  PRIMARY KEY (user_id, campaign_id)
);

CREATE TABLE IF NOT EXISTS user_leads (
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  lead_id uuid,
  role text DEFAULT 'owner',
  created_at timestamptz DEFAULT now(),
  PRIMARY KEY (user_id, lead_id)
);

-- Campaigns table
CREATE TABLE IF NOT EXISTS campaigns (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  budget numeric NOT NULL,
  status text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'active', 'paused', 'completed')),
  target_audience jsonb NOT NULL DEFAULT '{}',
  channels jsonb NOT NULL DEFAULT '[]',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE campaigns ENABLE ROW LEVEL SECURITY;

-- Update user_campaigns foreign key after campaigns table is created
ALTER TABLE user_campaigns 
  ADD CONSTRAINT fk_campaign 
  FOREIGN KEY (campaign_id) 
  REFERENCES campaigns(id) 
  ON DELETE CASCADE;

CREATE POLICY "Users can manage their campaigns"
  ON campaigns
  FOR ALL
  TO authenticated
  USING (auth.uid() IN (SELECT user_id FROM user_campaigns WHERE campaign_id = id));

-- Leads table
CREATE TABLE IF NOT EXISTS leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  status text NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'negotiation', 'won', 'lost')),
  source text NOT NULL,
  property_details jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Update user_leads foreign key after leads table is created
ALTER TABLE user_leads 
  ADD CONSTRAINT fk_lead 
  FOREIGN KEY (lead_id) 
  REFERENCES leads(id) 
  ON DELETE CASCADE;

CREATE POLICY "Users can manage their leads"
  ON leads
  FOR ALL
  TO authenticated
  USING (auth.uid() IN (SELECT user_id FROM user_leads WHERE lead_id = id));

-- Interactions table
CREATE TABLE IF NOT EXISTS interactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id uuid NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
  type text NOT NULL CHECK (type IN ('email', 'call', 'message', 'meeting')),
  status text NOT NULL DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'completed', 'failed')),
  notes text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE interactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their interactions"
  ON interactions
  FOR ALL
  TO authenticated
  USING (auth.uid() IN (SELECT user_id FROM user_leads WHERE lead_id = interactions.lead_id));