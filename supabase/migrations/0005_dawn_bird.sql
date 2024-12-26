/*
  # Pipeline Automation System

  1. New Tables
    - `pipeline_automation_rules`: Rules for automating pipeline transitions
    - `pipeline_bottlenecks`: Detection of pipeline bottlenecks
    - `pipeline_transitions`: Automated stage transitions
    - `pipeline_optimization_suggestions`: AI-powered optimization suggestions

  2. Security
    - Enable RLS on all tables
    - User-based access policies

  3. Functions
    - Bottleneck detection
    - Automatic transitions
*/

-- Table des règles d'automatisation
CREATE TABLE IF NOT EXISTS pipeline_automation_rules (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  stage_id uuid REFERENCES pipeline_stages(id),
  name text NOT NULL,
  conditions jsonb NOT NULL,
  actions jsonb NOT NULL,
  priority int DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Table des blocages détectés
CREATE TABLE IF NOT EXISTS pipeline_bottlenecks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  stage_id uuid REFERENCES pipeline_stages(id),
  severity text NOT NULL CHECK (severity IN ('low', 'medium', 'high')),
  detection_date timestamptz DEFAULT now(),
  metrics jsonb NOT NULL,
  causes jsonb DEFAULT '[]',
  recommendations jsonb DEFAULT '[]',
  status text DEFAULT 'detected' CHECK (status IN ('detected', 'analyzing', 'resolved')),
  resolved_at timestamptz,
  resolution_notes text
);

-- Table des transitions automatiques
CREATE TABLE IF NOT EXISTS pipeline_transitions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  contact_id uuid REFERENCES contacts(id),
  from_stage_id uuid REFERENCES pipeline_stages(id),
  to_stage_id uuid REFERENCES pipeline_stages(id),
  trigger_type text NOT NULL CHECK (trigger_type IN ('rule', 'score', 'time', 'activity')),
  trigger_details jsonb NOT NULL,
  executed_at timestamptz DEFAULT now(),
  success boolean DEFAULT true,
  error_message text
);

-- Table des suggestions d'optimisation
CREATE TABLE IF NOT EXISTS pipeline_optimization_suggestions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  stage_id uuid REFERENCES pipeline_stages(id),
  type text NOT NULL CHECK (type IN ('conversion', 'velocity', 'engagement')),
  priority text NOT NULL CHECK (priority IN ('low', 'medium', 'high')),
  current_metrics jsonb NOT NULL,
  target_metrics jsonb NOT NULL,
  suggestions jsonb NOT NULL,
  implemented boolean DEFAULT false,
  impact_score numeric,
  created_at timestamptz DEFAULT now(),
  implemented_at timestamptz
);

-- Sécurité
ALTER TABLE pipeline_automation_rules ENABLE ROW LEVEL SECURITY;
ALTER TABLE pipeline_bottlenecks ENABLE ROW LEVEL SECURITY;
ALTER TABLE pipeline_transitions ENABLE ROW LEVEL SECURITY;
ALTER TABLE pipeline_optimization_suggestions ENABLE ROW LEVEL SECURITY;

-- Politiques RLS
CREATE POLICY "Users can manage their automation rules"
  ON pipeline_automation_rules
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can view their pipeline bottlenecks"
  ON pipeline_bottlenecks
  FOR ALL
  TO authenticated
  USING (
    auth.uid() IN (
      SELECT user_id 
      FROM pipeline_stages 
      WHERE id = pipeline_bottlenecks.stage_id
    )
  );

CREATE POLICY "Users can view their pipeline transitions"
  ON pipeline_transitions
  FOR ALL
  TO authenticated
  USING (
    auth.uid() IN (
      SELECT user_id 
      FROM contacts 
      WHERE id = pipeline_transitions.contact_id
    )
  );

CREATE POLICY "Users can view their optimization suggestions"
  ON pipeline_optimization_suggestions
  FOR ALL
  TO authenticated
  USING (
    auth.uid() IN (
      SELECT user_id 
      FROM pipeline_stages 
      WHERE id = pipeline_optimization_suggestions.stage_id
    )
  );

-- Indexes pour les performances
CREATE INDEX idx_automation_rules_stage ON pipeline_automation_rules(stage_id);
CREATE INDEX idx_automation_rules_active ON pipeline_automation_rules(is_active);
CREATE INDEX idx_bottlenecks_stage ON pipeline_bottlenecks(stage_id);
CREATE INDEX idx_bottlenecks_severity ON pipeline_bottlenecks(severity);
CREATE INDEX idx_transitions_contact ON pipeline_transitions(contact_id);
CREATE INDEX idx_transitions_stages ON pipeline_transitions(from_stage_id, to_stage_id);
CREATE INDEX idx_optimization_stage ON pipeline_optimization_suggestions(stage_id);
CREATE INDEX idx_optimization_type ON pipeline_optimization_suggestions(type);
CREATE INDEX idx_optimization_priority ON pipeline_optimization_suggestions(priority);

-- Fonction pour détecter les blocages
CREATE OR REPLACE FUNCTION detect_pipeline_bottlenecks()
RETURNS TRIGGER AS $$
DECLARE
  contact_count integer;
  avg_time interval;
  severity_level text;
BEGIN
  -- Analyser les métriques de l'étape
  SELECT 
    COUNT(*),
    AVG(now() - entered_at)
  INTO 
    contact_count,
    avg_time
  FROM contacts_in_pipeline
  WHERE stage_id = NEW.stage_id;

  -- Déterminer la sévérité
  IF contact_count > 20 THEN
    severity_level := 'high';
  ELSIF contact_count > 15 THEN
    severity_level := 'medium';
  ELSE
    severity_level := 'low';
  END IF;

  -- Créer une alerte si nécessaire
  IF contact_count > 10 AND EXTRACT(EPOCH FROM avg_time) > 7 * 24 * 3600 THEN
    INSERT INTO pipeline_bottlenecks (
      stage_id,
      severity,
      metrics,
      causes
    ) VALUES (
      NEW.stage_id,
      severity_level,
      jsonb_build_object(
        'contacts_count', contact_count,
        'avg_time', EXTRACT(EPOCH FROM avg_time)
      ),
      jsonb_build_array(
        'long_stage_duration',
        'high_contact_volume'
      )
    );
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Fonction pour les transitions automatiques
CREATE OR REPLACE FUNCTION check_automatic_transitions()
RETURNS TRIGGER AS $$
DECLARE
  rule_record RECORD;
  new_stage_id uuid;
BEGIN
  -- Vérifier les règles d'automatisation
  FOR rule_record IN 
    SELECT * FROM pipeline_automation_rules 
    WHERE stage_id = NEW.stage_id 
    AND is_active = true
    ORDER BY priority DESC
  LOOP
    -- Si les conditions sont remplies
    IF NEW.metadata @> rule_record.conditions THEN
      -- Extraire l'ID de la nouvelle étape
      new_stage_id := (rule_record.actions->>'to_stage')::uuid;
      
      -- Créer une transition
      INSERT INTO pipeline_transitions (
        contact_id,
        from_stage_id,
        to_stage_id,
        trigger_type,
        trigger_details
      ) VALUES (
        NEW.contact_id,
        NEW.stage_id,
        new_stage_id,
        'rule',
        jsonb_build_object(
          'rule_id', rule_record.id,
          'rule_name', rule_record.name,
          'conditions_met', rule_record.conditions
        )
      );
      
      -- Mettre à jour l'étape du contact
      UPDATE contacts_in_pipeline
      SET stage_id = new_stage_id,
          last_updated = now()
      WHERE contact_id = NEW.contact_id;
    END IF;
  END LOOP;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers
CREATE TRIGGER check_pipeline_bottlenecks
AFTER INSERT OR UPDATE ON contacts_in_pipeline
FOR EACH ROW
EXECUTE FUNCTION detect_pipeline_bottlenecks();

CREATE TRIGGER check_pipeline_transitions
AFTER INSERT OR UPDATE ON contacts_in_pipeline
FOR EACH ROW
EXECUTE FUNCTION check_automatic_transitions();