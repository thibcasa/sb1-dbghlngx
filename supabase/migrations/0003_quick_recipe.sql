/*
  # Système de marketing social

  1. Nouvelles Tables
    - `social_accounts` : Comptes réseaux sociaux connectés
    - `social_posts` : Publications sur les réseaux sociaux
    - `social_analytics` : Analyses des performances
    - `content_templates` : Templates de contenu réutilisables
    - `content_calendar` : Calendrier de publication
    - `hashtag_groups` : Groupes de hashtags optimisés

  2. Security
    - Enable RLS sur toutes les tables
    - Policies pour la gestion des accès
*/

-- Tables des comptes sociaux
CREATE TABLE IF NOT EXISTS social_accounts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  platform text NOT NULL CHECK (platform IN ('facebook', 'instagram', 'linkedin', 'tiktok')),
  account_name text NOT NULL,
  account_id text NOT NULL,
  status text DEFAULT 'active' CHECK (status IN ('active', 'paused', 'disconnected')),
  metrics jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id, platform, account_id)
);

-- Table des publications
CREATE TABLE IF NOT EXISTS social_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  account_id uuid REFERENCES social_accounts(id),
  content_type text NOT NULL CHECK (content_type IN ('post', 'story', 'reel', 'article')),
  content jsonb NOT NULL,
  schedule_time timestamptz,
  status text DEFAULT 'draft' CHECK (status IN ('draft', 'scheduled', 'published', 'failed')),
  performance_metrics jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Table des analyses
CREATE TABLE IF NOT EXISTS social_analytics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  account_id uuid REFERENCES social_accounts(id),
  date date NOT NULL,
  metrics jsonb NOT NULL,
  insights jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

-- Table des templates de contenu
CREATE TABLE IF NOT EXISTS content_templates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  name text NOT NULL,
  type text NOT NULL CHECK (type IN ('post', 'story', 'reel', 'article')),
  content jsonb NOT NULL,
  variables jsonb DEFAULT '[]',
  performance_score numeric DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Table du calendrier de contenu
CREATE TABLE IF NOT EXISTS content_calendar (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  post_id uuid REFERENCES social_posts(id),
  schedule_date date NOT NULL,
  schedule_time time NOT NULL,
  status text DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'published', 'skipped')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Table des groupes de hashtags
CREATE TABLE IF NOT EXISTS hashtag_groups (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  name text NOT NULL,
  hashtags text[] NOT NULL,
  performance_metrics jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Sécurité
ALTER TABLE social_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE social_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE social_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_calendar ENABLE ROW LEVEL SECURITY;
ALTER TABLE hashtag_groups ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can manage their social accounts"
  ON social_accounts
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their posts"
  ON social_posts
  FOR ALL
  TO authenticated
  USING (
    auth.uid() IN (
      SELECT user_id 
      FROM social_accounts 
      WHERE id = social_posts.account_id
    )
  );

CREATE POLICY "Users can view their analytics"
  ON social_analytics
  FOR ALL
  TO authenticated
  USING (
    auth.uid() IN (
      SELECT user_id 
      FROM social_accounts 
      WHERE id = social_analytics.account_id
    )
  );

CREATE POLICY "Users can manage their content templates"
  ON content_templates
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their content calendar"
  ON content_calendar
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their hashtag groups"
  ON hashtag_groups
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

-- Indexes pour les performances
CREATE INDEX idx_social_posts_schedule ON social_posts(schedule_time);
CREATE INDEX idx_social_analytics_date ON social_analytics(date);
CREATE INDEX idx_content_calendar_schedule ON content_calendar(schedule_date, schedule_time);