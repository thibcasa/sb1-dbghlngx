/*
  # Tables pour le système de génération de contenu IA

  1. New Tables
    - `ai_content_templates` - Templates de contenu
    - `ai_content_generations` - Historique des générations
    - `ai_content_feedback` - Feedback sur le contenu généré

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Table des templates de contenu IA
CREATE TABLE IF NOT EXISTS ai_content_templates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  type text NOT NULL CHECK (type IN ('post', 'article', 'story', 'ad', 'email', 'landing')),
  content text NOT NULL,
  metadata jsonb NOT NULL DEFAULT '{}',
  performance jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Table de l'historique des générations
CREATE TABLE IF NOT EXISTS ai_content_generations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  template_id uuid REFERENCES ai_content_templates(id),
  input jsonb NOT NULL,
  output jsonb NOT NULL,
  score numeric NOT NULL,
  metadata jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

-- Table du feedback sur le contenu généré
CREATE TABLE IF NOT EXISTS ai_content_feedback (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  generation_id uuid REFERENCES ai_content_generations(id),
  user_id uuid REFERENCES auth.users(id),
  rating integer CHECK (rating >= 1 AND rating <= 5),
  feedback text,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE ai_content_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_content_generations ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_content_feedback ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Everyone can read templates"
  ON ai_content_templates
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can view their generations"
  ON ai_content_generations
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create generations"
  ON ai_content_generations
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can manage their feedback"
  ON ai_content_feedback
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_content_templates_type ON ai_content_templates(type);
CREATE INDEX IF NOT EXISTS idx_content_generations_user ON ai_content_generations(user_id);
CREATE INDEX IF NOT EXISTS idx_content_generations_template ON ai_content_generations(template_id);
CREATE INDEX IF NOT EXISTS idx_content_feedback_generation ON ai_content_feedback(generation_id);