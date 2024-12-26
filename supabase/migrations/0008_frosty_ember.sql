/*
  # Configuration du système de gestion de contenu

  1. Nouvelles Tables
    - `contents` : Stockage du contenu (posts, stories, emails, etc.)
    - `content_templates` : Templates réutilisables
    - `content_schedules` : Planification des publications
    - `content_analytics` : Métriques de performance

  2. Sécurité
    - RLS activé sur toutes les tables
    - Politiques d'accès basées sur l'utilisateur

  3. Indexes
    - Optimisation des requêtes fréquentes
*/

-- Table des contenus
CREATE TABLE IF NOT EXISTS contents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  type text NOT NULL CHECK (type IN ('post', 'story', 'email', 'ad')),
  title text NOT NULL,
  body text NOT NULL,
  status text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'scheduled', 'published')),
  scheduled_for timestamptz,
  metadata jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Table des templates
CREATE TABLE IF NOT EXISTS content_templates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  name text NOT NULL,
  type text NOT NULL CHECK (type IN ('post', 'story', 'email', 'ad')),
  template text NOT NULL,
  variables jsonb DEFAULT '[]',
  category text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Table des planifications
CREATE TABLE IF NOT EXISTS content_schedules (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  content_id uuid REFERENCES contents(id) ON DELETE CASCADE,
  scheduled_for timestamptz NOT NULL,
  published_at timestamptz,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'published', 'failed')),
  error text,
  created_at timestamptz DEFAULT now()
);

-- Table des analyses
CREATE TABLE IF NOT EXISTS content_analytics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  content_id uuid REFERENCES contents(id) ON DELETE CASCADE,
  metrics jsonb NOT NULL DEFAULT '{}',
  date date NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Sécurité
ALTER TABLE contents ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_schedules ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_analytics ENABLE ROW LEVEL SECURITY;

-- Politiques RLS
CREATE POLICY "Users can manage their content"
  ON contents
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their templates"
  ON content_templates
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can view their schedules"
  ON content_schedules
  FOR ALL
  TO authenticated
  USING (
    auth.uid() IN (
      SELECT user_id 
      FROM contents 
      WHERE id = content_schedules.content_id
    )
  );

CREATE POLICY "Users can view their analytics"
  ON content_analytics
  FOR ALL
  TO authenticated
  USING (
    auth.uid() IN (
      SELECT user_id 
      FROM contents 
      WHERE id = content_analytics.content_id
    )
  );

-- Indexes
CREATE INDEX idx_contents_user ON contents(user_id);
CREATE INDEX idx_contents_status ON contents(status);
CREATE INDEX idx_contents_type ON contents(type);
CREATE INDEX idx_content_schedules_date ON content_schedules(scheduled_for);
CREATE INDEX idx_content_analytics_date ON content_analytics(date);