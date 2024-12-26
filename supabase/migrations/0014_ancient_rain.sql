-- Tables des personas
CREATE TABLE IF NOT EXISTS personas (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  name text NOT NULL,
  demographics jsonb NOT NULL DEFAULT '{}',
  psychographics jsonb NOT NULL DEFAULT '{}',
  behavior jsonb NOT NULL DEFAULT '{}',
  journey jsonb NOT NULL DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Table des analyses de persona
CREATE TABLE IF NOT EXISTS persona_analytics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  persona_id uuid REFERENCES personas(id),
  metrics jsonb NOT NULL DEFAULT '{}',
  insights jsonb NOT NULL DEFAULT '[]',
  recommendations jsonb NOT NULL DEFAULT '[]',
  created_at timestamptz DEFAULT now()
);

-- Table des campagnes par persona
CREATE TABLE IF NOT EXISTS persona_campaigns (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  persona_id uuid REFERENCES personas(id),
  campaign_id uuid REFERENCES campaigns(id),
  performance_metrics jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

-- Table des contenus par persona
CREATE TABLE IF NOT EXISTS persona_content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  persona_id uuid REFERENCES personas(id),
  content_id uuid REFERENCES contents(id),
  performance_metrics jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

-- Sécurité
ALTER TABLE personas ENABLE ROW LEVEL SECURITY;
ALTER TABLE persona_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE persona_campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE persona_content ENABLE ROW LEVEL SECURITY;

-- Politiques RLS
CREATE POLICY "Users can manage their personas"
  ON personas
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can view their persona analytics"
  ON persona_analytics
  FOR ALL
  TO authenticated
  USING (
    auth.uid() IN (
      SELECT user_id 
      FROM personas 
      WHERE id = persona_analytics.persona_id
    )
  );

CREATE POLICY "Users can manage their persona campaigns"
  ON persona_campaigns
  FOR ALL
  TO authenticated
  USING (
    auth.uid() IN (
      SELECT user_id 
      FROM personas 
      WHERE id = persona_campaigns.persona_id
    )
  );

CREATE POLICY "Users can manage their persona content"
  ON persona_content
  FOR ALL
  TO authenticated
  USING (
    auth.uid() IN (
      SELECT user_id 
      FROM personas 
      WHERE id = persona_content.persona_id
    )
  );

-- Indexes
CREATE INDEX idx_personas_user ON personas(user_id);
CREATE INDEX idx_persona_analytics_persona ON persona_analytics(persona_id);
CREATE INDEX idx_persona_campaigns_persona ON persona_campaigns(persona_id);
CREATE INDEX idx_persona_campaigns_campaign ON persona_campaigns(campaign_id);
CREATE INDEX idx_persona_content_persona ON persona_content(persona_id);
CREATE INDEX idx_persona_content_content ON persona_content(content_id);

-- Fonction pour mettre à jour les analytics
CREATE OR REPLACE FUNCTION update_persona_analytics()
RETURNS TRIGGER AS $$
BEGIN
  -- Analyser les performances des campagnes
  INSERT INTO persona_analytics (
    persona_id,
    metrics,
    insights,
    recommendations
  )
  SELECT
    NEW.id,
    jsonb_build_object(
      'campaigns_count', (
        SELECT COUNT(*)
        FROM persona_campaigns
        WHERE persona_id = NEW.id
      ),
      'content_count', (
        SELECT COUNT(*)
        FROM persona_content
        WHERE persona_id = NEW.id
      ),
      'average_engagement', (
        SELECT AVG((metrics->>'engagement_rate')::numeric)
        FROM persona_campaigns
        WHERE persona_id = NEW.id
      )
    ),
    jsonb_build_array(
      jsonb_build_object(
        'type', 'performance',
        'message', 'Analyse des performances par persona'
      )
    ),
    jsonb_build_array(
      jsonb_build_object(
        'type', 'optimization',
        'message', 'Recommandations d''optimisation'
      )
    );
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger pour l'analyse automatique
CREATE TRIGGER analyze_persona_performance
AFTER INSERT OR UPDATE ON personas
FOR EACH ROW
EXECUTE FUNCTION update_persona_analytics();