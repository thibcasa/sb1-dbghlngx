/*
  # Configuration du suivi des objectifs marketing

  1. Nouvelles Tables
    - `marketing_objectives`
      - Stocke les objectifs marketing principaux
      - Inclut les métriques et le suivi de progression
    - `objective_sequences`
      - Définit les séquences d'actions pour chaque objectif
    - `objective_content`
      - Stocke le contenu généré pour chaque étape
    
  2. Security
    - Enable RLS sur toutes les tables
    - Politiques d'accès pour les utilisateurs authentifiés
*/

-- Table des objectifs marketing
CREATE TABLE IF NOT EXISTS marketing_objectives (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  title text NOT NULL,
  target_count int NOT NULL,
  current_count int DEFAULT 0,
  start_date timestamptz DEFAULT now(),
  deadline timestamptz NOT NULL,
  status text DEFAULT 'active' CHECK (status IN ('active', 'completed', 'failed')),
  budget numeric NOT NULL,
  audience jsonb NOT NULL DEFAULT '{}',
  metrics jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Table des séquences d'objectifs
CREATE TABLE IF NOT EXISTS objective_sequences (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  objective_id uuid REFERENCES marketing_objectives(id) ON DELETE CASCADE,
  step_order int NOT NULL,
  type text NOT NULL CHECK (type IN ('awareness', 'engagement', 'conversion')),
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'active', 'completed')),
  budget_allocation numeric NOT NULL,
  requirements jsonb DEFAULT '[]',
  metrics jsonb DEFAULT '{}',
  start_date timestamptz,
  end_date timestamptz,
  created_at timestamptz DEFAULT now()
);

-- Table du contenu des objectifs
CREATE TABLE IF NOT EXISTS objective_content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sequence_id uuid REFERENCES objective_sequences(id) ON DELETE CASCADE,
  content_type text NOT NULL CHECK (content_type IN ('post', 'story', 'ad', 'landing')),
  content jsonb NOT NULL,
  performance_metrics jsonb DEFAULT '{}',
  status text DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  published_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Sécurité
ALTER TABLE marketing_objectives ENABLE ROW LEVEL SECURITY;
ALTER TABLE objective_sequences ENABLE ROW LEVEL SECURITY;
ALTER TABLE objective_content ENABLE ROW LEVEL SECURITY;

-- Politiques RLS
CREATE POLICY "Users can manage their objectives"
  ON marketing_objectives
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their sequences"
  ON objective_sequences
  FOR ALL
  TO authenticated
  USING (
    auth.uid() IN (
      SELECT user_id 
      FROM marketing_objectives 
      WHERE id = objective_sequences.objective_id
    )
  );

CREATE POLICY "Users can manage their content"
  ON objective_content
  FOR ALL
  TO authenticated
  USING (
    auth.uid() IN (
      SELECT user_id 
      FROM marketing_objectives 
      WHERE id = (
        SELECT objective_id 
        FROM objective_sequences 
        WHERE id = objective_content.sequence_id
      )
    )
  );