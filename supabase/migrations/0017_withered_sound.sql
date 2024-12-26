/*
  # Amélioration des analytics personas

  1. Nouvelles Tables
    - persona_preferences: Préférences de communication détaillées
    - persona_performance: Métriques de performance détaillées
    - persona_content_preferences: Types de contenu préférés par persona

  2. Modifications
    - Ajout de champs d'analyse IA aux tables existantes
*/

-- Table des préférences de communication
CREATE TABLE IF NOT EXISTS persona_preferences (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  persona_id uuid REFERENCES personas(id),
  channel_preferences jsonb NOT NULL DEFAULT '{}',
  timing_preferences jsonb NOT NULL DEFAULT '{}',
  content_preferences jsonb NOT NULL DEFAULT '{}',
  ai_insights jsonb DEFAULT '[]',
  created_at timestamptz DEFAULT now()
);

-- Table des performances détaillées
CREATE TABLE IF NOT EXISTS persona_performance (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  persona_id uuid REFERENCES personas(id),
  channel text NOT NULL,
  content_type text NOT NULL,
  engagement_metrics jsonb NOT NULL DEFAULT '{}',
  conversion_metrics jsonb NOT NULL DEFAULT '{}',
  ai_recommendations jsonb DEFAULT '[]',
  period_start timestamptz NOT NULL,
  period_end timestamptz NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Table des préférences de contenu
CREATE TABLE IF NOT EXISTS persona_content_preferences (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  persona_id uuid REFERENCES personas(id),
  content_type text NOT NULL,
  format_preferences jsonb NOT NULL DEFAULT '{}',
  topic_preferences jsonb NOT NULL DEFAULT '{}',
  style_preferences jsonb NOT NULL DEFAULT '{}',
  ai_optimizations jsonb DEFAULT '[]',
  created_at timestamptz DEFAULT now()
);

-- Sécurité
ALTER TABLE persona_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE persona_performance ENABLE ROW LEVEL SECURITY;
ALTER TABLE persona_content_preferences ENABLE ROW LEVEL SECURITY;

-- Politiques RLS
CREATE POLICY "Users can manage their persona preferences"
  ON persona_preferences
  FOR ALL
  TO authenticated
  USING (
    auth.uid() IN (
      SELECT user_id 
      FROM personas 
      WHERE id = persona_preferences.persona_id
    )
  );

CREATE POLICY "Users can manage their persona performance"
  ON persona_performance
  FOR ALL
  TO authenticated
  USING (
    auth.uid() IN (
      SELECT user_id 
      FROM personas 
      WHERE id = persona_performance.persona_id
    )
  );

CREATE POLICY "Users can manage their persona content preferences"
  ON persona_content_preferences
  FOR ALL
  TO authenticated
  USING (
    auth.uid() IN (
      SELECT user_id 
      FROM personas 
      WHERE id = persona_content_preferences.persona_id
    )
  );

-- Indexes
CREATE INDEX idx_persona_preferences_persona ON persona_preferences(persona_id);
CREATE INDEX idx_persona_performance_persona ON persona_performance(persona_id);
CREATE INDEX idx_persona_performance_channel ON persona_performance(channel);
CREATE INDEX idx_persona_content_preferences_persona ON persona_content_preferences(persona_id);
CREATE INDEX idx_persona_content_preferences_type ON persona_content_preferences(content_type);

-- Fonction d'analyse des préférences
CREATE OR REPLACE FUNCTION analyze_persona_preferences()
RETURNS TRIGGER AS $$
BEGIN
  -- Analyser les préférences et générer des insights
  INSERT INTO persona_preferences (
    persona_id,
    channel_preferences,
    timing_preferences,
    content_preferences,
    ai_insights
  )
  SELECT
    NEW.id,
    jsonb_build_object(
      'primary_channel', (
        SELECT channel
        FROM persona_performance
        WHERE persona_id = NEW.id
        GROUP BY channel
        ORDER BY COUNT(*) DESC
        LIMIT 1
      ),
      'secondary_channels', (
        SELECT jsonb_agg(channel)
        FROM (
          SELECT channel
          FROM persona_performance
          WHERE persona_id = NEW.id
          GROUP BY channel
          ORDER BY COUNT(*) DESC
          OFFSET 1
          LIMIT 2
        ) sub
      )
    ),
    jsonb_build_object(
      'best_days', (
        SELECT jsonb_agg(day)
        FROM (
          SELECT EXTRACT(DOW FROM period_start) as day
          FROM persona_performance
          WHERE persona_id = NEW.id
          AND (engagement_metrics->>'rate')::numeric > 0.1
          GROUP BY day
          ORDER BY COUNT(*) DESC
          LIMIT 3
        ) sub
      ),
      'best_times', (
        SELECT jsonb_agg(hour)
        FROM (
          SELECT EXTRACT(HOUR FROM period_start) as hour
          FROM persona_performance
          WHERE persona_id = NEW.id
          AND (engagement_metrics->>'rate')::numeric > 0.1
          GROUP BY hour
          ORDER BY COUNT(*) DESC
          LIMIT 3
        ) sub
      )
    ),
    jsonb_build_object(
      'preferred_formats', (
        SELECT jsonb_agg(content_type)
        FROM persona_content_preferences
        WHERE persona_id = NEW.id
        ORDER BY (format_preferences->>'engagement_score')::numeric DESC
        LIMIT 3
      )
    ),
    jsonb_build_array(
      jsonb_build_object(
        'type', 'channel_optimization',
        'message', 'Recommandations de canaux optimaux'
      ),
      jsonb_build_object(
        'type', 'timing_optimization',
        'message', 'Moments optimaux pour l''engagement'
      ),
      jsonb_build_object(
        'type', 'content_optimization',
        'message', 'Formats de contenu recommandés'
      )
    );

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger pour l'analyse automatique
CREATE TRIGGER analyze_persona_preferences_trigger
AFTER INSERT OR UPDATE ON personas
FOR EACH ROW
EXECUTE FUNCTION analyze_persona_preferences();