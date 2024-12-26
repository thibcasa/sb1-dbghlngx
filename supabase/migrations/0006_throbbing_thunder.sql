/*
  # Add missing user_id columns and relationships

  1. Changes
    - Add user_id columns to tables missing them
    - Update RLS policies to use correct user_id references
    - Add foreign key constraints

  2. Security
    - Maintain existing RLS policies
    - Update policies to use new user_id columns
*/

-- Add user_id to tables missing it
ALTER TABLE pipeline_stages 
ADD COLUMN IF NOT EXISTS user_id uuid REFERENCES auth.users(id);

ALTER TABLE pipeline_events 
ADD COLUMN IF NOT EXISTS user_id uuid REFERENCES auth.users(id);

ALTER TABLE contacts_in_pipeline 
ADD COLUMN IF NOT EXISTS user_id uuid REFERENCES auth.users(id);

ALTER TABLE pipeline_metrics 
ADD COLUMN IF NOT EXISTS user_id uuid REFERENCES auth.users(id);

-- Update RLS policies to use new user_id columns
DROP POLICY IF EXISTS "Users can manage their pipeline stages" ON pipeline_stages;
CREATE POLICY "Users can manage their pipeline stages"
  ON pipeline_stages
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can view their pipeline events" ON pipeline_events;
CREATE POLICY "Users can view their pipeline events"
  ON pipeline_events
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can manage contacts in their pipeline" ON contacts_in_pipeline;
CREATE POLICY "Users can manage contacts in their pipeline"
  ON contacts_in_pipeline
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can view their pipeline metrics" ON pipeline_metrics;
CREATE POLICY "Users can view their pipeline metrics"
  ON pipeline_metrics
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

-- Add indexes for performance
CREATE INDEX IF NOT EXISTS idx_pipeline_stages_user ON pipeline_stages(user_id);
CREATE INDEX IF NOT EXISTS idx_pipeline_events_user ON pipeline_events(user_id);
CREATE INDEX IF NOT EXISTS idx_contacts_pipeline_user ON contacts_in_pipeline(user_id);
CREATE INDEX IF NOT EXISTS idx_pipeline_metrics_user ON pipeline_metrics(user_id);