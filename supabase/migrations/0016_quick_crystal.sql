/*
  # Workflow Marketing IA

  1. Nouvelles Tables
    - `marketing_workflows` : Configuration des workflows marketing
    - `marketing_steps` : Étapes du workflow avec analyse IA
    - `marketing_content_templates` : Templates de contenu optimisés par IA
    - `marketing_analytics` : Analyses et performances

  2. Sécurité
    - RLS sur toutes les tables
    - Politiques d'accès utilisateurs

  3. Automatisation
    - Triggers pour l'analyse automatique
    - Fonctions d'optimisation IA
*/

-- Table des workflows marketing
CREATE TABLE IF NOT EXISTS marketing_workflows (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  name text NOT NULL,
  persona_id uuid REFERENCES personas(id),
  objective text NOT NULL,
  target_metrics jsonb NOT NULL DEFAULT '{}',
  status text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'active', 'completed', 'paused')),
  performance_metrics jsonb DEFAULT '{}',
  ai_recommendations jsonb DEFAULT '[]',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Table des étapes marketing
CREATE TABLE IF NOT EXISTS marketing_steps (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workflow_id uuid REFERENCES marketing_workflows(id),
  type text NOT NULL CHECK (type IN ('awareness', 'consideration', 'conversion')),
  channel text NOT NULL,
  content_type text NOT NULL,
  target_audience jsonb NOT NULL,
  ai_optimization jsonb DEFAULT '{}',
  performance_metrics jsonb DEFAULT '{}',
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'active', 'completed')),
  order_index int NOT NULL,
  started_at timestamptz,
  completed_at timestamptz,
  created_at timestamptz DEFAULT now()
);

-- Table des templates de contenu
CREATE TABLE IF NOT EXISTS marketing_content_templates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  step_id uuid REFERENCES marketing_steps(id),
  content_type text NOT NULL,
  template text NOT NULL,
  variables jsonb DEFAULT '[]',
  tone text NOT NULL,
  ai_suggestions jsonb DEFAULT '[]',
  performance_score numeric DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Table des analyses marketing
CREATE TABLE IF NOT EXISTS marketing_analytics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workflow_id uuid REFERENCES marketing_workflows(id),
  metrics jsonb NOT NULL,
  insights jsonb DEFAULT '[]',
  recommendations jsonb DEFAULT '[]',
  created_at timestamptz DEFAULT now()
);

-- Sécurité
ALTER TABLE marketing_workflows ENABLE ROW LEVEL SECURITY;
ALTER TABLE marketing_steps ENABLE ROW LEVEL SECURITY;
ALTER TABLE marketing_content_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE marketing_analytics ENABLE ROW LEVEL SECURITY;

-- Politiques RLS
CREATE POLICY "Users can manage their marketing workflows"
  ON marketing_workflows
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their marketing steps"
  ON marketing_steps
  FOR ALL
  TO authenticated
  USING (
    auth.uid() IN (
      SELECT user_id 
      FROM marketing_workflows 
      WHERE id = marketing_steps.workflow_id
    )
  );

CREATE POLICY "Users can manage their content templates"
  ON marketing_content_templates
  FOR ALL
  TO authenticated
  USING (
    auth.uid() IN (
      SELECT user_id 
      FROM marketing_workflows 
      WHERE id = (
        SELECT workflow_id 
        FROM marketing_steps 
        WHERE id = marketing_content_templates.step_id
      )
    )
  );

CREATE POLICY "Users can view their marketing analytics"
  ON marketing_analytics
  FOR ALL
  TO authenticated
  USING (
    auth.uid() IN (
      SELECT user_id 
      FROM marketing_workflows 
      WHERE id = marketing_analytics.workflow_id
    )
  );

-- Indexes
CREATE INDEX idx_marketing_workflows_user ON marketing_workflows(user_id);
CREATE INDEX idx_marketing_workflows_persona ON marketing_workflows(persona_id);
CREATE INDEX idx_marketing_steps_workflow ON marketing_steps(workflow_id);
CREATE INDEX idx_marketing_steps_status ON marketing_steps(status);
CREATE INDEX idx_content_templates_step ON marketing_content_templates(step_id);
CREATE INDEX idx_marketing_analytics_workflow ON marketing_analytics(workflow_id);

-- Fonction d'analyse IA du workflow
CREATE OR REPLACE FUNCTION analyze_marketing_workflow()
RETURNS TRIGGER AS $$
BEGIN
  -- Analyser les performances actuelles
  INSERT INTO marketing_analytics (
    workflow_id,
    metrics,
    insights,
    recommendations
  )
  SELECT
    NEW.id,
    jsonb_build_object(
      'reach', (
        SELECT SUM((performance_metrics->>'reach')::numeric)
        FROM marketing_steps
        WHERE workflow_id = NEW.id
      ),
      'engagement', (
        SELECT AVG((performance_metrics->>'engagement_rate')::numeric)
        FROM marketing_steps
        WHERE workflow_id = NEW.id
      ),
      'conversion', (
        SELECT AVG((performance_metrics->>'conversion_rate')::numeric)
        FROM marketing_steps
        WHERE workflow_id = NEW.id
        AND type = 'conversion'
      )
    ),
    jsonb_build_array(
      jsonb_build_object(
        'type', 'performance',
        'message', 'Analyse des performances du workflow'
      )
    ),
    jsonb_build_array(
      jsonb_build_object(
        'type', 'optimization',
        'message', 'Recommandations d''optimisation IA'
      )
    );

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger pour l'analyse automatique
CREATE TRIGGER analyze_workflow_performance
AFTER INSERT OR UPDATE ON marketing_workflows
FOR EACH ROW
EXECUTE FUNCTION analyze_marketing_workflow();

-- Fonction d'optimisation du contenu
CREATE OR REPLACE FUNCTION optimize_marketing_content()
RETURNS TRIGGER AS $$
BEGIN
  -- Optimiser le contenu avec l'IA
  UPDATE marketing_content_templates
  SET ai_suggestions = jsonb_build_array(
    jsonb_build_object(
      'type', 'tone',
      'suggestion', 'Ajuster le ton pour plus d''engagement'
    ),
    jsonb_build_object(
      'type', 'structure',
      'suggestion', 'Optimiser la structure du message'
    )
  )
  WHERE step_id = NEW.id;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger pour l'optimisation automatique
CREATE TRIGGER optimize_content
AFTER INSERT ON marketing_steps
FOR EACH ROW
EXECUTE FUNCTION optimize_marketing_content();