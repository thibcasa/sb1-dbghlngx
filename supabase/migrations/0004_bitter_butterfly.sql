/*
  # Création des tables pour le pipeline dynamique

  1. Tables
    - contacts : Table principale des contacts
    - pipeline_stages : Étapes personnalisables du pipeline
    - pipeline_events : Événements et transitions dans le pipeline
    - contacts_in_pipeline : Position des contacts dans le pipeline
    - pipeline_metrics : Métriques de performance du pipeline

  2. Relations
    - Liens entre contacts et étapes
    - Historique des mouvements
    - Métriques par étape

  3. Sécurité
    - RLS pour toutes les tables
    - Politiques par utilisateur
*/

-- Table des contacts
CREATE TABLE IF NOT EXISTS contacts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  status text NOT NULL DEFAULT 'new',
  source text,
  metadata jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Table des étapes du pipeline
CREATE TABLE IF NOT EXISTS pipeline_stages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  name text NOT NULL,
  description text,
  order_index int NOT NULL,
  color text,
  requirements jsonb DEFAULT '[]',
  metrics jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Table des événements du pipeline
CREATE TABLE IF NOT EXISTS pipeline_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  contact_id uuid REFERENCES contacts(id),
  from_stage_id uuid REFERENCES pipeline_stages(id),
  to_stage_id uuid REFERENCES pipeline_stages(id),
  duration interval,
  metadata jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

-- Table des contacts dans le pipeline
CREATE TABLE IF NOT EXISTS contacts_in_pipeline (
  contact_id uuid REFERENCES contacts(id),
  stage_id uuid REFERENCES pipeline_stages(id),
  position int NOT NULL,
  entered_at timestamptz DEFAULT now(),
  last_updated timestamptz DEFAULT now(),
  metadata jsonb DEFAULT '{}',
  PRIMARY KEY (contact_id, stage_id)
);

-- Table des métriques du pipeline
CREATE TABLE IF NOT EXISTS pipeline_metrics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  stage_id uuid REFERENCES pipeline_stages(id),
  date date NOT NULL,
  metrics jsonb NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Sécurité
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE pipeline_stages ENABLE ROW LEVEL SECURITY;
ALTER TABLE pipeline_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacts_in_pipeline ENABLE ROW LEVEL SECURITY;
ALTER TABLE pipeline_metrics ENABLE ROW LEVEL SECURITY;

-- Politiques RLS
CREATE POLICY "Users can manage their contacts"
  ON contacts
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their pipeline stages"
  ON pipeline_stages
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can view their pipeline events"
  ON pipeline_events
  FOR ALL
  TO authenticated
  USING (
    auth.uid() IN (
      SELECT user_id 
      FROM contacts 
      WHERE id = pipeline_events.contact_id
    )
  );

CREATE POLICY "Users can manage contacts in their pipeline"
  ON contacts_in_pipeline
  FOR ALL
  TO authenticated
  USING (
    auth.uid() IN (
      SELECT user_id 
      FROM contacts 
      WHERE id = contacts_in_pipeline.contact_id
    )
  );

CREATE POLICY "Users can view their pipeline metrics"
  ON pipeline_metrics
  FOR ALL
  TO authenticated
  USING (
    auth.uid() IN (
      SELECT user_id 
      FROM pipeline_stages 
      WHERE id = pipeline_metrics.stage_id
    )
  );

-- Indexes
CREATE INDEX idx_contacts_user ON contacts(user_id);
CREATE INDEX idx_contacts_email ON contacts(email);
CREATE INDEX idx_pipeline_events_contact ON pipeline_events(contact_id);
CREATE INDEX idx_pipeline_events_stages ON pipeline_events(from_stage_id, to_stage_id);
CREATE INDEX idx_contacts_pipeline_stage ON contacts_in_pipeline(stage_id);
CREATE INDEX idx_pipeline_metrics_date ON pipeline_metrics(date);