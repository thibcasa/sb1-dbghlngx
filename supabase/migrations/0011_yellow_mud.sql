-- AI Models table
CREATE TABLE IF NOT EXISTS ai_models (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  type text NOT NULL,
  parameters jsonb NOT NULL DEFAULT '{}',
  version text NOT NULL,
  last_updated timestamptz DEFAULT now()
);

-- AI Predictions table
CREATE TABLE IF NOT EXISTS ai_predictions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  model_type text NOT NULL,
  input jsonb NOT NULL,
  output jsonb NOT NULL,
  confidence numeric NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- AI Monitoring table
CREATE TABLE IF NOT EXISTS ai_monitoring (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  type text NOT NULL,
  metrics jsonb NOT NULL,
  alerts jsonb DEFAULT '[]',
  insights jsonb DEFAULT '[]',
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE ai_models ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_predictions ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_monitoring ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Everyone can read AI models"
  ON ai_models
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Everyone can read AI predictions"
  ON ai_predictions
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Everyone can read AI monitoring"
  ON ai_monitoring
  FOR SELECT
  TO authenticated
  USING (true);

-- Indexes
CREATE INDEX idx_ai_models_type ON ai_models(type);
CREATE INDEX idx_ai_predictions_model_type ON ai_predictions(model_type);
CREATE INDEX idx_ai_monitoring_type ON ai_monitoring(type);